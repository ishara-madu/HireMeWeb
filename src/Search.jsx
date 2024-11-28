import Footer from "./components/footer/Footer"
import TopNav from "./components/header/TopNav"
import SearchContent from "./components/search/SearchContent"

function Search() {
    return (
        <div className="flex h-auto min-h-svh item-center w-full flex-col bg-[#ebebeb]">
            <TopNav/>
            <SearchContent/>
            {/* <Footer/> */}
        </div>
    )
}

export default Search