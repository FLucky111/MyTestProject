import { useState } from "react"
import { useAuth } from "../context/AuthContext"

function Login() {
    const { login } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async () => {
        try {
            await login(email, password)

            setEmail("")
            setPassword("")
            setError("")
        } catch (err) {
            setError("Ошибка входа")
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>

            {error && <p>{error}</p>}
        </div>
    )
}

export default Login