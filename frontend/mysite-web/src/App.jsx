import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register.jsx"
import {useEffect, useState} from "react"
import api from "./api/api"

function App() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            api.get("/users/me")
                .then(res => {
                    setUser(res.data)
                })
                .catch(() => {
                    localStorage.removeItem("token")
                    setUser(null)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        else {
            setLoading(false)
        }
    }, []);
    
    if(loading)
        return <p>Загрузка....</p>
    
    return (
        <div>
            {!user ? (
                <>
                    <Register user={user} setUser={setUser} />
                    <hr />
                    <Login setUser={setUser} />
                </>
                ) :
                (
                    <Profile user={user} setUser={setUser} />
                )
            }
        </div>
    )
}

export default App