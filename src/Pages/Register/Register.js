import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const Register = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
    const { registerUsingEmailPassword, updateUserProfile, createUserByGooglePopup } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [createdUserEmail, setCreatedUserEmail] = useState('')
    // const [token] = useToken(createdUserEmail)
    // if (token) {
    //     navigate('/')
    // }
    const onSubmit = data => {
        const { name, email, password, role } = data;
        registerUsingEmailPassword(email, password)
            .then(result => {
                const user = result.user;
                const updateInfo = {
                    displayName: name
                }

                updateUserProfile(updateInfo)
                    .then(result => {
                        navigate(from, { replace: true });
                    })
                    .catch(error => {
                        console.log(error)
                    })

                if (user) {
                    toast.success('Account create Success')
                }
                const usr = {
                    name,
                    email,
                    password,
                    role,
                    isVerify: false,
                }
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(usr)
                })
                    .then(data => {
                        getUserToken(user.email)
                        // setCreatedUserEmail(user.email)
                        console.log(user.email)
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => console.log(error))
    };
    const handleGooglePop = () => {
        createUserByGooglePopup()
            .then(result => {
                const user = result.user;
                const usr = {
                    name: user.displayName,
                    email: user.email,
                    role: "buyer",
                    isVerify: false,
                }

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(usr)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        getUserToken(user.email)
                        navigate(from, { replace: true });
                    })

            })
            .catch(error => console.log(error))

    }
    const getUserToken = email => {
        fetch(`http://localhost:5000/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken)
                    navigate('/')
                }
            })
    }
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div>
            <h1 className="text-4xl font-semibold text-center">Register</h1>
            <div className='w-full mx-auto md:w-4/5 xl:w-1/3'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type='text' className="w-full input input-bordered " placeholder='Full Name' {...register("name")} />
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type='email' className="w-full input input-bordered " placeholder='Enter yoru email' {...register("email", { required: true })} />

                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type='password' placeholder='enter your password' className="w-full input input-bordered" {...register("password", { required: true })} />
                    {errors.exampleRequired && <span>This field is required</span>}

                    <label className="label">
                        <span className="label-text">Chose your role</span>
                    </label>
                    <select className="w-full select select-bordered" {...register("role")}>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                    <br />
                    <br />
                    <button className="w-full mb-4 btn btn-primary" type="submit" >Register</button>
                </form >
                <div className="divider">OR</div>
                <button onClick={handleGooglePop} className="w-full p-2 text-black bg-white border border-white rounded-md "  >REGISTER WITH GOOGLE</button>
                <p className='my-2'>Already on POPUP? <Link className='text-blue-500' to='/login'>Login</Link></p>
            </div>
        </div >
    );
};

export default Register;