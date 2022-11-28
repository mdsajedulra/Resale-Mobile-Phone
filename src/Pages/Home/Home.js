import React from 'react';
import Advertise from '../Advertise/Advertise';
import Banner from './Banner';
import Categories from './Categories';
import about from '../../assets/about.jpg'

const Home = () => {
    return (
        <div className='home'>
            <Banner></Banner>
            <Categories></Categories>
            <Advertise></Advertise>
            <div>
                <div className=" hero bg-base-200">
                    <div className="flex-col gap-10 m-5 hero-content lg:flex-row-reverse">
                        <img className="w-1/2 rounded-xl" src={about} alt='' />
                        <div>
                            <h1 className="w-1/2 text-5xl font-bold">About Us</h1>
                            <p className="py-6">POPUP is one and only re-commerce model in Bangladesh which focuses on consumers earning cash at quickest possible time. POPUP is first ever C2B marketplace</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;