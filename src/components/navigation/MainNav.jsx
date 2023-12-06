import React, { useState } from 'react';
import { ozstar } from '../../assets/icons';



const NavLinks = () => {
    const [loggedIn, setLoggedIn] = useState(true)
    const links = ['Swap', 'Tokens'];

    return loggedIn && (
        <ul className='flex flex-row px-4'>
        {links.map((link) => (
            <li key={link} href={`${link}`} className=' font-montserrat font-semibold text-lg mx-4'>
                <span className='flex flex-row px-4 py-1 hover:bg-[#0f172a41] hover:backdrop-blur hover:cursor-pointer rounded-md' >
                    {link}
                </span>
            </li>
        ))}
        </ul>
    )
}



const connectionPanel = () => {
    
    return(
        <div className='flex flex-row'>
            <div>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}



const walletDetailsPanel = () => {

    return(
        <div>

        </div>
    )
}




const MainNav = () => {

    return (
        <div className='flex flex-row w-[100%] py-4 px-4'>

            <div className='flex flex-row w-[20%]'>
                <span>
                    <img src={ozstar} alt="site-logo" className='h-12' />
                </span>
            </div>
            <div className='flex flex-row w-[50%]'>
                <span className='my-auto'>
                    <NavLinks />
                </span>
            </div>
            <div className='flex flex-row w-[30%]'>
                <span>

                </span>
            </div>

        </div>
    )
}

export default MainNav