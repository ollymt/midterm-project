// contexts/BookingContext.jsx
import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useLocalStorage("selectedTimeSlot", "")
  const [bookings, setBookings] = useLocalStorage("bookings", [])

  const addBooking = (spaceId) => {
    const newBooking = { spaceId, time: selectedTimeSlot }
    setBookings([...bookings, newBooking])
  }

  const cancelBooking = (index) => {
    setBookings(bookings.filter((_, i) => i !== index))
  }

  return (
    <BookingContext.Provider
      value={{
        selectedTimeSlot,
        setSelectedTimeSlot,
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