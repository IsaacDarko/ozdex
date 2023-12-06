import React, { useState, useContext } from 'react';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { shortenAddress } from '../../utils/shortenAddress';




const Hero = () => {
    const [currentAccount, setCurrentAccount] = useState(false);
    const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

    const connectWallet = () => {
        console.log('wallet connected');
    }



    return (
        <div className='flex w-[100%] h-[40rem] justify-center item-center'>
            <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>

                <div className='flex flex-1 justify-start flex-col mf:mr-10 '>
                    <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
                        Start Trading Crypto <br />
                        Worldwide On Oz
                    </h1>
                    <p className='text-left mt-5 text-white font-white md:w-9/12 w-11/12 text-base'>
                        Redefining Your Crypto Experience
                    </p>
                    
                   {!currentAccount && (
                    <button
                        type='button'
                        onClick={connectWallet}
                        className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full curser-pointer hover:bg-[#2546bd]'
                    >
                        <p className='text-white text-base font-semibold'>Connect Wallet</p>
                    </button>

                    )}
                        
                </div>



                <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
                    {/* Etherum Card Code */}
                    <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'>
                        <div className='flex justify-between flex-col w-full h-full'>
                            <div className='flex justify-between items-start'>
                                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                                    <SiEthereum fontSize={21} color='#fff' />
                                </div>

                                <BsInfoCircle fontSize={17} color='#fff' />
                            </div>
                            <div>
                                <p className='text-white font-light text-sm'>
                                    0x0000
                                </p>
                                <p className='text-white font-semibold text-lg mt-1'>
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Hero;