import React, { useState, useContext } from 'react';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { motion } from 'framer-motion';
import AuthContext from '../../contexts/AuthContext';




const Hero = () => {
    const {address, isConnected, connect} = useContext(AuthContext);
    const [currentAccount, setCurrentAccount] = useState(false);
    const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

    const connectWallet = () => {
        console.log('wallet connected');
    }



    return (
        <div className='flex w-[100%] h-[40rem] justify-center item-center'>
            <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
                
                <motion.div 
                    initial={{y: -400}}
                    animate={{y: 0}}
                    transition={{
                        delay: 1.1,
                        type: 'spring',
                        stiffness: 150
                    }}
                    className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'
                >
                    {/* Etherum Card Code */}
                    <motion.div
                       
                        whileHover={{
                            scale: 1.2,
                            textShadow: '0px 0px 8px #fff',
                            boxShadow: '0px 0px 8px #fff'
                        }}
                        className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-[19rem] w-full my-5 eth-card white-glassmorphism cursor-pointer'
                    >
                        <div className='flex justify-between flex-col w-full h-full'>
                            <div className='flex justify-between items-start'>
                                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                                    <SiEthereum fontSize={21} color='#fff' />
                                </div>

                                <BsInfoCircle fontSize={17} color='#fff' />
                            </div>
                            <div>
                                <p className='text-white font-light text-sm'>
                                    {isConnected ? `${address.slice(0,4)}...${address.slice(38)}` : `0x0000`}
                                </p>
                                <p className='text-white font-semibold text-lg mt-1'>
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>


                <div className='flex flex-1 justify-start flex-col mf:mr-10 text-center'>
                    <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1 '>
                        Start Trading Crypto <br />
                        Worldwide On Oz
                    </h1>
                    <p className='mx-auto mt-5 text-white font-white md:w-9/12 w-11/12 text-base'>
                        Redefining Your Crypto Experience
                    </p>
                    
                   {!currentAccount && (
                    <button
                    type='button'
                    onClick={connect}
                    className={ isConnected ? 
                    'flex flex-row justify-center items-center my-5 bg-[#42db6d] p-3 rounded-full curser-pointer '
                    :'flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full curser-pointer hover:bg-[#2546bd]'
                    }
                    disabled={isConnected}
                    >
                        {isConnected ? (
                            <p className='text-white text-base font-semibold'>Connected</p>
                        ):(
                            <p className='text-white text-base font-semibold'>Connect Wallet</p>                            
                        )
                        }
                        
                    </button>

                    )}
                        
                </div>

            </div>
        </div>
    )
}

export default Hero;