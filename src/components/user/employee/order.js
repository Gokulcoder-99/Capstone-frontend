import React,{useEffect,useState} from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';

function Order() {
  const {user} = useSelector(state=>state.user)
  const employeeId=user.employeeId
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(employeeId);
  }, []);
  const fetchData = async (id) => {
    try {
      const response = await axios.post('https://zoro-food-token.onrender.com/api/employee/myTokens', {employeeId:id });
      setData( response.data.userTokens )// Handle the response data
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  const tableCellStyle = {
    border: '1px solid black',
    padding: '8px',
  };
  return (
        <div>
        <h1 className='p-[20px] text-[40px] font-bold'>My Orders</h1>
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
    
  )
}

export default Order
