import React, { useState, useEffect, useContext } from 'react';
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { Input, Popover, Radio, Modal, message } from 'antd';
import { ArrowDownOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import tokenList from '../../tokenlist.json';
import AuthContext from '../../contexts/AuthContext';
import SwapContext from '../../contexts/SwapContext';



const Settings = () => {
    const {slippage, handleSlippageChange} = useContext(SwapContext);

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
    const {messageApi, contextHolder} = message.useMessage();
    const {
            openModal,
            isModalOpen, 
            setIsModalOpen, 
            modifyToken, 
            tokenOneAmount, 
            changeAmount, 
            tokenTwoAmount, 
            prices, 
            fectchPrices, 
            switchToken,
            tokenOne,
            tokenTwo,
            txDeets,
            configReady,
            fetchDexSwap
        } = useContext(SwapContext);



    const {config, error} = usePrepareSendTransaction({       
        to: txDeets.to,
        account: String(address),
        data: String(txDeets.data),
        value: String(txDeets.value),
        onError(error) {
            console.log('Error', error)
        },
    });


    
    const { data, sendTransaction } = useSendTransaction({config});



    const {isLoading, isSuccess} = useWaitForTransaction({
        hash: data?.hash
    });



    useEffect(() => {
        fectchPrices(tokenList[0].address, tokenList[1].address);
    },[]);


    useEffect(() => {
        console.log(txDeets.to);
        if(txDeets.to && isConnected){
            if(!sendTransaction) console.log('sendTransaction is not ready');
            else sendTransaction(config);
        }
    },[configReady, sendTransaction]);


    useEffect(() => {
        message.destroy();
        if(isLoading){
            messageApi.open({
                type:'loading',
                content: 'Transaction is pending...',
                duration: 0
            })
        }
    },[isLoading]);


    useEffect(() => {
        message.destroy();
        if(isSuccess){
            messageApi.open({
                type: 'success',
                content: 'Transaction successful',
                duration: 1.50
            })
        }else if(txDeets.to){
            messageApi.open({
                type: 'error',
                content: 'Transaction failed',
                duration: 1.50
            })
        }

    },[isSuccess]);
    

    return (
        <div className='w-[100%] h-[100%]'>
            {contextHolder}
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


                <div id='tradebox-body' className='inputs flex flex-col'>
                    <Input placeholder='0' value={tokenOneAmount} onChange={changeAmount} disabled={!prices}/>
                    <Input placeholder='0' value={tokenTwoAmount} disabled={true}/>

                    <div className='switchButton' onClick={switchToken} >
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

                <div className='swapButton h-[4rem]' disabled={!tokenOneAmount || !isConnected} onClick={() => fetchDexSwap(address)}>Swap</div>
            </div>
        </div>
    )
}

export default TradeBox;