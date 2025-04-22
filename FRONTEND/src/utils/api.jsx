import axios from 'axios'

// Create an axios instance with your backend base URL
const API = axios.create({
    baseURL:'https://end-term-project-6t71.onrender.com/api' // Change this if you deploy your backend
// })

// Add a JWT token to every request if it exists in localStorage
API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

export default API