import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import image from '../../assets/404.png'

const ErrorPage = () => {
    const catchError = useRouteError()
    console.log(catchError);
    const { status, statusText } = catchError;
    return (
        <div>
            <div className='flex flex-col items-center justify-center h-screen gap-5'>
                <img className='w-1/2' src={image} alt='' />
                <p className='text-4xl'>Oops! An error Ocurred</p>
                <p>{status}</p>
                <p>{statusText}</p>
                <Link className='text-blue-700 underline' to='/'>Back To Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;