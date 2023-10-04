import axios from "axios";

const token = localStorage.getItem('token')
const custtomAxiosAprt = axios.create({
    baseURL:'http://localhost:8000/api/appartment',
    headers: {
        'Authorization': `Bearer ${token}`,
    }
})
export default custtomAxiosAprt
