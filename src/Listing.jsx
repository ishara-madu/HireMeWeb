import Footer from "./components/footer/Footer"
import TopNav from "./components/header/TopNav"
import TopBar from "./components/listing/TopBar"
import Keypoints from "./components/listing/Keypoints"
import Description from "./components/listing/Description"
import Worker from "./components/listing/Worker"

function Listing() {
    return (
        <div className="flex h-full min-h-svh item-center justify-center w-full flex-col bg-[#ebebeb]">
            <TopNav/>
            <TopBar/>
            <Keypoints/>
            <Description/>
            <Worker/>
            <Footer/>
        </div>
    )
}

export default Listing