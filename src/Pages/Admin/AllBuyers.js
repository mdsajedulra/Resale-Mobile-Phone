import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllBuyers = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: [],
        queryFn: () =>
            fetch(`http://localhost:5000/allbuyer`).then(res =>
                res.json()
            ),
    })

    const handleUserDelete = (id) => {
        fetch(`http://localhost:5000/user/delete/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Delete successfuly')
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
                            <th>Buyer Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>



                        {
                            data?.map((user, i) =>
                                <tr>
                                    <th>
                                        {i + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">

                                            <div>
                                                <div className="font-bold">{user.name}</div>

                                            </div>
                                        </div>
                                    </td>

                                    <td>{user.email}</td>
                                    <th>
                                        <button onClick={() => handleUserDelete(user._id)} className="btn btn-error btn-xs">Delete</button>
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

export default AllBuyers;