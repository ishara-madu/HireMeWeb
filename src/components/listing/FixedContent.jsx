import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaBusinessTime } from "react-icons/fa6";
import { IoHeart, IoHeartOutline } from "react-icons/io5"
import { MdOutlineWorkspacePremium } from "react-icons/md";

function FixedContent() {
    const [fevId, setFavId] = useState([]);
    const fev = JSON.parse(localStorage.getItem("favorites")) || [];
    const handleFavorites = (favId) => {
        const included = fev.includes(favId);
        if (!included) {
            setFavId([favId])
            fev.push(favId);
            localStorage.setItem("favorites", JSON.stringify(fev));
        } else {
            setFavId([""])
            const index = fev.indexOf(favId);
            fev.splice(index, 1); // Remove the value at the found index
            localStorage.setItem("favorites", JSON.stringify(fev));
        }
    }
    return (
        <div className="flex w-80 absolute top-0">
            <div className="flex w-full flex-col h-auto items-center gap-y-5 justify-center bg-[#ebebeb] shadow-md shadow-black">
                <div className="flex w-full h-52 bg-black"></div>
                <div className="flex w-11/12 flex-col gap-y-2">
                    <div className="flex items-center opacity-60 text-sm gap-x-2">
                        <CiLocationOn size={15} />
                        Burj Umar Idris,Illizi,Algeria
                    </div>
                    <div className="flex gap-x-2 font-semibold items-center">
                        <BiCategory size={15} />
                        <div className="flex underline text-purple-500">
                            Java,&nbsp;
                            <div className="flex  nderline text-purple-500">
                                Programming
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2 text-base font-bold">
                        <MdOutlineWorkspacePremium />
                        Full time
                    </div>
                    <div className="flex items-center gap-x-2 text-base">
                        <FaBusinessTime />
                        <div className="flex gap-x-1">
                        experience
                        <div className="flex font-bold">2+ years</div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-x-3 my-4'>
                    <a href={`tel:${'result.users.contact.phone'}}`} onClick={() => { navigator.clipboard.writeText('result.users.contact.phone').then(alert(`Mobile number ${'result.users.contact.phone'} copy to clipboard`)) }} className='flex h-12 w-52 bg-purple-500 justify-center items-center rounded-sm text-base font-bold text-[#ebebeb]'>Mobile</a>
                    <div onClick={() => {
                        handleFavorites('result.id')
                    }} className='p-[10px] border border-black hover:bg-[#e0e1e1] rounded-full'>
                        {
                            (fev.includes('result.id') || fevId.includes('result.id')) ? (
                                <IoHeart size={24} color="red" />
                            ) : (
                                <IoHeartOutline size={24} color="black" />
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FixedContent