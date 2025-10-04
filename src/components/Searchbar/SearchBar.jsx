// components/SearchBar.jsx
import "./SearchBar.css"

export default function SearchBar({ searchQuery, setSearchQuery, className }) {
    return (
        <div className={`searchbar-cont ${className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#13678A" className="bi bi-search" viewBox="0 0 16 16" style={{ color: "#D94F04" }}>
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <input
                type="text"
                placeholder="where are u going?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-field"
            />
        </div>
    )
}