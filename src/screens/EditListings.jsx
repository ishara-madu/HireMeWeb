import Footer from "../components/footer/Footer"
import LeftNav from "../components/leftNav/LeftNav"
import { useEffect, useRef, useState } from "react"
import { MdBusinessCenter, MdDeleteOutline, MdError } from "react-icons/md"
import placeholder from '../assets/placeholder.svg'
import LoadingSpinner from "../components/LoadingSpinner"
import { IoCloudDone } from "react-icons/io5"
import { v4 as uuidv4 } from "uuid";
import { FaBusinessTime } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux"
import getCookie from "../util/getCookie"
import { deleteListing, fetchListning, updateListing, updateListingWithImage } from "../features/listing/listingThunk"
import { useNavigate } from "react-router-dom"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';

function EditListings() {
    const navigate = useNavigate()
    const [showDeleteConfirm, setshowDeleteConfirm] = useState(false)
    const [CofirmValue, setCofirmValue] = useState(["", "", ""])
    const [submitError, setsubmitError] = useState('')
    const dispatch = useDispatch()
    const [showTopLoading, setshowTopLoading] = useState(false)
    const { data, loading, error, upadate_loading, upadate_error, upadate_data } = useSelector(state => state.listings)

    const uid = getCookie('uid');
    const lid = sessionStorage.getItem('listingFilter');

    useEffect(() => {
        if (lid != 'undefined') {
            dispatch(fetchListning({ uid: uid, lid: lid }));
        } else {
            dispatch(fetchListning({ uid: uid }));
        }
    }, [dispatch]);


    useEffect(() => {
        if (data == null) {
            navigate('/show-listings');
        }
    }, [data])

    useEffect(() => {
        if (!upadate_loading && !upadate_error) {
            setshowTopLoading(true);
            const timer = setTimeout(() => {
                setshowTopLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [upadate_loading, upadate_error]);

    const [fields, setFields] = useState({
        title: ['', '', ''],
        short: ['', '', ''],
        long: ['', '', ''],
        img: [null, '', ''],
        keypoints: ['', '', ''],
        tagList: ['', '', ''],
        availability: ['', '', ''],
        experienceLevel: ['', '', ''],
        category: ['', '', ''],
    });

    useEffect(() => {
        if (!loading && data) {
            if (data.length > 0) {
                const newFields = {
                    title: [data[0]?.title || '', '', ''],
                    short: [data[0]?.description?.short || '', '', ''],
                    long: [data[0]?.description?.long || '', '', ''],
                    img: [data[0]?.image?.publicUrl || '', '', ''],
                    tagList: ['', '', ''],
                    availability: [data[0]?.options?.availability || '', '', ''],
                    experienceLevel: [data[0]?.options?.experienceLevel || '', '', ''],
                    category: [data[0]?.category || '', '', ''],
                };
                setFields(newFields);
                const mapMoreValues = (values, name) => {
                    values &&
                        values.map(val => (
                            setFields((prev) => ({ ...prev, [name + uuidv4()]: [val, '', ''] }))
                        ))
                }
                data[0]?.description ? Array.isArray(data[0]?.description.keypoints) ? mapMoreValues(data[0]?.description && data[0]?.description.keypoints, 'keypoints') : mapMoreValues([data[0]?.description.keypoints], 'keypoints') : mapMoreValues([""], 'keypoints');

                mapMoreValues(data[0]?.tags && data[0].tags.tagList, 'tagLists');
                sessionStorage.getItem('imageSize')
            }
        }
    }, [data, loading]);


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
        availa.toLowerCase().includes(fields.availability[0]?.toLowerCase() || "")
    );
    const experienceSuggesions = expericenceTypes.filter((val) =>
        val.toLowerCase().includes(fields.experienceLevel[0]?.toLowerCase() || "")
    );
    const categorySuggesions = categoryTypes.filter((val) =>
        val.toLowerCase().includes(fields.category[0]?.toLowerCase() || "")
    );

    const allKeys = Object.keys(fields);
    const keypointFields = allKeys.filter((key) => key.startsWith("keypoints"))
    const tagsFields = allKeys.filter((key) => key.startsWith("tagLists"))

    const arrCheck = Object.values(fields).map(value => value[0]?.length > 0);



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

        if (key.startsWith('tagList')) {
            const updatedFields = upadate_data?.[0]?.tags?.tagList?.filter(val => val !== fields[key][0]) || data?.[0]?.tags?.tagList?.filter(val => val !== fields[key][0]) || [];
            dispatch(updateListing({
                id: { uid: uid, lid: lid },
                updates: {
                    tags: {
                        tagList: [...updatedFields]
                    }
                }
            }));
        }
        if (key.startsWith('keypoints')) {
            const updatedFields = upadate_data?.[0]?.description?.keypoints?.filter(val => val !== fields[key][0]) || data?.[0]?.description?.keypoints?.filter(val => val !== fields[key][0]) || [];
            dispatch(updateListing({
                id: { uid: uid, lid: lid },
                updates: {
                    description: {
                        short: fields.short[0],
                        long: fields.long[0],
                        keypoints: [...updatedFields]
                    }
                }
            }));
        }
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
                const currentTagList = upadate_data?.[0]?.tags?.tagList || data?.[0]?.tags?.tagList || [];
                if (!currentTagList.includes(lastWord)) {
                    setFields((prevFields) => {
                        const updatedFields = { ...prevFields };
                        updatedFields[`${name}s${uuidv4()}`] = [lastWord, '', ''];
                        updatedFields[`${name}`] = ['', '', ''];
                        dispatch(updateListing({
                            id: { uid: uid, lid: lid },
                            updates: {
                                tags: {
                                    tagList: [...currentTagList, lastWord]
                                }
                            }
                        }));
                        return updatedFields;
                    });
                }

            }
        }

    }

    function evaluateArray(arr) {
        const falseCount = arr.filter(value => value === false).length;
        return falseCount === 1;
    }

    const handleInputChange = (e, maxlength, custom) => {
        let name, value, files;
        if (custom === "long") {
            name = "long";
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
            length = `${(files[0].size / 1024).toFixed(0)}KB`;
            if (files[0].size > maxSizeInBytes) {
                error = `File size exceeds ${maxSizeInMB} MB. Please upload a smaller file.`;
                imageInputRef.current.value = null;
                value = null;
            } else {
                error = '';
                const oldImage = sessionStorage.getItem('old_image') || upadate_data?.[0]?.image?.oldImage || data?.[0]?.image?.oldImage;
                dispatch(updateListingWithImage({ id: { lid: lid, uid: uid }, oldImagePath: oldImage, newImageFile: files[0] }));
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFields((prevFields) => ({
                        ...prevFields,
                        [name]: [e.target.result, length, error],
                    }));
                };
                reader.readAsDataURL(files[0]);
            }
        }
        setFields((prevFields) => ({
            ...prevFields,
            [name]: [value, length, error],
        }));
        if (["title", "image", "category"].includes(name)) {
            dispatch(updateListing({ id: { uid: uid, lid: lid }, updates: { [name]: value } }));
        }
        if (["short", "long"].includes(name)) {
            dispatch(updateListing({
                id: { uid: uid, lid: lid },
                updates: {
                    description: {
                        ...upadate_data?.[0]?.description,
                        [name]: value
                    }
                }
            }));
        } if (["availability", "experienceLevel"].includes(name)) {
            dispatch(updateListing({
                id: { uid: uid, lid: lid },
                updates: {
                    options: {
                        ...upadate_data?.[0]?.options,
                        [name]: value
                    }
                }
            }));
        }
        if (name.startsWith('keypoints')) {
            const tagListValues = Object.keys(fields)
                .filter(key => key.startsWith('keypoints'))
                .map(key => fields[key]).map(val => val[0]);
            dispatch(updateListing({
                id: { uid: uid, lid: lid },
                updates: {
                    description: {
                        short: fields.short[0],
                        long: fields.long[0],
                        keypoints: [...tagListValues]
                    }
                }
            }));
        }
        evaluateArray(arrCheck) === true && setsubmitError('')
    };

    const handleClickConfirm = () => {
        if (CofirmValue[0].toLowerCase() === "confirm") {
            const oldImage = sessionStorage.getItem('old_image') || upadate_data?.[0]?.image?.oldImage || data?.[0]?.image?.oldImage;
            dispatch(deleteListing({ id: { lid: lid, uid: uid }, oldImagePath: oldImage }));
            setshowDeleteConfirm(false);
        } else {
            setCofirmValue(() => (
                [CofirmValue[0], CofirmValue[1], 'Deletion failed. Please ensure you type "CONFIRM" correctly to proceed.']
            ));
        }
    }





    const handleSubmit = async () => {
        if (data?.[0]?.submission) {
            try {
                await dispatch(updateListing({
                    id: { uid: uid, lid: lid },
                    updates: {
                        submission: false
                    }
                }));
                navigate('/show-listings');
            } catch (error) {
                console.error('Failed to update listing:', error);
            }
        } else {
            if (evaluateArray(arrCheck) === true) {

                try {
                    await dispatch(updateListing({
                        id: { uid: uid, lid: lid },
                        updates: {
                            submission: true
                        }
                    }));
                    navigate('/show-listings');
                } catch (error) {
                    console.error('Failed to update listing:', error);
                }
            } else {
                Object.keys(fields).forEach((val) => {
                    if (fields[val][0] === '' && val !== "tagList") {
                        setFields((prevFields) => ({
                            ...prevFields,
                            [val]: [fields[val][0], fields[val][1], 'This field is required. Please fill it out.'],
                        }));
                    }
                });
                if (!Object.keys(fields).some((key) => key.startsWith("tagLists"))) {
                    setFields((prevFields) => ({
                        ...prevFields,
                        tagList: [fields.tagList[0], fields.tagList[1], 'This field is required. Please fill it out.'],
                    }));
                }

                setsubmitError('Please complete all fields before submitting and try again.')
            }

        }
    }

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
        <>
            {
                error ?
                    <div className="flex h-auto min-h-lvh justify-center items-center">
                        Some error found please try again later{error}
                    </div>
                    :
                    <div onClick={() => { setShowAvailability(false); setshowExperience(false); setshowCategory(false); setshowDeleteConfirm(false) }} className="flex h-full min-h-svh items-center justify-start w-full flex-col bg-[#ebebeb] relative">
                        <div className="flex h-full flex-1 items-start justify-center w-full">
                            <LeftNav />
                            {
                                loading &&
                                <div className="flex min-h-lvh justify-center items-center">
                                    <LoadingSpinner />
                                </div>
                            }
                            {
                                !loading &&
                                <div className="flex justify-start gap-y-5 flex-col items-start w-11/12 mb-10">
                                    <div className="flex w-full justify-between mt-10 items-center">
                                        <div className="flex w-auto text-3xl font-bold">Manage your listing</div>
                                        <div className="flex gap-x-5">
                                            <div onClick={(e) => { e.stopPropagation(); setshowDeleteConfirm(true); }} className="flex relative w-auto text-sm font-bold px-10 hover:bg-zinc-500 cursor-pointer border border-zinc-300 text-white rounded-sm bg-zinc-400 h-10 items-center">
                                                Remove
                                                {
                                                    showDeleteConfirm &&
                                                    <div className="absolute flex flex-col w-72 h-auto p-4 shadow-2xl justify-center gap-y-5 items-center shadow-black z-50 left-0 rounded-sm border border-zinc-300 top-0 bg-[#eceaea]">
                                                        <div className="text-black text-sm">Are you sure you want to delete this listing? Please type <b className="text-red-500"> &quot;CONFIRM&quot; </b> in the box below to proceed. This action cannot be undone.</div>
                                                        <div className="flex w-full h-auto flex-col">
                                                            <div className={`flex w-full rounded-sm overflow-hidden h-10 text-black font-normal border ${CofirmValue[2] ? 'border-red-500' : 'border-zinc-400'}`}>
                                                                <input name='confirm' maxLength={7} onChange={(e) => { setCofirmValue(() => [e.target.value, '', '']) }} value={CofirmValue[0]} type="text" className="w-full px-2 bg-transparent outline-none h-full" placeholder="Enter &quot;CONFIRM&quot; here" />
                                                            </div>
                                                            <div className="flex text-xs text-red-500 font-normal">{CofirmValue[2]}</div>
                                                        </div>
                                                        <div onClick={(e) => { e.stopPropagation() }} className="flex w-full justify-end gap-x-2 text-[#ebebeb]">
                                                            <div onClick={() => { setshowDeleteConfirm(false) }} className="flex w-16 rounded-sm h-8 bg-zinc-500 items-center justify-center cursor-pointer">Cancel</div>
                                                            <div onClick={handleClickConfirm} className="flex w-16 rounded-sm h-8 bg-red-600 items-center justify-center cursor-pointer">Confirm</div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div onClick={handleSubmit} className={`flex w-auto text-sm font-bold px-10 text-[#fff]  cursor-pointer border border-zinc-300 rounded-sm ${data?.[0]?.submission ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} h-10 items-center`}>{data?.[0]?.submission ? "Unsubmit" : "Submit"}</div>
                                        </div>
                                    </div>
                                    {
                                        submitError &&
                                        <div className="flex text-red-500 text-sm">{submitError}</div>
                                    }
                                    <div className="flex w-full flex-col gap-y-8 mb-10">
                                        <div className="flex flex-col gap-y-2 w-full">
                                            <div className="flex text-lg font-bold">What’s Your Work About?</div>
                                            <div className="flex text-sm opacity-80">This is where you share the name of your work. Keep it short and clear so people instantly know what it’s about!</div>
                                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.title[2] ? 'border-red-500' : ''}`}>
                                                <input name={'title'} maxLength={100} placeholder="Give it a clear, catchy title..." onChange={(e) => { handleInputChange(e, 100) }} value={fields.title[0]} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">{100 - fields.title[1] || 100}</div>
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
                                                <input name={'short'} maxLength={200}
                                                    placeholder="Summarize your work in a few sentences..."
                                                    onChange={(e) => { handleInputChange(e, 200) }}
                                                    value={fields.short[0] || ''}
                                                    type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                                    {200 - fields.short[1] || 200}
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
                                                <ReactQuill
                                                    modules={modules}
                                                    formats={formats}
                                                    value={fields.long[0] || ''}
                                                    theme="snow"
                                                    className="w-full min-h-40 border-none shadow-none max-h-[500px] overflow-y-auto bg-transparent outline-none"
                                                    placeholder="Go into detail about your work—share everything that makes it amazing!"
                                                    onChange={(change) => (handleInputChange(change, 9999999999, "long"))}
                                                />
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
                                                                maxLength={100}
                                                                value={fields[keypointField][0] || ''}
                                                                onChange={(e) => handleInputChange(e, 100)} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none"
                                                                placeholder="Share your unique value, special skills, or why someone should work with you..." />
                                                            <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                                                {100 - fields?.[keypointField]?.[1] || 0}
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

                                        <div className="bg-zinc-400 w-full h-0.5 my-5" />

                                        <div className="flex flex-col gap-y-2 w-full">
                                            <div className="flex text-lg font-bold">What Tools and Technologies Do You Use?</div>
                                            <div className="flex text-sm opacity-80">Let us know the tools, software, and technologies you work with, whether it’s for #development, #design, or something else, like #JavaScript, #React, #Adobe, #Photoshop, #Git.</div>
                                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden ${fields.tagList[2] ? 'border-red-500' : ''} items-center`}>
                                                <input
                                                    name={'tagList'}
                                                    maxLength={20}
                                                    value={fields.tagList[0]}
                                                    onChange={(e) => { handleInputChange(e, 20) }}
                                                    onKeyDown={(e) => handleChips(e, 12)} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none"
                                                    placeholder="e.g., #JavaScript, #React, #Adobe, #Photoshop, #Git" />
                                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                                    {20 - fields.tagList[1] || 0}
                                                </div>
                                            </div>
                                            <div className="flex text-xs text-red-500">
                                                {fields.tagList[2] || ''}
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
                                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.category[2] ? 'border-red-500' : ''}`}>
                                                <input ref={categoryRef} name={'category'} maxLength={80}
                                                    placeholder="Select a category (e.g., Design, Writing, Development, Marketing)..."
                                                    onChange={(e) => { handleInputChange(e, 80); setshowCategory(true) }}
                                                    onClick={(e) => { e.stopPropagation(); setshowCategory(true); setShowAvailability(false); setshowExperience(false); }}
                                                    value={fields.category[0] || ''}
                                                    type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                                    {80 - fields.category[1] || 0}
                                                </div>
                                            </div>
                                            <div className="flex flex-col relative">
                                                {
                                                    fields.category[2] &&
                                                    <div className="flex text-xs text-red-500 mb-1">
                                                        {fields?.category?.[2]}
                                                    </div>
                                                }
                                                {
                                                    showCategory &&
                                                    <div className="flex absolute justify-center top-0 w-full h-auto max-h-64 bg-[#f5f4f4] shadow-2xl z-50 rounded-sm border border-zinc-300">
                                                        <div className="flex-1 overflow-y-auto items-center flex-col">
                                                            {
                                                                categorySuggesions.map((suggession, index) => (
                                                                    <div key={index} onClick={() => {
                                                                        categoryRef.current.value = suggession; handleInputChange(categoryRef, 80);
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
                                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.availability && fields.availability[2] ? 'border-red-500' : ''}`}>
                                                <input ref={availbilityRef} name={'availability'} maxLength={80}
                                                    placeholder="Select your availability (e.g., Full-Time, Part-Time, Freelance)..."
                                                    onChange={(e) => { handleInputChange(e, 80); setShowAvailability(true) }}
                                                    onClick={(e) => { e.stopPropagation(); setShowAvailability(true); setshowExperience(false); setshowCategory(false) }}
                                                    value={fields.availability ? fields.availability[0] : ''}
                                                    type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                                    {fields.availability ? 80 - fields.availability[1] : 0}
                                                </div>
                                            </div>
                                            <div className="flex flex-col relative">
                                                {
                                                    fields.availability[2] &&
                                                    <div className="flex text-xs text-red-500 mb-1">
                                                        {fields.availability ? fields.availability[2] : ''}
                                                    </div>
                                                }
                                                {
                                                    showAvailability &&
                                                    <div className="flex absolute justify-center top-0 w-full h-auto max-h-64 bg-[#f5f4f4] shadow-2xl z-50 rounded-sm border border-zinc-300">
                                                        <div className="flex-1 overflow-y-auto items-center flex-col">
                                                            {
                                                                available.map((availabilityType, index) => (
                                                                    <div key={index} onClick={() => {
                                                                        availbilityRef.current.value = availabilityType; handleInputChange(availbilityRef, 80);
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
                                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.experienceLevel[2] ? 'border-red-500' : ''}`}>
                                                <input ref={experienceRef} name={'experienceLevel'} maxLength={80}
                                                    placeholder="Select your experience level (e.g., Beginner, Intermediate, Expert)..."
                                                    onChange={(e) => { handleInputChange(e, 80); setshowExperience(true) }}
                                                    onClick={(e) => { e.stopPropagation(); setshowExperience(true); setShowAvailability(false); setshowCategory(false) }}
                                                    value={fields.experienceLevel[0] || ''}
                                                    type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" />
                                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">
                                                    {80 - fields.experienceLevel[1] || 0}
                                                </div>
                                            </div>
                                            <div className="flex flex-col relative">
                                                {
                                                    fields.experienceLevel[2] &&
                                                    <div className="flex text-xs text-red-500 mb-1">
                                                        {fields.experienceLevel[2]}
                                                    </div>
                                                }
                                                {
                                                    showExperience &&
                                                    <div className="flex absolute justify-center top-0 w-full h-auto max-h-64 bg-[#f5f4f4] shadow-2xl z-50 rounded-sm border border-zinc-300">
                                                        <div className="flex-1 overflow-y-auto items-center flex-col">
                                                            {
                                                                experienceSuggesions.map((suggession, index) => (
                                                                    <div key={index} onClick={() => {
                                                                        experienceRef.current.value = suggession; handleInputChange(experienceRef, 80);
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
                                            <div className="flex text-lg font-bold">
                                                Showcase Your Work
                                            </div>
                                            <div className="flex text-sm opacity-80">
                                                A picture is worth a thousand words! Upload an image to help others better understand and connect with your work. Make sure it’s clear, high-quality, and relevant.
                                            </div>
                                            <div className={`flex h-44 w-auto border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.img[2] ? 'border-red-500' : ''}`}>
                                                <img src={fields.img[0] || placeholder} alt="" className="w-64 h-44 object-contain cursor-pointer" onClick={() => (imageInputRef.current.click())} />
                                                <div className="flex w-auto flex-col pl-5 gap-3">
                                                    <div className="flex w-auto text-sm">*Upload an image that represents your work (max 2MB). It could be a photo, graphic, or anything visual that captures its essence!</div>
                                                    <input name={'img'} accept="image/*" ref={imageInputRef}
                                                        placeholder="Go into detail about your work—share everything that makes it amazing!"
                                                        onChange={(e) => { handleInputChange(e, 2) }}
                                                        type="file" className="flex w-auto h-full bg-transparent text-sm font-light outline-none" />
                                                    {
                                                        fields.img[0] &&
                                                        <div className="flex">
                                                            <div onClick={() => {
                                                                setFields((prev) => ({ ...prev, img: ['', '', ''] }));
                                                                imageInputRef.current.value = null;
                                                                const oldImage = sessionStorage.getItem('old_image') || upadate_data?.[0]?.image?.oldImage || data?.[0]?.image?.oldImage;
                                                                dispatch(updateListingWithImage({ id: { lid: lid, uid: uid }, oldImagePath: oldImage }))
                                                            }} className="flex w-12 justify-center hover:text-red-600 duration-150 items-center"><MdDeleteOutline size={25} /></div>
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

                                    </div>
                                </div>
                            }
                        </div>
                        <Footer />
                        {
                            showTopLoading &&
                            <div className="flex fixed text-green-600 top-3 right-3 gap-x-3 w-40 h-12 bg-zinc-200 border border-green-400 justify-center items-center rounded-sm">
                                <div className="flex text-sm opacity-60">
                                    Updated
                                </div>
                                <IoCloudDone size={18} />
                            </div>
                        }
                        {
                            upadate_error &&
                            <div className="flex fixed text-red-600 top-3 right-3 gap-x-3 w-40 h-12 bg-zinc-200 border border-red-400 justify-center items-center rounded-sm">
                                <div className="flex text-sm opacity-60">
                                    Not connected
                                </div>
                                <MdError size={18} />
                            </div>
                        }
                        {
                            upadate_loading &&
                            <div className="flex fixed top-3 right-3 gap-x-3 w-40 h-12 bg-zinc-200 border border-green-400 justify-center items-center rounded-sm">
                                <div className="flex text-sm opacity-60">
                                    Updating
                                </div>
                                <LoadingSpinner val={10} />
                            </div>
                        }
                    </div>
            }

        </>
    )
}

export default EditListings