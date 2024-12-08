import { useEffect, useState } from "react"
import { CiLocationArrow1, CiLocationOn } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6"
import { MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../features/profile/profileThunk";
import { getSuggestions } from "../../util/getLocation";
import { setFilters } from "../../features/search/searchSlice";
import { languagesData } from "../../features/languages/languagesThunk";
import { useLocation } from "react-router-dom";
import { fetchResult } from "../../features/search/searchThunk";

// eslint-disable-next-line react/prop-types
function Filter({ showFilter }) {
    const [showRatings, setShowRatings] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);
    const [showAllLanguage, setShowAllLanguage] = useState(false);
    const [suggessions, setSuggessions] = useState([]);
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.search.filters);
    const languages = useSelector((state) => state.languages.data);
    const profile = useSelector((state) => state.profile.data);
    const [input, setInput] = useState(sessionStorage.getItem('location') || "" || profile?.[0]?.locationName);
    const ratingsVal = ["4.5", "4.0","3.5","3.0"]
    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(languagesData());
    }, [dispatch]);

    useEffect(() => {
        const fetchLocation = async () => {
            const values = await getSuggestions(input);
            setSuggessions(values.map(value => value.components));
        };
        fetchLocation();
        sessionStorage.setItem('location', input)
    }, [input])


    const handleSubmitLocation = (e) => {
        e.preventDefault()
        dispatch(setFilters({ ...filters, location: input }));

    }
    const handleRatings = (e) => {
        dispatch(setFilters({ ...filters, ratings: e.target.value }))
    }
    const handleLanguageUncheck = (e) => {
        const { value } = e.target;

        dispatch(setFilters({ ...filters, language: value }));
    }
    
    

    // eslint-disable-next-line react/prop-types, no-unused-vars
    const StarIcons = ({ value, size,color }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (value >= i) {
                stars.push(<MdOutlineStarPurple500 color={color} key={i} size={size} />);
            } else if (value >= i - 0.5) {
                stars.push(<MdOutlineStarHalf color={color} key={i} size={size} />);
            } else {
                stars.push(<MdOutlineStarOutline color={color} key={i} size={size} />);
            }
        }

        return <>{stars}</>;
    };

    return (
        <div className={`flex mt-3 ${showFilter ? 'w-[24%]' : 'w-0 overflow-hidden'} h-auto text-nowrap justify-start duration-300 flex-col`}>
            <div className="flex w-full flex-col">
                <div className="flex w-full pb-2 items-center justify-center">
                    <form onSubmit={handleSubmitLocation} className="flex w-full h-12 rounded-sm overflow-hidden relative items-center">
                        <div className="absolute left-3">
                            <CiLocationOn size={20} color="#aeadad" />
                        </div>
                        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search by location" className="flex h-full w-full pl-10 pr-5 text-sm border border-gray-300 bg-transparent rounded-md focus:outline-none" />
                    </form>
                </div>
            </div>
            <div className="flex px-2 overflow-y-auto w-full flex-col items-center">
                {
                    suggessions.map((val, id) => (
                        <div key={id} className="flex items-center gap-x-3 h-12 w-full border-[#c5c5c5]">
                            <div className="flex">
                                <CiLocationArrow1 size={20} color="#aeadad" />
                            </div>
                            <div onClick={(e) => {
                                handleSubmitLocation(e);
                                setInput(
                                    val != undefined
                                        ? `${val._normalized_city || ''}${val._normalized_city && val.state ? ',' : ''}${val.state || ''}${(val.state || val._normalized_city) && val.country ? ',' : ''}${val.country || ''}`
                                        : 'default'
                                )
                            }} className="flex text-sm opacity-60 cursor-pointer">
                                {
                                    val != undefined
                                        ? `${val._normalized_city || ''}${val._normalized_city && val.state ? ',' : ''}${val.state || ''}${(val.state || val._normalized_city) && val.country ? ',' : ''}${val.country || ''}`
                                        : 'default'
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex w-full px-2 flex-col border-t border-[#c5c5c5]">
                <div onClick={() => setShowRatings((prev) => !prev)} className="flex w-full py-3 items-center justify-between">
                    <div className="flex font-semibold">Ratings</div>
                    <div className={`flex ${showRatings ? 'rotate-180 duration-200' : 'duration-200'}`}><FaChevronDown size={15} /></div>
                </div>
                {
                    showRatings &&
                    <div className="flex mt-2 mb-4 gap-y-4 items-start w-full flex-col">
                        {
                            ratingsVal.map((rating, index) => (
                                <div key={index} className="flex gap-x-2 items-center">
                                    <input onChange={handleRatings} value={rating} type='radio' name="rating" className="" />
                                    <div className="flex items-center">
                                        <StarIcons value={rating} size={16} color={""}/>
                                    </div>
                                    <div className="text-sm items-center">{rating} & up</div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            <div className="flex w-full px-2 flex-col border-t border-[#c5c5c5]">
                <div onClick={() => setShowLanguage((prev) => !prev)} className="flex w-full py-3 items-center justify-between">
                    <div className="flex font-semibold">Language</div>
                    <div className={`flex ${showLanguage ? 'rotate-180 duration-200' : 'duration-200'}`}><FaChevronDown size={15} /></div>
                </div>
                {
                    showLanguage &&
                    <div className={`flex mt-2 mb-4 gap-y-4 ${showAllLanguage ? 'h-auto' : 'max-h-36'} overflow-hidden relative items-start w-full flex-col`}>
                        {
                            languages.map((language, id) => (
                                <div key={id} className="flex gap-x-2 items-center">
                                    <input onChange={handleLanguageUncheck} type='radio' value={language.language} name="language" className="" />
                                    <div className="flex items-center text-sm">
                                        {language.language}
                                    </div>
                                </div>
                            ))
                        }
                        <div onClick={() => setShowAllLanguage(prev => !prev)} className={`flex text-sm font-semibold bg-gradient-to-t from-[#ebebeb] to-[#ebebeb62] w-full bottom-0 items-end text-purple-600 ${showAllLanguage ? "flex h-auto" : "absolute h-14"}`}>
                            <div className="flex gap-x-3 items-center">
                                {
                                    showAllLanguage ? (
                                        <>
                                            Show less
                                            <div className={`flex rotate-180`}><FaChevronDown color="rgb(147 51 234)" size={12} /></div>
                                        </>
                                    ) : (
                                        <>
                                            Show more
                                            <div className={`flex`}><FaChevronDown color="rgb(147 51 234)" size={12} /></div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default Filter