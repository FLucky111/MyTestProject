import { useEffect, useState } from "react"
import api from "../api/api"

function Profile() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        api.get("/users/me")
            .then(res => setUser(res.data))
            .catch(() => alert("Не авторизован"))
    }, [])

    return (
        <div>
            <h2>Profile</h2>

            {user ? (
                <pre>{JSON.stringify(user, null, 2)}</pre>
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    )
}

export default Profile