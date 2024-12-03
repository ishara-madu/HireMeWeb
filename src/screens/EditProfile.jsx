import Footer from "../components/footer/Footer"
import LeftNav from "../components/leftNav/LeftNav"
import { useRef, useState } from "react"
import { MdBusinessCenter, MdDeleteOutline, MdError, MdOutlineBusinessCenter } from "react-icons/md"
import placeholder from '../assets/placeholder.svg'
import addimage from '../assets/add-image.svg'
import LoadingSpinner from "../components/LoadingSpinner"
import { IoCloudDone } from "react-icons/io5"
import { v4 as uuidv4 } from "uuid";
import { PiPath, PiPathBold } from "react-icons/pi"
import { FaBusinessTime } from "react-icons/fa6"
function EditProfile() {
  const [fields, setFields] = useState({
    title: ['', '', ''],
    short: ['', '', ''],
    long: ['', '', ''],
    img: ['', '', ''],
    keypoints: ['', '', ''],
    experienceDetail: ['', '', ''],
    tag: ['', '', ''],
    qualification: ['', '', ''],
    highlights: ['', '', ''],
    category: ['', '', ''],
    avilability: ['', '', ''],
    experienceObj: ['', '', ''],
    categoryObj: ['', '', ''],
});
const [image, setImage] = useState(null)
const imageInputRef = useRef(null)
const availbilityRef = useRef(null)
const experienceRef = useRef(null)
const categoryRef = useRef(null)
const [showAvailability, setShowAvailability] = useState(false);
const [showExperience, setshowExperience] = useState(false);
const [showCategory, setshowCategory] = useState(false);

const availabilityTypes = ["Full-Time", "Part-Time", "Freelance/Contract", "Temporary", "Internship", "Remote", "Hybrid", "On-Demand/Per Task", "Shift-Based"];
const expericenceTypes = ["Entry-Level", "Junior", "Mid-Level", "Senior", "Lead", "Expert", "Manager", "Director", "Vice President", "C-Level Executive", "Intern", "Freelancer", "Consultant", "Experienced Professional"];
const categoryTypes = ["Programming,Front-End Web", "Programming,Back-End Web", "Programming,Mobile App Development", "Programming,Game Development", "Design,UI/UX Design", "Design,Graphic Design", "Design,Product Design", "Design,Web Design", "Marketing,Digital Marketing", "Marketing,Content Writing", "Marketing,SEO Optimization", "Marketing,Social Media Marketing", "Marketing,Email Marketing", "Marketing,Influencer Marketing", "Marketing,Affiliate Marketing", "Marketing,Brand Strategy", "Data Science,Data Analysis", "Data Science,Machine Learning", "Data Science,Artificial Intelligence", "Data Science,Deep Learning", "Data Science,Big Data", "Data Science,Data Visualization", "Data Science,Data Engineering", "Data Science,Statistical Analysis", "Media,Video Editing", "Media,Photography", "Media,3D Modeling", "Media,Animation", "Media,Sound Editing", "Media,Podcasting", "Media,Film Production", "Media,Motion Graphics", "Cybersecurity,Ethical Hacking", "Cybersecurity,Network Security", "Cybersecurity,Penetration Testing", "Cybersecurity,Data Privacy", "Cybersecurity,Cloud Security", "Cybersecurity,Incident Response", "Cybersecurity,Security Auditing", "Cybersecurity,Vulnerability Assessment", "Cloud Computing,Cloud Infrastructure", "Cloud Computing,Cloud Architecture", "Cloud Computing,Cloud Security", "Cloud Computing,Cloud Services", "Cloud Computing,DevOps", "Cloud Computing,AWS", "Cloud Computing,Azure", "Cloud Computing,Google Cloud", "IT,IT Support", "IT,System Administration", "IT,Network Administration", "IT,Cloud Administration", "Business,Project Management", "Business,Product Management", "Business,Operations Management", "Business,Supply Chain Management", "Business,Change Management", "Business,Strategy Consulting", "Business,Human Resources", "Business,Recruitment", "Business,Financial Management", "Business,Accounting", "Business,Tax Consulting", "Business,Marketing Strategy", "Business,Customer Service", "Business,Sales Management", "Business,Business Development", "Business,Negotiation", "Finance,Investment Banking", "Finance,Corporate Finance", "Finance,Personal Finance", "Finance,Financial Analysis", "Finance,Wealth Management", "Finance,Financial Planning", "Finance,Insurance", "Finance,Accounting", "Law,Corporate Law", "Law,Criminal Law", "Law,Civil Law", "Law,Family Law", "Law,Intellectual Property Law", "Law,Employment Law", "Law,Environmental Law", "Law,Immigration Law", "Education,Instructional Design", "Education,Educational Consulting", "Education,Online Teaching", "Education,Tutoring", "Education,Course Development", "Education,School Administration", "Education,Special Education", "Education,Teacher Training", "Healthcare,Medical Research", "Healthcare,Nursing", "Healthcare,Physician", "Healthcare,Pharmacy", "Healthcare,Physical Therapy", "Healthcare,Public Health", "Healthcare,Healthcare Administration", "Healthcare,Healthcare Consulting", "Construction,Project Management", "Construction,Construction Design", "Construction,Construction Engineering", "Construction,Architecture", "Engineering,Civil Engineering", "Engineering,Mechanical Engineering", "Engineering,Chemical Engineering", "Engineering,Electrical Engineering", "Engineering,Software Engineering", "Engineering,Aerospace Engineering", "Engineering,Automotive Engineering", "Engineering,Environmental Engineering", "Art,Illustration", "Art,Painting", "Art,Sculpture", "Art,Photography", "Art,Calligraphy", "Art,Printmaking", "Art,Graphic Design", "Art,Animation", "Entertainment,Music Production", "Entertainment,Songwriting", "Entertainment,Event Planning", "Entertainment,Theater", "Entertainment,Film Production", "Entertainment,Radio", "Entertainment,Stand-Up Comedy", "Entertainment,Writing", "Sales,Sales Management", "Sales,Account Management", "Sales,B2B Sales", "Sales,B2C Sales", "Sales,Inside Sales", "Sales,Field Sales", "Sales,Sales Operations", "Sales,Sales Strategy"];

const available = availabilityTypes.filter((availa) =>
    availa.toLowerCase().includes(fields.avilability[0]?.toLowerCase() || "")
);
const experienceSuggesions = expericenceTypes.filter((val) =>
    val.toLowerCase().includes(fields.experienceObj[0]?.toLowerCase() || "")
);
const categorySuggesions = categoryTypes.filter((val) =>
    val.toLowerCase().includes(fields.categoryObj[0]?.toLowerCase() || "")
);

const allKeys = Object.keys(fields);
const keypointFields = allKeys.filter((key) => key.startsWith("keypoints"))
const experienceFields = allKeys.filter((key) => key.startsWith("experienceDetail"))
const tagsFields = allKeys.filter((key) => key.startsWith("tags"))
const qualificationFields = allKeys.filter((key) => key.startsWith("qualification"))
const highlightsFields = allKeys.filter((key) => key.startsWith("highlights"))

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

const handleChips = (e, maxlength) => {
    let name, value;
    if (e.target) {
        name = e.target.name;
        value = e.target.value;
    }
    if ((e.key === ' ' || e.key === 'Enter') && maxlength > value.length) {
        const words = value.split(' ');
        const lastWord = words[words.length - 1];

        if (lastWord.startsWith('#') && lastWord.length > 1) {
            setFields((prevFields) => {
                const updatedFields = { ...prevFields };
                updatedFields[`${name}s${uuidv4()}`] = [lastWord, '', ''];
                updatedFields[`${name}`] = ['', '', ''];
                return updatedFields;
            });
        }
    }

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
    }
    if (files) {
        const maxSizeInMB = maxlength;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        length = `${(files[0].size / 1024).toFixed(0)}KB`;
        if (files[0].size > maxSizeInBytes) {
            error = `File size exceeds ${maxSizeInMB} MB. Please upload a smaller file.`;
            imageInputRef.current.value = null;
            value = '';
            setImage(null)
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
    <div onClick={() => { setShowAvailability(false); setshowExperience(false); setshowCategory(false) }} className="flex h-full min-h-svh items-center justify-start w-full flex-col bg-[#ebebeb] relative">
        <div className="flex h-full flex-1 items-start justify-center w-full">
            <LeftNav />
            <div className="flex justify-start gap-y-5 flex-col items-start w-11/12 mb-10">
                <div className="flex w-full justify-between mt-10 items-center">
                    <div className="flex w-auto text-3xl font-bold">Manage your course</div>
                    <div className="flex gap-x-5">
                        <div className="flex w-auto text-sm font-bold px-10 hover:bg-zinc-500 cursor-pointer border border-zinc-300 text-white rounded-sm bg-zinc-400 h-10 items-center">Remove</div>
                        <div className="flex w-auto text-sm font-bold px-10 text-[#fff] hover:bg-green-600 cursor-pointer border border-zinc-300 rounded-sm bg-green-500 h-10 items-center">Submit</div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-y-8 mb-10">
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
                        <div className={`flex h-auto w-full border border-zinc-400 rounded-sm overflow-hidden items-end ${fields.long[2] ? 'border-red-500' : ''}`}>
                            <textarea name={'long'} maxLength={160} rows={10}
                                placeholder="Go into detail about your work—share everything that makes it amazing!"
                                onChange={(e) => { handleInputChange(e, 10) }}
                                value={fields.long[0] || ''}
                                type="text" className="flex flex-1 h-full bg-transparent pl-5 py-3 font-light outline-none" />
                            <div className="flex w-10 h-full pb-3 justify-center items-center opacity-70 text-sm">
                                {10 - fields.long[1] || 0}
                            </div>
                        </div>
                        <div className="flex text-xs text-red-500">
                            {fields.long[2] || ''}
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
                            <img src={image || placeholder} alt="" className="w-64 h-44 object-contain cursor-pointer" onClick={()=>(imageInputRef.current.click())}/>
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

                    <div className="flex flex-col gap-y-2 w-full">
                        <div className="flex text-lg font-bold">What Tools and Technologies Do You Use?</div>
                        <div className="flex text-sm opacity-80">Let us know the tools, software, and technologies you work with, whether it’s for #development, #design, or something else, like #JavaScript, #React, #Adobe, #Photoshop, #Git.</div>
                        <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden ${fields.tag[2] ? 'border-red-500' : ''} items-center`}>
                            <input
                                name={'tag'}
                                maxLength={13}
                                value={fields.tag[0]}
                                onChange={(e) => { handleInputChange(e, 12) }}
                                onKeyDown={(e) => handleChips(e, 12)} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none"
                                placeholder="e.g., #JavaScript, #React, #Adobe, #Photoshop, #Git" />
                            <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                {12 - fields.tag[1] || 0}
                            </div>
                        </div>
                        <div className="flex text-xs text-red-500">
                            {fields.tag[2] || ''}
                        </div>
                        <div className="flex w-full h-auto gap-3 flex-wrap">
                            {
                                tagsFields &&
                                tagsFields.map((tagsField, index) => (
                                    <div key={index} className="flex flex-col">
                                        <div className={`flex h-12 w-auto border border-zinc-400 bg-zinc-300 rounded-sm overflow-hidden ${fields[tagsField][2] ? 'border-red-500' : ''} items-center`}>
                                            <div className="flex w-auto h-full items-center justify-center bg-transparent pl-3 font-light outline-none">
                                                {fields[tagsField][0]}
                                            </div>
                                            <div
                                                onClick={() => handleDelete(tagsField)}
                                                className="flex w-9 justify-center hover:text-red-600 duration-150 items-center"><MdDeleteOutline size={20} /></div>
                                        </div>
                                        <div className="flex text-xs text-red-500">
                                            {fields[tagsField][2] || ''}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2 w-full relative">
                        <div className="flex text-lg font-bold">
                            Work Category
                        </div>
                        <div className="flex text-sm opacity-80">
                            Choose a category that best fits your work. This helps others quickly understand what type of work you specialize in.
                        </div>
                        <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.categoryObj[2] ? 'border-red-500' : ''}`}>
                            <input ref={categoryRef} name={'categoryObj'} maxLength={101}
                                placeholder="Select a category (e.g., Design, Writing, Development, Marketing)..."
                                onChange={(e) => { handleInputChange(e, 100); setshowCategory(true) }}
                                onClick={(e) => { e.stopPropagation(); setshowCategory(true) }}
                                value={fields.categoryObj[0] || ''}
                                type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                            <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                {100 - fields.categoryObj[1] || 0}
                            </div>
                        </div>
                        <div className="flex flex-col relative">
                            {
                                fields.categoryObj[2] &&
                                <div className="flex text-xs text-red-500 mb-1">
                                    {fields.categoryObj[2]}
                                </div>
                            }
                            {
                                showCategory &&
                                <div className="flex absolute justify-center top-0 w-full h-auto max-h-64 bg-[#f5f4f4] shadow-2xl z-50 rounded-sm border border-zinc-300">
                                    <div className="flex-1 overflow-y-auto items-center flex-col">
                                        {
                                            categorySuggesions.map((suggession, index) => (
                                                <div key={index} onClick={() => {
                                                    availbilityRef.current.value = suggession; handleInputChange(categoryRef, 100);
                                                }} className="flex h-12 px-2 border-b border-zinc-300 gap-x-3 w-full items-center opacity-70 hover:bg-zinc-300 cursor-pointer">
                                                    <MdBusinessCenter size={17} />
                                                    <div className="flex text-sm font-semibold">{suggession}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
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
                            <input ref={availbilityRef} name={'avilability'} maxLength={21}
                                placeholder="Select your availability (e.g., Full-Time, Part-Time, Freelance)..."
                                onChange={(e) => { handleInputChange(e, 20); setShowAvailability(true) }}
                                onClick={(e) => { e.stopPropagation(); setShowAvailability(true) }}
                                value={fields.avilability[0] || ''}
                                type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                            <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                {20 - fields.avilability[1] || 0}
                            </div>
                        </div>
                        <div className="flex flex-col relative">
                            {
                                fields.avilability[2] &&
                                <div className="flex text-xs text-red-500 mb-1">
                                    {fields.avilability[2]}
                                </div>
                            }
                            {
                                showAvailability &&
                                <div className="flex absolute justify-center top-0 w-full h-auto max-h-64 bg-[#f5f4f4] shadow-2xl z-50 rounded-sm border border-zinc-300">
                                    <div className="flex-1 overflow-y-auto items-center flex-col">
                                        {
                                            available.map((availabilityType, index) => (
                                                <div key={index} onClick={() => {
                                                    availbilityRef.current.value = availabilityType; handleInputChange(availbilityRef, 20);
                                                }} className="flex h-12 px-2 border-b border-zinc-300 gap-x-3 w-full items-center opacity-70 hover:bg-zinc-300 cursor-pointer">
                                                    <MdBusinessCenter size={17} />
                                                    <div className="flex text-sm font-semibold">{availabilityType}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2 w-full relative">
                        <div className="flex text-lg font-bold">
                            Your Experience Level
                        </div>
                        <div className="flex text-sm opacity-80">
                            Let others know how experienced you are in your field. Whether you’re just starting out or a seasoned professional, this helps set expectations.
                        </div>
                        <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.experienceObj[2] ? 'border-red-500' : ''}`}>
                            <input ref={experienceRef} name={'experienceObj'} maxLength={21}
                                placeholder="Select your experience level (e.g., Beginner, Intermediate, Expert)..."
                                onChange={(e) => { handleInputChange(e, 20); setshowExperience(true) }}
                                onClick={(e) => { e.stopPropagation(); setshowExperience(true) }}
                                value={fields.experienceObj[0] || ''}
                                type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                            <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                {20 - fields.experienceObj[1] || 0}
                            </div>
                        </div>
                        <div className="flex flex-col relative">
                            {
                                fields.experienceObj[2] &&
                                <div className="flex text-xs text-red-500 mb-1">
                                    {fields.experienceObj[2]}
                                </div>
                            }
                            {
                                showExperience &&
                                <div className="flex absolute justify-center top-0 w-full h-auto max-h-64 bg-[#f5f4f4] shadow-2xl z-50 rounded-sm border border-zinc-300">
                                    <div className="flex-1 overflow-y-auto items-center flex-col">
                                        {
                                            experienceSuggesions.map((suggession, index) => (
                                                <div key={index} onClick={() => {
                                                    experienceRef.current.value = suggession; handleInputChange(experienceRef, 20);
                                                }} className="flex h-12 px-2 border-b border-zinc-300 gap-x-3 w-full items-center opacity-70 hover:bg-zinc-300 cursor-pointer">
                                                    <FaBusinessTime size={17} />
                                                    <div className="flex text-sm font-semibold">{suggession}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="bg-zinc-400 w-full h-0.5 my-5" />

                    <div className="flex flex-col gap-y-2 w-full">
                        <div className="flex text-lg font-bold">Tell Us About Your Work Experience</div>
                        <div className="flex text-sm opacity-80">Share the details of your job, including your role, responsibilities, and any achievements or highlights.</div>
                        {
                            experienceFields.map((experienceField, index) => (
                                <div key={index}>
                                    <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden 
                                        ${fields[experienceField][2] ? 'border-red-500' : ''} items-center`}>
                                        <input
                                            name={experienceField}
                                            maxLength={12}
                                            value={fields[experienceField][0] || ''}
                                            onChange={(e) => handleInputChange(e, 10)} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none"
                                            placeholder="e.g., Software Engineer at XYZ Corp, building web apps, leading a small team of developers." />
                                        <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                            {10 - fields[experienceField][1]}
                                        </div>
                                        <div
                                            onClick={() => handleDelete(experienceField)}
                                            className="flex w-10 justify-center hover:text-red-600 duration-150 items-center"><MdDeleteOutline size={25} /></div>
                                    </div>
                                    <div className="flex text-xs text-red-500">
                                        {fields[experienceField][2] || ''}
                                    </div>
                                </div>
                            ))
                        }
                        <div onClick={() => handleAddField('experienceDetail')} className="flex text-green-600 font-bold text-sm cursor-pointer">+ Add more to your responce</div>
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

                    <div className="flex flex-col gap-y-2 w-full">
                        <div className="flex text-lg font-bold">Certificates and Qualifications</div>
                        <div className="flex text-sm opacity-80">Tell us about any certifications or qualifications you’ve earned that show your expertise or add to your skillset.</div>
                        {
                            qualificationFields.map((qualificationField, index) => (
                                <div key={index}>
                                    <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden 
                                        ${fields[qualificationField][2] ? 'border-red-500' : ''} items-center`}>
                                        <input
                                            name={qualificationField}
                                            maxLength={12}
                                            value={fields[qualificationField][0] || ''}
                                            onChange={(e) => handleInputChange(e, 10)} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none"
                                            placeholder="e.g., Google Analytics : www.qualification.com/google-analytics" />
                                        <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                            {10 - fields[qualificationField][1]}
                                        </div>
                                        <div
                                            onClick={() => handleDelete(qualificationField)}
                                            className="flex w-10 justify-center hover:text-red-600 duration-150 items-center"><MdDeleteOutline size={25} /></div>
                                    </div>
                                    <div className="flex text-xs text-red-500">
                                        {fields[qualificationField][2] || ''}
                                    </div>
                                </div>
                            ))
                        }
                        <div onClick={() => handleAddField('qualification')} className="flex text-green-600 font-bold text-sm cursor-pointer">+ Add more to your responce</div>
                    </div>

                    <div className="flex flex-col gap-y-2 w-full">
                        <div className="flex text-lg font-bold">Portfolio Highlights (Project Links)</div>
                        <div className="flex text-sm opacity-80">Share a few of your standout projects or pieces from your portfolio. Include links if you can!</div>
                        {
                            highlightsFields.map((highlightsField, index) => (
                                <div key={index}>
                                    <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden 
                                        ${fields[highlightsField][2] ? 'border-red-500' : ''} items-center`}>
                                        <input
                                            name={highlightsField}
                                            maxLength={12}
                                            value={fields[highlightsField][0] || ''}
                                            onChange={(e) => handleInputChange(e, 10)} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none"
                                            placeholder="e.g., My portfolio : www.behance.net/my-portfolio" />
                                        <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                            {10 - fields[highlightsField][1]}
                                        </div>
                                        <div
                                            onClick={() => handleDelete(highlightsField)}
                                            className="flex w-10 justify-center hover:text-red-600 duration-150 items-center"><MdDeleteOutline size={25} /></div>
                                    </div>
                                    <div className="flex text-xs text-red-500">
                                        {fields[highlightsField][2] || ''}
                                    </div>
                                </div>
                            ))
                        }
                        <div onClick={() => handleAddField('highlights')} className="flex text-green-600 font-bold text-sm cursor-pointer">+ Add more to your responce</div>
                    </div>

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
        {/* <div className="flex fixed text-red-600 top-3 right-3 gap-x-3 w-40 h-12 bg-zinc-200 border border-red-400 justify-center items-center rounded-sm">
            <div className="flex text-sm opacity-60">
                Not connected
            </div>
            <MdError size={18} />
        </div> */}
        {/* <div className="flex fixed top-3 right-3 gap-x-3 w-40 h-12 bg-zinc-200 border border-green-400 justify-center items-center rounded-sm">
            <div className="flex text-sm opacity-60">
            Updating
            </div>
            <LoadingSpinner val={10}/>
        </div> */}
    </div>
)
}

export default EditProfile