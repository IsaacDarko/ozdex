import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMenuAlt1, HiMenuAlt2, HiMenuAlt3, HiMenuAlt4 } from 'react-icons/hi';
import { motion } from 'framer-motion';
import AuthContext from '../../contexts/AuthContext';
import { ozstar } from '../../assets/icons';




const DropMenu = ({setToggleMenu, origin}) => {
    const navLinks = ['home', 'swap', 'tokens'];
    const navigate = useNavigate();

    const skeet = (link) => {
        console.log(link);
        if(link === 'home') navigate('/', {replace:true});
        else navigate(`/${link}`, {replace:true});
    }
 
    return(
        <div className='z-[20] px-4 py-12'>
            <ul className=''>
                {navLinks.map((link) => (
                    <li key={link} 
                    className={ 
                     origin === 'home' ? 'font-montserrat text-base my-6 capitalize hover:bg-[#0f172a41] hover:backdrop-blur hover:cursor-pointer'
                    :origin === 'swap' ? 'font-montserrat text-base my-6 capitalize hover:bg-[#ffa7d441] hover:backdrop-blur hover:cursor-pointer ' 
                    :'font-montserrat text-base my-6 capitalize hover:bg-[#4ddbfe20] hover:backdrop-blur hover:cursor-pointer'}
                    onClick={() => skeet(link)}
                    >
                        {link}
                    </li>
                ))}
            </ul>
        </div>
    )
}





const MobileNav = ({origin}) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const {address, isConnected, connect} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(origin);


    const skeet = (link) => {
        console.log(link);
        if(link === 'home') navigate('/', {replace:true});
        else navigate(`/${link}`, {replace:true});
    }


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
        'flex flex-row w-[100%] py-0 px-4 bg-[#8e0f79]' 
        :'flex flex-row w-[100%] py-0 px-4 bg-[#fff]'
        }>

            {toggleMenu && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileInView={{x:[300,0]}}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2}}
                className=' fixed z-[20] w-[100vw] h-[100vh] bg-[rgba(0,0,0,0)]'
                onClick={() => setToggleMenu(false)}
                >
                    <motion.div 
                    whileInView={{x:[350,160]}}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="w-[60vw] h-full bg-[rgba(46,46,46,0.7)] backdrop-blur-sm z-10"
                    onClick={(event) => event.stopPropagation()}
                    >
                        <DropMenu setToggleMenu={setToggleMenu} origin={origin} />

                    </motion.div>
                </motion.div>
            )}



            <div id='topbar' className='flex flex-row w-[100%] py-5'>
                <div className='flex flex-row w-[50%] px-2'>
                    <span className='my-auto'  onClick={() => skeet('home')}>
                        <img src={ozstar} alt="site-logo" className='w-12'/>
                    </span>
                </div>

                <div className={origin === 'home' ? 'flex flex-row-reverse w-[50%] px-2': 'flex flex-row-reverse w-[50%] px-2 text-[#262e3f]'}>
                    <span className=''>
                        <HiMenuAlt4 className='w-12 h-12 '  onClick={() => setToggleMenu((prevState) => !prevState)} />
                    </span>
                </div>
            </div>

        </motion.div>
    )
}

export default MobileNav