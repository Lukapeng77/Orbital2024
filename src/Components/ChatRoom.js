
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ChatRoom.css'

function ChatRoom({ currentChat }) {
    const{ contactId } = useParams();
    const[chat, setChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
      // Simulate fetching data. Replace this with actual API call.
      const fetchedChat = {
        id: contactId,
        name: 'Alice Smith', // This would be fetched based on the contactId
        messages: [
          { id: 1, content: 'Hello, how can I help you?', sentByMe: false },
          { id: 2, content: 'I have a question about React.', sentByMe: true }
        ]
      };
      setChat(fetchedChat);
    }, [contactId]);
  
    if (!chat) return <div>Loading...</div>;

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return; // Avoid sending empty messages

        // Simulate sending message to backend
        console.log('Sending message:', newMessage);
        // Ideally, here you would call an API to send the message to the backend
        // After sending, you would fetch the updated message list or listen for updates via WebSocket, 
        // need to store the messages send and recevied in database 

        setNewMessage(''); // Reset input after sending
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
