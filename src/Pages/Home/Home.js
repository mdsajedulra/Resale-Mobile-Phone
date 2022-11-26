import React from 'react';
import Advertise from '../Advertise/Advertise';
import Banner from './Banner';
import Categories from './Categories';

const Home = () => {
    return (
        <div className='home'>
            <Banner></Banner>
            <Categories></Categories>
            <Advertise></Advertise>
        </div>
    );
};

export default Home;