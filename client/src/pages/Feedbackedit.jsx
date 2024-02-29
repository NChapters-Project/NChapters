// FeedbackEdit.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import Eventpage from "../pages/Events"

function FeedbackEdit() {
    const { feedbackId, eventId } = useParams(); // Fetching the feedback ID and event ID from the URL params
    const navigate = useNavigate(); // Accessing the navigate function for programmatic navigation
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    useEffect(() => {
        const database = getDatabase();
        const feedbackRef = ref(database, `feedback/${feedbackId}`);

        onValue(feedbackRef, (snapshot) => {
            const data = snapshot.val();
            setSelectedFeedback(data);
        });
    }, [feedbackId]);

    const updateFeedback = (newName, newFeedback) => {
        const database = getDatabase();
        const feedbackRef = ref(database, `feedback/${feedbackId}`);

        update(feedbackRef, {
            name: newName,
            feedback: newFeedback
        })
        .then(() => {
            console.log('Feedback updated successfully!');
            alert('Feedback updated successfully!');
            navigate(`/feedbackedit/${feedbackId}/${eventId}`); // Redirect back to FeedbackEdit page
        })
        .catch((error) => {
            console.error('Error updating feedback: ', error);
        });
    };

    const deleteFeedback = () => {
        const database = getDatabase();
        const feedbackRef = ref(database, `feedback/${feedbackId}`);

        remove(feedbackRef)
        .then(() => {
            console.log('Feedback deleted successfully!');
            alert('Feedback deleted successfully!');
            navigate(`/feedbackedit/${feedbackId}/${eventId}`); // Redirect back to Eview page
        })
        .catch((error) => {
            console.error('Error deleting feedback: ', error);
        });
    };

    return (
        <div className="relative overflow-x-auto  sm:rounded-lg mt-20 ">
            {selectedFeedback && (
                <div>
                    <section className="bg-center bg-green-800 bg-blend-multiply mt-5 mb-5 p-5 text-center">
                        <h3 className="text-xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-3xl">Feedback Edit Page</h3>
                    </section>
                    <div className="ml-10 mr-5 mb-10 shadow-xl p-10" >
                        <label className="text-green-700 font-extrabold mr-2" >Username:</label>
                        <input
                            type="text"
                            value={selectedFeedback.name}
                            onChange={(e) => setSelectedFeedback({ ...selectedFeedback, name: e.target.value })}
                            className=" font-extrabold mr-2 mb-5 w-1/3 rounded border border-green-500 focus:border-green-700"
                        /><br></br>
                        <label className="text-green-700 font-extrabold mr-4" >Feedback:</label>
                        <input
                            type="text"
                            value={selectedFeedback.feedback}
                            onChange={(e) => setSelectedFeedback({ ...selectedFeedback, feedback: e.target.value })}
                            className="mr-2 mb-5 w-3/4 rounded border border-green-500 focus:border-green-700"
                        />
                        <br/>
                        <button className=" mr-3 pr-7 pl-7 pt-2 pb-2 bg-green-700 rounded-xl text-white" onClick={() => updateFeedback(selectedFeedback.name, selectedFeedback.feedback)}>Update</button>
                        <button  className=" mr-2  pr-6 pl-6 pt-2 pb-2 bg-red-500 rounded-xl text-white" onClick={() => deleteFeedback()}>Delete</button>
                    </div>
                </div>
            )}

            {!selectedFeedback && (
                <div className="text-center">
                    <h2>No feedback available to edit or delete</h2>
                    <button className=" mr-3 pr-7 pl-7 pt-2 pb-2 bg-green-700 rounded-xl text-white shadow-xl font-extrabold" onClick={() => navigate(`/Events`)}>Back to Events Page</button>
                </div>
            )}
            {selectedFeedback && (
                <div className="text-center">
                    <button className=" mr-3 pr-7 pl-7 pt-2 pb-2 bg-green-700 rounded-xl text-white shadow-xl font-extrabold" onClick={() => navigate(`/Events`)}>Back to Events Page</button>
                </div>
            )}
        </div>
    );
}

export default FeedbackEdit;
