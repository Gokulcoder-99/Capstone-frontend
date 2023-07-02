import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate,Link } from 'react-router-dom';
import style from "../../style"
import backgroundImage from '../../images/Forntpagehero.jpg'
import { useDispatch } from 'react-redux';
 import { setUser } from '../../features/user';
import axios from "axios";




function Signin() {
    const dispatch = useDispatch();
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`
      };
    const [email,setmail]=useState('')
    const[password,setPassword]=useState('')
    const[visible,setVisible]=useState(false)
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault()
          
          const data ={email,password}
        try{
            const resUser = await axios.post('https://zoro-food-token.onrender.com/api/auth/signin',data);
            const JWT = resUser.data.tokenGenerated
            const {name,email,employeeId,userRole,isVerified,token}= resUser.data.userData
            const user={name,email,employeeId,userRole,isVerified,JWT,token}
            console.log(user)
            dispatch(setUser(user))
            navigate("/user")
           }catch(err){
            return err.res
          }
    }

    
  return (
    <div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8' style={backgroundStyle}>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
                Login to your account
            </h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className="bg-transparent py-8 px-4  sm:rounded-lg sm:px-10">
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-white'>Email address</label>
                    </div>
                    <div className='mt-1'>
                        <input type="email" name='email' autoComplete='email' required value={email} onChange={(e)=>setmail(e.target.value)}  className={style.inputbox}/>
                    </div>
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
                    </div>
                    <div className='mt-1  relative'>
                        <input type= {visible ? "text":"password"} name='password' autoComplete='password' required value={password} onChange={(e)=>setPassword(e.target.value)}  className={style.inputbox}/>
                        {visible?<AiOutlineEye className=' absolute right-2 top-2 cursor-pointer' size={25} onClick={()=>setVisible(false)}/> : <AiOutlineEyeInvisible className=' absolute  right-2 top-2 cursor-pointer' size={25} onClick={()=>setVisible(true)} />}
                    </div>
                    {/* <div className='mt-1 flex justify-between'>
                        <div>
                            <input type='checkbox' name='remember me'className='mr-2 w-4 h-4' />
                            <label htmlFor='remember me' className='text-sm font-medium text-white'>Remember me</label>
                        </div>
                        <div>
                           <Link to='/forgot' className='text-sm font-medium text-white hover:text-black' >Forget Password ?</Link>
                        </div>
                    </div> */}
                     
                    <div className='mt-1'>
                              
                                  <button
                                    type="submit"
                                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black hover:shadow-green-600  hover:shadow-xl ">
                                    Submit
                                </button>
                              
                    </div>
                    <div className='mt-1 flex '>
                        <div>
                            <label htmlFor='Create a new account' className='text-sm font-medium text-white mr-2'>Create a new account?</label>
                        </div>
                        <div>
                           <Link to='/signup' className='text-sm font-medium text-white hover:text-black' >Signup</Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>

    </div>
  )
}

export default Signin
