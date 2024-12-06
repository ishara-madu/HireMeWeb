import { IoIosArrowDown } from "react-icons/io"
import Footer from "../components/footer/Footer"
import LeftNav from "../components/leftNav/LeftNav"
import { useEffect, useRef, useState } from "react"
import placeholder from '../assets/placeholder.svg'
import { MdDeleteOutline } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { languagesData } from "../features/languages/languagesThunk"
import { v4 } from "uuid"
import { fetchProfile } from '../features/profile/profileThunk';
import LoadingSpinner from '../components/LoadingSpinner';
function EditProfile() {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.languages)
    const { data: profile, error, loading } = useSelector((state) => state.profile);
    const [userProfile, setUserProfile] = useState(true)
    const [languagesPopup, setLanguagesPopup] = useState(false)
    const [userProfileValues, setuserProfileValues] = useState({
        name: ['', '', ''],
        image: ['', '', ''],
        bio: ['', '', ''],
        languages: ['', '', ''],
    })
    const imageInputRef = useRef()


    useEffect(() => {
        dispatch(languagesData())
        dispatch(fetchProfile())
    }, [dispatch])

    useEffect(() => {
        if (profile?.length === 1) {
            setuserProfileValues({
                name: [profile[0].name],
                image: [profile[0].image],
                bio: [profile[0].bio],
                languages: [profile[0].languages],
            })
        }
    }, [profile])



    const handleInputChange = (e, maxlength, profile) => {
        let name, value, files;
        if (e.target) {
            name = e.target.name;
            value = e.target.value;
            files = e.target.files;
        }
        if (e.current) {
            name = e.current.name;
            value = e.current.value;
            files = e.current.files;
        }
        let length = value.length;
        let error;
        if (length <= maxlength) {
            error = ''
        } else {
            error = `Text exceeds the maximum limit of ${maxlength} characters.`;
        }
        if (files) {
            console.log("image");

            const maxSizeInMB = maxlength;
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
            length = `${(files[0].size / 1024).toFixed(0)}KB`;
            if (files[0].size > maxSizeInBytes) {
                error = `File size exceeds ${maxSizeInMB} MB. Please upload a smaller file.`;
                imageInputRef.current.value = null;
                value = null;
                length = ''
            } else {
                error = '';
                const reader = new FileReader();
                reader.onload = (e) => {
                    setuserProfileValues((prevFields) => ({
                        ...prevFields,
                        [name]: [e.target.result, length, error],
                    }));
                };
                reader.readAsDataURL(files[0]);
            }
        }
        if (profile === "user") {
            length = maxlength - length;
            setuserProfileValues((prevFields) => ({
                ...prevFields,
                [name]: [value, length, error],
            }));
        }
        else {
            setuserProfileValues((prevFields) => ({
                ...prevFields,
                [name]: [value, length, error],
            }));
        }
    }


    const handleAddField = (key) => {
        setuserProfileValues((prevFields) => {
            const updatedFields = { ...prevFields };
            updatedFields[`${key}${v4()}`] = ['', '', ''];
            return updatedFields;
        });

    }

    


    const language = data.filter(val => val.language.toLowerCase().includes(userProfileValues.languages?.[0].toLowerCase()));



    return (
        <div onClick={() => (setLanguagesPopup(false))} className="flex h-full min-h-svh items-center justify-start w-full flex-col bg-[#ebebeb] relative">
            {
                loading &&
                <div className="fixed flex justify-center items-center h-full w-full bg-[#6362623d] z-[999999]">
                    <LoadingSpinner/>
                </div>
            }
            <div className="flex h-full flex-1 items-start justify-center w-full">
                <LeftNav />
                <div className="flex justify-start gap-y-5 flex-col items-start w-11/12">
                    <div className="flex w-full mt-10 text-3xl mb-2 font-bold">Edit profile</div>
                    <div className="flex w-full flex-col gap-y-5 pb-60">
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
                                    <div className="flex text-sm font-bold">Full name</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden items-center">
                                        <input name="name" placeholder="Enter your name here" value={userProfileValues.name?.[0]} maxLength={100} onChange={(e) => { handleInputChange(e, 100, "user") }} type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                        <div className="flex text-sm opacity-60 p-4">{userProfileValues?.name?.[1] || 100}</div>
                                    </div>
                                    {
                                        userProfileValues?.name?.[2] &&
                                        <div className={`flex text-xs text-red-500 ${userProfileValues?.name?.[2] && 'block'}`}>{userProfileValues?.name?.[2]}</div>
                                    }
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Image</div>
                                    <div className="flex w-full h-60 border items-center border-zinc-400 rounded-sm overflow-hidden">
                                        <img src={userProfileValues?.image?.[0] || placeholder} alt="" className="h-60 w-60 object-contain bg-zinc-200" onClick={() => (imageInputRef.current.click())} />
                                        <div className="pl-5">
                                            <div className="flex flex-col justify-around h-full gap-y-5">
                                                <div className="flex opacity-80 text-black text-xs">Minimum 200x200 pixels, Maximum 6000x6000 pixels</div>
                                                <input type="file"
                                                    name={'image'} accept="image/*" ref={imageInputRef}
                                                    onChange={(e) => { handleInputChange(e, 1), "profile" }}
                                                    className="bg-transparent outline-none justify-start" />
                                                <div className="flex items-end gap-x-2 hover:text-red-500 text-xs">
                                                    <div onClick={() => {
                                                        setuserProfileValues((prev) => ({ ...prev, image: ['', '', ''] }));
                                                        imageInputRef.current.value = null;
                                                    }} className="flex">
                                                        <MdDeleteOutline size={25} />
                                                        <div className="flex opacity-60 text-black text-sm">{userProfileValues.image?.[1]}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        userProfileValues.image?.[2] &&
                                        <div className={`flex text-xs text-red-500 ${userProfileValues?.image?.[2] && 'block'}`}>{userProfileValues?.image?.[2]}</div>
                                    }
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Bio</div>
                                    <div className="flex w-full h-auto border border-zinc-400 rounded-sm overflow-hidden items-end">
                                        <textarea name="bio" placeholder="Enter your biography here" value={userProfileValues.bio?.[0]} maxLength={500} minLength={50} onChange={(e) => { handleInputChange(e, 500, "user") }} rows={6} type="text" className="w-full h-full pl-3 bg-transparent px-5 py-2 outline-none" />
                                        <div className="flex text-sm opacity-60 p-4">{userProfileValues?.bio?.[1] || 500}</div>
                                    </div>
                                    {
                                        userProfileValues?.bio?.[2] &&
                                        <div className={`flex text-xs text-red-500 ${userProfileValues?.bio?.[2] && 'block'}`}>{userProfileValues?.bio?.[2]}</div>
                                    }
                                    <div className="flex text-xs opacity-60">To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and Personality. Your biography should have at least 50 words, links and coupon codes are not permitted.</div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Language</div>
                                    <div onClick={(e) => (e.stopPropagation(), setLanguagesPopup(true))} className="flex w-full h-12 border border-zinc-400 rounded-sm">
                                        <input value={userProfileValues?.languages?.[0]} name="languages" maxLength={15} onChange={(e) => { handleInputChange(e, 15, "profile") }} type="text" className="w-full h-full pl-3 bg-transparent outline-none" placeholder="Select language" />
                                        <div className="flex h-full items-center justify-center w-12">
                                            {
                                                languagesPopup ?
                                                    <div onClick={(e) => (e.stopPropagation(), setLanguagesPopup(false))} className="flex w-full h-full justify-center items-center rotate-180 duration-300">
                                                        <IoIosArrowDown size={24} />
                                                    </div>
                                                    :
                                                    <div onClick={(e) => (e.stopPropagation(), setLanguagesPopup(true))} className="flex w-full h-full justify-center items-center duration-300">
                                                        <IoIosArrowDown size={24} />
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex h-auto text-xs relative">
                                        {
                                            userProfileValues?.languages?.[2] &&
                                            <div className={`flex text-xs text-red-500 ${userProfileValues?.languages?.[2] && 'block'}`}>{userProfileValues?.languages?.[2]}</div>
                                        }
                                        {
                                            languagesPopup &&
                                            <div className="absolute top-0 w-full h-auto max-h-60 bg-[#f1f0f0] border border-zinc-400 rounded-sm shadow-xl overflow-y-auto">
                                                {language?.map((language, index) => (
                                                    <div onClick={() => (setuserProfileValues((prev) => ({ ...prev, languages: [language?.language, userProfileValues?.languages?.[1], userProfileValues?.languages?.[2]] })), setLanguagesPopup(false))} key={index} className="flex w-full h-12 items-center pl-3 hover:bg-zinc-300">{language?.language}</div>
                                                ))}
                                            </div>
                                        }
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
                                        <input type="tel" placeholder="Enter your mobile number" className="w-full h-full pl-3 bg-transparent outline-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Website</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <input type="url" placeholder="Url" className="w-full h-full pl-3 bg-transparent outline-none" />
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
                                        <input placeholder="Username" type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
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
                                        <input type="text" placeholder="Resource ID" className="w-full h-full pl-3 bg-transparent outline-none" />
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
                                        <input type="text" placeholder="Username" className="w-full h-full pl-3 bg-transparent outline-none" />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Work experience</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <input placeholder="Enter your work experience description" type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                    </div>
                                    <div className="flex w-full h-auto text-green-500 text-sm font-bold cursor-pointer">+ Add new exprience field</div>
                                </div>
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

export default EditProfile