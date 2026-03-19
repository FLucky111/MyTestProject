import { useAuth } from "../context/AuthContext"

function Profile() {
    const { user, logout } = useAuth()

    return (
        <div>
            <h2>Profile</h2>

            {user ? (
                <>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <p>Пользователь не авторизован</p>
            )}
        </div>
    )
}

export default Profile