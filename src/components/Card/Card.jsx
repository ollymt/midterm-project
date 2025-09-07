import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useBooking } from "../../contexts/BookingContext"
import './Card.css'
import Dropdown from "../Dropdown/Dropdown"
import Button from "../Button/Button"

export default function Card({ prevPage = "/", id, title = "title", subtitle = "subtitle", body = "body", image, price = "$$$", amenities, hours = "idk", time_slots }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const { selectedTimeSlot } = useBooking()

    const navigate = useNavigate()

    const handleOpen = () => {
        navigate(`/place/${id}`, { replace: false })
        setIsExpanded(true)
    }

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden"; // lock background
        } else {
            document.body.style.overflow = "auto";   // unlock
        }

        return () => {
            document.body.style.overflow = "auto";   // cleanup on unmount
        }
    }, [isExpanded]);


    const handleClose = () => {
        navigate(prevPage, { replace: false })
        setIsExpanded(false)
    }

    return (
        <>
            <div className={`card ${isExpanded ? "expanded" : ""}`} onClick={handleOpen}>
                <img src={image} className="card-img" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle">{subtitle}</h6>
                    <p className="card-text">{body}</p>
                </div>
            </div>

            {isExpanded && (
                <div className="detail-backdrop" onClick={handleClose}>
                    <div className="detail-cont" onClick={(e) => (e.stopPropagation())}>
                        <div className="card-img-cont">
                            <img src={image} className="card-img-expanded" />
                        </div>
                        <div className="detail-info-cont-cont">
                            <div className="detail-info-cont-l">
                                <div className="detail-name-cont">
                                    <h1 className="title-h1">{title}</h1>
                                    <h2 className="subtitle-h2">{subtitle}</h2>
                                    <h3 className="price-h3">Price: {price}</h3>
                                </div>
                                <div className="desc-cont">
                                    <p>{body}</p>
                                </div>
                            </div>
                            <div className="detail-info-cont-r">
                                <div className="detail-amenity-cont">
                                    <h2 className="subtitle-h2">Amenities</h2>
                                    <ul className="detail-amenity-list">
                                        {amenities.map((amenity, index) => (
                                            <li key={index}>{amenity}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="detail-time-cont">
                                    <h2 className="subtitle-h2">Hours: {hours}</h2>
                                    <Dropdown items={time_slots} />
                                    <Button
                                        children={<p>{selectedTimeSlot ? "📖 Book" : "🕞 Pick a time slot first"}</p>}
                                        able={selectedTimeSlot ? "enabled" : "disabled"}
                                        variant={selectedTimeSlot ? "primary" : "secondary"}
                                        extraClass="book-button"
                                    />
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
            )}
        </>
    )
}