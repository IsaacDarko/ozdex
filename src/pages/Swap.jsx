import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import {Input, Popover, Radio, Modal, message} from 'antd';
import {ArrowDownOutlined, DownOutlined, SettingOutlined} from '@ant-design/icons';
import { TradeBox } from '../components/swap';
import AppWrap from '../wrappers/AppWrap';



const Swap = () => {

    return (
        <motion.div 
        initial={{x: '100vw'}}
        animate={{x: 0}}
        transition={{
            type: 'spring',
        }}
        className='flex flex-row w-[100%] h-[100%] bg-gradient-to-b from-[#fff] to-[#f00d82]'>
            <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                delay: 1,
                duration: 1
            }}
            className='flex flex-row w-[50%] mx-auto my-auto'>
                <TradeBox />
            </motion.div>
        </motion.div>
    )
}

export default AppWrap(Swap, 'swap');