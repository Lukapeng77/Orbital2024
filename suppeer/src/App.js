
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Register&Login/Login';
import Registration from './Components/Register&Login/Registration';
import Home from './Components/Home';
import PrivateRoute from './Components/PrivateRoute';  
//import EditProfile from './Components/EditProfile';
//import SavedProfile from './Components/SavedProfile';
//import UserProfile from './Components/UserProfile';

//import ContactsList from './Components/ContactsList';
//import ChatRoom from './Components/ChatRoom';
//import './styles/App.css';

import AddProfile from './Components/UserProfile_new/AddProfile';
//import Profile from './Components/UserProfile_new/Profile';
import SearchView from './Components/views/SearchView';
import PostView from './Components/views/PostView';
import CreatePostView from './Components/views/CreatePostView';
import ExploreView from './Components/views/ExploreView';
import ProfileView from './Components/views/ProfileView';
import AuthView from './Components/views/AuthView';
import { isLoggedIn } from './helpers/authHelper';

function App() {
	const user = isLoggedIn;
	console.log(user);
	return (
		<Router>
		<Routes>
		<Route path="/" element ={ <Home />} /> 
		<Route path="/login" element ={<Login />} />
		<Route path="/register" element ={<Registration />} />
		<Route path="/auth" element ={user ? <AuthView /> : <Navigate to='/'/>} />
		<Route path="/posts/create" element={user ? <PrivateRoute><CreatePostView /></PrivateRoute> : <Navigate to='/auth'/>} />

		<Route path="/users/:id" element={user ? <ProfileView />: <Navigate to='/auth'/>} />
		<Route path="/explore" element={user ? <ExploreView /> : <Navigate to='/auth'/>} /> 
		<Route path="/posts/:id" element={<PostView />} /> 
        <Route path="/search" element={<SearchView />} />
        <Route path="/profile" element={user ? <AddProfile/> : <Navigate to='/auth'/>} /> 
		</Routes>
		</Router>
	);
}

export default App;

