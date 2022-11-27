import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import ProductBookModal from './ProductBookModal';

const Product = ({ product }) => {
    console.log(product)
    const { isVerify, _id, condition, name, number, originalPrice, picture, postTime, resalePrice, usesTime, sellerName, sellerPhoto } = product;
    const { user } = useContext(AuthContext);
    // console.log(_id)
    return (
        <div className="shadow-xl card bg-base-100">
            <figure><img className='bg-white' src={picture} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className='flex gap-6'>


                    {


                        <div className="w-10 avatar ofline" title='no verify'>
                            <div className="w-10 rounded-full">
                                {
                                    sellerPhoto === null ?

                                        <img src="https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg" alt='' />
                                        :
                                        <img src={sellerPhoto} alt='' />
                                }
                            </div>
                        </div>

                    }

                    <div className='flex items-center justify-center'>
                        <h2 className='text-xl'>{sellerName}</h2>
                        <span>{isVerify ? <img className='w-8' src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png" alt="" /> : <></>}</span>
                    </div>
                </div>
                <p>Orginal Price: ৳ {originalPrice}</p>
                <p>Resale Price: ৳ {resalePrice}</p>
                <p>Condition: {condition}</p>
                <p>Uses Time: {usesTime}</p>
                <p>Post Date: {postTime?.slice(0, 10)}</p>
                <div className="card-actions">
                    <label htmlFor="my-modal" className="w-full btn btn-primary">Book</label>
                </div>
            </div>
            <ProductBookModal
                user={user}
                resalePrice={resalePrice}
                number={number}
                name={name}
                id={_id}
            ></ProductBookModal>
        </div>
    );
};

export default Product;