import { useState , useEffect } from "react";
import { useNavigate , Link} from "react-router-dom"
import DeleteAppart from "./DeleteAppart";
import ApiAppartment from "../axios/Api/ApiAppartment";
import {Button} from "react-bootstrap";

export default function ListAppart(){
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [appart , setAppart] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage,setLastPage] = useState(0)
    const [isLoading , setIsLoading] = useState(true)
    const [message, setMesssage] = useState(null)

    useEffect(()=>{
        if (!token) {
            navigate("/login")
        }
        if (token) {
            (async ()=> {
                const data = await ApiAppartment.getAll(currentPage)
                setIsLoading(false)
                setAppart(data.data)
                setLastPage(data.last_page)

            })()
            setIsLoading(false)
        }
       },[token,currentPage])
       
       const deleteCallback = (e) => {
        e.preventDefault()
           const id = parseInt(e.target.dataset.id)
           const confirmDelete = window.confirm('Are you sure to delete this item')
           if (confirmDelete) {
               ApiAppartment.delete(id).then(
                   (response) => {
                       setMesssage(response.message)
                       setAppart(prevState => prevState.filter(appart => appart.id !== id))
                   }
               )
           }
      };
       
    const showAppart = () => {
        
        return appart.map((appart , key)=>{
            return <tr key={key}>
            <th >{appart.id}</th>
            <td>{appart.title}</td>
            <td>{appart.detail}</td>
            <td>{appart.main_image && <img width={50} height={50} src={`http://localhost:8000/images_Appart/${appart.main_image}`}></img>}</td>
            <td >
            <Link to={`/product/${appart.id}`} className="btn btn-primary">Detail</Link>
            <Link to={`/product/edit/${appart.id}`} className="btn btn-warning">Edit</Link>
            <Button className={'btn btn-danger'} data-id={appart.id} onClick={deleteCallback}>Delete</Button>
            </td>
          </tr>
        })
    }
   
    return ( isLoading ? <div className="d-flex justify-content-center ">
        <div style={{height:'50vh',width:'50vh',marginTop:'100px'}} className="spinner-border text-primary " role="status">
        <span className="sr-only">Loading...</span>
    </div>
  </div> : 
  (<div className="container m-3">
    <h1>Appartment List :</h1>
      {message !== null ? <div className={'alert alert-success'}>
          <p>{message}</p>
      </div>:''}
    <hr />
    <Link className="btn btn-primary" to="/product/create"> Create</Link>
    <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#ID</th>
      <th scope="col">Title</th>
      <th scope="col">Detail</th>
      <th scope="col">Image</th>
      <th scope="col">Operation</th>
    </tr>
  </thead>
  <tbody>
    {showAppart()}
  </tbody>
</table>
{/* Add pagination controls here */}
<div className="btn-group">
        <button
        className="btn btn-primary"
          onClick={() => setCurrentPage(prevPage => prevPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        <button
        className="btn btn-primary"
          onClick={() => setCurrentPage(prevPage => prevPage + 1)}
          disabled={currentPage === lastPage }
        >
          &raquo;   
        </button>
      </div>
      
    </div>)
    )
    
}
