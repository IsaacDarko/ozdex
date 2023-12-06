import React from 'react'
import AppWrap from '../wrappers/AppWrap'
import { Hero } from '../components/home';

const Home = () => {

    return (

        <div className=' w-[100%]'>
            <Hero />

        </div>

    )
}

export default AppWrap(Home, 'home');