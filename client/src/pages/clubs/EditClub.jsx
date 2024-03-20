import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";

function EditClub() {
  const [clubs, setClubs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [editedClubData, setEditedClubData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const database = getDatabase();
    const clubsRef = ref(database, "clubs");

    onValue(clubsRef, (snapshot) => {
      const clubsData = snapshot.val();
      if (clubsData) {
        const clubsArray = Object.keys(clubsData).map((key) => ({
          id: key,
          ...clubsData[key],
        }));
        const focClubs = clubsArray.filter((club) => club.category === "FOC");
        setClubs(focClubs);
      } else {
        setClubs([]);
      }
    });
  }, []);

  const handleEditClub = (club) => {
    setEditingClub(club);
    setEditedClubData({ name: club.name, description: club.description });
  };

  const handleSaveEdit = () => {
    if (editingClub) {
      const database = getDatabase();
      const clubRef = ref(database, `clubs/${editingClub.id}`);
      update(clubRef, editedClubData)
        .then(() => {
          console.log("Club updated successfully!");
          setEditingClub(null);
        })
        .catch((error) => {
          console.error("Error updating club:", error);
        });
    }
  };

  const handleDeleteClub = (clubId) => {
    const database = getDatabase();
    const clubRef = ref(database, `clubs/${clubId}`);
    remove(clubRef)
      .then(() => {
        console.log("Club deleted successfully!");
        setClubs(clubs.filter((club) => club.id !== clubId));
      })
      .catch((error) => {
        console.error("Error deleting club:", error);
      });
  };

  return (
    <div>
      {showPopup && (
        <div className="fixed z-10 p-4 bg-white rounded-lg shadow-lg bottom-4 left-4 right-4">
          Subscribed successfully!
        </div>
      )}
      <section className="bg-center bg-no-repeat bg-[url(src/images/com.jpg)] bg-gray-700 bg-blend-multiply mt-12">
        {/* Content... */}
      </section>
      {clubs.map((club, index) => (
        <div
          key={club.id}
          className={`flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-6xl min-h-[20rem] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mt-20 ml-3 mr-3 ${
            index % 2 === 0 ? "" : "md:ml-auto"
          }`}
        >
          <div className="flex flex-col justify-between p-4 leading-normal">
            {editingClub === club ? (
              <>
                <input
                  type="text"
                  value={editedClubData.name}
                  onChange={(e) =>
                    setEditedClubData({
                      ...editedClubData,
                      name: e.target.value,
                    })
                  }
                  className="mb-2 text-4xl font-bold tracking-tight text-gray-900 border-b-2 border-blue-500 dark:text-white focus:outline-none"
                />
                <textarea
                  value={editedClubData.description}
                  onChange={(e) =>
                    setEditedClubData({
                      ...editedClubData,
                      description: e.target.value,
                    })
                  }
                  className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400 focus:outline-none"
                  rows={4}
                  style={{ resize: "none" }}
                ></textarea>
                <div className="flex">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    style={{ maxWidth: "220px", marginTop: "1rem" }}
                    onClick={handleSaveEdit}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    style={{ maxWidth: "220px", marginTop: "1rem" }}
                    onClick={() => setEditingClub(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {club.name}
                </h5>
                <p className="mb-3 text-xl font-normal text-gray-700 dark:text-gray-400">
                  {club.description}
                </p>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => handleEditClub(club)}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    style={{ maxWidth: "220px", marginTop: "1rem" }}
                  >
                    Edit Club
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClub(club.id)}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    style={{ maxWidth: "220px", marginTop: "1rem" }}
                  >
                    Delete Club
                  </button>
                </div>
              </>
            )}
          </div>
          <img
            className="object-cover w-full h-96 md:h-[20rem] md:w-[35rem]"
            src={club.imageUrl}
            alt={club.clubName}
          />
        </div>
      ))}
    </div>
  );
}

export default EditClub;
