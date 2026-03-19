import { useState } from "react"
// @ts-ignore
import { useAuth } from "../context/AuthContext"

function Register() {
    const { register } = useAuth()

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleRegister = async () => {
        try {
            await register(userName, email, password)

            setUserName("")
            setEmail("")
            setPassword("")
            setError("")
        } catch (err) {
            setError("Ошибка регистрации")
        }
    }

    return (
        <div>
            <h2>Register</h2>

            <input
                placeholder="UserName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />

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

            <button onClick={handleRegister}>Register</button>

            {error && <p>{error}</p>}
        </div>
    )
}

export default Register