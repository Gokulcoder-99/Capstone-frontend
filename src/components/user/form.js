import React,{useState} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useFormik } from "formik";
import { basicSchema } from "../../utils/yup";

import style from "../../style"

const onSubmit = async (values, actions) => {
    try{
        const resUser = await axios.post('http://localhost:4000/api/auth/signup',values);
        console.log(resUser)
        return resUser
      }catch(err){
        return err.res
      }
};
function Form({setOpen}) {
    const[visible,setVisible]=useState(false)
    const {
      values,
      errors,
      touched,
      isSubmitting,
      handleBlur,
      handleChange,
      handleSubmit,
    } = useFormik({
      initialValues: {
        name:"",
        email: "",
        employee:"",
        role:"",
        password: "",
        confirmPassword: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    }); 
  return (
            <form   onSubmit={handleSubmit} className="space-y-5">
               <div>
                    <label htmlFor='name' className='block text-sm font-medium text-white'>Name</label>
                </div>
                <div className='mt-1'>
                    <input type="text" name='name' autoComplete='name' required value={values.name}  onBlur={handleBlur} onChange={handleChange}  className={style.inputbox}/>
                </div>
                {errors.name && touched.name && <p className="text-red-800 font-Poppins">{errors.name}</p>}
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-white'>Email address</label>
                </div>
                <div className='mt-1'>
                    <input type="email" name='email' autoComplete='email' required value={values.email} onBlur={handleBlur} onChange={handleChange}  className={style.inputbox}/>
                </div>
                {errors.email && touched.email && <p className="text-red-800 font-Poppins">{errors.email}</p>}
                <div>
                    <label htmlFor='employee id' className='block text-sm font-medium text-white'>Employee ID</label>
                </div>
                <div className='mt-1'>
                    <input type="number" name='employee' autoComplete='employee' required value={values.employee}  onBlur={handleBlur} onChange={handleChange}  className={style.inputbox}/>
                </div>
                {errors.employee && touched.employee && <p className="text-red-800 font-Poppins">{errors.employee}</p>}
                <div>
                    <label htmlFor='role' className='block text-sm font-medium text-white'>Role</label>
                </div>
                <div className='mt-1'>
                    <input type="text" name='role' required value={values.role}  onBlur={handleBlur} onChange={handleChange}  className={style.inputbox}/>
                </div>
                {errors.role && touched.role && <p className="text-red-800 font-Poppins">{errors.role}</p>}
                
                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
                </div>
                <div className='mt-1  relative'>
                    <input type= {visible ? "text":"password"} name='password' autoComplete='password' required value={values.password} onBlur={handleBlur} onChange={handleChange}  className={style.inputbox}/>
                    {visible?<AiOutlineEye className=' absolute right-2 top-2 cursor-pointer' size={25} onClick={()=>setVisible(false)}/> : <AiOutlineEyeInvisible className=' absolute  right-2 top-2 cursor-pointer' size={25} onClick={()=>setVisible(true)} />}
                </div>
                {errors.password && touched.password && (
                <p className="text-red-800 font-Poppins">{errors.password}</p>)}
                <div>
                    <label htmlFor='confirmPassword' className='block text-sm font-medium text-white'>Confirm Password</label>
                </div>
                <div className='mt-1  relative'>
                    <input type= {visible ? "text":"password"} name='confirmPassword' autoComplete='confirmPassword' required onBlur={handleBlur} value={values.confirmPassword} onChange={handleChange}  className={style.inputbox}/>
                    {visible?<AiOutlineEye className=' absolute right-2 top-2 cursor-pointer' size={25} onClick={()=>setVisible(false)}/> : <AiOutlineEyeInvisible className=' absolute  right-2 top-2 cursor-pointer' size={25} onClick={()=>setVisible(true)} />}
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
        <p className="text-red-800 font-Poppins">{errors.confirmPassword}</p>)}
               <div className='mt-1'>
            <button
                onClick={()=>setOpen(false)}
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black hover:shadow-green-600  hover:shadow-xl ">
                Cancel
            </button>
            </div>
            <div className='mt-1'>
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black hover:shadow-green-600  hover:shadow-xl ">
                    Submit
                </button>
                </div>
            </form>
  )
}

export default Form