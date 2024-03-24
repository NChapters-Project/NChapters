import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, get } from 'firebase/database';
import { useSelector } from 'react-redux';
const Leaders = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        club: 'Select Club'
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [clubNames, setClubNames] = useState([]);
    const isLeader = useSelector((state) => state.user.isLeader);
    const currentUser = useSelector((state) => state.user.currentUser);
    useEffect(() => {
        const database = getDatabase();
        const clubNamesRef = ref(database, 'clubs');
    
        get(clubNamesRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const clubNamesData = snapshot.val();
                    console.log("clubNamesData:", clubNamesData); // Log the fetched data
                    const clubNamesList = Object.keys(clubNamesData).map((key) => clubNamesData[key].name);
                    console.log("clubNamesList:", clubNamesList); // Log the processed club names
                    setClubNames(clubNamesList);
                } else {
                    console.log("No clubs data found");
                }
            })
            .catch((error) => {
                console.error('Error fetching club names: ', error);
            });
    }, []);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Get a reference to the database service
        const database = getDatabase();

        // Push data to the 'leaders' node in the Realtime Database
        push(ref(database, 'leaders'), {
            name: formData.name,
            email: formData.email,
            username: formData.username,
            club: formData.club
        })
        .then(() => {
            console.log('Data successfully submitted!');
            setSuccess(true);
            setFormData({ name: '', email: '', username: '', club: '' });
        })
        .catch((error) => {
            console.error('Error submitting data: ', error);
        })
        .finally(() => {
            setLoading(false);
        });
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
            <section className="bg-white dark:bg-gray-900 mt-12">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl text-center font-bold text-gray-900 dark:text-white">Add a Club Leader</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leader's Name</label>
                                <input type="text" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Club Leader's Name" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leader's Email</label>
                                <input type="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Club Leader's NSBM Email" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leader's NSBM Student Username</label>
                                <input type="username" id="username" value={formData.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Club Leader's Username" required="" />
                            </div>
                            <div>
                                <label htmlFor="club" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Club</label>
                                <select id="club" value={formData.club} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="">Select Club</option>
  {clubNames.map((clubName, index) => (
    <option key={index} value={clubName}>{clubName}</option>
  ))}
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
                                'Add Leader'
                            )}
                        </button>
                    </form>
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

export default Leaders;
