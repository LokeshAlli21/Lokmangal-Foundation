import React, { useEffect } from 'react';
import authService from '../backend-services/auth/auth';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const data = await authService.logout();
        console.log(data);
        if (data) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>Logging out...
    </div>
  );
}

export default Logout;
