/* eslint-disable react/prop-types */
import { useState } from "react"
import { FaChevronDown } from "react-icons/fa6"
import 'react-quill/dist/quill.snow.css';
import parse from "html-react-parser";
function Description({data}) {
    const [showAllDescription, setShowAllDescription] = useState(true);
    return (
        <div className='flex w-full h-auto bg-[#ebebeb] py-4 justify-center items-center'>
            <div className="flex w-10/12 h-auto">
                <div className={`flex w-7/12 ${showAllDescription ? 'h-28' : 'h-auto'} gap-y-3 overflow-hidden flex-col rounded-sm relative`}>
                    <div className="flex text-xl font-bold">Description</div>
                    <div className="ql-editor">{parse(data?.description?.long)}</div>
                    {
                        showAllDescription ?
                            <div onClick={() => setShowAllDescription(prev => !prev)} className="flex items-end h-20 absolute bg-gradient-to-b from-transparent to-[#ebebeb] w-full bottom-0 text-green-500 text-sm font-bold">
                                <div className="flex items-center gap-x-4">
                                    show more
                                    <div className={`flex`}><FaChevronDown size={12} /></div>
                                </div>
                            </div> :
                            <div onClick={() => setShowAllDescription(prev => !prev)} className="flex items-center text-green-500 text-sm font-bold">
                                <div className="flex items-center gap-x-4">
                                    show less
                                    <div className={`flex rotate-180`}><FaChevronDown size={12} /></div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Description