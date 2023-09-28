import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
export default function ShowAppart(){
    const token = localStorage.getItem('token')
    const [appart,setAppart] = useState({})
    const {id} = useParams()
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Make sure Content-Type is set to JSON
        }
      };
    useEffect(()=>{
        fetch(`http://localhost:8000/api/appartment/${id}`,config)
        .then(res => res.json())
        .then(data => {
            setAppart(data)
        })
        .catch(error => console.log(error))
    },[id])
    return (
        <>
        <h1>ID : <strong>{appart.id}</strong></h1>
        <h1>Title : <strong>{appart.title}</strong></h1>
        </>
    )
}