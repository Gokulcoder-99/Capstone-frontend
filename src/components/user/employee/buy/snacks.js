import React, { useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';

function Snacks() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const {user} = useSelector(state=>state.user)
  const employeeId=user.employeeId
  const Snacks = [
    { value: 'sb-snack', label: 'Brunch' },
    { value: 'se-snack', label: 'Evening' }
  ];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handlSnack= async(e)=>{
    e.preventDefault()
          
          const tokenType =selectedOption.value
          const data={tokenType,employeeId}
          console.log(data)
          try {
            const response = await axios.post("https://zoro-food-token.onrender.com/api/employee/generateToken",data);
            console.log(response);
          } catch (err) {
            return err.response;
          }
  }
  return (
    <>
    <div className='p-[20px] h-[30vh]'>
      <h1 className='text-[50px]'>Snacks</h1>
     <div className='flex gap-3'>
     <div className='w-[60%]'>
    <div className="border-b-[3px] border-solid border-black bg-gray-300 w-full text-[20px]" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : 'Select an option'}
      </div>
      {isOpen && (
        <ul>
          {Snacks.map((option) => (
            <li
              key={option.value}
              onClick={() => selectOption(option)}
              className="bg-gray-300 w-full text-[20px] border-black border-solid border"

            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
      <button
      onClick={handlSnack}
          type="submit"
          className="group relative w-[80px] h-[30px] flex justify-center py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black hover:shadow-green-600  hover:shadow-xl ">
         Generate
      </button>
     </div>
    </div>
    </>
  )
}

export default Snacks
