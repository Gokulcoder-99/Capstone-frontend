import React,{useEffect,useState} from 'react'
import axios from "axios";
import Edit from './Edit';
import { useSelector } from 'react-redux';
import Getalluser from './admin/Getalluser';
import Getallnotverifed from './admin/Getallnotverifed';

function Dashboard() {
 const {user} = useSelector(state=>state.user)
 const userRole= user?user.userRole:"EMPLOYEE"
 const jwtToken=user.JWT
 const employeeId=user.employeeId
 const [data, setData] = useState([]);
 const[success,setSuccess]=useState("")

 useEffect(() => {
   fetchData(employeeId);
 }, []);
 const fetchData = async (id) => {
   try {
     const response = await axios.post('http://localhost:4000/api/employee/myHistroy', {employeeId:id });
     setData( response.data.userTokens )// Handle the response data
   } catch (error) {
     console.error(error); // Handle any errors
   }
 };

  const[open,setOpen]=useState(false)
  const[allUser,setAllUser]=useState(false)
  const[verify,setVerify]=useState(false)
  const[counter,setCounter]=useState("")
  const tableCellStyle = {
    border: '1px solid black',
    padding: '8px',
  };


  const verifyData = async (counter,jwtToken) => {
    try {
      const response = await axios.post('http://localhost:4000/api/counter/verifyToken', {tokenFromRequest:counter },{
        headers: {
          authorization: `BEARER ${jwtToken}`,
        },
      });
        setSuccess(response.data.msg)// Handle the response data
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };



  return (
    // user info
    <>
    <div className='flex justify-between pt-10 sm:pr-20 pr-3 sm:pl-10 pl-3 font-semibold sm:font-extrabold bg-slate-300 min-w-[340px]'>
      <div className=' h-[70px] rounded-full flex lg:gap-32 sm:gap-10 gap-2'>
        <div>
        <h1>Name: {user.name}</h1>
        <h2>Email: {user.email}</h2>
       </div>
       <div>
         <h2>Role: {user.userRole}</h2>
         <h2>ID: {user.employeeId}</h2>
        </div>
      </div>
      <div>
        <h1>Token : {user.token}</h1>
        <button className='w-[100px] h-[30px] bg-red-500 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-green-600' onClick={()=>setOpen(true)}>Edit</button>
      </div>
    </div>
    {open ? <Edit setOpen={setOpen} /> : null}
    {/* my orders history */}
{ userRole==="EMPLOYEE" &&    
      <div className='min-w-[360px]'>
        <h1 className='p-[20px] text-[40px] font-bold'>Order History</h1>
        {data&&(
            <table className='text-center border-collapse w-[100%]'>
            <thead>
              <tr>
              <th style={tableCellStyle}>Data</th>
                <th style={tableCellStyle}>Order ID</th>
                
                <th style={tableCellStyle}>Order</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} style={tableCellStyle}>
                  <td style={tableCellStyle}>{item.createdDate}</td>
                  <td style={tableCellStyle}>{item.tokenString}</td>
                
                  <td style={tableCellStyle}>{item.tokenType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      }
      {/* counter dashboar */}
      { userRole==="COUNTER" &&     
      <div>
        <h1 className='p-[20px] text-[40px] font-bold'>Verify Tokens</h1>
        <div className='flex p-[20px] gap-4'>
        <input type="text"onChange={(e)=>(setCounter(e.target.value))} value={counter} className='border-[4px] border-solid w-[50%] text-sm h-[42px] '/>
        <button
        onClick={()=>verifyData(counter,jwtToken)}
          type="submit"
          className="group relative w-[80px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black hover:shadow-green-600  hover:shadow-xl ">
          Verify
      </button>
      {success}
      </div>
      </div>
      }
      {userRole==="ADMIN" && (
        <>
          <div className='p-[20px]'>
          <h1 className='text-[40px] font-bold'>User</h1>
           <div className='flex justify-between'>
             <div>
             <button onClick={()=>{setAllUser(true);setVerify(false)}} className='w-[80px] h-[30px] m-2 bg-red-500 rounded-xl' >All User</button>
            <button onClick={()=>{setVerify(true); setAllUser(false);}} className='w-[80px] h-[30px] m-2 bg-red-500 rounded-xl' >Verify</button>
             </div>
           </div>
            <div className='overflow-y-auto max-h-[800px]'>
            {allUser && <Getalluser/> }
            {verify && <Getallnotverifed/> }
            </div>
        </div>
        </>
      )}
    </>
  )
}

export default Dashboard