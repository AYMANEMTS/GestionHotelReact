import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout(){
    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.removeItem("token")
        console.log("log out ...")
        navigate("/login")
    })
}
