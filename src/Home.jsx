import TopNav from "./components/TopNav"
import TopCategory from './components/TopCategory';
import profile from './assets/profile.jpg'
import HomeSlider from "./components/HomeSlider";

function Home() {

    return (
        <div className="flex w-full flex-col bg-[#ebebeb]">
            <TopNav />
            <TopCategory />
            <div className="flex w-full h-24 flex-row justify-center">
                <div className="flex w-11/12 h-full items-center gap-x-5">
                    <div className="flex h-14 w-14 items-center rounded-full overflow-hidden">
                        <img src={profile} alt="" className="object-cover w-full h-full" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Welcome back, Ishara Madushanka</h2>
                    </div>
                </div>
            </div>
            <HomeSlider/>
        </div>
    )
}

export default Home