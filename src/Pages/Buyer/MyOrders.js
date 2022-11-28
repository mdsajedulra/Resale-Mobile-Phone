import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';



const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['myOrders'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myorder/?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = res.json();
            return data
        }
    })
    const handleOrderDelete = (id) => {

        fetch(`http://localhost:5000/myorder/delete/${id}`, {
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
    return (
        <div className='w-full'>


            <div className="w-full overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Action</th>
                            <th>Payment</th>
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

                                    <td>{order.resalePrice}</td>
                                    <th>
                                        <p>{order.meetingLocation}</p>
                                    </th>
                                    <th>
                                        <button onClick={() => handleOrderDelete(order._id)} className="btn btn-error btn-xs">Delete</button>
                                    </th>
                                    <th>
                                        <Link to={`/dashboard/checkout/${order._id}`} >
                                            <button className="btn btn-secondary btn-xs">Pay</button>
                                        </Link>
                                    </th>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>


        </div >
    );
};

export default MyOrders;