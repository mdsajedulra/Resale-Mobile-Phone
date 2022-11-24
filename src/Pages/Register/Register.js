import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Register = () => {
    const { registerUsingEmailPassword, updateUserProfile } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { name, email, password } = data;
        registerUsingEmailPassword(email, password)
            .then(result => {
                const user = result.user;
                const updateInfo = {
                    displayName: name
                }
                console.log(updateInfo)
                updateUserProfile(updateInfo)
                    .then(result => {
                        // console.log(result.user)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                console.log(user)
            })
            .catch(error => console.log(error))


    };
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div>
            <h1 className="text-4xl text-center font-semibold">Register</h1>
            <form className='w-full md:w-4/5 xl:w-1/3 mx-auto' onSubmit={handleSubmit(onSubmit)}>
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type='text' className="input input-bordered w-full " placeholder='Full Name' {...register("name")} />
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type='email' className="input input-bordered w-full " placeholder='Enter yoru email' {...register("email")} />

                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type='password' placeholder='enter your password' className="input input-bordered w-full" {...register("password", { required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}
                <br />
                <br />
                <button className="btn btn-primary w-full mb-4" type="submit" >Register</button>
                <button className=" border bg-white border-white rounded-md p-2 text-black  w-full"  >REGISTER WITH GOOGLE</button>
            </form >
        </div>
    );
};

export default Register;