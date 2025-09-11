import './Button.css'

// Button.jsx
export default function Button({ children, onClick, variant = "primary", able = "enabled", extraClass = "", tooltip }) {
    return (
        <button
            onClick={onClick}
            className={`button ${variant} ${able} ${extraClass}`}
            title={tooltip}
        >
            {children}
        </button>
    )
}