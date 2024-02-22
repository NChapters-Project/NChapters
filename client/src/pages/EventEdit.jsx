import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import ConfirmationModal from '../components/ConfirmationModel';
function EventEdit() {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [formData, setFormData] = useState({
    eventName: '',
    time: '',
    date: '',
    description: '',
    image: null,
    clubName: ''
  });

  useEffect(() => {
    const database = getDatabase();
    const eventsRef = ref(database, 'events');

    onValue(eventsRef, (snapshot) => {
      const eventData = snapshot.val();
      const eventList = [];
      for (let id in eventData) {
        eventList.push({ id, ...eventData[id] });
      }
      setEvents(eventList);
    });
  }, []);

  const handleDelete = (id) => {
    setDeleteEventId(id);
  };
  const confirmDelete = () => {
    // Perform deletion logic here
    const database = getDatabase();
    const eventRef = ref(database, `events/${deleteEventId}`);
    remove(eventRef)
      .then(() => {
        // Remove the deleted event from the state
        setEvents(events.filter(event => event.id !== deleteEventId));
        setDeleteEventId(null); // Reset deleteEventId state
      })
      .catch((error) => {
        console.error('Error deleting event: ', error);
        setDeleteEventId(null); // Reset deleteEventId state
      });
  };
  const cancelDelete = () => {
    setDeleteEventId(null); // Reset deleteEventId state
  };
  

  const handleEdit = (event) => {
    setEditEvent(event);
    setFormData({
      eventName: event.eventName,
      time: event.time,
      date: event.date,
      description: event.description,
      clubName: event.clubName
    });
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const database = getDatabase();
    const eventRef = ref(database, `events/${editEvent.id}`);

    if (formData.image) {
      const storage = getStorage();
      const imagesRef = storageRef(storage, 'images/' + formData.image.name);

      uploadBytes(imagesRef, formData.image)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((imageUrl) => {
          update(eventRef, { ...formData, imageUrl })
            .then(() => {
              console.log('Event updated successfully!');
              setEditEvent(null);
              setFormData({
                eventName: '',
                time: '',
                date: '',
                description: '',
                image: null,
                clubName: ''
              });
            })
            .catch((error) => {
              console.error('Error updating event: ', error);
            });
        })
        .catch((error) => {
          console.error('Error uploading image: ', error);
        });
    } else {
      update(eventRef, formData)
        .then(() => {
          console.log('Event updated successfully!');
          setEditEvent(null);
          setFormData({
            eventName: '',
            time: '',
            date: '',
            description: '',
            image: null,
            clubName: ''
          });
        })
        .catch((error) => {
          console.error('Error updating event: ', error);
        });
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-32">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Event Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Club Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {event.eventName}
              </td>
              <td className="px-6 py-4">
                {event.date}
              </td>
              <td className="px-6 py-4">
                {event.time}
              </td>
              <td className="px-6 py-4">
                {event.clubName}
              </td>
              <td className="px-6 py-4">
                {event.description}
              </td>
              <td className="px-6 py-4">
                <img src={event.imageUrl} alt={event.eventName} className="w-20 h-20 object-cover rounded-full" />
              </td>
              <td className="px-6 py-4">
                <button onClick={() => handleEdit(event)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
              </td>
              <td className="px-6 py-4">
                {/* Delete Button */}
                <button onClick={() => handleDelete(event.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationModal
        isOpen={!!deleteEventId}
        title="Delete Event"
        message="Are you sure you want to delete this event?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      {editEvent && (
        <form onSubmit={handleSubmit} className="mt-4">
          <input type="text" className="m-3" id="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" required />
          <input type="text" className="m-3" id="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
          <input type="text" className="m-3" id="time" value={formData.time} onChange={handleChange} placeholder="Time" required />
          
          <input type="text" className="m-3" id="clubName" value={formData.clubName} onChange={handleChange} placeholder="Club Name" required />
          <input type="text" className="m-3" ide="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          <input type="file" id="image" className="m-3" onChange={handleChange} accept="image/*" />
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default EventEdit;
