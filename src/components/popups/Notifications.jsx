import { useState } from "react"
import LazyLoad from "react-lazyload";

function Notifications() {
    const [isMainProfile, setIsMainProfile] = useState(true);
    return (
        <div className="flex justify-center w-96 h-auto absolute border shadow-xl border-[#c5c5c5] rounded-md top-[84px] right-20 z-50 bg-[#ebebeb]">
            <div className="flex w-11/12 h-auto flex-col">
                <div className="flex flex-col w-full pt-3 h-auto gap-y-4 items-center border-b border-[#c5c5c5]">
                    <div className="flex h-10 justify-between w-full items-center">
                        <p className="text-lg font-bold">Notifications</p>
                        <button className="text-sm text-purple-500 font-semibold hover:text-purple-700">Settings</button>
                    </div>
                    <div className="flex h-8 justify-around w-full items-center">
                        <button onClick={() => { setIsMainProfile(true) }} className={`flex justify-center items-start text-sm h-full w-1/2 font-semibold hover:text-black ${isMainProfile ? 'text-black border-b-2 border-black' : 'text-gray-600'}`}>Main profile</button>
                        <button onClick={() => { setIsMainProfile(false) }} className={`flex justify-center items-start text-sm h-full w-1/2 font-semibold hover:text-black ${!isMainProfile ? 'text-black border-b-2 border-black' : 'text-gray-600'}`}>Worker profile</button>
                    </div>
                </div>

                <div className="flex w-full h-14">
                    <div className="flex w-full h-full justify-center items-center text-sm text-gray-600">No notifications</div>
                </div>


                {/* <div className="flex flex-col h-80 w-full overflow-y-auto">
                    <div className="flex w-full flex-col py-3 border-b border-[#c5c5c5]">
                        <div className="flex h-14 items-center gap-x-2">
                            <div className="flex w-14 h-14 rounded-full justify-center items-center overflow-hidden">
                                <LazyLoad height={56} once>
                                    <img src="" alt="Profile Pic" className="object-cover w-full h-full rounded-full" />
                                </LazyLoad>
                            </div>
                            <div className="flex h-full flex-col justify-center items-start">
                                <div className="flex justify-center items-center text-base  font-semibold">Name is</div>
                                <div className="flex justify-center items-center text-xs">1 Day ago</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex h-14 w-full">
                    <div className="flex w-1/2 justify-center text-sm text-purple-500 font-semibold hover:text-purple-700 items-center h-full">Mark as read</div>
                    <div className="flex w-1/2 justify-center items-center h-full">
                        <div className="flex w-[95%] h-[70%] text-sm justify-center font-semibold items-center border border-black rounded-sm">
                            Clear all
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Notifications