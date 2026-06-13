import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://aivoiceagent-production-1a3f.up.railway.app',
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosClient;
