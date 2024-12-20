import TopNav from "../components/header/TopNav"
import TopCategory from '../components/header/TopCategory';
import HomeSlider from "../components/HomeSlider";
import HorizontalMenus from "../components/horizontalMenu/HorizontalMenus";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProfile } from "../features/profile/profileThunk";
import EditLocation from "../components/popups/EditLocation";
import Footer from '../components/footer/Footer'
import placeholder from '../assets/placeholder.svg'
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
    document.cookie = "uid=9e0c9fae-bd7d-4b59-8a92-801d1d18f053; Max-Age=" + 7 * 24 * 60 * 60 + "; Secure; SameSite=Strict";
    const [showLocation, setShowLocation] = useState(false);
    const dispatch = useDispatch();

    const { data: profile, error, loading } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);



    const handleSubmit = (bool) => {
        setShowLocation(bool);
    }
    return (
        <>
            {
                error &&
                <div className="flex flex-1 justify-center items-center min-h-lvh w-full flex-col bg-[#ebebeb]">
                    {error}
                </div>

            }
            {/* {
                loading && 
                <div className="fixed flex justify-center items-center h-lvh w-full flex-col bg-[#1b1b1b51] z-[999999]">
                    <LoadingSpinner/>
                </div>
            } */}
            {
                !error &&
                <div onClick={() => (setShowLocation(false))} className="flex w-full flex-col bg-[#ebebeb]">
                    <TopNav />
                    <TopCategory />
                    {
                        profile?.map((profile, id) => (
                            <div key={id} className="flex w-full h-24 flex-row justify-center">
                                <div className="flex w-11/12 h-full items-center gap-x-5">
                                    <div className="flex h-14 w-14 items-center rounded-full overflow-hidden">
                                        <img src={JSON?.parse?.(profile?.image)?.publicUrl || placeholder} alt="" className="object-cover w-full h-full" />
                                    </div>
                                    <div className="flex flex-col gap-y-2 relative">
                                        <h2 className="text-2xl font-bold">Welcome back, {profile?.name}</h2>
                                        <div className="text-sm flex items-center">
                                            <div className="flex">
                                                {loading ?
                                                    "Loading..."
                                                    :
                                                    profile?.locationName
                                                }
                                            </div>
                                            <div onClick={(e) => (e.stopPropagation(), setShowLocation(true))} className="text-green-700 text-xs font-bold underline ml-3 cursor-pointer">Edit location</div>
                                        </div>
                                        {
                                            showLocation &&
                                            <EditLocation showPupup={handleSubmit} />
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <HomeSlider />
                    <HorizontalMenus />
                    <Footer />
                </div>
            }
        </>

    )
}

export default Home