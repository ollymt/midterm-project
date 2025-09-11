import { useNavigate } from "react-router-dom"
import './Card.css'

export default function Card({ id, title = "title", subtitle = "subtitle", body = "body", image }) {
    const navigate = useNavigate()

    const handleClick = () => {
        // push to detail page like /place/1
        console.log(`navigating to place ${id}`)
        navigate(`/place/${id}`)
    }

    return (
        <div className="card" onClick={handleClick}>
            <img src={image} className="card-img" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle">{subtitle}</h6>
                <p className="card-text">{body}</p>
            </div>
        </div>
    )
}