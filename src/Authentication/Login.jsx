import axios from "axios"
import { useEffect, useRef, useState,useContext } from "react"
import { loginContext } from "../Context/LoginContext"
import { Navigate } from "react-router-dom"


export default function Login(){
    const emailField = useRef()
    const passwordField = useRef()
    const [isLogen,setIsLogen] =  useState(false)
    const [errors,setErrors] = useState({})
    const [message,setMessage] = useState('')
    const submitForm = async(e)=>{
        e.preventDefault()
        const formData ={
            'email':emailField.current.value,
            'password':passwordField.current.value
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
            
            if (response && response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log(response)
              setIsLogen(true);
            } else {
              console.error("Unexpected response structure:", response);
              setErrors(response.data.errors)
              setMessage(response.data.message)
            }
          } catch (error) {
            console.error("Error:", error);
          }
    }
     if (isLogen) {
         return <Navigate to="/" /> 
     }
    return <>
        <div className="container-fluid mx-auto w-75 my-3">
            <h1>Login :</h1>
            <hr />
            <form onSubmit={submitForm} >
                {message && 
                <div className="alert alert-danger" role="alert">
                    <strong>{message}</strong> 
                </div>
                
                }
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email :</label>
                    <input type="email" id="email" className="form-control" ref={emailField} />
                    {errors['email'] && <p className="text-danger"> {errors['email']} </p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password :</label>
                    <input type="password" id="password" className="form-control" ref={passwordField}/>
                    {errors['password'] && <p className="text-danger"> {errors['password']} </p>}

                </div>
                <button type="submit" className="btn btn-primary m-1">Login</button>
            </form>
        </div>
    </>
}
