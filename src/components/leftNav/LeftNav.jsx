/* eslint-disable react/no-unknown-property */
import {  useState } from "react"
import { CiBoxList } from "react-icons/ci"
import { useNavigate } from "react-router-dom";

function LeftNav() {
    const navigate = useNavigate();
    const handleNavigate =(val)=>{
        navigate(val.toString())
    }
    const links ={
        home:{
            path:'/',
            label:'Home'
        },
        listings:{
            path:'/showlisting',
            label:'Listings'
        },
        notifications:{
            path:'/notifications',
            label:'Notifications'
        },
        favorites:{
            path:'/favorites',
            label:'Favorites'
        },
        editProfile:{
            path:'/edit-profile',
            label:'Edit Profile'
        },
        accountSettings:{
            path:'/account-settings',
            label:'Account Settings'
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
                        Object.keys(links).map((link,index) => (
                            <div key={index} onClick={()=>{handleNavigate(links[link].path)}} className="flex pl-4 w-full items-center gap-x-7 h-14">
                                <div className={`flex ${links[link].path === navigate.pathname? 'text-white' : ''}`}>
                                    {links[link].label}
                                </div>
                            </div>
                        ))
                    }
                    <div className="flex w-full bg-green-500">
                        <div onClick={handleNavigate} className="flex ml-1 pl-3 w-full items-center gap-x-7 bg-[#373737] h-14">
                            <CiBoxList size={30} />
                            <div className="flex text-base font-semibold">Listnings</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftNav