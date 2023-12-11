import React, { createContext, useState, useEffect  } from 'react';
import { useSendTransaction, useWaitForTransaction } from 'wagmi';
import tokenList from '../tokenlist.json';
import axios from "axios";


const SwapContext = createContext();


export function SwapProvider({children}) {
    const [tokenOneAmount, setTokenOneAmount] = useState(null);
    const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
    const [tokenOne, setTokenOne] = useState(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
    const [slippage, setSlippage] = useState(2.5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changeToken, setChangeToken] = useState(1);
    const [prices, setPrices ] = useState(null);
    const [configReady, setConfigReady] = useState(false)
    const [txDeets, setTxDeets] = useState({});

    const openModal = (num) => {
        setChangeToken(num);
        setIsModalOpen(true);
    }


    const handleSlippageChange = (e) =>{
        setSlippage(e.target.value);
    }
    

    const fectchPrices = async(one, two) => {
        const options={
            params:{
                addressOne:one,
                addressTwo:two
            }
        }

        const res = await axios.get('api/moralis/tokenprice', options);
        console.log(res.data);
        setPrices(res.data);
    }


    const changeAmount = (e) => {
        const amountOne = e.target.value;
        setTokenOneAmount(amountOne);
        if(e.target.value && prices) setTokenTwoAmount((amountOne * prices.ratio).toFixed(2))
        else setTokenTwoAmount(null);
    }



    const switchToken = () => {
        //wipe all price and amount related state
        setPrices(null);
        setTokenOneAmount(null);
        setTokenTwoAmount(null);
        //switch token inputs in the tradebox
        const one = tokenOne;
        const two = tokenTwo;
        setTokenOne(two);
        setTokenTwo(one);
        //fetch reversed prices and ratio
        fectchPrices(two.address, one.address);
    }



    const modifyToken = (index) => {
        setPrices(null);
        setTokenOneAmount(null);
        setTokenTwoAmount(null);

        if(changeToken === 1){
            setTokenOne(tokenList[index]);
            fectchPrices(tokenList[index].address, tokenTwo.address)
        }
        else{
            setTokenTwo(tokenList[index]);
            fectchPrices(tokenOne.address, tokenList[index].address)
        }
        setIsModalOpen(false);
    }



    const fetchDexSwap = async(addy) => {
        const options ={
            params:{
                tokenAddress: tokenOne.address, 
                walletAddress: addy
            }
        }

        const txconfig = {
            params:{
                src:tokenOne.address,
                dst:tokenTwo.address,
                amount:tokenOneAmount.padEnd(tokenOne.decimals+tokenOneAmount, '0'),
                from:addy,
                slippage:slippage
            }
        }

        const allowance = await axios.get(`/api/dex/check`, options);
        console.log(allowance.data);
        await new Promise(resolve => setTimeout(resolve, 600))

        if(allowance.data.allowance === '0'){
            console.log('not approve, sending you a request to approve on metamask');
            const approve = await axios.get(`/api/dex/grant`, options);
            const config = approve.data;
            setTxDeets(config)
            console.log(txDeets);
            setConfigReady((prev) => !prev)
            return
        }

        const txn = await axios.get(`/api/dex/swap`, txconfig);
        console.log(txn.data);
        let decimals = Number(`1E${tokenTwo.decimals}`);
        setTokenTwoAmount((Number(tx.data.toTokenAmount)/decimals).toFixed(2));
        setTxDeets(tx.data.tx);
    }



    return (
        <SwapContext.Provider value={{
            //swap state variable
            tokenOneAmount, setTokenOneAmount, 
            tokenTwoAmount, setTokenTwoAmount, 
            tokenOne, setTokenOne, 
            tokenTwo, setTokenTwo, 
            isModalOpen, setIsModalOpen, 
            changeToken, setChangeToken, 
            prices, setPrices, 
            txDeets, configReady,
            //swap feature functions
            openModal, fectchPrices, changeAmount, 
            switchToken, modifyToken, fetchDexSwap,
            slippage, setSlippage, handleSlippageChange
        }}>
            {children}
        </SwapContext.Provider>
    )

}

export default SwapContext;