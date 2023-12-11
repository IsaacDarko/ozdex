import React, { useState, useEffect, useContext } from 'react';
import { ozstar, ethlogo } from '../../assets/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SiEthereum } from 'react-icons/si';
import AuthContext from '../../contexts/AuthContext';
import { Popover } from 'antd';
import AccountSettings from '../cards/AccountSettings';



const NavLinks = ({origin}) => {
    const {address, isConnected, connect} = useContext(AuthContext);
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(true)
    const [location, setLocation] =useState('');
    const links = ['home','swap', 'tokens'];

    const setLinks = (link) => {
        if(link === 'home') setLocation('/')
        else if(link === 'swap') setLocation('/swap')
        else if(link === 'token') setLocation('/token')
        else console.log('link not found')
    }

    const skeet = (link) => {
        console.log(link);
        if(link === 'home') navigate('/', {replace:true});
        else navigate(`/${link}`, {replace:true});
    }


    return loggedIn && (
        <ul className='flex flex-row px-4'>
        {links.map((link) =>(
            <li 
            key={link} 
            href={location} 
            className={origin === 'home' ? 
            'font-montserrat font-semibold text-lg mx-4 capitalize' 
            :'font-montserrat font-semibold text-[#162439] text-lg mx-4 capitalize'}
            onClick={() => skeet(link)}
            hidden={link === origin}
            >
                <span className={ origin === 'home' ? 
                'flex flex-row px-4 py-1 hover:bg-[#0f172a41] hover:backdrop-blur hover:cursor-pointer rounded-md'
                :origin === 'swap' ? 'flex flex-row px-4 py-1 hover:bg-[#ffa7d441] hover:backdrop-blur hover:cursor-pointer rounded-md'
                : 'flex flex-row px-4 py-1 hover:bg-[#4ddbfe20] hover:backdrop-blur hover:cursor-pointer rounded-md'
                }
                >
                    {link}
                </span>
            </li>
        ))}
        </ul>
    )
}



const ConnectionPanel = () => {
    const {address, isConnected, connect,  chain, setChain,} = useContext(AuthContext);
    
    return isConnected ? (
        <div className=''>
            <div className='flex flex-row h-12 w-40 bg-[#4655ac] rounded-full'>
                <span className='flex flex-row font-montserrat font-bold text-lg text-[#ffffff] hover:text-[#dadada] mx-auto my-auto cursor-pointer'>
                    <SiEthereum fontSize={18} color='#fff' />
                    <p className=' font-montserrat font-bold text-sm'>Ethereum</p>
                </span>
            </div>
        </div>
    ):(
        <div 
        className='flex flex-row h-12 w-40 bg-[#2d46a2bd] hover:bg-[#2952e3] text-[#ffffff] hover:text-[#ffd2f2eb] rounded-full cursor-pointer'
        onClick={connect}
        >
            <span className=' font-montserrat font-bold text-lg mx-auto my-auto '>
                Connect
            </span>
        </div>
    )
}



const WalletDetailsPanel = () => {
    const {address, isConnected, connect} = useContext(AuthContext);

    return(
        <div className='p-1 justify-end items-start flex-col rounded-full h-12 w-40 eth-card white-glassmorphism mx-5 cursor-pointer'>
            <div className='flex justify-between flex-row w-full h-full'>
                <div className='flex justify-between items-start'>
                    <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                        <SiEthereum fontSize={18} color='#fff' />
                    </div>
                </div>
                <div className='my-auto'>
                    <p className='text-white font-light text-[1rem]'>
                        {isConnected ? `${address.slice(0,4)}...${address.slice(38)}` : `Connect your wallet`}
                    </p>
                </div>
            </div>
        </div>
    )
}




const MainNav = ({origin}) => {
    const {address, isConnected, connect} = useContext(AuthContext)
    console.log(origin);

    useEffect(() => {

    }, [isConnected]);

    return (
        <motion.div 
        initial={{x: '100vw'}}
        animate={{x: 0}}
        transition={{
            type: 'spring'
        }}
        className={origin === 'home' ? 
        'flex flex-row w-[100%] py-4 px-4 bg-[#8e0f79]' 
        :'flex flex-row w-[100%] py-4 px-4 bg-[#fff]'
        }>

            <div className='flex flex-row w-[20%]'>
                <span className=''>
                    <img src={ozstar} alt="site-logo" className='h-12' />
                </span>
            </div>

            <div className='flex flex-row md:w-[30%] lg:w-[50%]'>
                <motion.span className='my-auto'>
                    <NavLinks origin={origin} />
                </motion.span>
            </div>

            <div className='flex flex-row md:w-[50%] lg:w-[30%]'>                
                <div className='flex flex-row-reverse  w-[50%]'>
                    {isConnected ? (
                        <motion.span>
                            <ConnectionPanel />
                        </motion.span>
                    ):(
                        <></>
                    )}
                </div> 
                
                <div className='flex flex-row-reverse w-[50%]'>
                    {isConnected ? (
                        <Popover
                        title='Account Settings'
                        trigger='click'
                        placement='bottom'
                        content={<AccountSettings />}
                        color={ origin === 'home' ? '#2e2e2e' : '#2e2e2e'}
                        >
                            <motion.span className=''>
                                <WalletDetailsPanel />
                            </motion.span>
                        </Popover>
                    ):(
                        <motion.span className=''>
                            <ConnectionPanel />
                        </motion.span>
                    )}     
                </div> 
         
            </div>

        </motion.div>
    )
}

export default MainNav