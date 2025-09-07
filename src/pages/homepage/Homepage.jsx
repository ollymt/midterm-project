import HomeGrid from "../../components/HomeGrid/HomeGrid";
import SearchBar from "../../components/Searchbar/SearchBar";

export default function HomePage() {
    return (
        <>
            <div style={{marginTop: "80px"}} />
            <SearchBar />
            <HomeGrid />
        </>
    )
}