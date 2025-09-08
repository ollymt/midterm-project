import Footer from "../../components/Footer/Footer";
import HomeGrid from "../../components/HomeGrid/HomeGrid";
import SearchBar from "../../components/Searchbar/SearchBar";

export default function HomePage() {
    return (
        <>
            <div style={{ paddingTop: "80px", backgroundColor: "#CEF0FF"}}>
                <SearchBar />
                <HomeGrid />
                <Footer />
            </div>
        </>
    )
}