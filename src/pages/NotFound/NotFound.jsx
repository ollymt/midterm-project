import Button from "../../components/Button/Button"
import Footer from "../../components/Footer/Footer"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <div className="detail-backdrop">
            <div className="detail-cont detail-cont-error">
                <div className="four-oh-four-cont">
                    <h1 className="error-icon">4🫥4</h1>
                    <h2 className="error-message">this page don't exist 😭</h2>
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
    )
}