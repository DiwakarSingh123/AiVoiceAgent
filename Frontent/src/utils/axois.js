import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : 'https://aivoiceagent-production-1a3f.up.railway.app'),
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosClient;
