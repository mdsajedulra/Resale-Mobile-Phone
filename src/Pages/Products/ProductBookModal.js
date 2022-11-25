import React from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

const ProductBookModal = ({ user, resalePrice, number, name }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`${name} is booked`)
                }
            })
    }

    return (
        <div>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">


                    <form className='w-full mx-auto' onSubmit={handleSubmit(onSubmit)}>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type='text' name='name' className="w-full input input-bordered " defaultValue={user?.displayName} {...register("userName", { required: true })} />

                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type='email' placeholder='enter your email' defaultValue={user?.email} className="w-full input input-bordered" {...register("email", { required: true })} />
                        {errors.exampleRequired && <span>This field is required</span>}
                        <label className="label">
                            <span className="label-text">Item Name</span>
                        </label>
                        <input type='text' name='name' className="w-full input input-bordered " defaultValue={name} {...register("name", { required: true })} />

                        <label className="label">
                            <span className="label-text">Number</span>
                        </label>
                        <input type='text' name='number' className="w-full input input-bordered " placeholder='Provide your valid contact number' {...register("number", { required: true })} />

                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type='text' name='resalePrice' className="w-full input input-bordered " defaultValue={resalePrice} {...register("resalePrice", { required: true })} />
                        <label className="label">
                            <span className="label-text">Meeting Location</span>
                        </label>
                        <input type='text' name='meetingLocation' placeholder='Meeting Location' className="w-full input input-bordered "  {...register("meetingLocation", { required: true })} />

                        <br />
                        <br />
                        <div className="modal-action">
                            <button className="w-full mb-4 btn btn-primary" type="submit" >Book Now</button>

                        </div>
                    </form >




                </div>
            </div>
        </div>
    );
};

export default ProductBookModal;