import { useState, useEffect } from 'react';

function useLocalStorage(user, initialValue) {
    // Retrieve stored value from local storage, if it exists
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(user);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    // Update local storage when the state changes
    useEffect(() => {
        try {
            window.localStorage.setItem(user, JSON.stringify(storedValue));
        } catch (error) {
            console.log(error);
        }
    }, [user, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
