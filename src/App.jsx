import { useState } from 'react'
import './App.css'
import NavBar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage/Homepage'
import PlaceDetail from './pages/PlaceDetail/PlaceDetail'
import SigninModal from './components/SigninModal/SigninModal'
import User from './components/User/User'
import Button from './components/Button/Button'
import Footer from './components/Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false) // start closed

    return (
        <>
            <SigninModal isOpen={isModalOpen}>
                <h1 className='modal-title'>Continue with STUDYSPOT</h1>
                <User name="John Pork" username="@johnpork" pfp="https://www.famousbirthdays.com/faces/pork-john-image.jpg" />
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

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/place/:id' element={<PlaceDetail />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
