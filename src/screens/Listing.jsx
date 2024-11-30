import Footer from "../components/footer/Footer"
import TopNav from "../components/header/TopNav"
import TopBar from "../components/listing/TopBar"
import Keypoints from "../components/listing/Keypoints"
import Description from "../components/listing/Description"
import Worker from "../components/listing/Worker"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchListning } from "../features/listing/listingThunk"
import LoadingSpinner from "../components/LoadingSpinner"


function Listing() {
    const dispatch = useDispatch();

    const { data, loading, error, filters } = useSelector(state => state.listings);
    useEffect(() => {
        dispatch(fetchListning(JSON.parse(sessionStorage.getItem("listingFilter"))));
    }, [dispatch, filters]);


    return (
        < >
            {
                loading ?
                    <div className="flex h-full min-h-svh item-center justify-center w-full flex-col bg-[#ebebeb]">
                        {
                            error ?
                                <div className="flex text-black justify-center items-center">{error.message || 'Something wrong try again'}</div>
                                :
                                <LoadingSpinner />
                        }
                    </div>
                    :
                    data.length >! 0 ? 
                    <div className="flex h-full min-h-svh item-center justify-center w-full flex-col bg-[#ebebeb]">
                                <div className="flex text-black justify-center items-center">{'Something wrong try again'}</div>
                    </div>:
                    data.map((data, index) => (
                        <div key={index} className="flex h-full min-h-svh item-center justify-center w-full flex-col bg-[#ebebeb]">
                            <TopNav />
                            <TopBar data={data} />
                            <Keypoints data={data} />
                            <Description data={data} />
                            <Worker data={data} />
                            <Footer />
                        </div>
                    ))
            }
        </>
    )
}

export default Listing