import React, {useEffect, useState, createContext} from 'react';
import axios from 'axios';
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'


const AuthContext = createContext();


export function AuthProvider({children}){
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new MetaMaskConnector()
    });

    return (

        <AuthContext.Provider value={{
            address, isConnected, connect
        }}>
            {children}            
        </AuthContext.Provider >
    )
}

export default AuthContext;