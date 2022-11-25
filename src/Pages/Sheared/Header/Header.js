import React, { useContext } from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const navItem = <>
        <li><Link to='/addproduct'>Add Product</Link></li>
    </>
    const handleLogout = () => {
        logOut()
            .then(result => {
                if (result) {
                    toast.success('Logout Successfully')
                }
            })
            .then(error => console.log(error))
    }
    return (
        <div className="justify-between navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        {navItem}
                    </ul>
                </div>
                <Link to='/' className="text-xl normal-case btn btn-ghost w-36"><img src={logo} alt="" /></Link>
            </div>


            <div className="hidden navbar-end lg:flex">
                <ul className="p-0 menu menu-horizontal">
                    {navItem}
                </ul>
            </div>

            {
                user ?
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {
                                    user?.photoURL !== null ?
                                        <img src={user.photoURL} alt='' />
                                        :
                                        <img src="https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg" alt='' />
                                }

                            </div>
                        </label>
                        <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li><Link to='dashboard'>Dashboard</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                    :
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                    </>

            }
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>

        </div>
    );
};

export default Header;