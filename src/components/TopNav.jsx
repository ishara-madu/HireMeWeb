import { CiSearch } from "react-icons/ci"
import { IoCartOutline, IoHeartOutline, IoNotificationsOutline } from "react-icons/io5"
import profile from '../assets/profile.jpg'

function TopNav() {
    return (
        <div className="flex w-full h-20 border-b border-[#c5c5c5] justify-center items-center bg-[#ebebeb]">
            <div className="flex flex-row w-11/12 h-full justify-between items-center gap-x-10">
                <div className="cursor-pointer text-xl">Logo</div>
                <div className="flex flex-1 relative items-center">
                    <CiSearch size={20} className="absolute left-3" />
                    <input type="text" className="text-sm w-full h-12 rounded-full px-10 flex font-normal outline-none border border-black" placeholder="Search for anything" />
                </div>
                <div className="flex flex-row gap-x-5 justify-between items-center">
                    <div className="p-2 cursor-pointer"><IoHeartOutline size={24} /></div>
                    <div className="p-2 cursor-pointer"><IoCartOutline size={24} /></div>
                    <div className="p-2 cursor-pointer"><IoNotificationsOutline size={24} /></div>
                    <div className="flex w-10 h-10 justify-center items-center rounded-full overflow-hidden cursor-pointer"><img src={profile} alt="profile image" className="h-full w-full object-cover" /></div>
                </div>
            </div>
        </div>
    )
}

export default TopNav