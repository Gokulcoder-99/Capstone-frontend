import React from "react";
import Form from "./form";


function Edit({ setOpen }) {
 
  return (
    <div className='fixed w-full h-screen left-0 top-0 z-40 bg-[#00000030] flex justify-center items-center'>
       <div className='w-[90%] sm:w-[40%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-blue-500 rounded-md shadow-sm relative p-10'>
       <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className="bg-transparent py-8 px-4 ">
            <Form setOpen={setOpen} />
        </div>
       </div>  
       </div>
    </div>
  )
}

export default Edit