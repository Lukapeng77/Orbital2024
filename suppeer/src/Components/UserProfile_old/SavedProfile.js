
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SavedProfile({user_id}) {
    const [profile, setProfile] = useState({
    photo: null,
    username: '',
    email: '',
    bio: '',
    skills: '',
    projects: ''
});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/api/profile')
            //.then(response => response.json())
            .then(response => {
                // Check Content-Type in headers
                const contentType = response.headers.get('Content-Type');
                if (contentType.includes('application/json')) {
                    return response.json(); // parse JSON if the content type is correct
                }
                throw new Error('Expected JSON but received:', contentType);
            })
            .then(data => {
                 if(data && data.profile){        
                setProfile(data);
                console.log('Received JSON:', data);
            }else{
                 navigate('/profile/edit');
            }
        })
            .catch(error => {
                console.error('Failed to fetch profile:', error);
                setError(error.message);
            });
    }, [navigate]);
    /*const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:3001/profile:username');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setProfile({
                username: data.username,
                email: data.email,
                bio: data.bio,
                skills: data.skills,
                projects: data.projects,
                photo: data.photo
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchProfile();
}, [])*/

const handleUpdate = (event) => {
    event.preventDefault();
    console.log("Profile Updated:", profile);
    const updateData = {
      ...profile,
      skills: profile.skills.split(',').map(skill => skill.trim()),
      projects: profile.projects.split(',').map(project => project.trim())
  };
    axios.put(`http://localhost:3001/api/profile/${user_id}`, profile)
            .then(response => {
                alert('Profile updated successfully!');
        return response.json(updateData);  
  })
  .catch(error => {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
  });
}

    if (error) {
        return <div>
            Error: {error}
            </div>;
    }
    /*if (loading) return <div>Loading...</div>;*/
    if (!profile) {
        return <center>
            <p>Don't have a Profile</p>
            <Link to="/profile/edit"> Fill the Profile now!</Link>
            </center>;
    }

    return (
        <div className="saved-profile">
            <h1>Profile Saved Successfully!</h1>
            <div className="profile-photo">
                {profile.photo ? <img src={profile.photo} alt="User" /> : <img src="default-profile.png" alt="Default Profile" />}
            </div>
            <div className="profile-info">
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Bio: {profile.bio}</p>
            <p>Skills: {profile.skills}</p>
            <p>Projects: {profile.projects}</p>
            </div>
            <button onClick={() => console.log('Edit Profile')}>Edit Profile</button>
            <button onSubmit={handleUpdate}> Update Profile</button>
            <button><Link to="/tutorialboard">Go to Tutorial Board</Link></button>
        </div>
    );
}

export default SavedProfile;
