import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useBooking } from "../../contexts/BookingContext"
import Dropdown from "../../components/Dropdown/Dropdown"
import Button from "../../components/Button/Button"
import './PlaceDetail.css'
import Footer from "../../components/Footer/Footer"

export default function PlaceDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [place, setPlace] = useState(null)
    const { selectedTimeSlot, setSelectedTimeSlot } = useBooking()

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

                    <Footer extraClass="place-detail-footer" />
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
                                <Dropdown
                                    items={place.time_slots}
                                    onSelect={setSelectedTimeSlot}
                                />

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

                    <Footer extraClass="place-detail-footer" />
                </div>
            </div>
        </>
    )
}
