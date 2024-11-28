import { MdFilterList } from "react-icons/md"
import Filter from "../popups/Filter"
import SearchResult from "./SearchResult"
import { FaAngleDown } from "react-icons/fa"
import { useState } from "react"

function SearchContent() {
    const [showFilter,setShowFilter] = useState(true);
  return (
    <div className="flex-1 flex-col flex items-center mt-10">
         <div className="flex w-full justify-center">
            <div className="flex w-11/12 flex-col">
                <div className="w-full text-3xl font-bold">
                    10,000 results for “react native”
                </div>
                <div className="flex w-full justify-between items-center">
                    <div className="flex gap-x-2 mt-5">
                        <div onClick={()=>setShowFilter(prev=>!prev)} className="flex w-20 h-12 border border-black justify-center text-sm items-center font-semibold">
                            <MdFilterList size={20} />&nbsp;Filter
                        </div>
                        <div className="flex w-52 h-12 border border-black items-center justify-center">
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <div className="flex text-xs w-11/12 opacity-60 justify-start">Sort by</div>
                                <div className="flex flex-1 justify-center items-center">
                                    Newest
                                </div>
                            </div>
                            <div className="flex justify-center items-center w-10 h-full">
                                <FaAngleDown />
                            </div>
                        </div>
                    </div>
                    <div className="flex text-sm opacity-60 font-semibold">10,000 results</div>
                </div>
            </div>
        </div>
        <div className="flex w-11/12 mt-5">
        <Filter showFilter={showFilter}/>
        <SearchResult/>
        </div>
    </div>
  )
}

export default SearchContent