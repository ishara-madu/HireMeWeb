import Footer from "./components/footer/Footer"
import TopNav from "./components/header/TopNav"
import TopBar from "./components/listing/TopBar"
import Keypoints from "./components/listing/Keypoints"
import Description from "./components/listing/Description"
import Worker from "./components/listing/Worker"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { fetchListning } from "./features/listing/listingThunk"


function Listing() {
    const dispatch = useDispatch();
    const location = useLocation();
    const state = location.state;
    const { data, loading, error } = useSelector(state => state.listings);
    useEffect(() => {
        dispatch(fetchListning({ id: state }));
    }, [dispatch, state]);

    const val = Object.values(data)[0];
    
    return (
        <div className="flex h-full min-h-svh item-center justify-center w-full flex-col bg-[#ebebeb]">
            <TopNav/>
            <TopBar data={val}/>
            <Keypoints />
            <Description />
            <Worker />
            <Footer/>
        </div>
    )
}

export default Listing