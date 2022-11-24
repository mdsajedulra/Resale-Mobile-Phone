import React from 'react';

const Product = ({ product }) => {
    console.log(product)
    const { name, originalPrice, picture, postTime, resalePrice, usesTime } = product;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img className='bg-white' src={picture} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className='flex gap-6'>
                    <div className="w-10 avatar online">
                        <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/192/192/people" />
                        </div>
                    </div>
                    <h2>Md Sajedul islam</h2>
                </div>
                <p>Orginal Price: ৳ {originalPrice}</p>
                <p>Resale Price: ৳ {resalePrice}</p>
                <p>Uses Time: {usesTime}</p>
                <p>Post Date: {postTime.slice(0, 10)}</p>
                <div className="card-actions ">
                    <button className="w-full btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;