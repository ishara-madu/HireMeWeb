/* eslint-disable react/prop-types */
import {  useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6';
import { MdAlternateEmail, MdOutlineLocalPhone, MdOutlineRateReview, MdOutlineStarOutline } from 'react-icons/md';
import LazyLoad from 'react-lazyload';

function Worker({ data }) {
    const [showAllDescription, setShowAllDescription] = useState(true);

    return (
        <div className='flex w-full h-auto bg-[#ebebeb] py-8 mb-5 justify-center items-center'>
            <div className="flex w-10/12 h-auto">
                <div className={`flex w-7/12 ${showAllDescription ? 'h-60' : 'h-auto'} gap-y-4 overflow-hidden flex-col rounded-sm relative`}>
                    <div className="flex text-xl font-bold">Worker profile</div>
                    <div className="flex text-base font-semibold text-purple-500 underline">{data.users.name}</div>
                    <div className="flex gap-x-3">
                        <div className="flex w-28 h-28 rounded-full overflow-hidden">
                            <LazyLoad height={112} offset={100} once className='w-full h-full flex justify-center items-center'>
                                <img src={data.users.image} alt={data.users.name} />
                            </LazyLoad>
                        </div>
                        <div className="flex items-center gap-x-5">
                            <div className="flex h-full justify-evenly flex-col">
                                <div className="flex text-sm gap-x-2 items-center">
                                    <MdOutlineStarOutline size={18.5} />
                                    <div className="flex"><div className="flex text-purple-500 font-bold underline">{data.users.rating.perc}</div>&nbsp;Profile rating</div>
                                </div>
                                <div className="flex text-sm gap-x-2 items-center">
                                    <MdOutlineRateReview size={17} />
                                    <div className="flex">{(data.rating.rating).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toLocaleString()} Reviews</div>
                                </div>
                            </div>
                            <div className="flex h-full justify-evenly flex-col">
                                <div className="flex text-sm gap-x-2 items-center">
                                    <MdAlternateEmail size={16} />
                                    <div className="flex text-purple-500 underline">{data.users.contact.Email}</div>
                                </div>
                                <div className="flex text-sm gap-x-2 items-center">
                                    <MdOutlineLocalPhone size={16} />
                                    <div className="flex text-purple-500 underline">{data.users.contact.phone}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex text-sm">
                        {`${data.users.description}`}
                    </div>
                    {
                        showAllDescription ?
                            <div onClick={() => setShowAllDescription(prev => !prev)} className="flex items-end h-20 absolute bg-gradient-to-b from-transparent to-[#ebebeb] w-full bottom-0 text-[rgba(147,51,234,1)] text-sm font-bold">
                                <div className="flex items-center gap-x-4">
                                    show more
                                    <div className={`flex`}><FaChevronDown color="rgb(147 51 234)" size={12} /></div>
                                </div>
                            </div> :
                            <div onClick={() => setShowAllDescription(prev => !prev)} className="flex items-center text-[rgba(147,51,234,1)] text-sm font-bold">
                                <div className="flex items-center gap-x-4">
                                    show less
                                    <div className={`flex rotate-180`}><FaChevronDown color="rgb(147 51 234)" size={12} /></div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Worker