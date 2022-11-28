import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

import { Elements, } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise)
const Checkout = () => {
    const data = useLoaderData();
    console.log(data)
    return (
        <div>
            <h1>Payment ৳ {`${data.resalePrice}`}</h1>
            <div className='text-black w-96 bg-slate-300 p-14'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        key={data._id}
                        resalePrice={data.resalePrice}
                        name={data.name}
                        email={data.email}
                        id={data._id}
                    ></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Checkout;