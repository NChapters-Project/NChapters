// Feedback Component
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';

const Feedback = ({ eventId }) => {
    const [formData, setFormData] = useState({
        name: '',
        feedback: '',
    });

    const [feedbackData, setFeedbackData] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!");

        const database = getDatabase();

        push(ref(database, 'feedback'), {
            eventId: eventId,
            name: formData.name,
            feedback: formData.feedback
        })
        .then(() => {
            console.log('Data successfully submitted!');
            setFormData({ name: '', feedback: '' });
            alert('Feedback submitted successfully!');
        })
        .catch((error) => {
            console.error('Error submitting data: ', error);
        });
    };

    useEffect(() => {
        const database = getDatabase();
        const feedbackRef = ref(database, 'feedback');

        onValue(feedbackRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const feedbackArray = Object.entries(data)
                    .filter(([_, feedback]) => feedback.eventId === eventId)
                    .map(([feedbackId, feedback]) => ({ ...feedback, id: feedbackId }));
                setFeedbackData(feedbackArray);
            } else {
                setFeedbackData([]);
            }
        });
    }, [eventId]);

    return (
        <>
            <div className="mt-5 text-left ml-2 mr-2 text-center ">
                <div className="mb-5 mb-8">
                    <h1 className="text-green-700 text-4xl font-bold txt">Feedback Section</h1>
                </div>
                <form onSubmit={handleSubmit} className="">
                    <div className="mb-5 ml-6">
                        <input id="eventid" value={eventId} onChange={handleChange} type="text" hidden />
                    </div>
                    <div className="mb-5 ml-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1"></label>
                        <input id="name" value={formData.name} onChange={handleChange} type="text" placeholder="Name" className="w-1/2 wid" />
                    </div>
                    <div className="mb-5 ml-6">
                        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1"></label>
                        <input id="feedback" value={formData.feedback} onChange={handleChange} type="text" placeholder="Feedback" className="w-1/2 wid" />
                    </div>
                    <div className="mb-5 ml-2">
                        <button className="bg-green-700 text-white font-bold ml-2 pt-2 pb-2 rounded-md text-lg w-1/3 wid">Submit</button>
                    </div>
                </form>
                <div className="mb-5 ml-10 text-left pr-5">
                    <div className="mt-5 mb-8">
                        <h1 className="text-green-700 text-2xl font-extrabold">View Feedbacks</h1>
                    </div>
                    {feedbackData.map((feedback) => (
                        <div className="text-left mb-4 shadow-md p-5 pr-20" key={feedback.id}>
                            <h1><span className="text-green-700 font-extrabold">User : </span> {feedback.name}</h1>
                            <p><span className="text-green-700 font-extrabold">Feedback : </span>{feedback.feedback}</p>
                            <Link to={`/feedbackedit/${feedback.id}/${eventId}`} className="mt-2 text-rose-600" >Edit</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Feedback;
