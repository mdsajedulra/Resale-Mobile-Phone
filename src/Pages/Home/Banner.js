import React from 'react';
import banner from '../../assets/banner.png';

const Banner = () => {
    return (
        <div className="hero h-96" style={{ backgroundImage: `url(${banner})`, backgroundSize: `contain` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Lowest Price on Your Favorit Phone</h1>
                    <p className="mb-5">Big Saving | No Wating | Best Pricing</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div >
    );
};

export default Banner;