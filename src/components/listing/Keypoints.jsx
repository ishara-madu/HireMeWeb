/* eslint-disable react/prop-types */
import { CiBookmarkCheck } from "react-icons/ci"

function Keypoints({ data }) {

    return (
        <div className='flex w-full h-auto bg-[#ebebeb] py-8 justify-center items-center'>
            <div className="flex w-10/12 h-auto">
                <div className="flex w-7/12 gap-y-3 border flex-col border-[#959494] p-5 rounded-sm">
                    <div className="flex text-xl font-bold mb-3">Talent In Focus</div>
                    <div className="grid grid-cols-2 gap-4">
                        {
                            data.description.keypoints.map((val, index) => (
                                <div key={index} className="flex text-sm gap-x-1">
                                    <CiBookmarkCheck size={20} />
                                    {val}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Keypoints