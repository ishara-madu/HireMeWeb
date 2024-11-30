import Footer from "./components/footer/Footer"
import TopNav from "./components/header/TopNav"
import TopBar from "./components/worker/TopBar"
import WorkerContent from "./components/worker/WorkerContent"

function Worker() {
    return (
        <div className="flex h-auto min-h-svh item-center w-full flex-col bg-[#ebebeb]">
            <TopNav/>
            <TopBar/>
            <WorkerContent/>
            <Footer/>
        </div>
    )
}

export default Worker