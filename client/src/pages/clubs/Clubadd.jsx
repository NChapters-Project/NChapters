import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';

function Clubadd() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    const name = event.target.elements.name.value.trim();
    const description = event.target.elements.description.value.trim();
    const brand = event.target.elements.brand.value.trim();

    if (!name || !description || !brand) {
      setErrorMessage('Please fill out all required fields.');
      return; // Exit the function early if any required field is empty
    }

    setLoading(true);

    // Assuming you have collected club name, description, and brand from the form
    const newClubData = {
      clubName: name,
      description: description,
      brand: brand,
      // Assuming other fields of your event data
    };

    const database = getDatabase();
    const clubsRef = ref(database, 'clubs');

    // Push new club data to Firebase
    push(clubsRef, newClubData)
      .then((newClubRef) => {
        console.log("New club added with ID: ", newClubRef.key);
        setSuccess(true);
        // Reset form fields
        event.target.reset(); // This will reset all form fields
      })
      .catch((error) => {
        console.error("Error adding new club: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h1 className="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-24">Add a new Club</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Club Name</label>
                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type club name" required="" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Club Image</label>
                <input type="file" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-8 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required="" />
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Club Category</label>
                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option disabled selected>Select Club</option>
                  <option value="">FOC</option>
                  <option value="">FOB</option>
                  <option value="">FOE</option>
                  <option value="">FOS</option>
                  <option value="">International</option>
                  <option value="">Religious</option>
                  <option value="">Activity Based</option>
                  <option value="">Career Guidance</option>
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
