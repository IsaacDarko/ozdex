import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Input, Popover, Radio, Modal, message} from 'antd';
import {ArrowDownOutlined, DownOutlined, SettingOutlined} from '@ant-design/icons';
import tokenList from '../../tokenlist.json';
import AuthContext from '../../contexts/AuthContext';
import SwapContext from '../../contexts/SwapContext';





const Settings = () => {
    const [slippage, setSlippage] = useState(2.5);

    const handleSlippageChange = (e) =>{
        setSlippage(e.target.value);
    }

    return (
        <div className='text-[#fff] mx-2 my-4'>
            <h1 className=' font-montserrat font-semibold my-4'>Slippage Tolerance</h1>
            <div className=''>
                <Radio.Group value={slippage} onChange={(e) => handleSlippageChange(e)}>
                    <Radio.Button value={0.5}>0.5</Radio.Button>
                    <Radio.Button value={2.5}>2.5</Radio.Button>
                    <Radio.Button value={5.0}>5.0</Radio.Button>
                </Radio.Group>
            </div>
        </div>
    )
}




const TradeBox = () => {
    const {address, isConnected, connect} = useContext(AuthContext);
    const [tokenOneAmount, setTokenOneAmount] = useState(null);
    const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
    const [tokenOne, setTokenOne] = useState(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changeToken, setChangeToken] = useState(1);
    const [prices, setPrices ] = useState(null);

    const openModal = (num) => {
        setChangeToken(num);
        setIsModalOpen(true);
    }
    

    const fectchPrices = async(one, two) => {
        const options={
            params:{
                addressOne:one,
                addressTwo:two
            }
        }

        const res = await axios.get('http://localhost:5000/tokenprice', options);
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



    useEffect(() => {
        fectchPrices(tokenList[0].address, tokenList[1].address);
    },[])



    return (
        <div className='w-[100%] h-[100%]'>
            <Modal
            open={isModalOpen}
            title='Select a token'
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            >
                <div className='modalContent'>
                    {tokenList?.map((token, index) => {
                        return (
                            <div
                            key={index}
                            className='tokenChoice'
                            onClick={() => modifyToken(index)}
                            >
                                <img src={token.img} alt={token.ticker} className='tokenLogo' />
                                <div className='tokenChoiceNames'>
                                    <span className='tokenName'>{token.name}</span>
                                    <span className='tokenTicker'>{token.ticker}</span>
                                </div>
                            </div>
                        )})

                    }

                </div>
            </Modal>

            <div className='flex flex-col w-[70%] h-[60%] mx-auto my-auto px-4 bg-[#0e1524] border border-[#fff] rounded-3xl text-slate-100'>
                <div id='tradebox-header' className='flex flex-row px-8 py-8 w-[100%]'>
                    <div className='flex flex-row w-[50%]'>
                        <span className=' font-montserrat font-semibold text-base'>Swap</span>
                    </div>
                    <div className='flex flex-row-reverse w-[50%]'>
                        <span>
                            <Popover
                            title='Settings'
                            trigger='click'
                            placement='bottomRight'
                            content={<Settings />}
                            color='#0e1524'
                            >
                                <SettingOutlined className='' />
                            </Popover>
                        </span>
                    </div>
                </div>


                <div id='tradebox-body' className='inputs'>
                    <Input placeholder='0' value={tokenOneAmount} onChange={changeAmount} disabled={!prices}/>
                    <Input placeholder='0' value={tokenTwoAmount} disabled={true}/>

                    <div className='switchButton mx-16' onClick={switchToken} >
                        <ArrowDownOutlined className='switchArrow' />
                    </div>

                    <div className='assetOne' onClick={() => openModal(1)}>
                        <img src={tokenOne.img} alt="asset-one-logo" className='assetLogo' />
                        { tokenOne.ticker }
                        <DownOutlined />
                    </div>
                    <div className='assetTwo' onClick={() => openModal(2)}>
                        <img src={tokenTwo.img} alt="asset-two-logo" className='assetLogo' />
                        { tokenTwo.ticker }
                        <DownOutlined />
                    </div>
                </div>

                <div className='swapButton h-[4rem]' disabled={!tokenOneAmount || !isConnected} onClick={() => fectchPrices()}>Swap</div>
            </div>
        </div>
    )
}

export default TradeBox