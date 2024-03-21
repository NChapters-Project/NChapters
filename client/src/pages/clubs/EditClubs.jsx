import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import ConfirmationModal from '../../components/ConfirmationModel';

function EditClubs() {
  const [clubs, setClubs] = useState([]);
  const [editClubs, setEditClubs] = useState(null);
  const [deleteClubsId, setDeleteClubsId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    
    imageUrl: null,
    
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const database = getDatabase();
    const clubsRef = ref(database, 'clubs');

    onValue(clubsRef, (snapshot) => {
      const clubsData = snapshot.val();
      const clubsList = [];
      for (let id in clubsData) {
        clubsList.push({ id, ...clubsData[id] });
      }
      setClubs(clubsList);
    });
  }, []);

  const handleDelete = (id) => {
    setDeleteClubsId(id);
  };

  const confirmDelete = () => {
    const database = getDatabase();
    const clubsRef = ref(database, `clubs/${deleteClubsId}`);
    remove(clubsRef)
      .then(() => {
        setClubs(clubs.filter(club => club.id !== deleteClubsId)); // Fix typo here
        setDeleteClubsId(null);
        window.alert('Club deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting Club: ', error);
        setDeleteClubsId(null);
        window.alert('Failed to delete Club. Please try again later.');
      });
  };
  
  const cancelDelete = () => {
    setDeleteClubsId(null);
  };

  const handleEdit = (clubs) => {
    setEditClubs(clubs);
    setFormData({
        name: clubs.name,
        category: clubs.category,
        description:clubs.description,
        imageUrl: null,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { id, value, type } = e.target;
  
    if (type === 'file') {
      // Only update imageUrl if a file is selected
      setFormData(prevFormData => ({
        ...prevFormData,
        [id]: e.target.files[0]
      }));
    } else {
      // Update other form fields
      setFormData(prevFormData => ({
        ...prevFormData,
        [id]: value
      }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const database = getDatabase();
    const clubsRef = ref(database, `clubs/${editClubs.id}`);
  
    const updatedClubsData = { ...formData }; // Spread formData directly
  
    // If image is not being updated, retain the existing imageUrl
    if (!formData.imageUrl) {
      updatedClubsData.imageUrl = editClubs.imageUrl;
    }
  
    // If image is being updated, upload the new image
    if (formData.imageUrl) {
      const storage = getStorage();
      const imagesRef = storageRef(storage, `images/${formData.imageUrl.name}`);
  
      uploadBytes(imagesRef, formData.imageUrl)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((imageUrl) => {
          updatedClubsData.imageUrl = imageUrl;
  
          update(clubsRef, updatedClubsData)
            .then(() => {
              console.log('Club updated successfully!');
              setIsModalOpen(false);
              setEditClubs(null);
              window.alert('Club updated successfully!');
            })
            .catch((error) => {
              console.error('Error updating club: ', error);
              window.alert('Failed to update club. Please try again later.');
            });
        })
        .catch((error) => {
          console.error('Error uploading image: ', error);
          window.alert('Failed to upload image. Please try again later.');
        });
    } else {
      // If image is not being updated, directly update club data
      update(clubsRef, updatedClubsData)
        .then(() => {
          console.log('Club updated successfully!');
          setIsModalOpen(false);
          setEditClubs(null);
          window.alert('Club updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating club: ', error);
          window.alert('Failed to update club. Please try again later.');
        });
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-32">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
               Club Name
            </th>
            <th scope="col" className="px-6 py-3 w-12">
              Club Category
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((clubs) => (
            <tr key={clubs.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {clubs.name}
              </td>
              <td className="px-6 py-4 w-12">
              <div className="truncate">{clubs.category}</div>
              </td>
              <td className="px-6 py-4">
                {clubs.description}
              </td>
              
              <td className="px-6 py-4">
                {clubs.imageUrl && <img src={clubs.imageUrl} alt="Clubs" className="h-10 w-10 rounded-full" />}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleEdit(clubs)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDelete(clubs.id)} className="text-red-600 hover:text-red-900 dark:text-red-400">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white p-6 dark:bg-gray-800 dark:text-white w-full sm:w-96 overflow-y-auto max-h-full">
            <h2 className="text-2xl text-center font-semibold mb-4">Edit Club</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" className="m-3" id="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
              <select name="category" id="category" className="m-3" value={formData.category} onChange={handleChange} required>
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
              
              <textarea name="description" id="description" className="m-3" value={formData.description} onChange={handleChange} rows="8"  required ></textarea>
              <input type="file" className="m-3" id="imageUrl" onChange={handleChange} accept="image/*" />
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 mr-2">
                  Save
                </button>
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteClubsId && (
        <ConfirmationModal
          isOpen={true}
          title="Delete Club"
          message="Are you sure you want to delete this club?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default EditClubs;
