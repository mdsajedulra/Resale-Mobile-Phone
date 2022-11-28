import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = ({ resalePrice, name, email, id }) => {
    const [success, setSuccess] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({ resalePrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [resalePrice]);








    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            // setError(error)
            setCardError(error.message)
        }
        else {
            setCardError('')
        }
        setSuccess('');
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        const payment = {
            resalePrice,
            transactionId: paymentIntent.id,
            email,
            orderId: id,


        }
        if (paymentIntent.status === "succeeded") {

            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('your payment completed')
                        setTransactionId(paymentIntent.id)
                    }
                })
        }
        console.log('payement intent', paymentIntent)
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <div className='flex items-center justify-center'>
                <button
                    className='mt-10 btn btn-primary'
                    type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </div>
            <p className='text-red-600'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'> {success}</p>
                    <p>Your TransactionId: <span>{transactionId}</span></p>
                </div>
            }
        </form>
    );
};

export default CheckoutForm;