
import React, { useState, useEffect } from 'react';
import '../styles/ContactsList.css';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
//import Navigation from './NavBar';

function ContactsList({ onSelectContact }) {
  const [contacts, setContacts] = useState([]);
  const [activeContactId, setActiveContactId] = useState(null);

  const navigate = useNavigate(); 
  
  useEffect(() => {
    // Assuming the API endpoint to fetch contacts is '/api/contacts'
    fetch('/api/contacts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setContacts(data.contacts); // Update state with fetched contacts
      })
      .catch(error => {
        console.error('Failed to fetch contacts:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const handleSelectContact = (contact) => {
    setActiveContactId(contact.id);
    onSelectContact(contact);
    navigate(`/chat/${contact.id}`); // Navigate to the chat room with this contact
  };
  
 //Function to handle contact selection
/*const handleSelectContact = (contact) => {
  console.log('Selected:', contact.name);
};*/

<ContactsList contacts={contacts} onSelectContact={handleSelectContact} />

  return (
    <div className="contacts-list">
      {contacts.map(contact => (
        <div 
          key={contact.id}
          className={`contact-item ${activeContactId === contact.id ? 'active' : ''}`}
          onClick={() => handleSelectContact(contact)}
        >
          <img src={contact.avatarUrl} alt={`${contact.name}'s avatar`} className="contact-avatar" />
          <div className="contact-info">
            <h4 className="contact-name">{contact.name}</h4>
            <p className="contact-last-message">{contact.lastMessage}</p>
          </div>
        </div>
      ))}
        <center>
         </center>
    </div>
  );
}

export default ContactsList;
