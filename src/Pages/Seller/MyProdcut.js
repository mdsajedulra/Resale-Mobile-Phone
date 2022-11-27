import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';



const MyProdcut = () => {
    const { user } = useContext(AuthContext);

    // for All my product
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['myOrders', user?.email],
        queryFn: () =>
            fetch(`http://localhost:5000/myproduct/?email=${user?.email}`).then(res =>
                res.json()
            ),
    })
    const handleMyOrderDelete = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/myproducts/delete/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Delete successfuly')
                    refetch()
                }
            })

    }
    if (isLoading) return <div className="flex items-center justify-center my-48">
        <img src="https://d33wubrfki0l68.cloudfront.net/7ad98dc27fb7d45a2570730eda827673d6028969/c1127/images/loading.gif" alt="" />
    </div>
    if (error) {
        console.log(error)
    }


    // handle advertise
    const handleAdvertise = (id) => {
        fetch(`http://localhost:5000/advertise/${id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('running advertising')
                }
            })
    }
    console.log(data)
    return (
        <div className='w-full'>


            <div className="w-full overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th>Product Name</th>
                            <th>Sales Status</th>
                            <th>Advertise</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data?.map((order, i) =>
                                <tr key={i}>
                                    <th>
                                        {i + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">

                                            <div>
                                                <div className="font-bold">{order.name}</div>

                                            </div>
                                        </div>
                                    </td>

                                    <th>
                                        {
                                            order.sold ? <p>sold</p> : <p>available</p>
                                        }

                                    </th>
                                    <th>
                                        <button onClick={() => handleAdvertise(order._id)} className="btn btn-info btn-xs">advertise</button>
                                    </th>
                                    <td>{order.resalePrice}</td>
                                    <th>
                                        <button onClick={() => handleMyOrderDelete(order._id)} className="btn btn-error btn-xs">Delete</button>
                                    </th>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MyProdcut;