import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const location = useLocation();

    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authStatus === null) {
            console.log('Auth status is still loading...');
            return;
        }

        console.log('Final auth status:', authStatus);

        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            navigate(location.pathname);
        }
    }, [authStatus, navigate, location.pathname, authentication]);

    if (authStatus === null) {
        return (
            <h1 className="text-center text-2xl font-semibold text-gray-600 py-10">
                Loading...
            </h1>
        );
    }

    return <>{children}</>;
}

export default AuthLayout;
