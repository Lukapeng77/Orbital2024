
import React, { useState, useEffect } from 'react';
import '../styles/ContactsList.css';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigation from './Navigation';

function ContactsList({ onSelectContact }) {
  const [, setContacts] = useState([]);
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

  /*const handleSelectContact = (contact) => {
    setActiveContactId(contact.id);
    onSelectContact(contact);
    navigate(`/chat/${contact.id}`); // Navigate to the chat room with this contact
  };*/
  
  // In your App component or wherever you manage state
const contacts = [
  { id: 1, name: 'Luka', avatarUrl: 'https://ui-avatars.com/api/?name=Luka', lastMessage: 'See you soon!' },
  { id: 2, name: 'Bob', avatarUrl: 'https://ui-avatars.com/api/?name=Bob', lastMessage: 'Got the tickets!' },
  { id: 3, name: 'Alice', avatarUrl: 'https://ui-avatars.com/api/?name=Alice', lastMessage: 'Nice to meet you!' },
  { id: 4, name: 'Amy', avatarUrl: 'https://ui-avatars.com/api/?name=Amy', lastMessage: 'Have a good day!' },
  { id: 5, name: 'John', avatarUrl: 'https://ui-avatars.com/api/?name=John', lastMessage: 'Can you show me the full process? Thank you!' },
  { id: 6, name: 'Tom', avatarUrl: 'https://ui-avatars.com/api/?name=Tom', lastMessage: 'See you tomorrow.' },
];

 //Function to handle contact selection
const handleSelectContact = (contact) => {
  console.log('Selected:', contact.name);
};

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
        <Navigation>
        </Navigation>
         </center>
    </div>
  );
}

export default ContactsList;
