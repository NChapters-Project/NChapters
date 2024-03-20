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
    clubName: '',
    volunteerLink: '',
    participateLink: '',
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
      volunteerLink: event.volunteerLink,
      participateLink: event.participateLink,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: type === 'file' ? e.target.files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const database = getDatabase();
    const eventRef = ref(database, `events/${editEvent.id}`);
  
    const updatedEventData = { ...formData }; // Spread formData directly
  
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
            <th scope="col" className="px-6 py-3 w-12">
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
            <th scope="col" className="px-6 py-3 w-12">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Volunteer Link
            </th>
            <th scope="col" className="px-6 py-3">
              Participate Link
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
              <td className="px-6 py-4 w-12">
              <div className="truncate">{event.date}</div>
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
              <td className="px-6 py-4 w-12">
                <div className="truncate">{event.description}</div>
              </td>
              <td className="px-6 py-4">
                {event.volunteerLink}
              </td>
              <td className="px-6 py-4">
                {event.participateLink}
              </td>
              <td className="px-6 py-4">
                {event.imageUrl && <img src={event.imageUrl} alt="Event" className="h-10 w-10 rounded-full" />}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleEdit(event)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-900 dark:text-red-400">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white p-6 dark:bg-gray-800 dark:text-white w-full sm:w-96 overflow-y-auto max-h-full">
            <h2 className="text-2xl text-center font-semibold mb-4">Edit Event</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" className="m-3" id="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" required />
              <input type="text" className="m-3" id="time" value={formData.time} onChange={handleChange} placeholder="Time" required />
              <input type="date" className="m-3" id="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
              <input type="text" className="m-3" id="minidescription" value={formData.minidescription} onChange={handleChange} placeholder="Mini Description" required />
              <textarea className="m-3" id="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
              <input type="text" className="m-3" id="clubName" value={formData.clubName} onChange={handleChange} placeholder="Club Name" required />
              <input type="url" className="m-3" id="volunteerLink" value={formData.volunteerLink} onChange={handleChange} placeholder="Volunteer Link" required />
              <input type="url" className="m-3" id="participateLink" value={formData.participateLink} onChange={handleChange} placeholder="Participate Link" required />
              <input type="file" className="m-3" id="image" onChange={handleChange} accept="image/*" />
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 mr-2">
                  Save
                </button>
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteEventId && (
        <ConfirmationModal
          isOpen={true}
          title="Delete Event"
          message="Are you sure you want to delete this event?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default EventEdit;
