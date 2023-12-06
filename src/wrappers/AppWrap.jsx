import React from 'react';
import { MainNav } from '../components/navigation';


const AppWrap = (Component, idName, classNames) => function HOC() {

    return (
        <div id={idName} className={`appContainer ${classNames} max-h-100vh max-w-100vw`}>
            <div className=''>
                <MainNav />
            </div>
            <div className=' overflow-hidden'>
                <Component />
            </div>
        </div>
    )
}

export default AppWrap