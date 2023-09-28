import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { useParams , useNavigate } from "react-router-dom"
import { Button, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, FormText , Row } from "react-bootstrap"

export default function EditAppart(){
    
    const [title,setTitle] = useState('')
    const [detail,setDetail] = useState('')
    const [price,setPrice] = useState(0)
    const [chambre,setChambre] = useState(0)
    const [fileImage,setFileImage] = useState(null)
    const [actuelImage,setActuelImage] = useState(null)
    const token = localStorage.getItem('token')
    const {id} = useParams()
    const [errors,setErrors] = useState({})
    const [message,setMessage] = useState()
    const [success ,setSuccess] = useState(false)
    const [available , setAvailable] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`
          
        }
      };

      const fetchAppartment = async() =>{
        await axios.get(`http://localhost:8000/api/appartment/${id}`,config)
            .then(({ data }) => {
                const { title, detail , price_weck , chambre , available , main_image } = data
                setTitle(title)
                setDetail(detail)
                if (price_weck !== null) {
                    setPrice(price_weck)
                }
                if (chambre !== null) {
                    setChambre(chambre)
                }
                setActuelImage(main_image)
                if (available === 1) {
                    setAvailable(true)
                }
                setIsLoading(false)
            }).catch(({ response: {data} }) => {
                console.log(data.message)
            })
    }

    useEffect(()=>{
        if (!token) {
            navigate("/login")
        }
        fetchAppartment()
       },[token])
    
    const handleImage = (e) => {
        const newUrl = URL.createObjectURL(e.target.files[0])
        const actuelImage = document.querySelector("#actuelImage")
        actuelImage.src = newUrl
        setFileImage(e.target.files[0])
    }


    const submitForm = async(e)=>{
        e.preventDefault()
        
        const formData = new FormData();
        formData.append('_method', 'PATCH')
        formData.append('title', title)
        formData.append('detail', detail)
        formData.append('price_weck', price)
        formData.append('chambre',chambre)
        formData.append('available',available)
        if (fileImage !== null) {
            formData.append('main_image',fileImage)
        }
        
        try {
            const response = await axios.post(`http://localhost:8000/api/appartment/${id}`, formData, config);
            console.log(response.data);
            const data = response.data
            if (data.success) {
                setSuccess(true)
                setErrors([])
                setMessage(data.message)
            }
            if (data.errors) {
                setErrors(data.errors)
                setSuccess(false)
                setMessage(data.message)
                
            }
          } catch (error) {
            console.error(error);
          }
    
    }
    return  ( isLoading ? <div className="d-flex justify-content-center ">
    <div style={{height:'50vh',width:'50vh',marginTop:'100px'}} className="spinner-border text-primary " role="status">
    <span className="sr-only">Loading...</span>
    </div>
    </div> 
    :
     (<div className="container-fluid w-75 " style={{paddingLeft:"0px"}}>
        <h1>Update Appartment :</h1>
        <hr />
        {message && !success && <div className="alert alert-danger" role="alert">
            <strong>{message}</strong> 
        </div>
        }
        {message && success && <div className="alert alert-success" role="alert">
            <strong>{message}</strong> 
        </div>
        }
            {/* form create */}
            <Form onSubmit={submitForm} encType="multipart/form-data">
                <Row>
                    <Col >
                        <FormGroup >
                            <FormLabel>Title</FormLabel>
                            <FormControl type="text" 
                            value={title} onChange={(e)=>{setTitle(e.target.value)}}
                            />
                            {errors['title'] && <FormText className="text-danger">{errors['title']}</FormText>}
                        </FormGroup>
                    </Col>
                    <Col >
                        <FormGroup >
                            <FormLabel>Image</FormLabel>
                            <FormControl type="file" onChange={handleImage} />
                            {errors['main_image'] && <FormText className="text-danger">{errors['main_image']}</FormText>}
                        </FormGroup>
                    </Col>
                    
                    {actuelImage && <Col >
                        <img id="actuelImage" className="img-thumbnail" height={'100px'} width={'100px'} 
                        src={`http://localhost:8000/images_Appart/${actuelImage}`} />
                    </Col>}

                </Row>
                <Row>
                    <Col >
                        <FormGroup >
                            <FormLabel>Detail</FormLabel>
                            <FormControl as="textarea" rows={3}
                            value={detail} onChange={(e)=>{setDetail(e.target.value)}}
                            />
                            {errors['detail'] && <FormText className="text-danger">{errors['detail']}</FormText>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup >
                            <FormLabel>Price</FormLabel>
                            <FormControl type="number" step="0.01" 
                            value={price} onChange={(e)=>{setPrice(e.target.value)}}
                            />
                            {errors['price_weck'] && <FormText className="text-danger">{errors['price_weck']}</FormText>}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup >
                            <FormLabel>Chambre</FormLabel>
                            <FormControl type="number" 
                            value={chambre} onChange={(e)=>{setChambre(e.target.value)}}
                            />
                            {errors['chambre'] && <FormText className="text-danger">{errors['chambre']}</FormText>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormLabel>Its Available </FormLabel>
                        {available === true ?
                        <FormCheck type="switch" onChange={(e) => setAvailable(e.target.checked)} label="Available" defaultChecked/>
                        :
                        <FormCheck type="switch" onChange={(e) => setAvailable(e.target.checked)} label="Not Available"  />
                        }
                    </Col>
                </Row>
                <div className="d-grid gap-2 m-1">
                    <Button type="submit" variant="primary" >
                        Update
                    </Button>
                </div>
            </Form>
            </div>))
    
    
}