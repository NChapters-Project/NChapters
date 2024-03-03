import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import ConfirmationModal from '../components/ConfirmationModel';

function EventEdit() {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [formData, setFormData] = useState({
    eventName: '',
    time: '',
    date: '',
    minidescription: '',
    description: '',
    image: null,
    clubName: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const database = getDatabase();
    const eventRef = ref(database, `events/${deleteEventId}`);
    remove(eventRef)
      .then(() => {
        setEvents(events.filter(event => event.id !== deleteEventId));
        setDeleteEventId(null);
        window.alert('Event deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting event: ', error);
        setDeleteEventId(null);
        window.alert('Failed to delete event. Please try again later.');
      });
  };

  const cancelDelete = () => {
    setDeleteEventId(null);
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setFormData({
      eventName: event.eventName,
      time: event.time,
      date: event.date,
      minidescription: event.minidescription,
      description: event.description,
      clubName: event.clubName,
      image: null,
    });
    setIsModalOpen(true);
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
  
    const updatedEventData = {
      eventName: formData.eventName,
      time: formData.time,
      date: formData.date,
      minidescription: formData.minidescription,
      description: formData.description,
      clubName: formData.clubName,
    };
  
    if (formData.image) {
      const storage = getStorage();
      const imagesRef = storageRef(storage, `images/${formData.image.name}`);
  
      uploadBytes(imagesRef, formData.image)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((imageUrl) => {
          updatedEventData.imageUrl = imageUrl;
  
          update(eventRef, updatedEventData)
            .then(() => {
              console.log('Event updated successfully!');
              setIsModalOpen(false);
              setEditEvent(null);
              window.alert('Event updated successfully!');
            })
            .catch((error) => {
              console.error('Error updating event: ', error);
              window.alert('Failed to update event. Please try again later.');
            });
        })
        .catch((error) => {
          console.error('Error uploading image: ', error);
          window.alert('Failed to upload image. Please try again later.');
        });
    } else {
      update(eventRef, updatedEventData)
        .then(() => {
          console.log('Event updated successfully!');
          setIsModalOpen(false);
          setEditEvent(null);
          window.alert('Event updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating event: ', error);
          window.alert('Failed to update event. Please try again later.');
        });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              Mini Description
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
                {event.minidescription}
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
      {isModalOpen && editEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Edit Event</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <input type="text" className="m-3" id="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" required />
              <input type="text" className="m-3" id="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
              <input type="text" className="m-3" id="time" value={formData.time} onChange={handleChange} placeholder="Time" required />
              <input type="text" className="m-3" id="clubName" value={formData.clubName} onChange={handleChange} placeholder="Club Name" required />
              <input type="text" className="m-3" id="minidescription" value={formData.minidescription} onChange={handleChange} placeholder="Mini Description" required />
              <input type="text" className="m-3" id="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
              <input type="file" className="m-3" id="image" onChange={handleChange} accept="image/*" />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">Save Changes</button>
              <button type="button" onClick={closeModal} className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ml-2">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventEdit;
