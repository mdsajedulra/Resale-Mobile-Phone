import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Register = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
    const { registerUsingEmailPassword, updateUserProfile, createUserByGooglePopup } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { name, email, password } = data;
        console.log(data)
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
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
            })
            .catch(error => console.log(error))
    };
    const handleGooglePop = () => {
        createUserByGooglePopup()
            .then(result => {
                console.log(result.user)
                navigate(from, { replace: true });

            })
            .catch(error => console.log(error))
    }
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div>
            <h1 className="text-4xl font-semibold text-center">Register</h1>
            <form className='w-full mx-auto md:w-4/5 xl:w-1/3' onSubmit={handleSubmit(onSubmit)}>
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type='text' className="w-full input input-bordered " placeholder='Full Name' {...register("name")} />
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type='email' className="w-full input input-bordered " placeholder='Enter yoru email' {...register("email")} />

                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type='password' placeholder='enter your password' className="w-full input input-bordered" {...register("password", { required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}

                <label className="label">
                    <span className="label-text">Chose your role</span>
                </label>
                <select className="w-full select select-bordered" {...register(" role")}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <br />
                <br />
                <button className="w-full mb-4 btn btn-primary" type="submit" >Register</button>
                <button onClick={handleGooglePop} className="w-full p-2 text-black bg-white border border-white rounded-md "  >REGISTER WITH GOOGLE</button>
            </form >
        </div >
    );
};

export default Register;