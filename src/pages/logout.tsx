import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await logout();
      navigate('/', { replace: true }); // Redirect to Landing Page
    };

    doLogout();
  }, [logout, navigate]);

  return null; // Optionally return a spinner or message
};

export default Logout;
