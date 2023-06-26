import React from 'react'
import { useNavigate,NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../features/user';

function Navbar() {
  const {user} = useSelector(state=>state.user)
  const userRole= user?user.userRole:"EMPLOYEE"
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logout =(e)=>{
    e.preventDefault();
   
      dispatch(clearUser(user))
      navigate("/signin")
     
  }
  return (
    <>
    <div className="bg-slate-600 shadow-lg shadow-orange-400 h-[70px] text-center text-[50px] font-extrabold"> <NavLink active to='/user/dashboard'><h1>ZORO</h1></NavLink></div>
        {userRole==="EMPLOYEE"&&(
            <div>
                <ul className='list-none text-center pt-10'>
                    <NavLink active to='/user/dashboard'>
                   <li  className='p-5 hover:bg-gray-600'>
                      Dashboard
                    </li>
                    </NavLink>
                    <NavLink active to='/user/buy'>
                    <li className='p-5  hover:bg-gray-600'>
                      Buy a food
                    </li>
                    </NavLink>
                    <NavLink active to='/user/order'>
                    <li className='p-5  hover:bg-gray-600' >
                      My orders
                    </li>
                    </NavLink>
                    <NavLink  active to='/user/request'>
                    <li className='p-5  hover:bg-gray-600'>
                     Request token
                    </li>
                    </NavLink>
                </ul>
            </div>
        )}
            {userRole==="ADMIN"&&(
            <div>
                <ul className='list-none text-center pt-10'>
                    <NavLink active to='/user/admindashboard'>
                   <li  className='p-5 hover:bg-gray-600'>
                      Dashboard
                    </li>
                    </NavLink>
                    <NavLink  active to='/user/tokenrequest'>
                    <li className='p-5  hover:bg-gray-600'>
                     Requested token
                    </li>
                    </NavLink>
                </ul>
            </div>
        )}
        {userRole==="COUNTER"&&(
                <ul className='list-none text-center pt-10'>
                    <NavLink active to='/user/counterdashboard'>
                        <li  className='p-5 hover:bg-gray-600'>
                            Dashboard
                        </li>
                    </NavLink>
                </ul>
        )}
        <button onClick={logout} className='p-5 w-full bg-red-500'>logout</button>
    </>
  )
}

export default Navbar