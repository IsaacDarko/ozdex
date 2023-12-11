import React, {useState, useEffect, useContext} from 'react';
import { useDisconnect, useBalance } from 'wagmi';
import AuthContext from '../../contexts/AuthContext';
import { userimg } from '../../assets/icons';
import { PoweroffOutlined, SettingFilled, DisconnectOutlined } from '@ant-design/icons';



const AccountSettings = () => {
    const {address, isConnected, connect} = useContext(AuthContext);
    const { disconnect } = useDisconnect();
    const { data, isError, isLoading } = useBalance({
        address: address
    })

    return (
        <div className='flex flex-col w-[25rem] px-2'>

            <div className='flex flex-row w-[100%]'>
                <div className=' flex flex-row w-[50%]'>
                    <span className='flex flex-row'>
                        <img src={userimg} alt="ens-avatar" className='w-16 h-16 rounded-full' />
                    </span>
                    <span className='flex flex-row-reverse'>
                        
                    </span>
                </div>
                <div className='flex flex-row-reverse w-[50%]'>
                    <span className='my-auto text-[1.5rem] text-[white]'>
                        <SettingFilled className='mr-6 cursor-pointer' />
                        <PoweroffOutlined className=' cursor-pointer' onClick={disconnect} />
                    </span>
                </div>
            </div>

            <div className='flex flex-row w-[100%]'>
                <span className=' font-montserrat font-bold text-4xl'>
                    {}
                </span>
            </div>

            <div className='flex flex-col w-[100%]'>

            </div>

            <div className='flex flex-row w-[100%]'>

            </div>
            
        </div>
    )
}

export default AccountSettings;