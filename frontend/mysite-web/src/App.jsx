import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register.jsx"
import { useState } from "react"

function App() {
    const [user, setUser] = useState(null)
    
    return (
        <div>
            <Register user={user} setUser={setUser} />
            <hr />
            <Login setUser={setUser} />
            <hr />
            <Profile setUser={setUser} />
        </div>
    )
}

export default App