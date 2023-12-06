import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import {Input, Popover, Radio, Modal, message} from 'antd';
import {ArrowDownOutlined, DownOutlined, SettingOutlined} from '@ant-design/icons';
import { TradeBox } from '../components/swap';



const Swap = () => {

    return (
        <div className='flex flex-row w-[100%] h-[100%] bg-gradient-to-b from-[#fff] to-[#f00d82]'>
            <motion.div className='flex flex-row w-[50%] h-[80%] mx-auto my-auto'>
                <TradeBox />
            </motion.div>
        </div>
    )
}

export default Swap