import React from 'react'
import AppWrap from '../wrappers/AppWrap'
import { Hero } from '../components/home';
import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const Home = () => {

    return (

        <div className=' w-[100%]'>
            <Hero />

        </div>

    )
}

export default AppWrap(Home, 'home');