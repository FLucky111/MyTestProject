import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5148/api"
})

// Автоматически добавляем токен
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token")

    console.log("TOKEN:", token)
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api