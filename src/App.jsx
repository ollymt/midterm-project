import { useState } from 'react'
import './App.css'
import NavBar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage/Homepage'
import PlaceDetail from './pages/PlaceDetail/PlaceDetail'
import SigninModal from './components/SigninModal/SigninModal'
import User from './components/User/User'
import Button from './components/Button/Button'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import { Toaster, toast } from 'react-hot-toast'
import { FakeAuthProvider } from './contexts/FakeAuthContext'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false) // start closed

    return (
        <>
            <SigninModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}} />
            {/* pass setIsModalOpen to NavBar */}
            <NavBar onSignInClick={() => setIsModalOpen(true)} />

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/place/:id' element={<PlaceDetail />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>

            <Toaster position='bottom-right' reverseOrder={false} />
        </>
    )
}

export default App
