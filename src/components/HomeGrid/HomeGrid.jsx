import { useState, useEffect } from "react"
import Card from "../Card/Card"
import './HomeGrid.css'

export default function HomeGrid({ searchQuery }) {
    const [places, setPlaces] = useState([])

    console.log("fetching data...")
    useEffect(() => {
        fetch("/data/places.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("loaded places:", data)
                setPlaces(data)
            })
    }, [])

    // First filter by favorites if needed, then by search query
    const filteredPlaces = places.filter((place) => {
        if (!place || !place.name) return false // skip broken recipes

        if (!searchQuery) return true // no search, show all

        return place.name.toLowerCase().includes(searchQuery.toLowerCase())
    })


    const breakpointColumnsObj = {
        default: 4,
        1600: 3,
        700: 2,
        500: 1
    }

    return (
        <div style={{ marginTop: "40px", marginBottom: "1rem", padding: "0 20px" }}>
            {filteredPlaces.length === 0 && searchQuery && (
                <div style={{ textAlign: 'center', padding: '40px', userSelect: 'none'}}>
                    <h1 className="no-recipe-img">🫥</h1>
                    <h3>baby im not even here. im a hallucination</h3>
                    <p>"{searchQuery}" did not yield any results</p>
                </div>
            )}

            {filteredPlaces.length === 0 && !searchQuery && (
                <div style={{ textAlign: 'center', padding: '40px', userSelect: 'none'}}>
                    <h1 className="no-recipe-img">🫙</h1>
                    <h3>we got no places 😭</h3>
                    <p>maybe the places didn't load? try refreshing the page</p>
                </div>
            )}

            {filteredPlaces.length > 0 && (
                <div className="main-grid">
                    {filteredPlaces.map((place) => (
                        <Card key={place.id} title={place.name} body={place.description} subtitle={place.location} image={place.main_image}/>
                    ))}
                </div>
            )}
        </div>
    )
}