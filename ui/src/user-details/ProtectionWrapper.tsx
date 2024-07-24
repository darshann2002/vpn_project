import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectionWrapper = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (!auth) {
            navigate('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);
    return isAuthenticated ? children : null;
};
