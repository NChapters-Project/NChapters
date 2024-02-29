import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

function FOC() {
  const [clubs, setClubs] = useState([]);

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
        setClubs(clubsArray);
      } else {
        setClubs([]);
      }
    });
  }, []); // Empty dependency array ensures this effect runs only once

  return (

    <div>
        <section class="bg-center bg-no-repeat bg-[url(src/images/com.jpg)] bg-gray-700 bg-blend-multiply mt-12">
    <div class="px-4 mx-auto max-w-screen-xl md:h-[20rem] sm:h-[15rem] text-center py-12 lg:py-20">
        <h3 class="mt-8 text-2xl font-extrabold tracking-tight leading-none text-white md:text-2xl lg:text-5xl">Faculty of Computing</h3>
        <p class="mt-6 text-lg font-normal text-gray-300 lg:text-3xl sm:px-16 lg:px-48">Clubs & Societies</p>
        
    </div>
</section>
      {clubs.map((club, index) => (
        <a key={club.id} href={`/clubs/${club.id}`} className={`flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-6xl min-h-[20rem] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mt-20 ml-3 mr-3 ${index % 2 === 0 ? '' : 'md:ml-auto'}`}>
          {index % 2 === 0 ? (
            <>
              <img className="object-cover w-full rounded-t-lg h-96 md:h-[20rem] md:w-[35rem] md:rounded-none md:rounded-s-lg" src={club.imageUrl} alt={club.clubName} />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{club.clubName}</h5>
                <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">{club.description}</p>
                <div className="flex">
                  <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" style={{ maxWidth: '220px', marginTop: '1rem' }}>Explore More</button>
                  <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" style={{ maxWidth: '220px', marginTop: '1rem' }}>Turn on notifications</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{club.clubName}</h5>
                <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">{club.description}</p>
                <div className="flex">
                  <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" style={{ maxWidth: '220px', marginTop: '1rem' }}>Explore More</button>
                  <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" style={{ maxWidth: '220px', marginTop: '1rem' }}>Turn on notifications</button>
                </div>
              </div>
              <img className="object-cover w-full h-96 md:h-[20rem] md:w-[35rem]" src={club.imageUrl} alt={club.clubName} />
            </>
          )}
        </a>
      ))}
    </div>
  );
}

export default FOC;
