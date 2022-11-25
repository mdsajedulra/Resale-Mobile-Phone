
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import Header from '../Pages/Sheared/Header/Header';

const DashboardLayout = () => {

    const { user } = useContext(AuthContext);
    // const { isLoading, error, data, refetch } = useQuery({
    //     queryKey: ['user'],
    //     queryFn: () =>
    //         fetch(`http://localhost:5000/users/?email=${user?.email}`).then(res =>
    //             res.json()
    //         ),
    // })
    // console.log(data)

    const [databaseUser, setDatabaseUser] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/users/?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setDatabaseUser(data))
    }, [])



    return (

        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">

                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="flex flex-col items-center drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="p-4 menu w-80 bg-base-100 text-base-content">
                        {
                            databaseUser.role === 'seller' ?
                                <>
                                    <li><Link to='/dashboard/addproduct'>Add Product</Link></li>
                                    <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                                </>
                                :
                                <>

                                </>

                        }
                        {
                            databaseUser.role === 'buyer' ?
                                <>
                                    <li><Link to='/dashboard/myorders'>My Order</Link></li>
                                </>
                                :
                                <>
                                </>
                        }
                        {
                            databaseUser.role === 'admin' ?
                                <>
                                    <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                                    <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                                </>
                                :
                                <>
                                </>
                        }

                    </ul>
                </div>
            </div>
        </div>

    );
};

export default DashboardLayout;