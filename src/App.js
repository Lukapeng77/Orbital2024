
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Home from './Components/Home';
import PrivateRoute from './Components/PrivateRoute';  
import EditProfile from './Components/EditProfile';
import SavedProfile from './Components/SavedProfile';
import UserProfile from './Components/UserProfile';
import ForumPage from './Components/ForumPage';
import { Button, ButtonGroup } from '@mui/material';
import ContactsList from './Components/ContactsList';
import ChatRoom from './Components/ChatRoom';
import './styles/App.css'

function App() {
	return (
		<Router>
		 <div>
			<center>
		 <ButtonGroup size= "large" variant="text" aria-label="Medium-sized button group">
         <Button><Link to="/">Home</Link> </Button>
         <Button><Link to="/profile">User Profile</Link> </Button>
         <Button><Link to="/forum">Forum</Link> </Button>
		 <Button><Link to="/contactslist">Contacts List</Link> </Button>
         </ButtonGroup>
		    </center>
		<Routes>
		<Route path="/" element ={<Home />} />  // Default home page route
		<Route path="/login" element ={<Login />} />
		<Route path="/register" element ={<Registration />} />
		<Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
		<Route path="/profile" element={<UserProfile />} />
		<Route path="/profile/edit" element={<EditProfile />} />
		<Route path="/profile/saved" element={<SavedProfile />} />  
		<Route path="/forum" element={<ForumPage />} /> 
		<Route path="/contactslist" element={<ContactsList />} /> 
        <Route path="/chat/:contactId" element={<ChatRoom />} />
		</Routes>
		</div>
		</Router>
	);
}

export default App;

