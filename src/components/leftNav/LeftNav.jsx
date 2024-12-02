/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoDocumentTextOutline, IoNotificationsOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../../assets/logo1.png'
import logo3 from '../../assets/logo3.png'

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
        },
        help: {
            icon: <IoDocumentTextOutline size={30} />,
            path: '/documentations',
            label: 'Documentations'
        }
    }
    return (
        <div className="h-full w-16">
            <div onMouseOver={() => { setMouseOver(true) }} onMouseOut={() => { setMouseOver(false) }} className={`flex fixed left-0 h-full z-50 bg-[#171717] ${mouseOver ? 'w-80' : 'w-16'} duration-300 text-nowrap justify-center h-full text-[#ebebeb] overflow-hidden`}>
                <div className="flex w-full h-auto flex-col">
                    <Link to={'/'} className="flex pl-5 w-80 items-center h-20 hover:bg-[#ebebeb] hover:bg-opacity-20 border-[#171717]">
                        <div className="flex h-[60%] items-end">
                        <img src={logo} alt="" width={20} className="h-full object-cover" />
                        <img src={logo3} alt="" className={`h-[60%] ${mouseOver ? 'opacity-100' : 'opacity-0'} duration-500 object-cover mb-[-2px]`} />
                        </div>
                    </Link>
                    {
                        Object.keys(links).map((link, index) => (
                            <div key={index} onClick={() => { handleNavigate(links[link].path) }} className={`flex pl-3 w-80 items-center gap-x-7 ${currentPath == (links[link].path) ? 'border-green-500' : 'bg-[#171717]'} h-14 hover:bg-[#ebebeb] hover:bg-opacity-20 border-[#171717] border-l-4`}>
                                {links[link].icon}
                                <div className={`${mouseOver ? 'opacity-100' : 'opacity-0'} flex duration-500 text-base font-semibold`}>{links[link].label}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default LeftNav