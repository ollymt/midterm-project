import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Card from "../Card/Card"
import './HomeGrid.css'

export default function HomeGrid({ searchQuery }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [places, setPlaces] = useState([])

    const [modalCardId, setModalCardId] = useState(null)

    useEffect(() => {
        if (id) {
            setModalCardId(Number(id)) // open modal for this card
        } else {
            setModalCardId(null) // close modal if no id in url
        }
    }, [id])

    useEffect(() => {
        fetch("/data/places.json")
            .then((res) => res.json())
            .then((data) => setPlaces(data))
    }, [])

    const filteredPlaces = places.filter((place) => {
        if (!place || !place.name || !place.location) return false
        if (!searchQuery) return true
        return (place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            place.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })

    return (
        <div style={{ marginTop: "40px", paddingBottom: "1rem" }}>
            {filteredPlaces.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', userSelect: 'none', height: "50.5vh" }}>
                    <h1 className="no-recipe-img">
                        {searchQuery ? "🫥" : "🫙"}
                    </h1>
                    <h3>
                        {searchQuery
                            ? "baby im not even here. im a hallucination"
                            : "we got no places 😭"}
                    </h3>
                    <p>
                        {searchQuery
                            ? `"${searchQuery}" did not yield any results`
                            : "maybe the places didn't load? try refreshing the page"}
                    </p>
                </div>
            )}

            {filteredPlaces.length > 0 && (
                <div className="main-grid">
                    {filteredPlaces.map((place) => (
                        <Card
                            key={place.id}
                            id={place.id}
                            prevPage="/"
                            title={place.name}
                            body={place.description}
                            subtitle={place.location}
                            image={place.main_image}
                            price={place.price}
                            amenities={place.amenities}
                            hours={place.hours}
                            time_slots={place.time_slots}
                            isOpen={modalCardId === place.id} // ✅ control open state
                            onClose={() => navigate("/")} // ✅ close goes back to /
                        />
                    ))}
                </div>
            )}
        </div>
    )
}