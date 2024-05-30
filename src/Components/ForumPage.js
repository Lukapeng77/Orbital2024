
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from "@mui/material";


function ForumPage() {
    const [postData, setPostData] = useState({
        content: '',
        media: null
    });

    const [error, setError] = useState(''); // State to hold any errors
    const [posts, setPosts] = useState([]); // State to hold posts
    const fileInputRef = useRef(null); // Ref for the file input
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        fetch('/api/forum/posts')
            .then(response => response.json())
            .then(data => setPosts(data.posts))
            .catch(error => console.error('Failed to fetch posts:', error));
    };

    const handleChange = (event) => {
        setPostData({ ...postData, content: event.target.value });
    };

    const handleMediaChange = (event) => {
        setPostData({ ...postData, media: event.target.files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('content', postData.content);
        if (postData.media) formData.append('media', postData.media);

        // Assuming you have an API endpoint to handle the post submission
        fetch('/api/forum/posts', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Reset the form or handle navigation
            
            fetchPosts();
            setPostData({
                content: '',
                media: null
            });
            if (fileInputRef.current) fileInputRef.current.value = '';
            navigate('/forum');//adjust the route as necessary
        })
        .catch(error => {
            console.error('Error:', error);
            setError(error.message);
        });
    };

    return (
        <center>
            <Box component="main" className="container" width="100%"></Box>
            <h1>Q&A Session Forum</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                helperText="Type your question or answer here..."
                 fullWidth
                 id="fullWidth"
                 label="TextField" 
                 value={postData.content} 
                 onChange={handleChange} 
                 placeholder="" />
                 <br />
                <input type="file" 
                ref = {fileInputRef}
                onChange={handleMediaChange} 
                accept="image/*, video/*" 
                />
                <Button
                 size="large"
                 variant="contained"
                 type="submit"
                 style={{ margin: "10px" }}
                >
                    Post
                </Button>
                {error && <p className="error">{error}</p>}
            </form>
            <div>
            {posts.map((post, index) => (
                    <div key={index}>
                        <p>{post.content}</p>
                        {post.mediaUrl && <img src={post.mediaUrl} alt="Media" />}
                    </div>
                ))}
            </div>
        </center>
    );
}

export default ForumPage;
