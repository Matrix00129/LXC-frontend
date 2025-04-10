import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const PrivateRoutes = () => {
    const { auth } = useAuth();
    const isAuthenticated = auth?.accessToken; // Check if access token exists
    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default PrivateRoutes;
