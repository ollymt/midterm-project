import { useState } from 'react'
import './App.css'
import NavBar from './components/Navbar/Navbar'
import HomePage from './pages/homepage/Homepage'
import SigninModal from './components/SigninModal/SigninModal'
import User from './components/User/User'
import Button from './components/Button/Button'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false) // start closed

  return (
    <>
      <SigninModal isOpen={isModalOpen}>
        <h1 className='modal-title'>Continue with STUDYSPOT</h1>
        <User name="John Pork" username="@johnpork" pfp="https://www.famousbirthdays.com/faces/pork-john-image.jpg"/>
        <div className='modal-cancel-bttn-cont'>
          <Button 
            variant='secondary' 
            onClick={() => setIsModalOpen(false)} // closes modal
          >
            ❌ Cancel
          </Button>
        </div>
      </SigninModal>

      {/* pass setIsModalOpen to NavBar */}
      <NavBar onSignInClick={() => setIsModalOpen(true)} />

      <HomePage />
    </>
  )
}

export default App
