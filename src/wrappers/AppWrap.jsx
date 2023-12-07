import React from 'react';
import { MainNav } from '../components/navigation';


const AppWrap = (Component, idName, classNames) => function HOC() {

    return (
        <div id={idName} className={`appContainer ${classNames} h-[100vh]`}>
            <div className=' sticky w-[100%] z-10'>
                <MainNav origin={idName}/>
            </div>
            <div className='absolute w-[100%] h-[89.5%]'>
                <Component />
            </div>
        </div>
    )
}

export default AppWrap