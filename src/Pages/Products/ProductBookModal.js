import React from 'react';

import toast from 'react-hot-toast';

const ProductBookModal = ({ user, resalePrice, number, name, id }) => {


    const handleBookingModal = event => {
        event.preventDefault();
        const form = event.target;
        const bookingdata = {
            userName: form.userName.value,
            name: form.name.value,
            email: form.email.value,
            number: form.number.value,
            resalePrice: form.resalePrice.value,
            meetingLocation: form.meetingLocation.value,
            sold: true,
        }
        console.log(bookingdata)
        fetch('https://popup-server-mdsajedulra.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingdata)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`${name} is booked`)
                }
            })
        fetch(`https://popup-server-mdsajedulra.vercel.app/addproduct/${id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <div>
            {/* The button to open modal */}
            {/* Put this part before </body> tag */}

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="my-modal" className="absolute btn btn-sm btn-circle right-2 top-2">✕</label>

                    <form className='w-full mx-auto' onSubmit={handleBookingModal}>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type='text' readOnly name='userName' className="w-full input input-bordered " defaultValue={user?.displayName} />

                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input readOnly type='email' name='email' placeholder='enter your email' defaultValue={user?.email} className="w-full input input-bordered" />
                        {/* {errors.exampleRequired && <span>This field is required</span>} */}
                        <label className="label">
                            <span className="label-text">Item Name</span>
                        </label>
                        <input readOnly type='text' name='name' className="w-full input input-bordered " defaultValue={name} />


                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input readOnly type='text' name='resalePrice' className="w-full input input-bordered " defaultValue={resalePrice} />
                        <label className="label">
                            <span className="label-text">Number</span>
                        </label>
                        <input required type='text' name='number' className="w-full input input-bordered " placeholder='Provide your valid contact number' />

                        <label className="label">
                            <span className="label-text">Meeting Location</span>
                        </label>
                        <input type='text' name='meetingLocation' placeholder='Meeting Location' className="w-full input input-bordered " />

                        <br />
                        <br />
                        <div className="modal-action">



                            <button className="w-full mb-4 btn btn-primary" type="submit" >Book Now</button>





                        </div>
                    </form >
                    {/* <label className="w-full mb-4 btn btn-primary" htmlFor="my-modal" >Book Now</label> */}




                </div>
            </div>
        </div>
    );
};

export default ProductBookModal;