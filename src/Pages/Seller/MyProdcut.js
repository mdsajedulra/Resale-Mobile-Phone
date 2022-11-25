import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';



const MyProdcut = () => {
    const { user } = useContext(AuthContext);
    const { isLoading, error, data } = useQuery({
        queryKey: ['myOrders', user?.email],
        queryFn: () =>
            fetch(`http://localhost:5000/myorder/?email=${user?.email}`).then(res =>
                res.json()
            ),

    })
    return (
        <div>

        </div>
    );
};

export default MyProdcut;