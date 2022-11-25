import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';



const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className="flex items-center justify-center my-48">
            <img src="https://d33wubrfki0l68.cloudfront.net/7ad98dc27fb7d45a2570730eda827673d6028969/c1127/images/loading.gif" alt="" />
        </div>
    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate >
    }
    return children;

};

export default PrivateRouter;