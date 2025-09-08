import './Navbar.css'
import Button from '../Button/Button'

export default function NavBar({ onSignInClick }) {
    return (
        <div className="navbar-cont">
            <div className='logo-cont'>
                <h1 className='logo'>STUDYSPOT</h1>
                <p className='reg-code'>PH</p>
            </div>
            <Button 
              onClick={onSignInClick} 
              variant='primary' 
            >
              <p className='button-text'> <b>Sign-in</b> </p>
            </Button>
        </div>
    )
}
