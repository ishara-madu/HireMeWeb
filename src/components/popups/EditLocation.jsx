/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CiLocationArrow1, CiLocationOn } from "react-icons/ci"
import { getCoordinatesFromLocation, getSuggestions } from "../../util/getLocation";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../features/profile/profileThunk";

function EditLocation({ showPupup, ...props }) {
    const dispatch = useDispatch()
    const [suggessions, setSuggessions] = useState([]);
    const [errorMassage, seterrorMassage] = useState('')
    const [input, setInput] = useState(props.location.locationName);
    useEffect(() => {
        const fetchLocation = async () => {
            const values = await getSuggestions(input);
            setSuggessions(values.map(value => value.formatted));
        };
        fetchLocation();
    }, [input]);

    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            const fetchLocation = async () => {
                const values = await getCoordinatesFromLocation(input);
                dispatch(updateProfile({
                    locationName: values?.location,
                    latitude: values?.coordinates?.lat,
                    longitude: values?.coordinates?.lng,
                }))
                console.log(values?.coordinates?.lat);
            };
            fetchLocation();
            // showPupup(false)
        }
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center w-[420px] top-[70px] h-auto max-h-60 bg-[#ebebeb] border border-[#c5c5c5] rounded-md absolute z-50 p-5">
            <div className="flex w-full h-12 items-center justify-center relative">
                <div className="absolute left-3">
                    <CiLocationOn size={20} color="#aeadad" />
                </div>
                <input onKeyDown={(e) => { handleSubmit(e) }} onChange={(e) => (setInput(e.target.value))} type="text" placeholder="Enter your location" value={input} className="w-full h-12 pl-10 pr-5 text-sm border border-gray-300 rounded-md focus:outline-none" />
            </div>
            {
                errorMassage &&
                <div className="flex w-full justify-start items-center h-auto text-xs text-red-500">*{errorMassage}</div>
            }
            <div className="flex-1 px-2 overflow-y-auto w-full flex-col items-center">
                {
                    suggessions.map((val, id) => (
                        <div key={id} className="flex items-center gap-x-3 h-12 w-full border-b border-[#c5c5c5]">
                            <div className="flex">
                                <CiLocationArrow1 size={20} color="#aeadad" />
                            </div>
                            <div onClick={() => (setInput(`${val}`))} className="flex text-sm opacity-60 cursor-pointer">
                                {val != undefined ? `${val}` : "default"}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default EditLocation