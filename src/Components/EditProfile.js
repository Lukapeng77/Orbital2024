
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserProfile.css'

function EditProfile() {
  // State for user profile data
  const [profile, setProfile] = useState({
    photo: null,
    username: '',
    email: '',
    bio: '',
    skills: '',
    projects: ''
  });
  
   const [loading, setLoading] = useState(true);  
   const navigate = useNavigate();

   /*useEffect(() => {
    // Fetch the profile if it exists
    fetch('http://localhost:3001/api/profile')
        .then(response => response.json())
        .then(data => {
            if (data) {
                setProfile({
                    username: data.username || '',
                    email: data.email || '',
                    bio: data.bio || '',
                    skills: data.skills.join(', ') || '',
                    projects: data.projects.join(', ') || ''
                });
            navigate('/profile/saved'); // If profile exists, go to saved profile page
          } else {
            setLoading(false);
          }
        })
        //.catch(error => console.error('Failed to fetch profile:', error));
        .catch(() => {
          setLoading(false); // Handle errors or no profile found
        });
}, [navigate]);*/

  // Handle image file change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfile(prevState => ({
        ...prevState,
        photo: URL.createObjectURL(file)  // Create a URL for the uploaded file
      }));
    }
  };

  // Clear the selected photo
  const handleDeletePhoto = () => {
    setProfile(prevState => ({
      ...prevState,
      photo: null  // Set photo to null
    }));
    // Optionally, clear the file input if needed
    //document.getElementById('fileInput').value = "";
    // Safely reset the file input
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = "";
  }
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log("Profile Submitted:", profile);
    const submissionData = {
      ...profile,
      skills: profile.skills.split(',').map(skill => skill.trim()),
      projects: profile.projects.split(',').map(project => project.trim())
  };

    // Here you would typically send the profile data to a backend server
    fetch('http://localhost:3001/profile:username', {
      method: 'POST', // or 'PUT' if your API requires
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
  })
  //.then(response => response.json())
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
  .then(() => {
      navigate('/profile/saved');
  })
  .catch(error => {
      console.error('Error updating profile:', error);
  });
};
    // Redirect to the saved profile page
    //navigate('/profile/saved');  // Adjust this path to where the saved profiles are displayed
  
    /*if (loading) {
      return <div>Loading...</div>;
    }*/
  return (
    <form className="user-profile" onSubmit={handleSubmit}>
      <h2>User Profile</h2>
      <label>
        Upload Photo:
        <input type="file" id= "fileInput" onChange={handleImageChange} accept="image/*" />
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
        <textarea name="bio" value={profile.bio} onChange={handleChange} row ="3" className="bio-textarea"></textarea>
      </label>
      <label>
        Skills: 
        <input type="text" name="skills" value={profile.skills} onChange={handleChange} />
      </label>
      <label>
        Projects:
        <input type="text" name="projects" value={profile.projects} onChange={handleChange} />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default EditProfile;
