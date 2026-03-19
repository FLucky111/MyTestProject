import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // автологин после обновления страницы в браузере
    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token){
            setLoading(false)
            return
        }
        
        api.get("/users/me")
            .then((res) => {
                setUser(res.data)
            })
            .catch(() => {
                localStorage.removeItem("token")
                setUser(null)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    const login = async (email, password) => {
        const res = await api.post("/auth/login", {
            email,
            password
        })

        localStorage.setItem("token", res.data.token)

        const userRes = await api.get("/users/me")
        setUser(userRes.data)

        alert("Вы вошли в профиль!")
    }

    const register = async (userName, email, password) => {
        const res = await api.post("/auth/register", {
            userName,
            email,
            password
        })

        localStorage.setItem("token", res.data.token)

        alert("Вы успешно зарегистрировались!")
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}