import React, { useContext } from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const navItem = <>
        <li><Link to='/addproduct'>Add Product</Link></li>
    </>
    const handleLogout = () => {
        logOut()
            .then(result => {
                console.log(result)
                console.log(user)
            })
            .then(error => console.log(error))
    }
    return (
        <div className="navbar justify-between bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItem}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl w-36"><img src={logo} alt="" /></Link>
            </div>


            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {navItem}
                </ul>
            </div>

            {
                user ?
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li><a>Settings</a></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                    :
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                    </>

            }

        </div>
    );
};

export default Header;