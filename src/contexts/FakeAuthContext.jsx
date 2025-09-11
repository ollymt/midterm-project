import { createContext, useContext, useState } from "react"
import { toast } from "react-hot-toast"

const FakeAuthContext = createContext()

export function FakeAuthProvider({ children }) {
    const [user, setUser] = useState(null) // null = not signed in

    const signIn = ({username, password}) => {
        console.log(`un: ${username} | pw: ${password}`)
        if (username && password) {
            setUser({ username, password })
            toast(`Welcome, ${username}!`, {
                icon: '🥳',
                style: {
                    border: '1px solid #13678A',
                    color: '#13678A',
                    zIndex: '1000000',
                    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.5)"
                },
                iconTheme: {
                    primary: "#13678A",
                    secondary: "#CEF0FF"
                }
            })
        } else {
            toast("Error signing you up!", {
                icon: '😔',
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
        }
    }

    const signOut = () => {
        setUser(null)
        toast("Signed out")
    }

    return (
        <FakeAuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </FakeAuthContext.Provider>
    )
}

export function useFakeAuth() {
    return useContext(FakeAuthContext)
}
