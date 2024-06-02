// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';


function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/profile:username') // Fetch the user profile from your API
      .then(response => response.json())
      .then(data => {
        if (data) {
          setProfile(data);
          navigate('/profile/saved'); // If profile exists, go to saved profile page
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false); // Handle errors or no profile found
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // For creating or editing the profile
  return <EditProfile />;
}

export default UserProfile;
