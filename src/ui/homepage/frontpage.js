import React from 'react'
import backgroundImage from '../../images/Forntpagehero.jpg'
import { Link } from 'react-router-dom';


function Frontpage() {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`
      };
  return (
    <div className=" w-[100vw] h-[100vh]" style={backgroundStyle}>
        <div className='pt-8 sm:pt-14 text-center  text-white '>
            <h1 className='text-[30px] sm:text-[60px] font-extrabold'>Welome TO ZORO</h1>
            <p className='sm:text-[20px] font-bold p-10'>The Zoro platform offers a user-friendly interface that allows food establishments to easily create and manage their food tokens. Zoro ensures transparency, security, and traceability in the food token generation process. This app handle the token issuance, transfer, and redemption, providing a seamless and efficient experience for both businesses and customers.</p>
        </div>
        <div className='flex justify-center gap-4'>
            <button className='w-[60px] h-[30px] bg-black text-white rounded-lg'><Link to='/signin'>Signin</Link></button>
            <button className='w-[60px] h-[30px] bg-black text-white rounded-lg'><Link to='/signup'>Signup</Link></button>
        </div>
    </div>
  )
}

export default Frontpage