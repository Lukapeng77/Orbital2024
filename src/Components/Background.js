
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const colors = ["#FFC0CB", "#FFD700", "#00BFFF", "#32CD32", "#9400D3"];

function DynamicBackground() {
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 3000); // Change background color every 3000 milliseconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: colors[colorIndex], transition: "background-color 1s" }}>
            <h1 style={{ color: 'white', textAlign: 'center', paddingTop: '20%' }}>
                Welcome to Our Website!
            </h1>
        </Box>
    );
}

export default DynamicBackground;
