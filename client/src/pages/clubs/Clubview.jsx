import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function Clubview() {
    const params = useParams();
    const [club, setClub] = useState(null);

    useEffect(() => {
        const database = getDatabase();
        const clubsRef = ref(database, 'clubs');

        // Fetch data from Firebase based on the club id passed in params
        onValue(clubsRef, (snapshot) => {
            const clubsData = snapshot.val();
            if (clubsData) {
                const selectedClub = clubsData[params.id];
                if (selectedClub) {
                    setClub({ id: params.id, ...selectedClub });
                }
            }
        });
    }, [params.id]);

    return (
        <div className="mt-20 mb-10 text-center  place-content-center">
            {club && (
              <>
                <section className="bg-center bg-green-800 bg-blend-multiply mt-5 mb-5 p-5">
                    <h3 className="text-xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-3xl">{club.clubName}</h3>
                </section>
                
                <div key={club.id} className="rounded overflow-hidden flex flex-col pl-20 pr-20 mb-10">
                  <div className="relative">
                      <img className="w-full" src={club.imageUrl} alt={club.clubName} style={{ maxWidth: '100%', height: 'auto' }} />
                  </div>
                </div>
                <div className="">
                    <div className="mb-5">
                        <h1 className="text-green-700 text-3xl font-extrabold">Club Description</h1>
                    </div>
                    <div className="text-xl mt-5 mb-5 ">
                    <p className="pb-20 pr-10 pl-10 text-center font-medium ">{club.description}</p>
                    </div>
                </div>
              </>
            )}
        </div>
    );
}
