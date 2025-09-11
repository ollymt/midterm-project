// contexts/BookingContext.jsx
import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { toast } from 'react-hot-toast'

const BookingContext = createContext()

export function BookingProvider({ children }) {
    const [selectedTimeSlot, setSelectedTimeSlot] = useLocalStorage("selectedTimeSlot", "")
    const [selectedDate, setSelectedDate] = useLocalStorage("selectedDate", "")
    const [bookings, setBookings] = useLocalStorage("bookings", [])

    const addBooking = (spaceId) => {
        const newBooking = {
            spaceId,
            time: selectedTimeSlot,
            date: selectedDate, // include date here
        }
        setBookings([...bookings, newBooking])
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

    const cancelBooking = (index) => {
        setBookings(bookings.filter((_, i) => i !== index))
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