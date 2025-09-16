import './Navbar.css'
import Button from '../Button/Button'
import { useFakeAuth } from "../../contexts/FakeAuthContext"
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function NavBar({ onSignInClick }) {
    const { user, signOut } = useFakeAuth()
    const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const onBookingsClick = () => {
        if (location.pathname === "/bookings") {
            navigate("/") // if already on bookings, go home
        } else {
            navigate("/bookings") // otherwise, go to bookings
        }
    }

    const handleSignOutClick = () => {
        setShowSignOutConfirm(true)
    }

    const cancelSignOut = () => {
        setShowSignOutConfirm(false)
    }

    const confirmSignOut = () => {
        signOut()
        setShowSignOutConfirm(false)
    }

    return (
        <div className="navbar-cont">
            <div className='logo-cont'>
                <h1 className='logo'>STUDYSPOT</h1>
                <p className='reg-code'>PH</p>
            </div>

            {user && (
                <Button onClick={onBookingsClick} variant='secondary'>
                    {location.pathname === "/bookings" ? "🏠 Home" : "📚 My Bookings"}
                </Button>
            )}

            {showSignOutConfirm ? (
                <div className="signout-confirm-cont">
                    <p>Are you sure?</p>
                    <Button onClick={confirmSignOut} variant="primary"><b>✅ Yes</b></Button>
                    <Button onClick={cancelSignOut} variant="secondary">❌ No</Button>
                </div>
            ) : (
                <Button
                    onClick={user ? handleSignOutClick : onSignInClick}
                    variant={user ? "secondary" : "primary"}
                >
                    <p className='button-text'>
                        <b>{user ? `🔒 Sign-out of ${user.username}` : "🔑 Sign-in"}</b>
                    </p>
                </Button>
            )}
        </div>
    )
}
