
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SavedProfile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/profile:username')
            .then(response => 
                /*if (!response.ok) {
                    throw new Error('Failed to fetch');
                }*/
                 response.json())
            .then(data => {
                 if(data && data.profile){        
                setProfile(data);
            }/*else{
                 navigate('/profile/edit');
            }*/
        })
            .catch(error => {
                console.error('Failed to fetch profile:', error);
                //setError(error.message);
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
}, []);*/

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
            <p>Skills: {profile.skills.join(', ')}</p>
            <p>Projects: {profile.projects.join(', ')}</p>
            </div>
            <Link to="/profile/edit">Edit Profile Again</Link>
            <button onClick={() => console.log('Edit Profile')}>Edit Profile</button>
            <button onClick={() => console.log('Log Out')}>Log Out</button>
        </div>
    );
}

export default SavedProfile;
