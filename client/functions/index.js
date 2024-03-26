const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mailgun = require('mailgun-js');

admin.initializeApp();

exports.sendEmailNotification = functions.firestore
    .document('clubs/{clubId}/events/{eventId}')
    .onCreate(async (snapshot, context) => {
        const clubId = context.params.clubId;
        const event = snapshot.data();

        try {
            // Get club subscribers from Firestore
            const subscribersSnapshot = await admin.firestore().collection(`clubs/${clubId}/subscribers`).get();
            const emails = subscribersSnapshot.docs.map(doc => doc.data().email);

            // Check if there are subscribers
            if (emails.length > 0) {
                // Email data
                const mg = mailgun({
                    apiKey: 'c4a92aa724c54d320627622de454c73e-b7b36bc2-051d3454',
                    domain: 'sandboxc0fcc633a1a54cfc8fe81b7dbb2ff115.mailgun.org'
                });

                const data = {
                    from: 'onaliy21@gmail.com',
                    to: emails.join(','),
                    subject: 'New Event Notification',
                    text: `A new event "${event.eventName}" has been added to ${clubId}.\nDetails: ${event.description}`
                };

                // Send email notification
                const result = await mg.messages().send(data);
                console.log('Email notification sent successfully:', result);
            } else {
                console.log('No subscribers found for club:', clubId);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    });

module.exports = { mailgun }; // Export the mailgun object if necessary
