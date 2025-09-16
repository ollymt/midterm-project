import { createContext, useContext, useState } from "react"
import { toast } from "react-hot-toast"
import errorSound from "../../public/audio/error.mp3"
import signInSound from "../../public/audio/signin.mp3"
import signOutSound from "../../public/audio/signout.mp3"

const FakeAuthContext = createContext()

export function FakeAuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null
    })

    function handleErrorFeedback() {
        const sound = new Audio(errorSound);
        sound.play()
    }

    function handleSignInFeedback() {
        const sound = new Audio(signInSound);
        sound.play()
    }

    function handleSignOutFeedback() {
        const sound = new Audio(signOutSound);
        sound.play()
    }

    const signIn = ({ username, password }) => {
        console.log(`un: ${username} | pw: ${password}`)
        if (username && password) {
            setUser({ username, password })
            localStorage.setItem("user", JSON.stringify({username}))
            handleSignInFeedback()
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
            handleErrorFeedback()
            toast("Username and password required!", {
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
        }
    }

    const signOut = () => {
        const currentUsername = user?.username
        setUser(null)
        localStorage.removeItem("user")
        handleSignOutFeedback()
        toast(`Signed out of ${currentUsername}!`, {
            icon: '😔',
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
