import { useState } from 'react'
import './App.css'
import NavBar from './components/Navbar/Navbar'
import HomePage from './pages/homepage/HomePage'
import PlaceDetail from './pages/PlaceDetail/PlaceDetail'
import BookingsPage from './pages/BookingsPage/BookingsPage'
import PRoute from "./components/PRoute/PRoute"
import SigninModal from './components/SigninModal/SigninModal'
import User from './components/User/User'
import Button from './components/Button/Button'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import { Toaster, toast } from 'react-hot-toast'
import { FakeAuthProvider } from './contexts/FakeAuthContext'
import Footer from './components/Footer/Footer'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false) // start closed

    return (
        <>
            <BrowserRouter>
                <SigninModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }} />
                {/* pass setIsModalOpen to NavBar */}
                <NavBar onSignInClick={() => setIsModalOpen(true)} />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/place/:id' element={<PlaceDetail />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='/bookings/' element={<PRoute> <BookingsPage /> </PRoute>} />
                </Routes>

                <Toaster position='bottom-right' reverseOrder={false} />
            </BrowserRouter>
        </>
    )
}

export default App
