import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { Link } from 'react-router-dom';

function FOC() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribedEmails, setSubscribedEmails] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };

  useEffect(() => {
    const database = getDatabase();
    const clubsRef = ref(database, 'clubs');

    onValue(clubsRef, (snapshot) => {
      const clubsData = snapshot.val();
      if (clubsData) {
        const clubsArray = Object.keys(clubsData).map(key => ({
          id: key,
          ...clubsData[key]
        }));
        const focClubs = clubsArray.filter(club => club.category === "FOC");
        setClubs(focClubs);
        setLoading(false);
      } else {
        setClubs([]);
        setLoading(false);
      }
    });
  }, []);

  const handleTurnOnNotifications = (clubId, clubName) => {
    setSelectedClub({ clubId, clubName });
    setShowEmailPopup(true);
  };
  
  const subscribeToNotifications = () => {
    if (emailInput.trim() !== '') {
      const { clubId, clubName } = selectedClub;
      const database = getDatabase();
      const subscribersRef = ref(database, 'subscribers');
  
      // Push the subscriber email, club ID, and club name to Firebase
      push(subscribersRef, { email: emailInput, clubId, clubName })
        .then(() => {
          console.log('Subscriber added successfully!');
          // Update the local state if needed
          setSubscribedEmails((prevState) => ({
            ...prevState,
            [clubId]: [...(prevState[clubId] || []), emailInput],
          }));
          // Show the success popup
          setShowPopup(true);
          // Reset email input
          setEmailInput('');
          // Hide the email popup after successful subscription
          setShowEmailPopup(false);
          // Hide the success popup after 3 seconds
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
      {showPopup && (
        <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-10">
          Subscribed successfully!
        </div>
      )}
      {showEmailPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl text-center font-bold mb-4">Turn on Email Notifications!</h2>
            <h2 className="text-xl font-medium mb-4">Enter your email to receive notifications about the latest events of this club</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              value={emailInput}
              onChange={handleEmailChange}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={subscribeToNotifications}
              >
                Subscribe
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 ml-2 rounded hover:bg-gray-400"
                onClick={() => setShowEmailPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="bg-center bg-no-repeat bg-[url(src/images/com.jpg)] bg-gray-700 bg-blend-multiply mt-12">
        <div className="px-4 mx-auto max-w-screen-xl md:h-[20rem] sm:h-[15rem] text-center py-12 lg:py-20">
          <h3 className="mt-8 text-2xl font-extrabold tracking-tight leading-none text-white md:text-2xl lg:text-5xl">Faculty of Computing</h3>
          <p className="mt-6 text-lg font-normal text-gray-300 lg:text-3xl sm:px-16 lg:px-48">Clubs & Societies</p>
        </div>
      </section>

      {loading ? (
  // Display loading indicator while fetching data
  <div className="flex justify-center items-center text-2xl h-32">Loading...</div>
) : clubs.length === 0 ? (
  // Check if clubs array is empty
  <div className="text-center text-bold text-4xl mt-28">Coming Soon...</div>
) : (
  clubs.map((club, index) => (
    <div
      key={club.id}
      className={`flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-6xl min-h-[20rem] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mt-20 ml-3 mr-3 ${
        index % 2 === 0 ? '' : 'md:ml-auto'
      }`}
    >
      {index % 2 === 0 ? (
        <>
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-[20rem] md:w-[35rem] md:rounded-none md:rounded-s-lg"
            src={club.imageUrl}
            alt={club.clubName}
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {club.name}
            </h5>
            <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
              {club.description}
            </p>
            <div className="flex">
              <Link
                to={`/cevent/${club.id}/${club.name}`}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                style={{ maxWidth: '220px', marginTop: '1rem' }}
              >
                Explore More
              </Link>
              <button
  type="button"
  onClick={() => handleTurnOnNotifications(club.id, club.name)}
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
            <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {club.name}
            </h5>
            <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
              {club.description}
            </p>
            <div className="flex">
            <Link
                to={`/cevent/${club.id}/${club.name}`}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                style={{ maxWidth: '220px', marginTop: '1rem' }}
              >
                Explore More
              </Link>
              <button
  type="button"
  onClick={() => handleTurnOnNotifications(club.id, club.name)}
  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  style={{ maxWidth: '220px', marginTop: '1rem' }}
>
  Turn on notifications
</button>

            </div>
          </div>
          <img
            className="object-cover w-full h-96 md:h-[20rem] md:w-[35rem]"
            src={club.imageUrl}
            alt={club.clubName}
          />
        </>
      )}
    </div>
  ))
)}

    </div>
  );
}

export default FOC;
