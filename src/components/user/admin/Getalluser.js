import React,{useEffect,useState} from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';

const Getalluser=()=>{
    const {user} = useSelector(state=>state.user)
    const jwtToken=user.JWT
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetchData(jwtToken);
    }, []);
    const fetchData = async (jwtToken) => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/alluser',{
            headers: {
              authorization: `BEARER ${jwtToken}`,
            },
          });
        setData( response.data.user )// Handle the response data
      } catch (error) {
        console.error(error); // Handle any errors
      }
    };
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
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} style={tableCellStyle}>
                <td style={tableCellStyle}>{item.employeeId}</td>
                <td style={tableCellStyle}>{item.email}</td>
                
                <td style={tableCellStyle}>{item.userRole}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    )
  }

export default Getalluser