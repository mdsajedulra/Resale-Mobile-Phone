import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise)
const Checkout = () => {
    const data = useLoaderData();
    console.log(data)
    return (
        <div>
            {/* <h1>Payment ৳ {`${data.resalePrice}`}</h1>
            <Elements stripe={stripePromise}>
                <Checko
            </Elements> */}
        </div>
    );
};

export default Checkout;