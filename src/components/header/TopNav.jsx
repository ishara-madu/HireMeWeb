/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { IoHeartOutline, IoNotificationsOutline } from "react-icons/io5"
import LazyLoad from "react-lazyload";
import Profile from "../popups/profile";
import Notifications from "../popups/Notifications";
import Favorites from "../popups/Favorites";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../../features/profile/profileThunk";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from '../../assets/logo_black.png'
import { fetchResult } from "../../features/search/searchThunk";
import placeholder from '../../assets/placeholder.svg'
import { filterLocation, setFilters } from "../../features/search/searchSlice";
import { useInterval, useNetworkState } from "react-use";
import { updateOnlineStatue } from "../../features/onlineStatue/onlineStatueThunk";


function TopNav() {
    const networkState = useNetworkState();
    const navigate = useNavigate();
    const path = useLocation();
    const queryParams = new URLSearchParams(path.search);
    const query = queryParams.get("query");
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const [searchText, setSearchText] = useState(query || '');
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile.data);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        const result = async () => {
            await dispatch(fetchResult({ searchResult: searchText }));
            dispatch(setFilters({ searchResult: searchText }));
            await dispatch(filterLocation(JSON?.parse?.(sessionStorage?.getItem?.('coordinates')) || { lat: '', lng: '' }));
        }
        result();

    }, [query]);


    useEffect(() => {

        if (networkState.online) {
            dispatch(updateOnlineStatue({
                id: profile?.[0]?.id,
                updates: {
                    last_seen: new Date().toISOString()
                }
            }))
        }

    }, [dispatch, profile])




    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchText)}`);
        }
        const oldvalues = profile?.[0]?.searchHistory?.history || '';
        const updatedValues = oldvalues.includes(searchText)
            ? oldvalues
            : [...(oldvalues.length >= 10 ? oldvalues.slice(1) : oldvalues), searchText];
        await dispatch(updateProfile(
            {
                searchHistory: {
                    history: updatedValues
                }
            }
        ));
        await dispatch(fetchProfile());
    };
    return (
        <div id="nav" className="flex w-full h-20 border-b border-[#c5c5c5] shadow-lg shadow-[#bcbcbc] justify-center items-center bg-[#ebebeb]">
            <form onSubmit={handleSearch} className="flex flex-row w-11/12 h-full justify-between items-center gap-x-10">
                <div onClick={() => { navigate('/', { replace: true }) }} className="cursor-pointer flex justify-center items-center h-full w-48">
                    <LazyLoad height={50} once className="flex justify-center items-center w-full h-full">
                        <img src={profileImage} alt="logo" className="flex justify-center items-center h-full w-full object-contain" />
                    </LazyLoad>
                </div>
                <div className="flex flex-1 relative items-center">
                    <CiSearch size={20} className="absolute left-3" />
                    <input type="text" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} className="text-sm w-full h-12 rounded-full px-10 flex font-normal outline-none border border-black" placeholder="Search for anything" />
                </div>
                {
                    profile?.map(profile => (
                        <div key={profile} className="flex flex-row gap-x-5 justify-between items-center">
                            <div onMouseOver={() => { setShowFavorites(true) }} onMouseLeave={() => { setShowFavorites(false) }} className="flex justify-center items-center p-2 cursor-pointer"><IoHeartOutline size={24} />
                                {
                                    showFavorites && (
                                        <>
                                            <div className="absolute w-20 h-32 z-50"></div>
                                            <Favorites />
                                        </>
                                    )
                                }
                            </div>
                            {/* <div className="p-2 cursor-pointer"><IoCartOutline size={24} /></div> */}
                            <div onMouseOver={() => { setShowNotifications(true) }} onMouseLeave={() => { setShowNotifications(false) }} className="flex justify-center items-center p-2 cursor-pointer"><IoNotificationsOutline size={24} />
                                {
                                    showNotifications && (
                                        <>
                                            <div className="absolute w-20 h-32"></div>
                                            <Notifications />
                                        </>

                                    )
                                }
                            </div>
                            <div onMouseOver={() => { setShowProfile(true) }} onMouseLeave={() => { setShowProfile(false) }} className="flex w-10 h-10 justify-center items-center rounded-full cursor-pointer">
                                <LazyLoad height={40} once className="relative">
                                    <img src={JSON.parse(profile?.image)?.publicUrl || placeholder} alt="profile image" className="h-10 w-10 object-cover rounded-full" />
                                    <div title="online statue" className={`flex w-3 h-3 ${networkState.online ? 'bg-green-500' : 'bg-red-500'} left-0 top-0 rounded-full absolute`}></div>
                                </LazyLoad>
                                {
                                    showProfile && (
                                        <>
                                            <div className="absolute w-20 h-32"></div>
                                            <Profile profile={profile} />
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }

            </form>
        </div>
    )
}

export default TopNav