// @ts-ignore
import { AuthProvider, useAuth } from "./context/AuthContext"
// @ts-ignore
import Login from "./pages/Login.jsx"
// @ts-ignore
import Register from "./pages/Register.jsx"
// @ts-ignore
import Profile from "./pages/Profile.jsx"

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return <p>Загрузка...</p>
  }

  return (
      <div>
        {!user ? (
            <>
              <Register />
              <hr />
              <Login />
            </>
        ) : (
            <Profile />
        )}
      </div>
  )
}

function App() {
  return (
      <AuthProvider>
        <AppContent />
      </AuthProvider>
  )
}

export default App