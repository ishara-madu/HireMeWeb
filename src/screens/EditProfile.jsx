import { IoIosArrowDown } from "react-icons/io"
import Footer from "../components/footer/Footer"
import LeftNav from "../components/leftNav/LeftNav"
import { useEffect, useRef, useState } from "react"
import placeholder from '../assets/placeholder.svg'
import { MdDeleteOutline } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { languagesData } from "../features/languages/languagesThunk"
import { v4 } from "uuid"
import { fetchProfile, updateProfile, updateProfileWithImage } from '../features/profile/profileThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css';

function EditProfile() {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.languages)
    const { data: profile, loading, image_update_loading } = useSelector((state) => state.profile);
    const [userProfile, setUserProfile] = useState(true)
    const [languagesPopup, setLanguagesPopup] = useState(false)
    const [submitError, setsubmitError] = useState('')
    const [userProfileValues, setuserProfileValues] = useState({
        name: ['', '', ''],
        image: ['', '', '', '', ''],
        bio: ['', '', ''],
        languages: ['', '', ''],
    })
    const [workerProfileValues, setWorkerProfileValues] = useState({
        phone: ['', '', ''],
        web: ['', '', ''],
        facebook: ['', '', ''],
        linkedin: ['', '', ''],
        youtube: ['', '', ''],
        experience: ['', '', '']
    })

    const imageInputRef = useRef()
    useEffect(() => {
        dispatch(languagesData())
        dispatch(fetchProfile())
    }, [dispatch])

    useEffect(() => {
        if (profile?.length === 1) {
            setuserProfileValues({
                name: [profile?.[0]?.name],
                image: [JSON?.parse(profile?.[0]?.image || "{}")?.publicUrl || '', '', '', '', JSON?.parse(profile?.[0]?.image || "{}")?.oldImage || ''],
                bio: [profile?.[0]?.bio],
                languages: [profile?.[0]?.languages],
            })
            setWorkerProfileValues({
                phone: [profile?.[0]?.contact?.phone, '', ''],
                web: [profile?.[0]?.contact?.web, '', ''],
                facebook: [profile?.[0]?.contact?.facebook, '', ''],
                linkedin: [profile?.[0]?.contact?.linkedin, '', ''],
                youtube: [profile?.[0]?.contact?.youtube, '', ''],
            })
            const mapMoreValues = (values, name) => {
                values &&
                    values.map(val => (
                        setWorkerProfileValues((prev) => ({ ...prev, [name + v4()]: [val, '', ''] }))
                    ))
            }
            profile[0]?.userQuality ? Array.isArray(profile[0]?.userQuality?.experience) ? mapMoreValues(profile[0]?.userQuality && profile[0]?.userQuality?.experience, 'experience') : mapMoreValues([profile[0]?.userQuality?.experience], 'experience') : mapMoreValues([""], 'experience');
        }
    }, [profile])


    const allKeys = Object.keys(workerProfileValues);
    const experienceFields = allKeys.filter((key) => key.startsWith("experience"))

    const arrCheck = Object.values(userProfileValues).map(value => value[0]?.length > 0);


    const handleInputChange = (e, maxlength, profile, phone) => {
        setsubmitError('')

        let name, value, files;
        if (phone === "mobile") {
            name = "phone";
            value = e;

        } else if (phone === "bio") {
            name = "bio";
            value = e;
        } else {
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
        }
        let length = value.length;
        let error;
        if (length <= maxlength) {
            error = ''
        } else {
            error = `Text exceeds the maximum limit of ${maxlength} characters.`;
        }
        if (files) {
            const maxSizeInMB = maxlength;
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
            if (files[0].size > maxSizeInBytes) {
                error = `File size exceeds ${maxSizeInMB} MB. Please upload a smaller file.`;
                imageInputRef.current.value = null;
                value = null;
                length = ''
            } else {
                error = '';
                const reader = new FileReader();
                reader.onload = async (e) => {
                    length = `${(files[0].size / 1024).toFixed(0)}KB`;
                    setuserProfileValues((prevFields) => ({
                        ...prevFields,
                        [name]: [e.target.result, length, error, files[0]],
                    }));
                };
                reader.readAsDataURL(files[0]);
            }
        }
        length = maxlength - length;
        if (profile === "user") {
            setuserProfileValues((prevFields) => ({
                ...prevFields,
                [name]: [value, length, error, null],
            }));
        }
        else {
            setWorkerProfileValues((prevFields) => ({
                ...prevFields,
                [name]: [value, length, error, null],
            }));
        }
    }

    const validateURL = (url) => {
        // eslint-disable-next-line no-useless-escape
        const regex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w\-\._~:\/?#[\]@!$&'()*+,;=]*)$/;
        return regex.test(url);
    };


    const handleAddField = (key) => {
        setWorkerProfileValues((prevFields) => {
            const updatedFields = { ...prevFields };
            updatedFields[`${key}${v4()}`] = ['', '', ''];
            return updatedFields;
        });
    }
    const handleDelete = (key) => {
        setWorkerProfileValues((prevFields) => {
            const updatedFields = { ...prevFields };
            delete updatedFields[key];
            return updatedFields;
        });
    }

    function evaluateArray(arr) {
        const falseCount = arr.filter(value => value === false).length;
        return falseCount === 0;
    }



    const handleSubmit = async () => {
        if (evaluateArray(arrCheck) === true) {
            const val = data.filter(val => val.language == userProfileValues.languages?.[0])
            let urlError = true;
            urlError = workerProfileValues?.web?.[0]?.length > 0 ? validateURL(workerProfileValues?.web?.[0]) : true;
            if (val.length === 1 && urlError) {
                try {
                    const oldPath = sessionStorage.getItem('old_profile_image') || userProfileValues?.image?.[4];
                    const experience = Object.keys(workerProfileValues)
                        .filter(key => key.startsWith('experience'))
                        .map(key => workerProfileValues[key]).map(val => val[0]);
                    await dispatch(updateProfile(
                        {
                            name: userProfileValues?.name?.[0],
                            bio: userProfileValues?.bio?.[0],
                            languages: userProfileValues?.languages?.[0],
                            contact: {
                                ...profile?.[0]?.contact,
                                phone: workerProfileValues?.phone?.[0],
                                web: workerProfileValues?.web?.[0],
                                facebook: workerProfileValues?.facebook?.[0],
                                linkedin: workerProfileValues?.linkedin?.[0],
                                youtube: workerProfileValues?.youtube?.[0]
                            },
                            userQuality: {
                                ...profile?.[0]?.userQuality,
                                experience: experience
                            }
                        }
                    ));
                    await dispatch(updateProfileWithImage(
                        {
                            oldImagePath: oldPath,
                            newImageFile: userProfileValues?.image?.[3]
                        }
                    ));
                    await dispatch(fetchProfile());

                } catch (error) {
                    console.error('Failed to update listing:', error);
                }
            } else {
                if (!urlError) {
                    setsubmitError('Please ensure that all fields are filled out in the correct format.')
                    setWorkerProfileValues((prevFields) => ({
                        ...prevFields,
                        web: [workerProfileValues?.web?.[0], workerProfileValues?.web?.[1], 'Please enter a valid URL'],
                    }));
                } else {
                    setsubmitError('Please ensure that all fields are filled out in the correct format.')
                    setuserProfileValues((prevFields) => ({
                        ...prevFields,
                        languages: [userProfileValues?.languages?.[0], userProfileValues?.languages?.[1], 'You can only select one of the given languages from the dropdown list.'],
                    }));
                }
            }
        }
        else {
            Object.keys(userProfileValues).forEach((val) => {
                if (userProfileValues[val][0] === '') {
                    setuserProfileValues((prevFields) => ({
                        ...prevFields,
                        [val]: [userProfileValues?.[val]?.[0], userProfileValues?.[val]?.[1], 'This field is required. Please fill it out.'],
                    }));
                }
            });
            setsubmitError('Please complete all fields before submitting and try again.')
        }

    }


    const language = data?.filter(val => val.language.toLowerCase().includes(userProfileValues.languages?.[0].toLowerCase()));

    const modules = {
        toolbar: [
            [{ font: [] }],                        // Font family
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
            ["bold", "italic", "underline", "strike"], // Text formatting
            [{ color: [] }, { background: [] }],  // Text color and background
            [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            [{ indent: "-1" }, { indent: "+1" }], // Indentation
            [{ align: [] }],                      // Alignment
            ["link", "image"],           // Media
            ["blockquote", "code-block"],         // Blockquote and Code block
            ["clean"],                            // Remove formatting
        ],
    };

    const formats = [
        "font", "header", "bold", "italic", "underline", "strike",
        "color", "background", "script", "list", "bullet", "indent",
        "align", "link", "image", "video", "blockquote", "code-block"
    ];

    return (
        <div onClick={() => (setLanguagesPopup(false))} className="flex h-full min-h-svh items-center justify-start w-full flex-col bg-[#ebebeb] relative">
            {
                loading &&
                <div className="fixed flex justify-center items-center h-full w-full bg-[#6b696953] z-[999999]">
                    <LoadingSpinner />
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
                                    <div onClick={() => { setUserProfile(true) }} className="absolute flex w-full h-full"></div>
                                }
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Full name</div>
                                    <div className={`flex w-full h-12 border ${userProfileValues?.name?.[2] ? 'border-red-400' : 'border-zinc-400'} rounded-sm overflow-hidden items-center`}>
                                        <input name="name" placeholder="Enter your name here" value={userProfileValues.name?.[0]} maxLength={100} onChange={(e) => { handleInputChange(e, 100, "user") }} type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                        <div className="flex text-sm opacity-60 p-4">{userProfileValues?.name?.[1]}</div>
                                    </div>
                                    {
                                        userProfileValues?.name?.[2] &&
                                        <div className={`flex text-xs text-red-500 ${userProfileValues?.name?.[2] && 'block'}`}>{userProfileValues?.name?.[2]}</div>
                                    }
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Image</div>
                                    <div className={`flex w-full h-60 border ${userProfileValues?.image?.[2] ? 'border-red-400' : 'border-zinc-400'} rounded-sm overflow-hidden items-center`}>
                                        {
                                            image_update_loading ?
                                                <div className="flex h-60 w-60 justify-center items-center">
                                                    <LoadingSpinner val={35} />
                                                </div>
                                                :
                                                <img src={userProfileValues?.image?.[0] || placeholder} alt="" className="h-60 w-60 object-contain bg-zinc-200" onClick={() => (imageInputRef.current.click())} />
                                        }
                                        <div className="pl-5">
                                            <div className="flex flex-col justify-around h-full gap-y-5">
                                                <div className="flex opacity-80 text-black text-xs">Minimum 200x200 pixels, Maximum 6000x6000 pixels</div>
                                                <input type="file"
                                                    name={'image'} accept="image/*" ref={imageInputRef}
                                                    onChange={(e) => { handleInputChange(e, 1, "user") }}
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
                                    <div className={`flex w-full h-auto border ${userProfileValues?.bio?.[2] ? 'border-red-400' : 'border-zinc-400'} rounded-sm overflow-hidden items-end relative`}>
                                        <ReactQuill
                                            modules={modules}
                                            formats={formats}
                                            value={userProfileValues.bio?.[0]}
                                            theme="snow"
                                            className="w-full min-h-72 max-h-[500px] overflow-y-auto bg-transparent outline-none"
                                            placeholder="Enter your biography here"
                                            onChange={(change) => (handleInputChange(change, 9999999999, "user", "bio"))}
                                        />
                                    </div>
                                    {
                                        userProfileValues?.bio?.[2] &&
                                        <div className={`flex text-xs text-red-500 ${userProfileValues?.bio?.[2] && 'block'}`}>{userProfileValues?.bio?.[2]}</div>
                                    }
                                    <div className="flex text-xs opacity-60">To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and Personality. Your biography should have at least 50 words, links and coupon codes are not permitted.</div>
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Language</div>
                                    <div onClick={(e) => (e.stopPropagation(), setLanguagesPopup(true))} className={`flex w-full h-12 border ${userProfileValues?.languages?.[2] ? 'border-red-400' : 'border-zinc-400'} rounded-sm`}>
                                        <input value={userProfileValues?.languages?.[0]} name="languages" maxLength={15} onChange={(e) => { handleInputChange(e, 15, "user") }} type="text" className="w-full h-full pl-3 bg-transparent outline-none" placeholder="Select language" />
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
                                                    <div onClick={() => (setuserProfileValues((prev) => ({ ...prev, languages: [language?.language, userProfileValues?.languages?.[1], ''] })), setLanguagesPopup(false), setsubmitError(''))} key={index} className="flex w-full h-12 items-center pl-3 hover:bg-zinc-300">{language?.language}</div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className={`${userProfile ? 'opacity-40' : 'opacity-100'} flex flex-col w-full h-auto gap-y-8 relative`}>
                                {
                                    userProfile &&
                                    <div onClick={() => { setUserProfile(false) }} className="absolute flex w-full h-full z-50"></div>
                                }
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Mobile number</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm relative">
                                        <PhoneInput
                                            country={"lk"}
                                            value={workerProfileValues?.phone?.[0]} maxLength={20} onChange={(e) => { handleInputChange(e, 20, "worker", "mobile") }}
                                            placeholder="Enter phone number"
                                            inputProps={{ className: 'w-full h-full pl-14 outline-none bg-transparent' }}
                                        />
                                    </div>
                                    {
                                        workerProfileValues?.phone?.[2] &&
                                        <div className={`flex text-xs text-red-500 ${workerProfileValues?.phone?.[2] && 'block'}`}>{workerProfileValues?.phone?.[2]}</div>
                                    }
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Website</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <input name="web" value={workerProfileValues?.web?.[0]} maxLength={10000} onChange={(e) => { handleInputChange(e, 10000, "worker") }} type="url" placeholder="Url" className="w-full h-full pl-3 bg-transparent outline-none" />
                                        <div className="flex text-sm opacity-60 p-4">{workerProfileValues?.web?.[1]}</div>
                                    </div>
                                    {
                                        workerProfileValues?.web?.[2] &&
                                        <div className={`flex text-xs text-red-500 ${workerProfileValues?.web?.[2] && 'block'}`}>{workerProfileValues?.web?.[2]}</div>
                                    }
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Facebook</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <div className="flex h-full justify-center items-center text-sm w-auto px-3 border-r border-zinc-400">
                                            <div className="flex opacity-50">
                                                http://www.facebook.com/
                                            </div>
                                        </div>
                                        <input name="facebook" value={workerProfileValues?.facebook?.[0]} maxLength={50} onChange={(e) => { handleInputChange(e, 50, "worker") }} placeholder="Username" type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                        <div className="flex text-sm opacity-60 p-4">{workerProfileValues?.facebook?.[1]}</div>
                                    </div>
                                    {
                                        workerProfileValues?.facebook?.[2] &&
                                        <div className={`flex text-xs text-red-500 ${workerProfileValues?.facebook?.[2] && 'block'}`}>{workerProfileValues?.facebook?.[2]}</div>
                                    }
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Linkedin</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <div className="flex h-full justify-center items-center text-sm w-auto px-3 border-r border-zinc-400">
                                            <div className="flex opacity-50">
                                                http://www.linkedin.com/
                                            </div>
                                        </div>
                                        <input name="linkedin" value={workerProfileValues?.linkedin?.[0]} maxLength={50} onChange={(e) => { handleInputChange(e, 50, "worker") }} type="text" placeholder="Resource ID" className="w-full h-full pl-3 bg-transparent outline-none" />
                                        <div className="flex text-sm opacity-60 p-4">{workerProfileValues?.linkedin?.[1]}</div>
                                    </div>
                                    {
                                        workerProfileValues?.linkedin?.[2] &&
                                        <div className={`flex text-xs text-red-500 ${workerProfileValues?.linkedin?.[2] && 'block'}`}>{workerProfileValues?.linkedin?.[2]}</div>
                                    }
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Youtube</div>
                                    <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden">
                                        <div className="flex h-full justify-center items-center text-sm w-auto px-3 border-r border-zinc-400">
                                            <div className="flex opacity-50">
                                                http://www.youtube.com/
                                            </div>
                                        </div>
                                        <input name="youtube" value={workerProfileValues?.youtube?.[0]} maxLength={50} onChange={(e) => { handleInputChange(e, 50, "worker") }} type="text" placeholder="Username" className="w-full h-full pl-3 bg-transparent outline-none" />
                                        <div className="flex text-sm opacity-60 p-4">{workerProfileValues?.youtube?.[1]}</div>
                                    </div>
                                    {
                                        workerProfileValues?.youtube?.[2] &&
                                        <div className={`flex text-xs text-red-500 ${workerProfileValues?.youtube?.[2] && 'block'}`}>{workerProfileValues?.youtube?.[2]}</div>
                                    }
                                </div>
                                <div className="flex flex-col w-full h-auto gap-y-2">
                                    <div className="flex text-sm font-bold">Work experience</div>
                                    {
                                        experienceFields.map((value, index) => (
                                            <div key={index}>
                                                <div className="flex w-full h-12 border border-zinc-400 rounded-sm overflow-hidden items-center">
                                                    <input name={value} value={workerProfileValues?.[value]?.[0]} maxLength={50} onChange={(e) => { handleInputChange(e, 200, "worker") }} placeholder="Enter your work experience description" type="text" className="w-full h-full pl-3 bg-transparent outline-none" />
                                                    <div className="flex pl-2 text-sm opacity-60">{workerProfileValues?.[value]?.[1]}</div>
                                                    <div
                                                        onClick={() => handleDelete(value)}
                                                        className="w-10 justify-center flex hover:text-red-600 duration-150 items-center"><MdDeleteOutline size={25} /></div>
                                                </div>
                                                {
                                                    workerProfileValues?.youtube?.[2] &&
                                                    <div className={`flex text-xs text-red-500 ${workerProfileValues?.[value]?.[2] && 'block'}`}>{workerProfileValues?.[value]?.[2]}</div>
                                                }
                                            </div>
                                        ))
                                    }
                                    <div onClick={() => { handleAddField("experience") }} className="flex w-full h-auto text-green-500 text-sm font-bold cursor-pointer">+ Add new exprience field</div>
                                </div>
                            </div>

                        </div>
                        <button disabled={submitError ? true : false} onClick={handleSubmit} className="flex disabled:bg-zinc-500 w-28 justify-center items-center font-bold text-white rounded-sm h-12 bg-green-700">Save</button>
                        {
                            submitError &&
                            <div className={`flex text-xs text-red-500 ${submitError && 'block'}`}>{submitError}</div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default EditProfile