import React,{useEffect,useState} from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';

function Getallnotverifed() {
    const {user} = useSelector(state=>state.user)
    const jwtToken=user.JWT
    const [data, setData] = useState([]);
   console.log(jwtToken)
    useEffect(() => {
      fetchData(jwtToken);
    }, []);
    const fetchData = async (jwtToken) => {
      try {
        const response = await axios.get('https://zoro-food-token.onrender.com/api/admin/notverified',{
            headers: {
              authorization: `BEARER ${jwtToken}`,
            },
          });
        setData( response.data.user )// Handle the response data
      } catch (error) {
        console.error(error); // Handle any errors
      }
    };
    
    const handleApproval = async (employeeId,jwtToken) => {
       
        try {
          await axios.put('https://zoro-food-token.onrender.com/api/admin/authorizeUser', {employeeId:employeeId},{
            headers: {
              authorization: `BEARER ${jwtToken}`,
            },
          });
        } catch (error) {
          console.error(error);
        }
    }
    const tableCellStyle = {
        border: '1px solid black',
        padding: '8px',
      };
      console.log(data)
    return(
      <div>
      <h1 className='p-[20px] text-[40px] font-bold'>All user</h1>
      {data&&(
          <table className='text-center border-collapse w-[100%]'>
          <thead>
            <tr>
            <th style={tableCellStyle}>EmployeeId</th>
              <th style={tableCellStyle}>Email</th>
              <th style={tableCellStyle}>Role</th>
              <th style={tableCellStyle}>Approve</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} style={tableCellStyle}>
                <td style={tableCellStyle}>{item.employeeId}</td>
                <td style={tableCellStyle}>{item.email}</td>
                <td style={tableCellStyle}>{item.userRole}</td>
                <td style={tableCellStyle}><button className="bg-red-500 p-3 text-center" onClick={() => handleApproval(item.employeeId,jwtToken)}>Approve</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    )
}


export default Getallnotverifed
