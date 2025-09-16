import Button from "../Button/Button";
import { useState } from "react";
import { useBooking } from "../../contexts/BookingContext";
import { useFakeAuth } from "../../contexts/FakeAuthContext";
import './BookingPass.css'

export default function BookingPass({ booking, index, isInactive }) {
    const { bookings, cancelBooking } = useBooking();
    const { user } = useFakeAuth();
    const [confirm, setConfirm] = useState(null);

    return (
        <div className="booking-card">
            <div className="booking-info-cont-row-header">
                <h1>STUDYSPOT Pass</h1>
            </div>
            <div className="main-booking-info-cont">
                <div className="booking-info-cont-1">
                    <div className="booking-info-cont-row">
                        <div className="booking-info">
                            <p className="booking-info-label-cont">Name</p>
                            <p className="booking-info-field-cont">{user.username}</p>
                        </div>
                        <div className="booking-info">
                            <p className="booking-info-label-cont">Date</p>
                            <p className="booking-info-field-cont">{new Date(booking.date).toDateString()}</p>
                        </div>
                        <div className="booking-info">
                            <p className="booking-info-label-cont">Time Slot</p>
                            <p className="booking-info-field-cont">{booking.time}</p>
                        </div>
                    </div>
                    <div className="booking-info-cont-row">
                        <div className="booking-info">
                            <p className="booking-info-label-cont">STUDYSPOT Name</p>
                            <p className="booking-info-field-cont">{booking.name}</p>
                        </div>
                        <div className="booking-info">
                            <p className="booking-info-label-cont">STUDYSPOT Location</p>
                            <p className="booking-info-field-cont">{booking.location}</p>
                        </div>
                    </div>
                    <div className="booking-info-cont-row">
                        <div className="booking-info">
                            <p className="booking-info-label-cont">Booking ID</p>
                            <p className="booking-info-field-cont">{booking.bookedAt}</p>
                        </div>
                    </div>
                </div>

                <div className="booking-info-cont-3">
                    <h1 className="booking-barcode">{booking.bookedAt}</h1>
                </div>

                <div className="booking-info-cont-2">
                    <div className="booking-info-cont-row">
                        <div className="booking-info">
                            <p className="booking-info-label-cont">Date</p>
                            <p className="booking-info-field-cont">{new Date(booking.date).toDateString()}</p>
                        </div>
                        <div className="booking-info">
                            <p className="booking-info-label-cont">Time Slot</p>
                            <p className="booking-info-field-cont">{booking.time}</p>
                        </div>
                    </div>
                    <div className="booking-info-cont-row">
                        <div className="booking-info">
                            <p className="booking-info-label-cont">ID</p>
                            <p className="booking-info-field-cont">{booking.id}</p>
                        </div>
                        <div className="booking-info">
                            <p className="booking-info-label-cont">Location</p>
                            <p className="booking-info-field-cont">{booking.location}</p>
                        </div>
                    </div>
                    <div className="booking-info-cont-row">
                        <h1 className="booking-barcode-2">{booking.bookedAt}</h1>
                    </div>

                    {!isInactive && (
                        <div className="booking-info-cont-row cancel">
                            {confirm ? (
                                <div className="confirm-dialog">
                                    <p>are you sure you wanna cancel this booking? 😭</p>
                                    <Button
                                        onClick={() => { cancelBooking(booking.bookedAt); setConfirm(false);}}
                                        children={<p>✅ Yes</p>}
                                        variant="secondary"
                                    />
                                    <Button
                                        onClick={() => setConfirm(false)}
                                        children={<p>❌ No</p>}
                                        variant="primary"
                                    />
                                </div>
                            ) : (
                                <Button onClick={() => setConfirm(true)} variant="secondary">
                                    🚫 Cancel
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}