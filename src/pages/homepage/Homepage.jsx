import Footer from "../../components/Footer/Footer";
import HomeGrid from "../../components/HomeGrid/HomeGrid";
import SearchBar from "../../components/Searchbar/SearchBar";
import { useState } from 'react'

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("")
    return (
        <>
            <div style={{ paddingTop: "80px", backgroundColor: "#CEF0FF"}}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <HomeGrid searchQuery={searchQuery}/>
            </div>
        </>
    )
}