import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useBooking } from "../../contexts/BookingContext"
import Dropdown from "../../components/Dropdown/Dropdown"
import Button from "../../components/Button/Button"
import './PlaceDetail.css'
import MyDatePicker from "../../components/DatePicker/DatePicker"
import { toast } from "react-hot-toast"
import { useFakeAuth } from "../../contexts/FakeAuthContext"

import errorSound from "../../../public/audio/error.mp3"

export default function PlaceDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [place, setPlace] = useState(null)
    const { selectedTimeSlot, setSelectedTimeSlot, selectedDate, setSelectedDate, addBooking, bookings } = useBooking()
    const { user } = useFakeAuth()
    const [isModalOpen, setIsModalOpen] = useState(false) // start closed

    const isAlreadyBooked = bookings.some(
        b =>
            b.username === user?.username &&
            b.id === place?.id &&
            b.date === selectedDate &&
            b.time === selectedTimeSlot &&
            b.status === "active" // only active bookings count
    )

    function handleErrorFeedback() {
        const sound = new Audio(errorSound)
        sound.play()
    }

    useEffect(() => {
        fetch("/data/places.json")
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p.id === parseInt(id))
                setPlace(found)
            })
            .catch(err => console.error("error loading places.json", err))
    }, [id])

    const handleClose = () => {
        navigate(-1)
    }

    const handleBooking = () => {
        addBooking(place)
        console.log(`Booking to place id ${place.id} success!`)
    }

    useEffect(() => {
        fetch("/data/places.json")
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p.id === parseInt(id))
                setPlace(found)

                // reset time and date when loading a new place
                setSelectedTimeSlot("")
                setSelectedDate("")
            })
            .catch(err => console.error("error loading places.json", err))
    }, [id])


    if (!place) return (
        <>
            <div className="detail-backdrop">
                <div className="detail-cont detail-cont-error">
                    <div className="four-oh-four-cont">
                        <h1 className="error-icon">4🫥4</h1>
                        <h2 className="error-message">this place don't exist 😭</h2>
                    </div>
                    <Button
                        variant="secondary"
                        children={<p>🏠</p>}
                        extraClass="detail-close-button"
                        onClick={() => (navigate("/"))}
                    />
                </div>
            </div>
        </>
    )

    return (
        <>
            <div className="detail-backdrop">
                <div className="detail-cont detail-loaded">
                    <div className="card-img-cont">
                        <img src={place.main_image} className="card-img-expanded" />
                    </div>
                    <div className="detail-info-cont-cont">
                        <div className="detail-info-cont-l">
                            <div className="detail-name-cont">
                                <h1 className="title-h1">{place.name}</h1>
                                <h2 className="subtitle-h2">{place.location}</h2>
                                <h3 className="price-h3">Price: {place.price}</h3>
                            </div>
                            <div className="desc-cont">
                                <p>{place.description}</p>
                            </div>
                        </div>
                        <div className="detail-info-cont-r">
                            <div className="detail-amenity-cont">
                                <h2 className="subtitle-h2">Amenities</h2>
                                <ul className="detail-amenity-list">
                                    {place.amenities.map((amenity, index) => (
                                        <li key={index}>{amenity}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="detail-time-cont">
                                <h2 className="subtitle-h2">Hours: {place.hours}</h2>

                                {/* pass handler down */}
                                <MyDatePicker
                                    onSelect={setSelectedDate}
                                />

                                <Dropdown
                                    items={place.time_slots}
                                    onSelect={setSelectedTimeSlot}
                                />

                                <p style={{ marginTop: "8px" }}>Bookings cannot be made on the same day.</p>

                                {user ? (
                                    <Button
                                        children={
                                            <p>
                                                {isAlreadyBooked ? "📚 Already booked" : (selectedTimeSlot && selectedDate) ? "📖 Book" : "🕞 Pick date and time slot first"}
                                            </p>
                                        }
                                        able={isAlreadyBooked ? "disabled" : (selectedTimeSlot && selectedDate) ? "enabled" : "disabled"}
                                        variant={isAlreadyBooked ? "secondary" : (selectedTimeSlot && selectedDate) ? "primary" : "secondary"}
                                        extraClass="book-button"
                                        onClick={
                                            isAlreadyBooked ? () => {
                                                handleErrorFeedback()
                                                toast("Already booked", {
                                                    icon: "📚",
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
                                            } :
                                                (selectedTimeSlot && selectedDate)
                                                    ? handleBooking
                                                    : () => {
                                                        handleErrorFeedback()
                                                        toast.error("Pick date and time first", {
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
                                        }
                                    />
                                ) : (
                                    <Button children={<p>🔑 Sign-in to book</p>} able="disabled" variant="primary" disabled onClick={
                                        () => {
                                            handleErrorFeedback()
                                            toast.error("Sign-in first", {
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
                                    } extraClass="book-button" />
                                )}
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="secondary"
                        children={<p>❌</p>}
                        extraClass="detail-close-button"
                        onClick={handleClose}
                    />
                </div>
            </div>
        </>
    )
}
