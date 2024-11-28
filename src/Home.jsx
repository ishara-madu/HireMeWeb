import TopNav from "./components/TopNav"
import TopCategory from './components/TopCategory';
import HomeSlider from "./components/HomeSlider";
import HorizontalMenus from "./components/horizontalMenu/HorizontalMenus";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProfile } from "./features/profile/profileThunk";
import { getFormattedLocationFromCoordinates } from "./util/getLocation";
import EditLocation from "./components/popups/EditLocation";


function Home() {
    document.cookie = "uid=08d4f45c-d25f-45ea-a2b7-8765ac430cf6; Max-Age=" + 7 * 24 * 60 * 60 + "; Secure; SameSite=Strict";
    const dispatch = useDispatch();
    const [location, setLocation] = useState(null);
    const [showLocation, setShowLocation] = useState(false);

    const profile = useSelector((state) => state.profile.data);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        const fetchLocation = async () => {
            const num = profile.map(profile => `${profile.latitude},${profile.longitude}`)
            const locationData = await getFormattedLocationFromCoordinates(num);
            setLocation(locationData.formattedAddress);
        };
        fetchLocation();
        sessionStorage.setItem('history', JSON.stringify((profile.map(history => history.searchHistory.history).flat())));
    }, [profile]);

    const handleSubmit = (bool) => {
        setShowLocation(bool);
    }
    return (
        <div onClick={()=>(setShowLocation(false))} className="flex w-full flex-col bg-[#ebebeb]">
            <TopNav profile={profile} />
            <TopCategory />
            {
                profile.map(profile => (
                    <div key={profile} className="flex w-full h-24 flex-row justify-center">
                        <div className="flex w-11/12 h-full items-center gap-x-5">
                            <div className="flex h-14 w-14 items-center rounded-full overflow-hidden">
                                <img src={profile.image} alt="" className="object-cover w-full h-full" />
                            </div>
                            <div className="flex flex-col gap-y-2 relative">
                                <h2 className="text-2xl font-bold">Welcome back, {profile.name}</h2>
                                <p className="text-sm flex items-center">{location} <p onClick={(e)=>(e.stopPropagation(),setShowLocation(true))} className="text-purple-800 text-xs font-bold underline ml-3">Edit location temparary for better result</p></p>
                                {
                                    showLocation &&
                                    <EditLocation location={location} showPupup={handleSubmit}/>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
            <HomeSlider />
            <HorizontalMenus />
        </div>
    )
}

export default Home