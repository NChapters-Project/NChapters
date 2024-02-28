import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';

const Leaders = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        club: 'Select Club'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get a reference to the database service
        const database = getDatabase();

        // Push data to the 'leaders' node in the Realtime Database
        push(ref(database, 'leaders'), {
            name: formData.name,
            email: formData.email,
            club: formData.club
        })
        .then(() => {
            console.log('Data successfully submitted!');
            setFormData({ name: '', email: '', club: 'Select Club' });
        })
        .catch((error) => {
            console.error('Error submitting data: ', error);
        });
    };
    return (
        <div>
        <section className="bg-white dark:bg-gray-900 mt-12">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a Club Leader</h2>
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
                        <div>
                            <label htmlFor="club" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Club</label>
                            <select id="club" value={formData.club} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option disabled>Select Club</option>
                                <option value="FOSS">FOSS</option>
                                <option value="CSSL">CSSL</option>
                                <option value="IEEE">IEEE</option>
                                <option value="ISACA">ISACA</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Add Leader
                    </button>
                </form>
            </div>
        </section>
    </div>
);
}

export default Leaders;