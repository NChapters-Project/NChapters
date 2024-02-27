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
      clubName: event.clubName,
      image: null, // Reset image to null to avoid displaying the existing image when editing
    });
    setIsModalOpen(true); // Open the modal for editing
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
  
    // Create a new object to hold the updated event data
    const updatedEventData = {
      eventName: formData.eventName,
      time: formData.time,
      date: formData.date,
      description: formData.description,
      clubName: formData.clubName,
    };
  
    // Check if an image was uploaded
    if (formData.image) {
      const storage = getStorage();
      const imagesRef = storageRef(storage, `images/${formData.image.name}`);
  
      // Upload the image to Firebase Storage
      uploadBytes(imagesRef, formData.image)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((imageUrl) => {
          // Once the image is uploaded, update the event data with the image URL
          updatedEventData.imageUrl = imageUrl;
  
          // Update the event data in the Firebase Realtime Database
          update(eventRef, updatedEventData)
            .then(() => {
              console.log('Event updated successfully!');
              setIsModalOpen(false); // Close the modal
              setEditEvent(null); // Reset editEvent state
            })
            .catch((error) => {
              console.error('Error updating event: ', error);
            });
        })
        .catch((error) => {
          console.error('Error uploading image: ', error);
        });
    } else {
      // If no image was uploaded, update the event data directly
      update(eventRef, updatedEventData)
        .then(() => {
          console.log('Event updated successfully!');
          setIsModalOpen(false); // Close the modal
          setEditEvent(null); // Reset editEvent state
        })
        .catch((error) => {
          console.error('Error updating event: ', error);
        });
    }
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-32">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* Table header */}
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
        {/* Table body */}
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
      {isModalOpen && editEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Edit Event</h2>
            {/* Form for editing event */}
            <form onSubmit={handleSubmit} className="mt-4">
              <input type="text" className="m-3" id="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" required />
              <input type="text" className="m-3" id="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
              <input type="text" className="m-3" id="time" value={formData.time} onChange={handleChange} placeholder="Time" required />
              <input type="text" className="m-3" id="clubName" value={formData.clubName} onChange={handleChange} placeholder="Club Name" required />
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