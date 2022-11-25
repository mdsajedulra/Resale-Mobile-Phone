import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Pages/Sheared/Header/Header';

const DashboardLayout = () => {
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
                        <li><Link to='/dashboard/addproduct'>Add Product</Link></li>
                        <li><Link to='/dashboard/myorders'>My Order</Link></li>
                        <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                        <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                        <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;