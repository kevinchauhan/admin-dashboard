import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const Dashboard = () => {
    const { user } = useAuthStore();
    const [isUserLoaded, setIsUserLoaded] = useState(false); // Track user loading state

    useEffect(() => {
        // Check if user is already available, otherwise set isUserLoaded to true after a brief delay
        if (user !== null) {
            setIsUserLoaded(true);
        } else {
            setTimeout(() => setIsUserLoaded(true), 100); // Adjust delay as needed
        }
    }, [user]); // Run effect when user changes

    if (!isUserLoaded) {
        return null; // Return nothing while waiting for user state
    }

    if (user === null) {
        return <Navigate to={'/auth/login'} replace={true} />
    }
    return (
        <Outlet />

    )
}

export default Dashboard