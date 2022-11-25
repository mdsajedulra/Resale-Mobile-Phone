import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const { loginUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        loginUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                if (user) {
                    toast.success('Login Successfully')
                }
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error))
    };



    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div>
            <h1 className="text-4xl font-semibold text-center">Login</h1>
            <form className='w-full mx-auto md:w-4/5 xl:w-1/3' onSubmit={handleSubmit(onSubmit)}>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type='email' className="w-full input input-bordered " placeholder='Enter yoru email' {...register("email", { required: true })} />

                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type='password' placeholder='enter your password' className="w-full input input-bordered" {...register("password", { required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}
                <br />
                <br />
                <button className="w-full mb-4 btn btn-primary" type="submit" >Login</button>
                <button className="w-full p-2 text-black bg-white border border-white rounded-md "  >LOGIN WITH GOOGLE</button>
            </form >
        </div>
    );
};

export default Login;