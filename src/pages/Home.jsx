import React from 'react'
import AppWrap from '../wrappers/AppWrap'
import { Hero } from '../components/home';
import { motion } from 'framer-motion';


const Home = () => {

    return (

        <motion.div 
        initial={{x: '100vw'}}
        animate={{x: 0}}
        transition={{
            type: 'spring'
        }}
        className=' w-[100%] h-[100%] bg-gradient-to-t from-black via-slate-900 to-[#8e0f79]'>
            <Hero />

        </motion.div>

    )
}

export default AppWrap(Home, 'home');