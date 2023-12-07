import React, { useState, useEffect, useContext } from 'react';
import { ozstar } from '../../assets/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SiEthereum } from 'react-icons/si';
import AuthContext from '../../contexts/AuthContext';



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
            :'font-montserrat font-semibold text-[rgba(15,32,42)] text-lg mx-4 capitalize'}
            onClick={() => skeet(link)}
            hidden={link === origin}
            >
                <span className={ origin === 'home' ? 
                'flex flex-row px-4 py-1 hover:bg-[#0f172a41] hover:backdrop-blur hover:cursor-pointer rounded-md'
                :'flex flex-row px-4 py-1 hover:bg-[#ffa7d4a3] hover:backdrop-blur hover:cursor-pointer rounded-md'
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
    const {address, isConnected, connect} = useContext(AuthContext);
    
    return(
        <div className='flex flex-row'>
            <div>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}



const WalletDetailsPanel = () => {
    const {address, isConnected, connect} = useContext(AuthContext);

    return(
        <div className='p-1 justify-end items-start flex-col rounded-full h-12 w-40 eth-card white-glassmorphism'>
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
    const {address, isConnected, connect} = useContext(AuthContext);
    console.log(origin);

    useEffect(() => {

    }, [isConnected]);

    return (
        <div className={origin === 'home' ? 
        'flex flex-row w-[100%] py-4 px-4' : 'flex flex-row w-[100%] py-4 px-4 bg-[#fff]'
        }>

            <div className='flex flex-row w-[20%]'>
                <span className=''>
                    <img src={ozstar} alt="site-logo" className='h-12' />
                </span>
            </div>
            <div className='flex flex-row w-[35%]'>
                <motion.span className='my-auto'>
                    <NavLinks origin={origin} />
                </motion.span>
            </div>
            <div className='flex flex-row w-[45%]'>
                <div className='flex flex-row  w-[50%]'>
                    {isConnected ? (
                        <motion.span>
                            <ConnectionPanel />
                        </motion.span>
                    ):(
                        <motion.span>
                            <></>
                        </motion.span>
                    )

                    }
                </div>
                <div className='flex flex-row-reverse w-[50%]'>
                    {isConnected ? (
                        <motion.span className=''>
                            <WalletDetailsPanel />
                        </motion.span>
                    ):(
                        <motion.span className=''>
                            <></>
                        </motion.span>
                    )}     
                </div>           
            </div>

        </div>
    )
}

export default MainNav