import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Login = () => {
    const { loginUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
    const onSubmit = data => {
        loginUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error))
    };



    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div>
            <h1 className="text-4xl text-center font-semibold">Login</h1>
            <form className='w-full md:w-4/5 xl:w-1/3 mx-auto' onSubmit={handleSubmit(onSubmit)}>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type='email' className="input input-bordered w-full " placeholder='Enter yoru email' {...register("email", { required: true })} />

                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type='password' placeholder='enter your password' className="input input-bordered w-full" {...register("password", { required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}
                <br />
                <br />
                <button className="btn btn-primary w-full mb-4" type="submit" >Login</button>
                <button className=" border bg-white border-white rounded-md p-2 text-black  w-full"  >LOGIN WITH GOOGLE</button>
            </form >
        </div>
    );
};

export default Login;