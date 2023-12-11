import React from 'react';
import { motion } from 'framer-motion';
import AppWrap from '../wrappers/AppWrap';


const Tokens = () => {

    return (
        <motion.div 
        initial={{x: '100vw'}}
        animate={{x: 0}}
        transition={{
            type: 'spring'
        }}
        className='flex flex-row w-[100%] h-[100%] bg-gradient-to-b from-[#fff] to-[#0a437a]'>
            Tokens
        </motion.div>
    )
}

export default AppWrap(Tokens, 'tokens');