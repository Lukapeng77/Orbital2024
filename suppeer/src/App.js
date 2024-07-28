import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Register&Login/Login';
import Registration from './Components/Register&Login/Registration';
import Home from './Components/Home';
import PrivateRoute from './Components/PrivateRoute';  
import UserProfile from './Components/UserProfile/UserProfile';
import SearchView from './Components/views/SearchView';
import PostView from './Components/views/PostView';
import CreatePostView from './Components/views/CreatePostView';
import ProfileView from './Components/views/ProfileView';
import AuthView from './Components/views/AuthView';
import { isLoggedIn } from './helpers/authHelper';
import Dashboard from './Components/views/Dashboard';
import { CommunityView } from './Components/views/CommunityView';
import MessengerView from './Components/views/MessengerView';
import { initiateSocketConnection } from "./helpers/socketHelper";

function App() {
	const user = isLoggedIn;
	console.log(user);
	initiateSocketConnection();

	return (
		<Router>
		<Routes>
		<Route path="/" element ={ <Home />} /> 
		<Route path="/login" element ={<Login />} />
		<Route path="/register" element ={<Registration />} />
		<Route path="/auth" element ={user ? <AuthView /> : <Navigate to='/'/>} />
		<Route path="/posts/create" element={user ? <PrivateRoute><CreatePostView /></PrivateRoute> : <Navigate to='/auth'/>} />

		<Route path="/users/:id" element={user ? <ProfileView /> : <Navigate to='/auth'/>} />
		<Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/auth'/>} /> 
		<Route path="/posts/:id" element={user ? <PostView />: <Navigate to='/auth'/>} /> 
        <Route path="/search" element={user ? <SearchView /> : <Navigate to='/auth'/>} />
        <Route path="/profile" element={user ? <UserProfile/> : <Navigate to='/auth'/>} /> 
		<Route path="/messenger" element={user ? <PrivateRoute><MessengerView /></PrivateRoute> : <Navigate to='/auth'/>} />
		<Route path="/community/:communityId" element={<CommunityView />} />
		</Routes>
		</Router>
	);
}

export default App;

