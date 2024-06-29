
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ChatRoom.css'

function ChatRoom({ currentChat }) {
    const{ contactId } = useParams();
    const[chat, setChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/chat/${contactId}`)
        .then(response => {
          setChat({
            id: contactId,
            messages: response.data
          });
        })
        .catch(error => console.error('Error fetching messages:', error));
    }, [contactId]);
  
    if (!chat) return <div>Loading...</div>;

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return; // Avoid sending empty messages

        // Simulate sending message to backend
        const messageData = { text: newMessage };

    axios.post(`http://localhost:3001/chat/${contactId}`, messageData)
    .then(response => {
      setChat(prevChat => ({
        ...prevChat,
        messages: [...prevChat.messages, response.data]
      }));
      console.log('Sending message:', newMessage);
      setNewMessage('');  // Reset the input after sending
    })
    .catch(error => console.error('Error sending message:', error));
        
        // Ideally, here you would call an API to send the message to the backend
        // After sending, you would fetch the updated message list or listen for updates via WebSocket, 
        // need to store the messages send and recevied in database 
    };

    return (
        <div className="chat-room">
            <h2>Chat with {currentChat.name}</h2>
            <ul className="messages-list">
                {currentChat.messages.map((msg, index) => (
                    <li key={index} className={`message ${msg.sentByMe ? 'sent' : 'received'}`}>
                        {msg.content}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSendMessage} className="message-form">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
}

export default ChatRoom;
