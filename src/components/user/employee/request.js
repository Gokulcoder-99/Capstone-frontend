import React ,{useState}from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';

function Request() {
  const [value, setValue] = useState(0);
  const {user} = useSelector(state=>state.user)
  const employeeId=user.employeeId

  const handleChange = (event) => {
    let inputValue = event.target.value;

    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 300) {
      setValue(inputValue);
    }
  }
  const handlerequest= async(e)=>{
    e.preventDefault() 
          const tokenRequested = value
          const data={tokenRequested,employeeId}
          console.log(data)
          try {
            const response = await axios.put("http://localhost:4000/api/employee/requestmoretokens",data);
            console.log(response);
          } catch (err) {
            return err.response;
          }
  }
  return (
    <div>
        <h1 className='p-[20px] text-[40px] font-bold'>Request Tokens</h1>
        <div className='flex p-[20px] gap-4'>
        <input type="number" max={300} min={0} value={value}
           onChange={handleChange} className='border-[4px] border-solid w-[50%] text-sm h-[42px] '/>
        <button
        onClick={handlerequest}
          type="submit"
          className="group relative w-[80px] h-[40px] flex justify-center py-2 px-4 border border-transparent 
          text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black hover:shadow-green-600  hover:shadow-xl ">
          Request
      </button>
      </div>
      </div>
  )
}

export default Request