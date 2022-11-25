import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';



const MyProdcut = () => {
    const { user } = useContext(AuthContext);
    const { isLoading, error, data } = useQuery({
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
                }
            })

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
                        </tr>
                    </thead>
                    <tbody>



                        {
                            data?.map((order, i) =>
                                <tr>
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