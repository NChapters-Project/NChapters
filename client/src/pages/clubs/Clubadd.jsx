import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useParams } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
function Clubadd() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
// Get isLeader state from redux store
const isLeader = useSelector((state) => state.user.isLeader);
const currentUser = useSelector((state) => state.user.currentUser);
  const handleChange = (e) => {
    const { id, value } = e.target;
    const newValue = value === "Select Club" ? null : value;
    setFormData({ ...formData, [id]: newValue });
  };
  
  
  

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storage = getStorage();
      const database = getDatabase();

      const imagesRef = storageRef(storage, 'clubImages/' + formData.image.name);

      const snapshot = await uploadBytes(imagesRef, formData.image);
      const imageUrl = await getDownloadURL(snapshot.ref);

      await push(ref(database, 'clubs'), {
        name: formData.name,
        description: formData.description,
        imageUrl: imageUrl,
        category: formData.category
      });

      setSuccess(true);
      setErrorMessage('');
      setLoading(false);
      setFormData({
        name: '',
        description: '',
        image: null,
        category: ''
      });
    } catch (error) {
      setErrorMessage('Error submitting data: ' + error.message);
      setLoading(false);
    }
  };
  if (!isLeader && currentUser?.name !== 'OV Jayawardana') {
    return (
      <div>
        <p class="mt-64 text-3xl text-center">You do not have access to this page.</p>
      </div>
    );
  }
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h1 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-24">Add a new Club</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Club Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type club name" required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Club Image</label>
                <input type="file" name="image" id="image" onChange={handleImageChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-8 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" accept="image/*" required />
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Club Category</label>
                <select name="category" id="category" value={formData.category} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                    <option selected>Select Club</option>
                    <option value="FOC">FOC</option>
                    <option value="FOB">FOB</option>
                    <option value="FOE">FOE</option>
                    <option value="FOS">FOS</option>
                    <option value="International">International</option>
                    <option value="Religious">Religious</option>
                    <option value="Activity Based">Activity Based</option>
                    <option value="Career Guidance">Career Guidance</option>
                  </select>

              </div>
            </div>
            <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.133 0-4.069-.836-5.542-2.209l1.554-1.5z"></path>
                </svg>
              ) : (
                'Add Club'
              )}
            </button>
          </form>
          {errorMessage && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}
          {success && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Data submitted successfully!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Clubadd;
