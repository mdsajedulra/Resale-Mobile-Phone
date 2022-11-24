import { Spinner } from 'flowbite-react';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../../../context/AuthProvider/Authprovider';


const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const location = useLocation();
    if (loading) {
        return <div className="my-48 text-center">
            <Spinner size="xl" aria-label="Extra large Center-aligned spinner example" />
        </div>
    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate >
    }
    return children;

};

export default PrivateRouter;