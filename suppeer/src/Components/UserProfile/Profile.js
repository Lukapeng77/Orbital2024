import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '../../helpers/authHelper';

function UserProfile() {
    const currentuser = isLoggedIn();
    const userId = currentuser ? currentuser.userId : null;
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        biography: '',
        skills: '',
        projects: '',
        photo: ''
    });
    
    // Load profile data from local storage when the component mounts
    useEffect(() => {
        /*const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }*/
            /*const handleStorageUpdate = () => {
                setProfile(JSON.parse(localStorage.getItem('userProfile')));
            };
    
            window.addEventListener('storageUpdated', handleStorageUpdate);
    
            return () => {
                window.removeEventListener('storageUpdated', handleStorageUpdate);
            };*/
            const loadProfile = async () => {
                /*const localData = localStorage.getItem('userProfile');
                if (localData) {
                    setProfile(JSON.parse(localData));
                } else {*/
                    try {
                        const response = await fetch(`/api/users/profile/${userId}`);
                        const data = await response.json();
                        if (response.ok) {
                            setProfile(data);
                            localStorage.setItem('userProfile', JSON.stringify(data)); // Save to local storage
                        } else {
                            throw new Error('Failed to fetch profile data');
                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
            };
            if(userId){
            loadProfile();
            }else{
                alert("User id is not defined.");
            }
    }, [userId]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile(prevProfile => ({
                ...prevProfile,
                photo: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        //localStorage.setItem('userProfile', JSON.stringify(profile));
        //alert('Profile saved!');
        try {
            const response = await fetch(`/api/users/profile/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Profile updated successfully:', data);
                localStorage.setItem('userProfile', JSON.stringify(data)); // Update local storage
                alert('Profile updated successfully!');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile: ' + error.message);
        }
    };

    // Delete photo handler
    const handleDeletePhoto = () => {
        setProfile(prevProfile => ({
            ...prevProfile,
            photo: ''
        }));
    };

    return (
        <form className="user-profile" onSubmit={handleSubmit}>
            <h2>User Profile</h2>
            <label>
                Upload Photo:
                <input type="file" id="fileInput" onChange={handleImageChange} accept="image/*" />
            </label>
            {profile.photo && (
                <div>
                    <img src={profile.photo} alt="Uploaded" style={{ width: 100, height: 100 }} />
                    <button type="button" onClick={handleDeletePhoto}>Delete Photo</button>
                </div>
            )}
            <label>
                Username:
                <input type="text" name="username" value={profile.username} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={profile.email} onChange={handleChange} />
            </label>
            <label>
                Bio:
                <textarea name="bio" value={profile.biography} onChange={handleChange} rows="3" className="bio-textarea"></textarea>
            </label>
            <label>
                Skills:
                <input type="text" name="skills" value={profile.skills} onChange={handleChange} />
            </label>
            <label>
                Projects:
                <input type="text" name="projects" value={profile.projects} onChange={handleChange} />
            </label>
            <button type="submit">Submit Profile</button>
        </form>
  );
}

export default UserProfile;
