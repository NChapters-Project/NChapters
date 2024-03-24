import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove, update, set } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import ConfirmationModal from '../../components/ConfirmationModel';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
function EditLeaders() {
    const [leaders, setLeaders] = useState([]);
    const { clubName } = useParams();
    const [editLeaders, setEditLeaders] = useState(null);
    const [deleteLeadersId, setDeleteLeadersId] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [isLeader, setIsLeader] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        club: ''
    });
    
    const currentUser = useSelector((state) => state.user.currentUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const database = getDatabase();
        const leadersRef = ref(database, 'leaders');

        // Listen for changes to the data
        onValue(leadersRef, (snapshot) => {
            const leadersData = snapshot.val();
            const leadersList = [];
            for (let id in leadersData) {
                leadersList.push({ id, ...leadersData[id] });
            }
            setLeaders(leadersList);
        });
    }, []);

    const handleDelete = (id) => {
        setDeleteLeadersId(id);
    };

    const confirmDelete = () => {
        const database = getDatabase();
        const leadersRef = ref(database, `leaders/${deleteLeadersId}`);
        remove(leadersRef)
            .then(() => {
                setLeaders(leaders.filter(leader => leader.id !== deleteLeadersId));



                setDeleteLeadersId(null);
            })
            .catch((error) => {
                console.error('Error deleting leader: ', error);
                setDeleteLeadersId(null);
            });
    };
    const cancelDelete = () => {
        setDeleteLeadersId(null);
    };

    const handleEdit = (leaders) => {
        setEditLeaders(leaders);
        setFormData({
            name: leaders.name,
            email: leaders.email,
            club: leaders.club
        });
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [id]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const database = getDatabase();
        const leadersRef = ref(database, `leaders/${editLeaders.id}`);

        const updatedLeadersData = {
            name: formData.name,
            email: formData.email,
            username: formData.username,
            club: formData.club
        };

        // Check if an image was uploaded
        if (formData.image) {
            const storage = getStorage();
            const imagesRef = storageRef(storage, `images/${formData.image.name}`);

            // Upload the image to Firebase Storage
            uploadBytes(imagesRef, formData.image)
                .then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                })
                .then((imageUrl) => {
                    // Once the image is uploaded, update the event data with the image URL
                    updatedLeadersData.imageUrl = imageUrl;

                    // Update the event data in the Firebase Realtime Database
                    update(leadersRef, updatedLeadersData)
                        .then(() => {
                            console.log('Leader updated successfully!');
                            setIsModalOpen(false); // Close the modal
                            setEditLeaders(null); // Reset editLeaders state
                        })
                        .catch((error) => {
                            console.error('Error updating leader: ', error);
                        });
                })
                .catch((error) => {
                    console.error('Error uploading image: ', error);
                });
        } else {
            // If no image was uploaded, update the leader data directly
            update(leadersRef, updatedLeadersData)
                .then(() => {
                    console.log('Leader updated successfully!');
                    setIsModalOpen(false); // Close the modal
                    setEditLeaders(null); // Reset editLeaders state
                })
                .catch((error) => {
                    console.error('Error updating leader: ', error);
                });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        const database = getDatabase();
        const leadersRef = ref(database, 'leaders');
    
        const fetchLeaderUsernames = () => {
          onValue(leadersRef, (snapshot) => {
            if (snapshot.exists()) {
              const leaderData = snapshot.val();
              
              const currentUserLeader = Object.values(leaderData).find(leader => leader.username === currentUser?.name);
              if (currentUserLeader) {
                setIsLeader(true); 
              } else {
                setIsLeader(false);
              }
            }
            setIsDataFetched(true);
          });
        };
    
        if (!isDataFetched) {
          fetchLeaderUsernames(); 
        }
        return () => {
          
        };
      }, [currentUser, clubName, isDataFetched]);
      if (!isLeader && currentUser?.name !== 'OV Jayawardana') {
        return (
          <div>
            <p class="mt-56 text-3xl text-center">You do not have access to this page.</p>
          </div>
        );
      }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-32 ml-12 mr-12">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* Table header */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Leader's Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Leader's Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Leader's Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Club
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                {/* Table body */}
                <tbody>
                    {leaders.map((leader) => (
                        <tr key={leader.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {leader.name}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {leader.email}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {leader.username}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {leader.club}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleEdit(leader)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleDelete(leader.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmationModal
                isOpen={!!deleteLeadersId}
                title="Delete Event"
                message="Are you sure you want to delete this event?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
            {isModalOpen && editLeaders && (
                <div className="popup-container fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Edit Event</h2>
                        {/* Form for editing event */}
                        <form onSubmit={handleSubmit} className="mt-4">
                            <input type="text" className="m-3" id="name" value={formData.name} onChange={handleChange} placeholder="Leader's Name" required />
                            <input type="email" className="m-3" id="email" value={formData.email} onChange={handleChange} placeholder="Leader's Email" required />
                            <input type="text" className="m-3" id="club" value={formData.club} onChange={handleChange} placeholder="Club" required />

                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">Save Changes</button>
                            <button type="button" onClick={closeModal} className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ml-2">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditLeaders;
