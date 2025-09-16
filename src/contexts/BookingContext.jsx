// contexts/BookingContext.jsx
import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { toast } from 'react-hot-toast'
import successSound from "../../public/audio/success.mp3"
import { useFakeAuth } from "./FakeAuthContext"

const BookingContext = createContext()

export function BookingProvider({ children }) {
    const [selectedTimeSlot, setSelectedTimeSlot] = useLocalStorage("selectedTimeSlot", "")
    const [selectedDate, setSelectedDate] = useLocalStorage("selectedDate", "")
    const [bookings, setBookings] = useLocalStorage("bookings", [])

    const { user } = useFakeAuth()


    function handleSuccessFeedback() {
        const sound = new Audio(successSound)
        sound.play()
    }

    const addBooking = (place) => {
        if (!user) return
        const newBooking = {
            id: place.id,
            name: place.name,
            location: place.location,
            price: place.price,
            time: selectedTimeSlot,
            date: selectedDate,
            username: user.username,
            bookedAt: (Math.floor(Date.now() / 1000 * Math.random())),
            status: "active", // 👈 add this
        }

        setBookings([...bookings, newBooking])
        handleSuccessFeedback()
        toast(`Successfully Booked!`, {
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
    }

    const cancelBooking = (bookedAtToCancel) => {
        const updatedBookings = bookings.map(b =>
            b.bookedAt === bookedAtToCancel ? { ...b, status: "canceled" } : b
        )
        setBookings(updatedBookings)
        handleSuccessFeedback()
        toast(`Canceled Booking`, {
            icon: '😔',
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

    return (
        <BookingContext.Provider
            value={{
                selectedTimeSlot,
                setSelectedTimeSlot,
                selectedDate,
                setSelectedDate,
                bookings,
                addBooking,
                cancelBooking
            }}
        >
            {children}
        </BookingContext.Provider>
    )
}

export function useBooking() {
    return useContext(BookingContext)
}