import { useEffect, useMemo, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchResult } from "../../features/search/searchThunk";
import LoadingSpinner from "../LoadingSpinner";

function SearchResult() {
    const [fevId, setFavId] = useState([""]);
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.search.filters);
    const { results, loading, error } = useSelector((state) => state.search);

    const sortedResults = useMemo(() => {
        return results
            ? [...results].sort((a, b) => {
                const sumA = a.users.rating.rating.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                const sumB = b.users.rating.rating.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                return sumB - sumA;  
            })
            : [];
    }, [results]);

    useEffect(() => {
        if (filters.searchResult || filters.location) {
            dispatch(fetchResult(filters));
        }

    }, [dispatch, filters]);


    // eslint-disable-next-line react/prop-types
    const StarIcons = ({ value, size }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (value >= i) {
                stars.push(<MdOutlineStarPurple500 color='' key={i} size={size} />);
            } else if (value >= i - 0.5) {
                stars.push(<MdOutlineStarHalf key={i} size={size} />);
            } else {
                stars.push(<MdOutlineStarOutline key={i} size={size} />);
            }
        }

        return <>{stars}</>;
    };

    const fev = JSON.parse(localStorage.getItem("favorites")) || [""];
    const handleFavorites = (favId) => {
        const included = fev.includes(favId);
        if (!included) {
            setFavId([favId])
            fev.push(favId);
            localStorage.setItem("favorites", JSON.stringify(fev));
        } else {
            setFavId([""])
            const index = fev.indexOf(favId);
            fev.splice(index, 1); // Remove the value at the found index
            localStorage.setItem("favorites", JSON.stringify(fev));
        }
    }
    return (
        <div className="flex flex-1 flex-col pl-4">
            {loading && <LoadingSpinner />}
            {error && <p>Error: {error}</p>}
            {sortedResults.length === 0 && !loading && <p className="flex justify-center items-center">No results found.</p>}
            {
                !loading &&
                sortedResults.map((result, id) => (
                    <div key={id} className="flex w-full gap-x-3 items-center py-3 h-48 max-h-auto border-b border-[#c5c5c5] relative">
                        <div className="flex w-60 h-40 border border-[#c5c5c5] overflow-hidden rounded-md">
                            <img src="" alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col gap-y-0.5 justify-start h-auto min-h-40">
                            <div className="flex text-base font-semibold">{result.title}</div>
                            <div className="flex text-sm font-normal opacity-70">{result.description.short}</div>
                            <div className="flex text-xs font-normal opacity-60">{result.users.name}</div>
                            <div className='flex items-center gap-x-1'>
                                <p className='font-semibold text-sm'>{result.users.rating.perc}</p>
                                <div className='flex items-center'>
                                    <StarIcons value={result.users.rating.perc} size={15} />
                                </div>
                                <p className='text-xs opacity-60'>{`(${(result.users.rating.rating).reduce((accumulator, currentValue) => accumulator + currentValue, 0)})`}</p>
                            </div>
                            <div className="flex text-xs opacity-60 gap-x-1">
                                <CiLocationOn size={15} />
                                {result.users.locationName}
                            </div>
                            <div className="flex text-xs opacity-60">
                                {result.tags.tagList.join(", ")}
                            </div>
                        </div>

                        <div className='flex gap-x-3 absolute right-0 bottom-3'>
                            <a href={`tel:${'data.users.contact.phone'}}`} onClick={() => { navigator.clipboard.writeText('data.users.contact.phone').then(alert('Mobile number copy to clipboard')) }} className='flex h-12 w-52 bg-purple-500 justify-center items-center rounded-sm text-base font-bold text-[#ebebeb]'>Mobile</a>
                            <div onClick={() => {
                                handleFavorites('data.id')
                            }} className='p-[10px] border border-black hover:bg-[#e0e1e1] rounded-full'>
                                {
                                    (fev.includes('data.id') || fevId.includes('data.id')) ? (
                                        <IoHeart size={24} color="red" />
                                    ) : (
                                        <IoHeartOutline size={24} color="black" />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default SearchResult