/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { IoHeartOutline, IoNotificationsOutline } from "react-icons/io5"
import LazyLoad from "react-lazyload";
import Profile from "../popups/profile";
import Notifications from "../popups/Notifications";
import Favorites from "../popups/Favorites";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../features/profile/profileThunk";
import { useLocation, useNavigate } from "react-router-dom";

function TopNav() {
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

    const handleSearch = (e) => {
        e.preventDefault(); 
        if (searchText.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchText)}`);
        }
    };
    return (
        <div id="nav" className="flex w-full h-20 border-b border-[#c5c5c5] shadow-lg shadow-[#bcbcbc] justify-center items-center bg-[#ebebeb]">
            <form onSubmit={handleSearch} className="flex flex-row w-11/12 h-full justify-between items-center gap-x-10">
                <div onClick={()=>{navigate('/',{replace:true})}} className="cursor-pointer text-xl">Logo</div>
                <div className="flex flex-1 relative items-center">
                    <CiSearch size={20} className="absolute left-3" />
                    <input type="text" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} className="text-sm w-full h-12 rounded-full px-10 flex font-normal outline-none border border-black" placeholder="Search for anything" />
                </div>
                {
                    profile.map(profile => (
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
                            <div onMouseOver={() => { setShowProfile(true) }} onMouseLeave={() => { setShowProfile(false) }} className="flex w-10 h-10 justify-center items-center rounded-full overflow-hidden cursor-pointer">
                                <LazyLoad height={40} once>
                                    <img src={profile.image} alt="profile image" className="h-full w-full object-cover" />
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