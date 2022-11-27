import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Product from '../Products/Product';

const Advertise = () => {
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['myOrders'],
        queryFn: () =>
            fetch(`http://localhost:5000/advertise`).then(res =>
                res.json()
            ),
    })
    return (
        <>
            {
                data?.length === 0 ? <></> :
                    <>
                        <div>
                            <h1 className="my-10 text-4xl font-semibold text-center">Advertise Product</h1>
                            <div className='grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3'>

                                {
                                    data?.map(adProduct => <Product key={adProduct._id} product={adProduct}></Product>)
                                }
                            </div>
                        </div>
                    </>

            }
        </>
    );
};

export default Advertise;