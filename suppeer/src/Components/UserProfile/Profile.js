import {
	Button,
	Input,
	Avatar,
} from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from 'react';
import { isLoggedIn } from '../../helpers/authHelper';
import usePreviewImg from '../../hooks/userPreviewImg';

function UserProfile() {
    const currentuser = isLoggedIn();
    const userId = currentuser ? currentuser.userId : null;
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        biography: '',
        pic: '',
        skills: '',
        projects: '',
    });
    
    const fileRef = useRef(null);
	const [updating, setUpdating] = useState(false);

	const { handleImageChange, imgUrl } = usePreviewImg();

    // Load profile data from local storage when the component mounts
    useEffect(() => {
            const loadProfile = async () => {
                    try {
                        const response = await fetch( `/api/users/profile/${userId}`);
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

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (updating) return;
		setUpdating(true);
        
    const profileData = { ...profile };
        if (profile.pic !== '') { // Only include 'pic' in the body if it's not empty
        profileData.pic = imgUrl;
    } else {
        delete profileData.pic; // remove 'pic' key if the photo is being deleted
    }
        try {
            const response = await fetch(`/api/users/profile/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData),
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
        } finally {
            setUpdating(false);
          }
    };

    // Delete photo handler
    const handleDeletePhoto = async() => {
        setProfile(prevProfile => ({
            ...prevProfile,
            pic: ''
        }));
        try {
            const response = await fetch(`/api/users/profile/${userId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...profile, pic: '' })
            });
            const data = await response.json();
            if (response.ok) {
              console.log('Photo deleted successfully:', data);
              localStorage.setItem('userProfile', JSON.stringify({ ...profile, pic: '' }));
              alert('Photo deleted successfully!');
            } else {
              throw new Error(data.message);
            }
          } catch (error) {
            console.error('Error deleting photo:', error);
            alert('Error deleting photo: ' + error.message);
          }
    };

    return (
        <form className="user-profile" onSubmit={handleSubmit}>
            <h2>User Profile</h2>
            <label>
                Upload Photo:
            </label>
		    <Avatar size='xs' style={{ width: 100, height: 100 }} src={ imgUrl || profile.pic } />
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
			<Button onClick={() => fileRef.current.click()}>
				Change Photo
			</Button>
			<Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
            <Button onClick={handleDeletePhoto}>
                Delete Photo
            </Button>
            </div>
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
