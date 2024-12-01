/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { GoHome, GoTasklist } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

function LeftNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const [currentPath, setCurrentPath] = useState('')
    const [mouseOver, setMouseOver] = useState(false)
    useEffect(() => {
        setCurrentPath(path)
    }, [path])
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
        <div onMouseOver={() => { setMouseOver(true) }} onMouseOut={() => { setMouseOver(false) }} className={`flex absolute z-50 bg-[#171717] ${mouseOver ? 'w-80' : 'w-16'} duration-300 text-nowrap justify-center h-full text-[#ebebeb] overflow-hidden`}>
            <div className="flex w-full h-auto flex-col mt-5">
                {
                    Object.keys(links).map((link, index) => (
                        <div key={index} onClick={() => { handleNavigate(links[link].path) }} className={`flex pl-3 w-80 items-center gap-x-7 ${currentPath == (links[link].path) ? 'border-green-500' : 'bg-[#171717]'} h-14 hover:bg-[#ebebeb] hover:bg-opacity-20 border-[#171717] border-l-4`}>
                            {links[link].icon}
                            <div className={`${mouseOver ? 'flex' : 'flex'} duration-300 text-base font-semibold`}>{links[link].label}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LeftNav