import TopNav from "./components/header/TopNav"
import SearchHeader from "./components/search/SearchHeader"

function Search() {
    return (
        <div className="flex min-h-svh item-center w-full flex-col bg-[#ebebeb]">
            <TopNav/>
            <SearchHeader/>
        </div>
    )
}

export default Search