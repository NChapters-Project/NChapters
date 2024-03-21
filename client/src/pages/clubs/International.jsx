import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { Link } from 'react-router-dom';

function International() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [subscribedEmails, setSubscribedEmails] = useState({});
  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the popup

  useEffect(() => {
    const database = getDatabase();
    const clubsRef = ref(database, 'clubs');

    // Fetch data from Firebase
    onValue(clubsRef, (snapshot) => {
      const clubsData = snapshot.val();
      if (clubsData) {
        // Convert object of objects to array of objects
        const clubsArray = Object.keys(clubsData).map(key => ({
          id: key,
          ...clubsData[key]
        }));
        // Filter clubs whose category is "FOC"
        const internationalClubs = clubsArray.filter(club => club.category === "International");
        setClubs(internationalClubs);
        setLoading(false); // Update loading state after data fetch
      } else {
        setClubs([]);
        setLoading(false); // Update loading state after data fetch
      }
    });
  }, []); // Empty dependency array ensures this effect runs only once

  const subscribeToNotifications = (event, clubId, clubName) => {
    event.preventDefault(); // Prevent default behavior of the button
    const email = prompt('Enter your email:');
    if (email) {
      const database = getDatabase();
      const subscribersRef = ref(database, 'subscribers');

      // Push the subscriber email along with the club ID and name to Firebase
      push(subscribersRef, { email, clubId, clubName })
        .then(() => {
          console.log('Subscriber added successfully!');
          // Update the local state if needed
          setSubscribedEmails(prevState => ({
            ...prevState,
            [clubId]: [...(prevState[clubId] || []), email]
          }));
          // Show the popup
          setShowPopup(true);
          // Hide the popup after 3 seconds
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);
        })
        .catch((error) => {
          console.error('Error adding subscriber:', error);
          // Handle error, show error message, etc.
        });
    }
  };

  return (
    <div>
      {/* Popup component */}
      {showPopup && (
        <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-10">
          Subscribed successfully!
        </div>
      )}
      <section className="bg-center bg-no-repeat bg-[url(src/images/com.jpg)] bg-gray-700 bg-blend-multiply mt-12">
        <div className="px-4 mx-auto max-w-screen-xl md:h-[20rem] sm:h-[15rem] text-center py-12 lg:py-20">
          <h3 className="mt-8 text-2xl font-extrabold tracking-tight leading-none text-white md:text-2xl lg:text-5xl">International</h3>
          <p className="mt-6 text-lg font-normal text-gray-300 lg:text-3xl sm:px-16 lg:px-48">Clubs & Societies</p>
        </div>
      </section>

      {loading ? ( // Display loading indicator while fetching data
        <div className="flex justify-center items-center text-2xl h-32">Loading...</div>
      ) : clubs.length === 0 ? ( // Check if clubs array is empty
      <div class = "text-center text-bold text-4xl mt-28">Coming Soon...</div>
      ) : (
        clubs.map((club, index) => (
          <a key={club.id} href={`/cevent/${club.id}/${club.name}`} className={`flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-6xl min-h-[20rem] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mt-20 ml-3 mr-3 ${index % 2 === 0 ? '' : 'md:ml-auto'}`} hiidden>
            {index % 2 === 0 ? (
              <>
                <img className="object-cover w-full rounded-t-lg h-96 md:h-[20rem] md:w-[35rem] md:rounded-none md:rounded-s-lg" src={club.imageUrl} alt={club.clubName} />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{club.name}</h5>
                  <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">{club.description}</p>
                  <div className="flex">
                    <Link to={`/cevent/${club.id}/${club.name}`} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" style={{ maxWidth: '220px', marginTop: '1rem' }}>Explore More</Link>
                    <button
                      type="button"
                      onClick={(event) => subscribeToNotifications(event, club.id, club.name)}
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      style={{ maxWidth: '220px', marginTop: '1rem' }}
                    >
                      Turn on notifications
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{club.name}</h5>
                  <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">{club.description}</p>
                  <div className="flex">
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" style={{ maxWidth: '220px', marginTop: '1rem' }}>Explore More</button>
                    <button
                      type="button"
                      onClick={(event) => subscribeToNotifications(event, club.id, club.name)}
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    style={{ maxWidth: '220px', marginTop: '1rem' }}
                  >
                    Turn on notifications
                  </button>
                </div>
              </div>
              <img className="object-cover w-full h-96 md:h-[20rem] md:w-[35rem]" src={club.imageUrl} alt={club.clubName} />
            </>
          )}
        </a>
      )))}
    </div>
  );
}

export default International;
