import LazyLoad from "react-lazyload"
import Footer from "../components/footer/Footer"
import { CiSearch } from "react-icons/ci"
import LeftNav from "../components/leftNav/LeftNav"
import { useRef, useState } from "react"
import { MdDeleteOutline, MdError } from "react-icons/md"
import placeholder from '../assets/placeholder.svg'
import LoadingSpinner from "../components/LoadingSpinner"
import { IoCloudDone } from "react-icons/io5"

function EditListings() {
    // const [subfields, setsubFields] = useState([{ value: "" }]);
    const [fields, setFields] = useState({
        title: ['', '', ''],
        short:['','',''],
        long:['','',''],
        img: ['', '', '']
    });
    const [image, setImage] = useState(null)
    const imageInputRef = useRef(null)
    // const handleAddField = () => {
    //     setsubFields([...subfields, { value: "" }]);
    // };

    // const handleInputChange = (index, event) => {
    //     const newFields = [...fields];
    //     newFields[index].value = event.target.value; 
    //     setFields(newFields);
    // };

    // const handleRemoveField = (index,value) => {
    //     const newsubFields = subfields.filter((_, val) => val !== index);
    //     const newFields = Object.keys(fields).filter(val=>val !== value);
    //     setsubFields(newsubFields);
    //     // setFields(newFields)
    //     console.log(newFields);


    // };
    const handleInputChange = (e, maxlength) => {
        let { name, value, files } = e.target;
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
                    setImage(e.target.result); // Set the image data URL for preview
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
        <div className="flex h-full min-h-svh items-center justify-start w-full flex-col bg-[#ebebeb] relative">
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
                                        onChange={(e) => { handleInputChange(e, 1) }}
                                        type="file" className="flex w-auto h-full bg-transparent font-light outline-none" />
                                    {
                                        image &&
                                        <div className="flex">
                                            <div onClick={() => {setImage(null);imageInputRef.current.value = null}} className="flex w-12 justify-center hover:text-red-600 duration-150 items-center"><MdDeleteOutline size={25} /></div>
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


                        {/* <div className="flex flex-col gap-y-2 w-full">
                            <div className="flex text-lg font-bold">Why Hire Me?</div>
                            <div className="flex text-sm opacity-80">Explain what sets you apart. Share your unique value, strengths, or approach that makes you the best choice.</div>
                            {
                                subfields.map((field, index) => (
                                    <div key={index} className="flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center">
                                        <input name={'keypoint' + index} onChange={(event) => handleInputChange(event)} value={fields['keypoint' + index]} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" placeholder="Clear and catchy title for your listing" />
                                        <div className="flex w-12 justify-center items-center">{fields['keypoint' + index] ? (160 - fields['keypoint' + index].length) : 0}</div>
                                        <div onClick={() => handleRemoveField(index,('keypoint' + index))} className="flex w-12 justify-center hover:text-red-600 duration-150 items-center"><MdDeleteOutline size={25} /></div>
                                    </div>
                                ))
                            }
                            <div onClick={handleAddField} className="flex text-green-600 font-bold text-sm">+ Add more to your responce</div>
                        </div> */}
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