import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import ConfirmationModal from '../components/ConfirmationModel';
import { useParams } from 'react-router-dom';

function FeedbacksEdit() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [editFeedback, setEditFeedback] = useState(null);
    const [deleteFeedbackId, setDeleteFeedbackId] = useState(null);
    const [formData, setFormData] = useState({
        eventId: '',
        eventName: '',
        clubName: '',
        name: '',
        feedback: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // State for loading indicator
    const { clubName } = useParams();

    useEffect(() => {
        const database = getDatabase();
        const feedbacksRef = ref(database, 'feedback');

        onValue(feedbacksRef, (snapshot) => {
            const feedbackData = snapshot.val();
            if (feedbackData) {
                const feedbackList = Object.keys(feedbackData)
                    .map((key) => ({
                        id: key,
                        ...feedbackData[key],
                    }));
                setFeedbacks(feedbackList);
            } else {
                setFeedbacks([]);
            }
            setIsLoading(false); // Set loading to false when data is loaded
        });
    }, []);

    const handleDelete = (id) => {
        setDeleteFeedbackId(id);
    };

    const confirmDelete = () => {
        const database = getDatabase();
        const feedbackRef = ref(database, `feedback/${deleteFeedbackId}`);
        remove(feedbackRef)
            .then(() => {
                setFeedbacks(feedbacks.filter((feedback) => feedback.id !== deleteFeedbackId));
                setDeleteFeedbackId(null);
                window.alert('Feedback deleted successfully!');
            })
            .catch((error) => {
                console.error('Error deleting feedback: ', error);
                setDeleteFeedbackId(null);
                window.alert('Failed to delete feedback. Please try again later.');
            });
    };

    const cancelDelete = () => {
        setDeleteFeedbackId(null);
    };

    const handleEdit = (feedback) => {
        setEditFeedback(feedback);
        setFormData({
            eventId: feedback.eventId,
            eventName: feedback.eventName,
            clubName: feedback.clubName,
            name: feedback.name,
            feedback: feedback.feedback,
        });
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const database = getDatabase();
        const feedbackRef = ref(database, `feedback/${editFeedback.id}`);

        const updatedFeedbackData = { ...formData };

        update(feedbackRef, updatedFeedbackData)
            .then(() => {
                setIsModalOpen(false);
                setEditFeedback(null);
                window.alert('Feedback updated successfully!');
            })
            .catch((error) => {
                console.error('Error updating feedback: ', error);
                window.alert('Failed to update feedback. Please try again later.');
            });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-32">
             {isLoading ? ( // Render loading text if isLoading is true
                <p className="text-center mt-4 text-xl p-5 text-green-900 font-bold ">Loading...</p>
            ) : feedbacks.length === 0 ? (
                <p className="text-center mt-4 text-xl p-5 text-green-900 font-bold ">No Feedbacks At The Moment</p>
            ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Event ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Event Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Club Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Feedback
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
                        {feedbacks.map((feedback) => (
                            <tr key={feedback.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {feedback.eventId}
                                </td>
                                <td className="px-6 py-4">{feedback.eventName}</td>
                                <td className="px-6 py-4">{feedback.clubName}</td>
                                <td className="px-6 py-4">{feedback.name}</td>
                                <td className="px-6 py-4">{feedback.feedback}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => handleEdit(feedback)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">
                                        Edit
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => handleDelete(feedback.id)} className="text-red-600 hover:text-red-900 dark:text-red-400">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 dark:bg-gray-800 dark:text-white w-full sm:w-96 overflow-y-auto max-h-full">
                        <h2 className="text-2xl text-center font-semibold mb-4">Edit Feedback</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="m-3" id="eventId" value={formData.eventId} onChange={handleChange} placeholder="Event ID" required />
                            <input type="text" className="m-3" id="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" required />
                            <input type="text" className="m-3" id="clubName" value={formData.clubName} onChange={handleChange} placeholder="Club Name" required />
                            <input type="text" className="m-3" id="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                            <textarea className="m-3" id="feedback" value={formData.feedback} onChange={handleChange} placeholder="Feedback" required />

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
            {deleteFeedbackId && (
                <ConfirmationModal
                    isOpen={true}
                    title="Delete Feedback"
                    message="Are you sure you want to delete this feedback?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}

export default FeedbacksEdit;

