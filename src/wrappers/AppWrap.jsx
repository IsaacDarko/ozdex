import React from 'react';
import { MainNav, MobileNav } from '../components/navigation';


const AppWrap = (Component, idName, classNames) => function HOC() {

    return (
        <div id={idName} className={`appContainer ${classNames} h-[100vh]`}>
            <div className=' sticky w-[100%] z-10 2xs:hidden md:block'>
                <MainNav origin={idName}/>
            </div>
            <div className=' sticky w-[100%] z-10 2xs:block md:hidden'>
                <MobileNav origin={idName}/>
            </div>
            <div className='absolute w-[100%] 2xs:h-[100%] 3xl:h-[89.8%]'>
                <Component />
            </div>
        </div>
    )
}

export default AppWrap