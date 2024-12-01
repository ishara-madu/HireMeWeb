/* eslint-disable react/no-unknown-property */
import { FiUser } from "react-icons/fi";
import { GoHome, GoTasklist } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function LeftNav() {
    const navigate = useNavigate();
    const handleNavigate = (val) => {
        navigate(val.toString())
    }
    const links = {
        home: {
            icon: <GoHome size={30} />,
            path: '/',
            label: 'Home'
        },
        listings: {
            icon: <GoTasklist size={30} />,
            path: '/show-listings',
            label: 'Listings'
        },
        notifications: {
            icon: <IoNotificationsOutline size={30} />,
            path: '/notifications',
            label: 'Notifications'
        },
        favorites: {
            icon: <IoMdHeartEmpty size={30} />,
            path: '/favorites',
            label: 'Favorites'
        },
        editProfile: {
            icon: <FiUser size={30} />,
            path: '/edit-profile',
            label: 'Edit Profile'
        },
        accountSettings: {
            icon: <LuSettings size={30} />,
            path: '/account-settings',
            label: 'Account Settings'
        }
    }
    return (
        <div className="flex absolute z-50 bg-[#373737] w-80 justify-center h-full text-[#ebebeb]">
            <div className="flex w-full h-auto flex-col">
                <div onClick={handleNavigate} className="flex pl-4 w-full items-center gap-x-7 h-14">
                    <div className="flex">Home</div>
                </div>
                <div className="flex w-full flex-col">
                    {
                        Object.keys(links).map((link, index) => (
                            <div key={index} onClick={() => { handleNavigate(links[link].path) }} className="flex ml-1 pl-3 w-full items-center gap-x-7 bg-[#373737] h-14">
                                {links[link].icon}
                                <div className="flex text-base font-semibold">{links[link].label}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default LeftNav