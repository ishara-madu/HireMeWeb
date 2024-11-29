import TopNav from "./components/header/TopNav"
import TopCategory from './components/header/TopCategory';
import HomeSlider from "./components/HomeSlider";
import HorizontalMenus from "./components/horizontalMenu/HorizontalMenus";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProfile } from "./features/profile/profileThunk";
import EditLocation from "./components/popups/EditLocation";
import Footer from './components/footer/Footer'


function Home() {
    document.cookie = "uid=08d4f45c-d25f-45ea-a2b7-8765ac430cf6; Max-Age=" + 7 * 24 * 60 * 60 + "; Secure; SameSite=Strict";
    const [showLocation, setShowLocation] = useState(false);
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile.data);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        sessionStorage.setItem('history', JSON.stringify((profile.map(history => history.searchHistory.history).flat())));
    }, [profile]);

    const handleSubmit = (bool) => {
        setShowLocation(bool);
    }
    return (
        <div onClick={()=>(setShowLocation(false))} className="flex w-full flex-col bg-[#ebebeb]">
            <TopNav />
            <TopCategory />
            {
                profile.map((profile,id) => (
                    <div key={id} className="flex w-full h-24 flex-row justify-center">
                        <div className="flex w-11/12 h-full items-center gap-x-5">
                            <div className="flex h-14 w-14 items-center rounded-full overflow-hidden">
                                <img src={profile.image} alt="" className="object-cover w-full h-full" />
                            </div>
                            <div className="flex flex-col gap-y-2 relative">
                                <h2 className="text-2xl font-bold">Welcome back, {profile.name}</h2>
                                <div className="text-sm flex items-center">{profile.locationName} <div onClick={(e)=>(e.stopPropagation(),setShowLocation(true))} className="text-purple-800 text-xs font-bold underline ml-3">Edit location temparary for better result</div></div>
                                {
                                    showLocation &&
                                    <EditLocation location={profile} showPupup={handleSubmit}/>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
            <HomeSlider />
            <HorizontalMenus />
            <Footer/>
        </div>
    )
}

export default Home