import Footer from "../components/footer/Footer"
import LeftNav from "../components/leftNav/LeftNav"
import { useRef, useState } from "react"
import { MdDeleteOutline, MdError, MdOutlineBusinessCenter } from "react-icons/md"
import placeholder from '../assets/placeholder.svg'
import LoadingSpinner from "../components/LoadingSpinner"
import { IoCloudDone } from "react-icons/io5"
import { v4 as uuidv4 } from "uuid";
import { PiPath, PiPathBold } from "react-icons/pi"


function EditListings() {
    const [fields, setFields] = useState({
        title: ['', '', ''],
        short: ['', '', ''],
        long: ['', '', ''],
        img: ['', '', ''],
        keypoints: ['', '', ''],
        category: ['', '', ''],
        avilability: ['', '', ''],
    });
    const [image, setImage] = useState(null)
    const imageInputRef = useRef(null)
    const availbilityRef = useRef(null)

    const [showAvailability, setShowAvailability] = useState(false);

    const availabilityTypes = ["Full-Time", "Part-Time", "Freelance/Contract", "Temporary", "Internship", "Remote", "Hybrid", "On-Demand/Per Task", "Shift-Based"];
    const available = availabilityTypes.filter((availa) =>
        availa.toLowerCase().includes(fields.avilability[0]?.toLowerCase() || "")
    );
    const allKeys = Object.keys(fields);
    const keypointFields = allKeys.filter((key) => key.startsWith("keypoints"))

    const handleAddField = (key) => {
        setFields((prevFields) => {
            const updatedFields = { ...prevFields };
            updatedFields[`${key}${uuidv4()}`] = ['', '', ''];
            return updatedFields;
        });
    }

    const handleDelete = (key) => {
        setFields((prevFields) => {
            const updatedFields = { ...prevFields };
            delete updatedFields[key];
            return updatedFields;
        });
    }

    const handleInputChange = (e, maxlength) => {
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
            setImage(null)
        }
        if (files) {
            const maxSizeInMB = maxlength;
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
            length = `${(files[0].size / 1024).toFixed(0)}KB`;
            if (files[0].size > maxSizeInBytes) {
                error = `File size exceeds ${maxSizeInMB} MB. Please upload a smaller file.`;
                imageInputRef.current.value = null;
                value = '';
                setImage()
            } else {
                error = '';
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImage(e.target.result);
                };
                reader.readAsDataURL(files[0]);
            }
        }
        setFields((prevFields) => ({
            ...prevFields,
            [name]: [value, length, error],
        }));
    };

    return (
        <div onClick={()=>setShowAvailability(false)} className="flex h-full min-h-svh items-center justify-start w-full flex-col bg-[#ebebeb] relative">
            <div className="flex h-full flex-1 items-start justify-center w-full">
                <LeftNav />
                <div className="flex justify-start gap-y-5 flex-col items-start w-11/12 mb-10">
                    <div className="flex w-full mt-10 text-3xl font-bold">Manage your course</div>
                    <div className="flex w-full flex-col gap-y-8">
                        <div className="flex flex-col gap-y-2 w-full">
                            <div className="flex text-lg font-bold">What’s Your Work About?</div>
                            <div className="flex text-sm opacity-80">This is where you share the name of your work. Keep it short and clear so people instantly know what it’s about!</div>
                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.title[2] ? 'border-red-500' : ''}`}>
                                <input name={'title'} maxLength={11} placeholder="Give it a clear, catchy title..." onChange={(e) => { handleInputChange(e, 10) }} value={fields.title ? fields.title[0] : ''} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">{10 - fields.title[1] || 0}</div>
                            </div>
                            <div className="flex text-xs text-red-500">{fields.title[2] || ''}</div>
                        </div>

                        <div className="flex flex-col gap-y-2 w-full">
                            <div className="flex text-lg font-bold">
                                Quick Overview
                            </div>
                            <div className="flex text-sm opacity-80">
                                Write a quick summary of your work here. Think of it as a snapshot that gives people a glimpse of what you’ve created or accomplished.
                            </div>
                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.short[2] ? 'border-red-500' : ''}`}>
                                <input name={'short'} maxLength={160}
                                    placeholder="Summarize your work in a few sentences..."
                                    onChange={(e) => { handleInputChange(e, 10) }}
                                    value={fields.short[0] || ''}
                                    type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                    {10 - fields.short[1] || 0}
                                </div>
                            </div>
                            <div className="flex text-xs text-red-500">
                                {fields.short[2] || ''}
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2 w-full">
                            <div className="flex text-lg font-bold">
                                Tell Us the Whole Story
                            </div>
                            <div className="flex text-sm opacity-80">
                                Here’s your chance to dive deep and share all the details about your work. Explain what you’ve done, how you did it, and why it’s special. Don’t hold back—this is your moment to shine!
                            </div>
                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.long[2] ? 'border-red-500' : ''}`}>
                                <input name={'long'} maxLength={160}
                                    placeholder="Go into detail about your work—share everything that makes it amazing!"
                                    onChange={(e) => { handleInputChange(e, 10) }}
                                    value={fields.long[0] || ''}
                                    type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                    {10 - fields.long[1] || 0}
                                </div>
                            </div>
                            <div className="flex text-xs text-red-500">
                                {fields.long[2] || ''}
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2 w-full">
                            <div className="flex text-lg font-bold">Why Hire Me?</div>
                            <div className="flex text-sm opacity-80">Explain what sets you apart. Share your unique value, strengths, or approach that makes you the best choice.</div>
                            {
                                keypointFields.map((keypointField, index) => (
                                    <div key={index}>
                                        <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden 
                                            ${fields[keypointField][2] ? 'border-red-500' : ''} items-center`}>
                                            <input
                                                name={keypointField}
                                                maxLength={12}
                                                value={fields[keypointField][0] || ''}
                                                onChange={(e) => handleInputChange(e, 10)} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none"
                                                placeholder="Share your unique value, special skills, or why someone should work with you..." />
                                            <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                                {10 - fields[keypointField][1]}
                                            </div>
                                            <div
                                                onClick={() => handleDelete(keypointField)}
                                                className="flex w-10 justify-center hover:text-red-600 duration-150 items-center"><MdDeleteOutline size={25} /></div>
                                        </div>
                                        <div className="flex text-xs text-red-500">
                                            {fields[keypointField][2] || ''}
                                        </div>
                                    </div>
                                ))
                            }
                            <div onClick={() => handleAddField('keypoints')} className="flex text-green-600 font-bold text-sm cursor-pointer">+ Add more to your responce</div>
                        </div>

                        <div className="flex flex-col gap-y-2 w-full relative">
                            <div className="flex text-lg font-bold">
                                Work Category
                            </div>
                            <div className="flex text-sm opacity-80">
                                Choose a category that best fits your work. This helps others quickly understand what type of work you specialize in.
                            </div>
                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.category[2] ? 'border-red-500' : ''}`}>
                                <input name={'category'} maxLength={160}
                                    placeholder="Go into detail about your work—share everything that makes it amazing!"
                                    onChange={(e) => { handleInputChange(e, 10) }}
                                    value={fields.category[0] || ''}
                                    type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                    {10 - fields.category[1] || 0}
                                </div>
                            </div>
                            <div className="flex flex-col relative">
                                {
                                    fields.category[2] &&
                                    <div className="flex text-xs text-red-500 mb-1">
                                        {fields.category[2]}
                                    </div>
                                }
                                <div className="flex absolute justify-center top-0 w-full h-auto max-h-40 bg-[#f5f4f4] shadow-2xl z-50 rounded-sm border border-zinc-300">
                                    <div className="flex-1 overflow-y-auto items-center flex-col">
                                        <div className="flex h-12 px-2 border-b border-zinc-300 gap-x-3 w-full items-center opacity-70 hover:bg-zinc-300">
                                            <PiPathBold size={17} />
                                            <div className="flex text-sm font-semibold">{fields.avilability[0]}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2 w-full relative">
                            <div className="flex text-lg font-bold">
                                Your Availability
                            </div>
                            <div className="flex text-sm opacity-80">
                                Let others know when you’re available to work. Are you looking for full-time, part-time, freelance, or project-based opportunities?
                            </div>
                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.avilability[2] ? 'border-red-500' : ''}`}>
                                <input ref={availbilityRef} name={'avilability'} maxLength={160}
                                    placeholder="Select your availability"
                                    onChange={(e) => {handleInputChange(e, 100);setShowAvailability(true) }}
                                    onClick={(e) => {e.stopPropagation(); setShowAvailability(true)}}
                                    value={fields.avilability[0] || ''}
                                    type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                            </div>
                            <div className="flex flex-col relative">
                                {
                                    fields.avilability[2] &&
                                    <div className="flex text-xs text-red-500 mb-1">
                                        {fields.avilability[2]}
                                    </div>
                                }
                                <div className="flex absolute justify-center top-0 w-full h-auto max-h-60 bg-[#f5f4f4] shadow-2xl z-50 rounded-sm border border-zinc-300">
                                    <div className="flex-1 overflow-y-auto items-center flex-col">
                                        {
                                            showAvailability &&
                                            available.map((availabilityType, index) => (
                                                <div key={index} onClick={() => {
                                                    availbilityRef.current.value = availabilityType; handleInputChange(availbilityRef, 100);
                                                }} className="flex h-12 px-2 border-b border-zinc-300 gap-x-3 w-full items-center opacity-70 hover:bg-zinc-300 cursor-pointer">
                                                    <MdOutlineBusinessCenter size={17} />
                                                    <div className="flex text-sm font-semibold">{availabilityType}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-400 w-full h-0.5 my-5" />

                        <div className="flex flex-col gap-y-2 w-full">
                            <div className="flex text-lg font-bold">
                                Showcase Your Work
                            </div>
                            <div className="flex text-sm opacity-80">
                                A picture is worth a thousand words! Upload an image to help others better understand and connect with your work. Make sure it’s clear, high-quality, and relevant.
                            </div>
                            <div className={`flex h-44 w-auto border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.img[2] ? 'border-red-500' : ''}`}>
                                <img src={image || placeholder} alt="" className="w-64 h-44 object-contain" />
                                <div className="flex w-auto flex-col pl-5 gap-3">
                                    <div className="flex w-auto text-sm">*Upload an image that represents your work (max 2MB). It could be a photo, graphic, or anything visual that captures its essence!</div>
                                    <input name={'img'} accept="image/*" ref={imageInputRef}
                                        placeholder="Go into detail about your work—share everything that makes it amazing!"
                                        onChange={(e) => { handleInputChange(e, 2) }}
                                        type="file" className="flex w-auto h-full bg-transparent text-sm font-light outline-none" />
                                    {
                                        image &&
                                        <div className="flex">
                                            <div onClick={() => { setImage(null); imageInputRef.current.value = null }} className="flex w-12 justify-center hover:text-red-600 duration-150 items-center"><MdDeleteOutline size={25} /></div>
                                            <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                                {fields.img[1]}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="flex text-xs text-red-500">
                                {fields.img[2] || ''}
                            </div>
                        </div>

                        <div className="bg-zinc-400 w-full h-0.5 my-5" />




                    </div>
                </div>
            </div>
            <Footer />
            {/* <div className="flex fixed text-green-600 top-3 right-3 gap-x-3 w-40 h-12 bg-zinc-200 border border-green-400 justify-center items-center rounded-sm">
                <div className="flex text-sm opacity-60">
                Updated
                </div>
                <IoCloudDone size={18}/>
            </div> */}
            <div className="flex fixed text-red-600 top-3 right-3 gap-x-3 w-40 h-12 bg-zinc-200 border border-red-400 justify-center items-center rounded-sm">
                <div className="flex text-sm opacity-60">
                    Not connected
                </div>
                <MdError size={18} />
            </div>
            {/* <div className="flex fixed top-3 right-3 gap-x-3 w-40 h-12 bg-zinc-200 border border-green-400 justify-center items-center rounded-sm">
                <div className="flex text-sm opacity-60">
                Updating
                </div>
                <LoadingSpinner val={10}/>
            </div> */}
        </div>
    )
}

export default EditListings