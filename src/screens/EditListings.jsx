import LazyLoad from "react-lazyload"
import Footer from "../components/footer/Footer"
import { CiSearch } from "react-icons/ci"
import LeftNav from "../components/leftNav/LeftNav"
import { useState } from "react"
import { MdDeleteOutline } from "react-icons/md"

function EditListings() {
    // const [subfields, setsubFields] = useState([{ value: "" }]);
    const [fields, setFields] = useState({
        title: ['', '', '']
    });
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
        const { name, value } = e.target;
        const length = value.length;
        let error;
        if (length <= maxlength) {
            error = ''
        } else {
            error = `Text exceeds the maximum limit of ${maxlength} characters.`;
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
                            <div className="flex text-lg font-bold">What’s Your Skillset?</div>
                            <div className="flex text-sm opacity-80">Highlight your expertise or profession. What are you best at? Share a concise summary of your skills.</div>
                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.title[2] ? 'border-red-500' : ''}`}>
                                <input name={'title'} maxLength={160} onChange={(e) => { handleInputChange(e, 160) }} value={fields.title[0] || ''} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" placeholder="Clear and catchy title for your listing" />
                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">{160 - fields.title[1] || 0}</div>
                            </div>
                            <div className="flex text-xs text-red-500">{fields.title[2] || ''}</div>
                        </div>
                        <div className="flex flex-col gap-y-2 w-full">
                            <div className="flex text-lg font-bold">Services You Offer</div>
                            <div className="flex text-sm opacity-80">Clearly and briefly describe the services you provide. Be specific about what clients can expect from you.</div>
                            <div className={`flex h-12 w-full border border-zinc-400 rounded-sm overflow-hidden items-center ${fields.title[2] ? 'border-red-500' : ''}`}>
                                <input name={'title'} maxLength={160} onChange={(e) => { handleInputChange(e, 160) }} value={fields.title[0] || ''} type="text" className="flex flex-1 h-full bg-transparent pl-5 font-light outline-none" placeholder="Clear and catchy title for your listing" />
                                <div className="flex w-10 justify-center items-center opacity-70 text-sm">{160 - fields.title[1] || 0}</div>
                            </div>
                            <div className="flex text-xs text-red-500">{fields.title[2] || ''}</div>
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
        </div>
    )
}

export default EditListings