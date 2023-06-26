import React from 'react'
import Navbar from '../../components/navbar/navbar'
import { Outlet } from 'react-router-dom'

function Userpage() {
  return (
    <div className='w-[100vw] h-[100vh] flex'>
        <div className='w-0  sm:w-[20vw] h-[100vh] bg-black text-white '><Navbar/></div>
        <div className='w-[100vw] sm:w-[calc(100vw-20vw)] h-[100vh] min-w-[360px] bg-blue-100'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Userpage