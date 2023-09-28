import { useState , useEffect } from "react";
import { useNavigate , Link} from "react-router-dom"
import DeleteAppart from "./DeleteAppart";

export default function ListAppart(){
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [appart , setAppart] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage,setLastPage] = useState(0)
    const [isLoading , setIsLoading] = useState(true)
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Make sure Content-Type is set to JSON
        }
      };

    useEffect(()=>{
        if (!token) {
            navigate("/login")
        }
        if (token) {
            setIsLoading(true)
            fetch(`http://localhost:8000/api/appartment?page=${currentPage}`,config)
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                setAppart(data.data)
                setLastPage(data.last_page)
            })
            
            .catch(error => console.log(error))
           }
           setIsLoading(false)
       },[token,currentPage])
       
       const handleDeleteSuccess = () => {
        // Refresh the list of apartments when a deletion is successful
        fetch(`http://localhost:8000/api/appartment?page=${currentPage}`,config)
        .then((res) => res.json())
        .then((data) => {
            if (data.data) {
                setAppart(data.data);
              }
        });
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
            <DeleteAppart id={appart.id} onDeleteSuccess={handleDeleteSuccess} />
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
