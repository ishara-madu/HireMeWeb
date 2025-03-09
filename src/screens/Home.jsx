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
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();
    // Cookies.set('uid', '08d4f45c-d25f-45ea-a2b7-8765ac430cf6', { expires: 7 });
    const [showLocation, setShowLocation] = useState(false);
    const dispatch = useDispatch();

    const { data: profile, error, loading } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);


    useEffect(() => {
        if (
            !Cookies.get("uid")
        ) {
            navigate("signin")
        }
    }, [])

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