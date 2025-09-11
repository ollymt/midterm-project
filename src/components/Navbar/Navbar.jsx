import './Navbar.css'
import Button from '../Button/Button'
import { useFakeAuth } from "../../contexts/FakeAuthContext"

export default function NavBar({ onSignInClick }) {
    const { user, signIn, signOut } = useFakeAuth()

    return (
        <div className="navbar-cont">
            <div className='logo-cont'>
                <h1 className='logo'>STUDYSPOT</h1>
                <p className='reg-code'>PH</p>
            </div>
            <Button
                onClick={user ? () => {signOut()} : onSignInClick}
                variant={user ? "secondary" : "primary"}
            >
                <p className='button-text'> <b>{user ? "🔒 Sign-out" : "🔑 Sign-in"}</b> </p>
            </Button>
        </div>
    )
}
