import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const employeeid = /^[0-9]+$/
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  name:yup.string().required("Please enter your name"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  employeeId:yup.string().required("Please enter id (eg...001,203,275)").matches(employeeid,{ message: "Please enter id number (eg.1..,203)" }).max(3).min(1),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});