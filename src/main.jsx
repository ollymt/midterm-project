import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BookingProvider } from './contexts/BookingContext.jsx'
import { FakeAuthProvider } from './contexts/FakeAuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <FakeAuthProvider>
        <BookingProvider>
            <App />
        </BookingProvider>
        </FakeAuthProvider>
    </StrictMode>,
)
