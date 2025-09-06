import { useEffect, useState } from "react"
import './Card.css'

export default function Card({ title = "title", subtitle = "subtitle", body = "body", image }) {

    return (
        <div className="card">
            <img src={image} className="card-img" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle">{subtitle}</h6>
                <p className="card-text">{body}</p>
            </div>
        </div>
    )
}