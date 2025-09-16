import { useBooking } from "../../contexts/BookingContext"
import { useFakeAuth } from "../../contexts/FakeAuthContext"
import { useState } from 'react'
import Button from "../../components/Button/Button"
import './BookingsPage.css'
import Footer from "../../components/Footer/Footer"
import BookingPass from "../../components/BookingPass/BookingPass"

export default function BookingsPage() {
    const { bookings, cancelBooking } = useBooking()
    const { user } = useFakeAuth()
    const [confirmIndex, setConfirmIndex] = useState(null)

    if (!user) {
        return (
            <div style={{ paddingTop: "80px", backgroundColor: "#CEF0FF", height: "100vh" }}>
                <h2>You're not signed in 😭</h2>
                <p>Please sign in to see your bookings.</p>
            </div>
        )
    }

    const activeBookings = bookings.filter(b => (b.username === user.username) && (b.status === "active"))
    const inactiveBookings = bookings.filter(b => (b.username === user.username) && (b.status !== "active"))

    return (
        <div className="bookings-page-cont">
            <h1 style={{ textAlign: "center" }}>📚 My Bookings</h1>
            {(activeBookings.length === 0 && inactiveBookings.length === 0) ? (
                <div className="no-bookings-alert" style={{textAlign: "center", marginTop: "10rem"}}>
                    <h1 className="no-recipe-img">🦗</h1>
                    <p style={{fontSize: "20px"}}>You have no bookings yet 😭</p>
                </div>
            ) : (null)}

            {activeBookings.length > 0 && (
                <>
                    <h2 style={{textAlign: "center", marginTop: "3rem"}}>Active Bookings</h2>
                    <div className="bookings-cont">
                        {activeBookings.map((b, index) => (
                            <BookingPass
                                key={b.bookedAt}
                                booking={b}
                                index={index}
                                isInactive={false}
                            />
                        ))}
                    </div>
                </>
            )}

            {inactiveBookings.length > 0 && (
                <>
                    <h2 style={{textAlign: "center", marginTop: "3rem"}}>Inactive Bookings</h2>
                    <div className="bookings-cont">
                        {inactiveBookings.map((b, index) => (
                            <BookingPass
                                key={b.bookedAt}
                                booking={b}
                                index={index}
                                isInactive={true} // no cancel button for these
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
