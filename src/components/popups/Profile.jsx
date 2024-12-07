/* eslint-disable react/prop-types */
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom';
import placeholder from '../../assets/placeholder.svg'
function Profile({ profile }) {
    const numberofFavorites = () => {
        const fevIds = JSON.parse(localStorage.getItem("favorites")) || [];
        const length = fevIds.length;
        if (length > 9) {
            return "9+"
        } else {
            return length
        }
    }
    return (
        <div className="flex justify-center w-72 h-auto absolute border shadow-xl border-[#c5c5c5] rounded-md top-[84px] right-5 z-50 bg-[#ebebeb]">
            <div className="flex w-11/12 h-auto flex-col">
                <div className="flex w-full h-auto py-5 gap-x-3 items-center border-b border-[#c5c5c5]">
                    <div className="flex items-center">
                        <LazyLoad height={56} once>
                            <img src={JSON.parse(profile?.image)?.publicUrl || placeholder} alt="" className="w-14 h-14 rounded-full object-contain" />
                        </LazyLoad>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-base font-bold">{profile?.name}</p>
                        <p className="text-xs opacity-60">{profile?.contact?.Email}</p>
                    </div>
                </div>
                <div className="flex w-full flex-col py-3 border-b border-[#c5c5c5]">
                    <div className="flex h-10 items-center justify-between">
                        <Link to={'/favorites'} className="text-sm opacity-80">Favorite</Link>
                        <div className={`flex w-6 justify-center items-center h-6 text-sm ${(numberofFavorites() > 0) || (numberofFavorites() === "0") ? 'bg-green-500':'opacity-0'} font-semibold text-[#ebebeb] rounded-full`}>{numberofFavorites()}</div>
                    </div>
                    <Link to={'/edit-profile'} className="flex items-center text-sm h-10 opacity-80">Edit profile</Link>
                    <Link to={'/account-settings'} className="flex text-sm h-10 items-center opacity-80">Account settings</Link>
                    <Link to={'/show-listings'} className="flex text-sm h-10 items-center opacity-80">Worker dashboard</Link>
                </div>
                <div className="flex w-full flex-col py-3 border-b border-[#c5c5c5]">
                    <div className="flex items-center justify-between h-10">
                        <Link to={'/notifications'} className="opacity-80 text-sm">Notifications</Link>
                        <div className="flex w-7 justify-center items-center h-6 text-sm bg-green-500 font-semibold text-[#ebebeb] rounded-full">9+</div>
                    </div>
                </div>
                <div className="flex w-full flex-col py-3 border-b border-[#c5c5c5]">
                    <p className="flex items-center text-sm h-10 opacity-80">Help and Support</p>
                    <p className="flex items-center text-sm h-10 opacity-80">Logout</p>
                </div>
            </div>
        </div>
    )
}

export default Profile