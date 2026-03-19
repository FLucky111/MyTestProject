import { useState } from "react"
import api from "../api/api"

function Register() {
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleRegister = async () => {
        try {
            const res = await api.post("/auth/register", {
                userName,
                email,
                password
            })
            
            alert("Вы зарегистрировались, вы молодец!")
        } catch (err) {
            setError("Ошибка регистрации, жесть, поменяй ник или почту")
        }
    }

    return (
        <div>
            <h2>Register</h2>

            <input
                placeholder="userName"
                value={userName}
                onChange={e => setUserName(e.target.value)}
            />
            
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

            <button onClick={handleRegister}>Register</button>

            {error && <p>{error}</p>}
        </div>
    )
}

export default Register