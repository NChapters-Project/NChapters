import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    time: '',
    date: '',
    description: '',
    image: null // Initialize image state to null
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, image: e.target.files[0] }); // Store the selected file
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const database = getDatabase();

    // Create a storage reference to store the image file
    const storageRef = storage.ref(`images/${formData.image.name}`);
    // Upload the image file to Firebase Storage
    storageRef.put(formData.image)
      .then((snapshot) => {
        // Get the download URL for the image
        return snapshot.ref.getDownloadURL();
      })
      .then((imageUrl) => {
        // Push data to the 'events' node in the Realtime Database
        return push(ref(database, 'events'), {
          eventName: formData.eventName,
          time: formData.time,
          date: formData.date,
          description: formData.description,
          imageUrl: imageUrl // Store the image URL in the database
        });
      })
      .then(() => {
        console.log('Data successfully submitted!');
        setFormData({ eventName: '', time: '', date: '', description: '', image: null });
      })
      .catch((error) => {
        console.error('Error submitting data: ', error);
      });
  };


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
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="text"
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
              type="text"
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
          <label htmlFor="image"class = "m-3" >Image</label>
          <input
            type="file"
            id="image"  
            onChange={handleChange}
            accept="image/*" // Limit to only image files
            required
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
