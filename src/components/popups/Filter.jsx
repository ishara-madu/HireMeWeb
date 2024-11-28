import { useState } from "react"
import { CiLocationOn } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6"
import { MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md"

// eslint-disable-next-line react/prop-types
function Filter({showFilter}) {
    const [showRatings, setShowRatings] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);
    const [showAllLanguage, setShowAllLanguage] = useState(false);

    return (
        <div className={`flex ${showFilter ? 'w-[24%]':'w-0 overflow-hidden'} text-nowrap duration-300 flex-col`}>
            <div className="flex w-full flex-col">
                <div className="flex w-full pb-2 items-center justify-center">
                    <div className="flex w-full h-12 rounded-sm overflow-hidden relative items-center">
                        <div className="absolute left-3">
                            <CiLocationOn size={20} color="#aeadad" />
                        </div>
                        <input placeholder="Search by location" className="flex h-full w-full pl-10 pr-5 text-sm border border-gray-300 bg-transparent rounded-md focus:outline-none" />
                    </div>
                </div>
            </div>
            <div className="flex w-full px-2 flex-col border-t border-[#c5c5c5]">
                <div onClick={() => setShowRatings((prev) => !prev)} className="flex w-full py-3 items-center justify-between">
                    <div className="flex font-semibold">Ratings</div>
                    <div className={`flex ${showRatings ? 'rotate-180 duration-200' : 'duration-200'}`}><FaChevronDown size={15} /></div>
                </div>
                {
                    showRatings &&
                    <div className="flex mt-2 mb-4 gap-y-4 items-start w-full flex-col">
                        <div className="flex gap-x-2 items-center">
                            <input type='radio' name="rating" className="" />
                            <div className="flex items-center">
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarHalf size={16} />
                            </div>
                            <div className="text-sm items-center">4.5 & up</div>
                            <div className="text-sm opacity-60 items-center">(5300)</div>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <input type='radio' name="rating" className="" />
                            <div className="flex items-center">
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarOutline size={16} />
                            </div>
                            <div className="text-sm items-center">4.0 & up</div>
                            <div className="text-sm opacity-60 items-center">(5300)</div>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <input type='radio' name="rating" className="" />
                            <div className="flex items-center">
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarHalf size={16} />
                                <MdOutlineStarOutline size={16} />
                            </div>
                            <div className="text-sm items-center">3.5 & up</div>
                            <div className="text-sm opacity-60 items-center">(5300)</div>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <input type='radio' name="rating" className="" />
                            <div className="flex items-center">
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarPurple500 size={16} />
                                <MdOutlineStarOutline size={16} />
                                <MdOutlineStarOutline size={16} />
                            </div>
                            <div className="text-sm items-center">3.0 & up</div>
                            <div className="text-sm opacity-60 items-center">(5300)</div>
                        </div>
                    </div>
                }
            </div>
            <div className="flex w-full px-2 flex-col border-t border-[#c5c5c5]">
                <div onClick={() => setShowLanguage((prev) => !prev)} className="flex w-full py-3 items-center justify-between">
                    <div className="flex font-semibold">Language</div>
                    <div className={`flex ${showLanguage ? 'rotate-180 duration-200' : 'duration-200'}`}><FaChevronDown size={15} /></div>
                </div>
                {
                    showLanguage &&
                    <div className={`flex mt-2 mb-4 gap-y-4 ${showAllLanguage ? 'h-auto' : 'max-h-36'} overflow-hidden relative items-start w-full flex-col`}>
                        <div className="flex gap-x-2 items-center">
                            <input type='checkbox' name="rating" className="" />
                            <div className="flex items-center text-sm">
                                English
                            </div>
                            <div className="text-sm opacity-60 items-center">(5,300)</div>
                        </div>
                        <div onClick={() => setShowAllLanguage(prev => !prev)} className={`flex text-sm font-semibold bg-gradient-to-t from-[#ebebeb] to-[#ebebeb62] w-full bottom-0 items-end text-purple-600 ${showAllLanguage ? "flex h-auto" : "absolute h-14"}`}>
                            <div className="flex gap-x-3 items-center">
                                {
                                    showAllLanguage ? (
                                        <>
                                            Show less
                                            <div className={`flex rotate-180`}><FaChevronDown color="rgb(147 51 234)" size={12} /></div>
                                        </>
                                    ) : (
                                        <>
                                            Show more
                                            <div className={`flex`}><FaChevronDown color="rgb(147 51 234)" size={12} /></div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default Filter