import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteAppart({id , onDeleteSuccess }){
    const token = localStorage.getItem('token')
    const [success,setSuccess] = useState(false)
    const navigate = useNavigate()
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      };
    const onDelete = () => {
        const confirmDelete = window.confirm('Are you sure to delete this item')
        if (confirmDelete) {
            destroy()
            
        }
    }
    const destroy = () => {
        axios.delete(`http://localhost:8000/api/appartment/${id}`,config)
        .then(res => {
            if (res.data.success) {
                onDeleteSuccess()
            }
        })
        .catch(error => console.log(error))
    }

    return (<>
        <button onClick={onDelete} type="button" className="btn btn-danger">
            Delete
        </button>
    </>)
}