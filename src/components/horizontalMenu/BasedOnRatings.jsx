import { MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md'
import user from '../../assets/profile.jpg'
function BasedOnRatings() {
    return (
        <div className="flex w-full h-96 justify-center">
            <div className="flex w-11/12 h-full flex-col justify-center gap-y-4">
                <div className="text-2xl font-bold">Recommended to you based on ratings</div>
                <div className="flex w-full overflow-x-auto items-center justify-start">
                    <div className="flex flex-col mr-5 gap-y-2">
                        <div className="w-64 h-44 flex items-center justify-center rounded-lg overflow-hidden">
                            <img src={user} alt="" />
                        </div>
                        <div className='flex flex-col w-64 gap-y-1'>
                            <p className='flex-wrap text-sm font-bold'>IT System Engineer & Cloud System Administration</p>
                            <p className='text-xs opacity-60'>ishara madushanka</p>
                            <div className='flex items-center gap-x-1'>
                            <p className='font-semibold text-sm'>3.7</p>
                            <div className='flex items-center'>
                            <MdOutlineStarPurple500 size={15}/>
                            <MdOutlineStarPurple500 size={15}/>
                            <MdOutlineStarPurple500 size={15}/>
                            <MdOutlineStarHalf size={15}/>
                            <MdOutlineStarOutline size={15}/>
                            </div>
                            <p className='text-xs opacity-60'>(20,335)</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BasedOnRatings