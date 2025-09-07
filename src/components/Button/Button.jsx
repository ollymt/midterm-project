import './Button.css'

// Button.jsx
export default function Button({ children, onClick, variant = "primary", able = "enabled", extraClass = ""}) {
    return (
        <button
            onClick={onClick}
            className={`button ${variant} ${able} ${extraClass}`}
        >
            {children}
        </button>
    )
}