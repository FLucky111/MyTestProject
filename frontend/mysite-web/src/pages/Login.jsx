import { useState } from "react"
import api from "../api/api"

function Login({ setUser }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", {
                email,
                password
            })
            
            // сохраняем токен
            localStorage.setItem("token", res.data.token)
            
            // сразу получаем пользователя
            const userRes = await api.get("/users/me")
            setUser(userRes.data)

            alert("Вы вошли в профиль, поздравляю!")
        } catch (err) {
            setError("Ошибка входа, иди отсюда")
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>

            {error && <p>{error}</p>}
        </div>
    )
}

export default Login