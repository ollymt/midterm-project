import './Navbar.css'
import Button from '../Button/Button'
import SearchBar from '../Searchbar/SearchBar'

export default function NavBar({ onSignInClick }) {
    return (
        <div className="navbar-cont">
            <div className='logo-cont'>
                <h1 className='logo'>STUDYSPOT</h1>
                <p className='reg-code'>PH</p>
            </div>
            <Button 
              onClick={onSignInClick} 
              variant='secondary' 
              className='outline-only'
            >
              <p className='button-text'>🔑 Sign-in</p>
            </Button>
        </div>
    )
}
