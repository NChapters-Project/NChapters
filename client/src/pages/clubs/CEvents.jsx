import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link, useParams } from 'react-router-dom'; // Import Link and useParams from react-router-dom

function CEvents() {
  const [events, setEvents] = useState([]);
  const [selectedClub, setSelectedClub] = useState(''); // State to store selected club
  const [clubNames, setClubNames] = useState([]); // State to store unique club names
  const [loading, setLoading] = useState(true); // State to track loading state
  const { clubName } = useParams(); // Extract clubName from URL

  useEffect(() => {
    const database = getDatabase();
    const eventsRef = ref(database, 'events');

    onValue(eventsRef, (snapshot) => {
      const eventData = snapshot.val();
      const eventList = [];
      const uniqueClubNames = new Set(); // Using Set to store unique club names

      for (let id in eventData) {
        eventList.push({ id, ...eventData[id] });
        uniqueClubNames.add(eventData[id].clubName); // Adding club names to Set
      }

      setEvents(eventList);
      setClubNames(Array.from(uniqueClubNames)); // Converting Set to Array and setting club names
      setLoading(false); // Set loading state to false once events are loaded
    });

    // Set selected club to the one from URL
    setSelectedClub(clubName);
  }, [clubName]); // useEffect will re-run whenever clubName changes

  // Function to handle club selection
  const handleClubChange = (event) => {
    setSelectedClub(event.target.value); // Set selected club
  };

  // Filter events based on selected club
  const filteredEvents = selectedClub
    ? events.filter((event) => event.clubName === selectedClub)
    : events;

  return (
    <div>
      <section className="bg-center bg-no-repeat bg-[url(../src/images/uni.jpg)] bg-gray-700 bg-blend-multiply mt-12">
        <div className="px-4 mx-auto max-w-screen-xl md:h-[20rem] sm:h-[15rem] text-center py-12 lg:py-20">
          <h3 className="mt-8 text-3xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Events</h3>
        </div>
      </section>


     {/* Dropdown to select club */}
     <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 ">
        {/* Display loading animation if events are still loading */}
        {loading && <div className="flex justify-center items-center text-2xl h-32">Loading Events...</div>}


        {/* Display filtered events */}
        {!loading && (
          <div>
        {filteredEvents.length === 0 ? (
           
          <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 text-center">
            <p className="text-2xl font-bold text-green-800">No events at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filteredEvents.map((event) => {
              const eventId = event.id;
              const eventImageUrl = event.imageUrl;

              return (
                <div key={eventId} className="rounded overflow-hidden shadow-lg flex flex-col">
                  <div className="relative">
                    <img className="w-full" src={eventImageUrl} alt="Event" />
                    <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                    <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                      {event.clubName}
                    </div>
                  </div>
                  <div className="px-6 py-4 mb-auto">
                    <Link to={`/eview/${eventId}/${encodeURIComponent(eventImageUrl)}/${event.clubName}/${event.description}`} className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{event.eventName}</Link>
                    <p className="text-gray-500 text-sm mb-2">{event.minidescription}</p>
                    <Link className="text-green-700 font-extrabold" to={`/eview/${eventId}/${encodeURIComponent(eventImageUrl)}/${event.clubName}/${event.description}`}>See more details... </Link>
                  </div>
                  <div className="flex justify-center mb-2">
                    <a href={event.participateLink} target="_blank" rel="noopener noreferrer" className="text-blue border-2 border-blue-500 bg-gradient-to-r from-white-500 via-white-600 to-white-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Participate</a>
                    <a href={event.volunteerLink} target="_blank" rel="noopener noreferrer" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  ">Volunteer</a>
                  </div>
                  <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                    <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                      <svg className="h-6 mr-3" version="1.1" id="Capa_1" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 455.005 455.005" }} xmlSpace="preserve">
                        <g>
                          <g>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" /></svg>
                          </g>
                        </g>
                      </svg>
                      <span className="ml-1">{event.date}</span>
                    </span>
                    <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                      <svg className="h-6 mr-3" version="1.1" id="Capa_1" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 455.005 455.005" }} xmlSpace="preserve">
                        <g>
                          <g>
                            <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                          </g>
                        </g>
                      </svg>
                      <span className="ml-1">{event.time}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      )}
    </div>
    </div>
    
  );
}

export default CEvents;
