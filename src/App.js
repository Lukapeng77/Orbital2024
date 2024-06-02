
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link as RouterLink} from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Home from './Components/Home';
import PrivateRoute from './Components/PrivateRoute';  
import EditProfile from './Components/EditProfile';
import SavedProfile from './Components/SavedProfile';
import UserProfile from './Components/UserProfile';
import ForumPage from './Components/ForumPage';
import { Button, AppBar, Toolbar, } from '@mui/material';
import ContactsList from './Components/ContactsList';
import ChatRoom from './Components/ChatRoom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import ContactsIcon from '@mui/icons-material/Contacts';
import { AuthProvider } from '../src/Components/AuthContext';
import './styles/App.css'

function App() {
	return (
		<Router>
         <AuthProvider>
		 <div>
		 <AppBar position="static" color="primary">
    <Toolbar>
	<Button color="inherit" startIcon={<HomeIcon />} component={RouterLink} to="/">Home</Button>
    <Button color="inherit" startIcon={<AccountCircleIcon />} component={RouterLink} to="/profile">User Profile</Button>
    <Button color="inherit" startIcon={<ForumIcon />} component={RouterLink} to="/forum">Forum</Button>
    <Button color="inherit" startIcon={<ContactsIcon />} component={RouterLink} to="/contactslist">Contacts List</Button>
    </Toolbar>
	      </AppBar>
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
		</AuthProvider>
		</Router>
	);
}

export default App;

