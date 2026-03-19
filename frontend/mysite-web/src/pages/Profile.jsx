import { useEffect } from "react"
import api from "../api/api"

function Profile({ user, setUser }) {
    const handleLogout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }
    
    useEffect(() => {
        if (!user)
            api.get("/users/me")
                .then(res => setUser(res.data))
                .catch(() => {})
    }, [user, setUser])

    return (
        <div>
            <h2>Profile</h2>

            {user ? (
                <>
                <pre>{JSON.stringify(user, null, 2)}</pre>
                <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>Пользователь не авторизирован</p>
            )}
            
        </div>
    )
}

export default Profile