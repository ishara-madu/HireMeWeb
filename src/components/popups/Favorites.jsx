/* eslint-disable react/prop-types */
import LazyLoad from "react-lazyload"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from '../../features/favorites/favoritesThunk';
import LoadingSpinner from '../LoadingSpinner';
import { Link } from "react-router-dom";
import placeholder from '../../assets/placeholder.svg'
function Favorites() {
    const dispatch = useDispatch();

    const { data: favorites, loading } = useSelector((state) => state.favorites);


    useEffect(() => {
        const fevIds = JSON.parse(localStorage.getItem("favorites")) || [];
        dispatch(fetchFavorites(fevIds));
    }, [dispatch]);

    return (
        <div className="flex justify-center w-80 h-auto absolute border shadow-xl border-[#c5c5c5] rounded-md top-[84px] right-36 z-50 bg-[#ebebeb]">
            <div className="flex w-11/12 h-auto flex-col">

                {
                    favorites.length !== 0 ?
                        (
                            <>
                                <div className="flex flex-col h-auto max-h-[500px] w-full overflow-y-auto">
                                    {
                                        favorites.map((val, id) =>
                                            <div key={id} className="flex w-full flex-col pt-3 border-b border-[#c5c5c5]">
                                                <div className="flex h-16 items-center gap-x-2">
                                                    <div className="flex w-14 h-14 rounded-sm justify-center items-center overflow-hidden">
                                                        <LazyLoad height={56} once>
                                                            <img src={val.image || placeholder} alt="Profile Pic" className="object-contain w-full h-full rounded-sm" />
                                                        </LazyLoad>
                                                    </div>
                                                    <div className="flex h-full flex-col justify-center items-start">
                                                        <div className="flex justify-center items-center text-base  font-semibold">{val.title}</div>
                                                        <div className="flex justify-center items-center text-xs opacity-60">{val.users.name}</div>
                                                    </div>
                                                </div>
                                                <div className="flex h-12 w-full justify-center items-center">
                                                    <a href={`tel:${val.users.contact.phone}}`} onClick={() => { navigator.clipboard.writeText(val.users.contact.phone).then(alert('Mobile number copy to clipboard')) }} className="flex w-[95%] h-[70%] text-sm justify-center font-semibold items-center border border-black rounded-sm">
                                                        Ring mobile
                                                    </a>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="flex h-14 w-full">
                                    <div className="flex justify-center items-center w-full h-full">
                                        <Link to={'/favorites'} className="flex w-[95%] h-[70%] text-sm justify-center font-semibold items-center bg-[#171717] text-[#ebebeb] rounded-sm">
                                            Go to favorites
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )
                        :
                        loading ?
                            (
                                <div className="flex w-full justify-center items-center h-14">
                                <LoadingSpinner val={20}/>
                            </div>
                            ) :
                            (<div className="flex w-full h-14">
                                <div className="flex w-full h-full justify-center items-center text-sm text-gray-600">Your favorite is empty.</div>
                            </div>
                            )
                }

            </div>
        </div>
    )
}

export default Favorites