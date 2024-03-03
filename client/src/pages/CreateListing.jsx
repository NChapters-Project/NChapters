import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, get } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    time: '',
    date: '',
    minidescription: '',
    description: '',
    image: null,
    clubName: '',
    volunteerLink: '',
    participateLink: ''
  });

  const [alertMessage, setAlertMessage] = useState('');

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const clubNames = ['FOSS', 'IEEE', 'CSSL', 'ISACA'];

  useEffect(() => {
    const database = getDatabase();
    const clubNamesRef = ref(database, 'clubNames');
    get(clubNamesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const clubNamesData = snapshot.val();
          const clubNamesList = Object.keys(clubNamesData).map((key) => clubNamesData[key]);
          setClubNames(clubNamesList);
        }
      })
      .catch((error) => {
        console.error('Error fetching club names: ', error);
      });
  }, []);

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
    const storage = getStorage();

    const imagesRef = storageRef(storage, 'images/' + formData.image.name);

    uploadBytes(imagesRef, formData.image)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((imageUrl) => {
        return push(ref(database, 'events'), {
          eventName: formData.eventName,
          time: formData.time,
          date: formData.date,
          minidescription: formData.minidescription,
          description: formData.description,
          imageUrl: imageUrl,
          clubName: formData.clubName,
          volunteerLink: formData.volunteerLink,
          participateLink: formData.participateLink
        });
      })
      .then(() => {
        console.log('Event added successfully!');
        setAlertMessage('Event added successfully!');
        alert('Event added successfully!');
        setFormData({
          eventName: '',
          time: '',
          date: '',
          minidescription: '',
          description: '',
          image: null,
          clubName: '',
          volunteerLink: '',
          participateLink: ''
        });
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error submitting data: ', error);
        setAlertMessage('Error adding event. Please try again later.');
        alert('Error adding event. Please try again later.');
      });
  };

  if (!currentUser || currentUser.name !== 'JC Rashminda') {
    navigate('/');
    return null;
  }

  return (
    <div
      style={{
        backgroundImage: `url("https://www.nsbm.ac.lk/wp-content/uploads/2021/08/About-Tab-1.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      className="min-h-screen flex flex-col justify-center py-8"
    >
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg mx-auto max-w-md md:max-w-4xl m-20">
        <h1 className="text-2xl md:text-4xl font-bold text-green-800 mb-6 text-center">Add an Event</h1>

        {alertMessage && (
          <div className="text-center text-green-600 mb-4">{alertMessage}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <input
              type="text"
              id="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
              style={{ width: '100%', height: '62.5px', fontSize: '1.5rem', maxWidth: '100%' }}
              placeholder="Enter event name"
              required
            />
          </div>
          <div>
            <label htmlFor="clubName" className="m-3">Club Name</label>
            <select
              id="clubName"
              value={formData.clubName}
              onChange={handleChange}
              required
            >
              <option value="">Select Club</option>
              {clubNames.map((clubName, index) => (
                <option key={index} value={clubName}>{clubName}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
              style={{ width: '100%', height: '62.5px', fontSize: '1.5rem', maxWidth: '100%' }}
              placeholder="Enter event time"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
              style={{ width: '100%', height: '62.5px', fontSize: '1.5rem', maxWidth: '100%' }}
              placeholder="Enter event date"
              required
            />
          </div>
          <div>
            <label htmlFor="minidescription" className="block text-sm font-medium text-gray-700 mb-1">Mini Description</label>
            <input
              type="text"
              id="minidescription"
              value={formData.minidescription}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
              style={{ width: '100%', height: '62.5px', fontSize: '1.5rem', maxWidth: '100%' }}
              placeholder="Enter event mini description"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
              style={{ width: '100%', height: '187.5px', fontSize: '1.5rem', maxWidth: '100%' }}
              placeholder="Enter event description"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="image" className="m-3">Image</label>
            <input
              type="file"
              id="image"
              onChange={handleChange}
              accept="image/*"
              required
            />
          </div>
          <div>
            <label htmlFor="volunteerLink" className="block text-sm font-medium text-gray-700 mb-1">Volunteer Link</label>
            <input
              type="url"
              id="volunteerLink"
              value={formData.volunteerLink}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
              style={{ width: '100%', height: '62.5px', fontSize: '1.5rem', maxWidth: '100%' }}
              placeholder="Enter volunteer link"
            />
          </div>
          <div>
            <label htmlFor="participateLink" className="block text-sm font-medium text-gray-700 mb-1">Participate Link</label>
            <input
              type="url"
              id="participateLink"
              value={formData.participateLink}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
              style={{ width: '100%', height: '62.5px', fontSize: '1.5rem', maxWidth: '100%' }}
              placeholder="Enter participate link"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-300"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
