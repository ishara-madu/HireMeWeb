import LeftNav from '../components/leftNav/LeftNav'
import placeholder from '../assets/placeholder.svg'
import { useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import Footer from '../components/footer/Footer'
import { IoIosArrowDown } from 'react-icons/io'

function AccountSettings() {
  const [userProfile, setUserProfile] = useState(true)
    return (
        <div className="flex h-full min-h-svh items-center justify-start w-full flex-col bg-[#ebebeb] relative">
            <div className="flex h-full flex-1 items-start justify-center w-full">
                <LeftNav />
                <div className="flex justify-start gap-y-5 flex-col items-start w-11/12">
                    <div className="flex w-full mt-10 text-3xl mb-2 font-bold">Account settings</div>
                    <div className="flex w-full flex-col gap-y-5 pb-20">
                        <div className="flex text-base w-full h-10 font-bold">
                            <div onClick={setUserProfile} className={`flex h-10 border-b-2 justify-center px-3 items-center ${userProfile && 'border-black'} cursor-pointer`}>User profile</div>
                            <div onClick={() => (setUserProfile(false))} className={`flex h-10 border-b-2 justify-center px-3 items-center ${!userProfile && 'border-black'} cursor-pointer`}>Worker profile</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-y-8 gap-x-10 place-items-start pb-5 ">

                            <div className={`${userProfile ? 'opacity-100' : 'opacity-40'} flex flex-col w-full h-auto gap-y-8 relative`}>
                                {
                                    !userProfile &&
                                    <div className="absolute flex w-full h-full"></div>
                                }
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">First name</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <input type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Last name</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <input type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                    </div>
                                </div>
                                
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Image</div>
                                    <div className="flex w-full h-60 border items-center border-zinc-400 rounded-sm overflow-hidden">
                                        <img src={placeholder} alt="" className="h-60 w-60 object-contain bg-zinc-200" />
                                        <div className="pl-5">
                                            <div className="flex flex-col justify-around h-full gap-y-5">
                                                <div className="flex opacity-80 text-black text-xs">Minimum 200x200 pixels, Maximum 6000x6000 pixels</div>
                                                <input type="file" className="bg-transparent outline-none justify-start" />
                                            <div className="flex items-end gap-x-2 hover:text-red-500 text-xs">
                                                <div className="flex opacity-60 text-black text-sm">12k</div>
                                                <MdDeleteOutline size={25} />
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Bio</div>
                                    <div className="flex w-full h-auto border border-zinc-400 rounded-sm overflow-hidden">
                                        <textarea rows={6} type="text" className="w-full h-full pl-3 bg-transparent px-5 py-2 outline-none" />
                                    </div>
                                    <div className="flex text-xs opacity-60">To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and Personality. Your biography should have at least 50 words, links and coupon codes are not permitted.</div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Language</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <input type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                        <div className="flex h-full items-center justify-center w-12"><IoIosArrowDown size={24} /></div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${userProfile ? 'opacity-40' : 'opacity-100'} flex flex-col w-full h-auto gap-y-8 relative`}>
                                {
                                    userProfile &&
                                    <div className="absolute flex w-full h-full"></div>
                                }
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Mobile number</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <input type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Website</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <input type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Facebook</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <div className="flex h-full justify-center items-center text-sm w-auto px-3 border-r border-zinc-400">
                                            <div className="flex opacity-50">
                                                http://www.facebook.com/
                                            </div>
                                        </div>
                                        <input type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Linkedin</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <div className="flex h-full justify-center items-center text-sm w-auto px-3 border-r border-zinc-400">
                                            <div className="flex opacity-50">
                                                http://www.linkedin.com/
                                            </div>
                                        </div>
                                        <input type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Youtube</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <div className="flex h-full justify-center items-center text-sm w-auto px-3 border-r border-zinc-400">
                                            <div className="flex opacity-50">
                                                http://www.youtube.com/
                                            </div>
                                        </div>
                                        <input type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Work experience</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <input type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                    </div>
                                </div>
                                <div className="flex w-full h-auto text-green-500 text-sm font-bold cursor-pointer">+ Add new exprience field</div>
                            </div>

                        </div>
                        <div className="flex w-28 justify-center items-center font-bold text-white rounded-sm h-12 bg-green-700">Save</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AccountSettings