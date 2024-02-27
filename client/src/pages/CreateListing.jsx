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
    description: '',
    image: null, // Initialize image state to null
    clubName: '', // Initialize club name state
    volunteerLink: '', // Initialize volunteer link state
    participateLink: '' // Initialize participate link state
  });

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const clubNames = ['FOSS', 'IEEE', 'CSSL', 'ISACA']; // State to hold club names

  useEffect(() => {
    // Fetch club names from the database when component mounts
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
      setFormData({ ...formData, image: e.target.files[0] }); // Store the selected file
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // Check if form submission is triggered

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
          description: formData.description,
          imageUrl: imageUrl,
          clubName: formData.clubName,
          volunteerLink: formData.volunteerLink,
          participateLink: formData.participateLink
        });
      })
      .then(() => {
        console.log('Data successfully submitted!');
        setFormData({ eventName: '', time: '', date: '', description: '', image: null, clubName: '', volunteerLink: '', participateLink: '' });
      })
      .catch((error) => {
        console.error('Error submitting data: ', error);
      });
  };

  // Redirect if currentUser is not the admin
  if (!currentUser || currentUser.name !== 'OV Jayawardana') {
    navigate('/');
    return null; // or you can render a message or component indicating unauthorized access
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

        {/* Form */}
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
              style={{ width: '100%', height: '187.5px', fontSize: '1.5rem', maxWidth: '100%' }}
              placeholder="Enter event description"
            ></textarea>
          </div>
          <div>
            <label htmlFor="image" class="m-3">Image</label>
            <input
              type="file"
              id="image"
              onChange={handleChange}
              accept="image/*" // Limit to only image files
              required
            />
          </div>
          {/* New input fields for volunteer and participate links */}
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