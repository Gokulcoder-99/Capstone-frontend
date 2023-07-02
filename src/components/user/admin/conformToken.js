import React,{useEffect,useState} from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';

function Conformtoken() {
  const {user} = useSelector(state=>state.user)
 const jwtToken=user.JWT
 const [data, setData] = useState([]);
 console.log(jwtToken)
 
 useEffect(() => {
  fetchData(jwtToken);
}, []);
const fetchData = async (jwtToken) => {
  try {
    const response = await axios.get('https://zoro-food-token.onrender.com/api/admin/alltokenRequests', {
      headers: {
        authorization: `BEARER ${jwtToken}`,
      },
    });
    setData( response.data.usersWithTokenRequest )// Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
  }
};
console.log(data)
const handleApproval = async (employeeId,tokenRequested ,jwtToken) => {
  console.log(employeeId,tokenRequested,jwtToken)
  try {
    await axios.put('http://localhost:4000/api/admin/giveMoreTokens', {employeeId:employeeId ,tokenRequested:tokenRequested },{
      headers: {
        authorization: `BEARER ${jwtToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
const tableCellStyle = {
  border: '1px solid black',
  padding: '8px',
};
return (
      <div>
      <h1 className='p-[20px] text-[40px] font-bold'>TokenRequested</h1>
      {data&&(
          <table className='text-center border-collapse w-[100%]'>
          <thead>
            <tr>
            <th style={tableCellStyle}>Email</th>
              <th style={tableCellStyle}>EmployeeIdID</th>
              <th style={tableCellStyle}>Tokens</th>
              <th style={tableCellStyle}>Requestedtoken</th>
              <th style={tableCellStyle}>Approve</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} style={tableCellStyle}>
                <td style={tableCellStyle}>{item.email}</td>
                <td style={tableCellStyle}>{item.employeeId}</td>
                <td style={tableCellStyle}>{item.TokensMax}</td>
                <td style={tableCellStyle}>{item.tokenRequested}</td>
                <td style={tableCellStyle}><button className="bg-red-500 p-3 text-center" onClick={() => handleApproval(item.employeeId,item.tokenRequested,jwtToken)}>Approve</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  
)
}

export default Conformtoken
