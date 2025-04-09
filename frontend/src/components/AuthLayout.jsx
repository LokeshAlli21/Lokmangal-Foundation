import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    const [loader, setLoader] = useState(true);

    // const getAuthStatus = async () => {
    //     return await useSelector(state => state.auth.status)
    // }

    // const authStatus = getAuthStatus()

    
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        console.log('Route changed or mounted');
        console.log('Current values:', {
            authStatus,
            authentication,
            pathname: location.pathname,
        });

        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            // No action needed
        }

        setLoader(false);
    }, [location.pathname, authStatus, authentication, navigate]); // Added location.pathname

    return loader ? (
        <h1 className="text-center text-2xl font-semibold text-gray-600 py-10">Loading...</h1>
    ) : (
        <>{children}</>
    );
}

export default AuthLayout;
