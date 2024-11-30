import { useState } from "react"
import { FaChevronDown } from "react-icons/fa6"

function Description() {
    const [showAllDescription, setShowAllDescription] = useState(true);
    return (
        <div className='flex w-full h-auto bg-[#ebebeb] py-4 justify-center items-center'>
            <div className="flex w-10/12 h-auto">
                <div className={`flex w-full ${showAllDescription ? 'h-28' : 'h-auto'} gap-y-3 overflow-hidden flex-col rounded-sm relative`}>
                    <div className="flex text-xl font-bold">Description</div>
                    <div className="flex text-sm">
                        In this course you will learn the fundamentals of Google Sheets (some of which translates to Microsoft Excel!). You will not only learn the basics, like adding and subtracting. But you will also learn valuable advanced formulas like VLOOKUP, INDEX(MATCH()MATCH()), and IMPORTRANGE.
                        In this course you will learn the fundamentals of Google Sheets (some of which translates to Microsoft Excel!). You will not only learn the basics, like adding and subtracting. But you will also learn valuable advanced formulas like VLOOKUP, INDEX(MATCH()MATCH()), and IMPORTRANGE.
                        In this course you will learn the fundamentals of Google Sheets (some of which translates to Microsoft Excel!). You will not only learn the basics, like adding and subtracting. But you will also learn valuable advanced formulas like VLOOKUP, INDEX(MATCH()MATCH()), and IMPORTRANGE.
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

export default Description