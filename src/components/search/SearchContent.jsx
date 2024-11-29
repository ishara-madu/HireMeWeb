import { MdFilterList } from "react-icons/md"
import Filter from "../popups/Filter"
import SearchResult from "./SearchResult"
import { FaAngleDown } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setFilters } from "../../features/search/searchSlice"

function SearchContent() {
    const [showFilter, setShowFilter] = useState(true);
    const [showSort, setShowSort] = useState(false);
    const [currentSortValue, setCurrentSortValue] = useState('Most Relevent');
    const dispatch = useDispatch();
    const  filters  = useSelector((state) => state.search);
    const path = useLocation();
    const queryParams = new URLSearchParams(path.search);
    const query = queryParams.get("query");
    useEffect(()=>{
        dispatch(setFilters({ ...filters, searchResult: query }));        
    },[query,dispatch])

    return (
        <div onClick={() => setShowSort(false)} className="flex-1 flex-col flex items-center mt-10">
            <div className="flex w-full justify-center">
                <div className="flex w-11/12 flex-col">
                    <div className="w-full text-3xl font-bold">
                        10,000 results for “{query}”
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <div onClick={(e) => e.stopPropagation()} className="flex gap-x-2 mt-5">
                            <div onClick={() => { setShowFilter(prev => !prev); }} className="flex cursor-pointer w-20 h-12 border border-black justify-center text-sm items-center font-semibold">
                                <MdFilterList size={20} />&nbsp;Filter
                            </div>
                            <div onClick={() => { setShowSort(prev => !prev) }} className="flex w-52 h-12 border border-black items-center justify-center relative">
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className="flex text-xs w-11/12 opacity-60 justify-start">Sort by</div>
                                    <div className="flex flex-1 justify-center items-center">
                                        {currentSortValue}
                                    </div>
                                </div>
                                <div className="flex justify-center items-center w-10 h-full">
                                    <FaAngleDown />
                                </div>
                                {
                                    showSort &&
                                    <div className="absolute flex-col pl-5 top-5 flex w-full bg-[#e0e1e1] h-auto py-3 border border-[#9c9b9b] rounded-sm shadow-2xl shadow-black z-20">
                                        <div onClick={(e) => setCurrentSortValue(e.target.innerText)} className="flex py-1">
                                            Most Relavant
                                        </div>
                                        <div onClick={(e) => setCurrentSortValue(e.target.innerText)} className="flex py-1">
                                            Most Reviewed
                                        </div>
                                        <div onClick={(e) => setCurrentSortValue(e.target.innerText)} className="flex py-1">
                                            Highest Rated
                                        </div>
                                        <div onClick={(e) => setCurrentSortValue(e.target.innerText)} className="flex py-1">
                                            Newest
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                        <div className="flex text-sm opacity-60 font-semibold">10,000 results</div>
                    </div>
                </div>
            </div>
            <div className="flex w-11/12 mt-5 overflow-hidden">
                <Filter showFilter={showFilter} />
                <SearchResult />
            </div>
        </div>
    )
}

export default SearchContent