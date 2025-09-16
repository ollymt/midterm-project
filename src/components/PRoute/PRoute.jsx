import { Navigate } from "react-router-dom"
import { useFakeAuth } from "../../contexts/FakeAuthContext"
import { toast } from "react-hot-toast"

export default function ProtectedRoute({ children }) {
    const { user } = useFakeAuth()

    if (!user) {
        toast("Sign-in first!", {
            icon: '😡',
            style: {
                border: '1px solid #8A1327',
                color: '#8A1327',
                zIndex: '1000000',
                boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.5)"
            },
            iconTheme: {
                primary: "#8A1327",
                secondary: "#FFCED6"
            }
        })
        return <Navigate to="/" replace />
    }

    return children
}