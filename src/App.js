import React from "react";
import { Routes,Route } from "react-router-dom";
import { useSelector } from 'react-redux';

import Signup from "./ui/singup/signup";
import Signin from "./ui/singin/sigin";
import Frontpage from "./ui/homepage/frontpage";
import Userpage from "./ui/homepage/userpage";
import Dashboard from "./components/user/dashboard";
import Buy from "./components/user/employee/buy/buy";
import Order from "./components/user/employee/order";
import Request from "./components/user/employee/request"
import Conformtoken from "./components/user/admin/conformToken";


function App() {
  const {user} = useSelector(state=>state.user)
  const userRole= user?user.userRole:"EMPLOYEE"
  return (
    <Routes>
      <Route path="/" element={<Frontpage/>} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="user"  element={<Userpage/>}>
            {/* employee routes */}
          { userRole==="EMPLOYEE" && (
            <>
           <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='buy' element={<Buy/>}/>
            <Route path='order' element={<Order/>}/>
            <Route path='request' element={<Request/>}/>
            </>
          ) }
            {/* Admin route */}
     {  userRole==="ADMIN" &&  
         <>
           <Route path='admindashboard' element={<Dashboard/>}/>
            <Route path='tokenrequest' element={<Conformtoken/>}/>
          </>
            }
            {/* counter routes */}
            { userRole==="COUNTER" &&
              <Route path='counterdashboard' element={<Dashboard/>}/>
            }
          </Route>
          <Route path="*" element={<h1 className="text-[100px] flex justify-center mt-10 ">Page is not Found</h1>} />
    </Routes>
  );
}

export default App;
