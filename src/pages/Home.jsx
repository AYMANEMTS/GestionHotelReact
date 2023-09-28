import {useState , useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function Home(){
    const token = localStorage.getItem('token')
    const [isLoading , setIsLoading] = useState(true)

    const navigate = useNavigate()
    useEffect(()=>{
        if (!token) {
            navigate("/login")
            setIsLoading(false)
        }
        setIsLoading(false)
    },[token])
    return (isLoading ?  
    <div className="d-flex justify-content-center ">
        <div style={{height:'50vh',width:'50vh',marginTop:'100px'}} className="spinner-border text-primary " role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>: (
        <>
        Home
        </>
    )
    )
}