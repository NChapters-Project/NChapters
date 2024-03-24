// ContactList.jsx
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';
const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch contact data from Firebase Realtime Database
    const database = getDatabase();
    const contactsRef = ref(database, 'contacts');
    onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactList = Object.values(data);
        setContacts(contactList);
      }
    });
  }, []);
  if (currentUser?.name !== 'OV Jayawardana') {
    return (
      <div>
        <p class="mt-56 text-3xl text-center">You do not have access to this page.</p>
      </div>
    );
  }
  return (
    
    <div class="mt-32">
     
      <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Subject</th>
          <th scope="col" class="px-6 py-3">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td class="px-6 py-4">{contact.email}</td>
              <td class="px-6 py-4">{contact.subject}</td>
              <td class="px-6 py-4">{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ContactList;
