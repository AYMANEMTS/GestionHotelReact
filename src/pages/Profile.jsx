import { useState , useEffect, useContext } from "react"
import { loginContext } from "../Context/LoginContext"
import { useNavigate } from "react-router-dom"

export default function Profile(){
    const token = localStorage.getItem('token')
    const [isLoading , setIsLoading] = useState(true)
    const navigate = useNavigate()
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Make sure Content-Type is set to JSON
        }
      };
    const fetchProfile = () => {
        fetch('http://localhost:8000/api/profile',config)
        .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }
    useEffect(()=>{
        if (!token) {
            navigate("/login")
            setIsLoading(false)
        }
        fetchProfile()
        setIsLoading(false)
       },[token])
    return  (isLoading ?  
        <div className="d-flex justify-content-center ">
            <div style={{height:'50vh',width:'50vh',marginTop:'100px'}} className="spinner-border text-primary " role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>: (
            <>
            profile
            </>
        )
        )
}