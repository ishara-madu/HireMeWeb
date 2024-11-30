/* eslint-disable react/prop-types */
import { MdLanguage, MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import FixedContent from "./FixedContent";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fetchListning } from "../../features/listing/listingThunk";

// eslint-disable-next-line react/prop-types
function TopBar() {

    const dispatch = useDispatch();
    const location = useLocation();
    const state = location.state;
    const { data, loading, error } = useSelector(state => state.listings);
    useEffect(() => {
        dispatch(fetchListning({ id: state }));
    }, [dispatch, state]);

    // eslint-disable-next-line react/prop-types

    // eslint-disable-next-line react/prop-types
    const StarIcons = ({ value, size }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (value >= i) {
                stars.push(<MdOutlineStarPurple500 color='' key={i} size={size} />);
            } else if (value >= i - 0.5) {
                stars.push(<MdOutlineStarHalf key={i} size={size} />);
            } else {
                stars.push(<MdOutlineStarOutline key={i} size={size} />);
            }
        }

        return <>{stars}</>;
    };

    return (
        <div className='flex w-full h-auto bg-[#373737] py-8 justify-center items-center'>
            {
                data.length !== 0 &&
                data.map((data, id) => (
                    <div key={id} className="flex w-10/12 h-auto">
                        <div className="flex w-7/12 flex-col gap-y-3">
                            <div className="text-3xl text-[#ebebeb] font-semibold">{data.title}</div>
                            <div className="flex text-lg text-[#ebebeb] font-normal">{data.description.short}</div>
                            <div className="flex gap-x-2 text-[#ec9935] text-sm">
                                <div className="flex font-bold">{data.rating.perc}</div>
                                <div className="flex">
                                    <StarIcons value={data.rating.perc} size={18} />
                                </div>
                                <div className="flex text-purple-400 underline">{`(${(data.rating.rating).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toLocaleString()})`}</div>
                            </div>
                            <div className="flex text-[#ebebeb] text-sm">by &nbsp;<a className="flex text-purple-400 underline" href="">{data.users.name}</a></div>
                            <div className="flex text-[#ebebeb] opacity-60 text-xs">{data.tags.tagList.join(', ')}</div>
                            <div className="flex text-[#ebebeb] gap-x-2 items-center">
                                <div className="flex text-[#ebebeb] text-sm items-center gap-x-2"><div className="flex h-3 w-3 bg-green-500 rounded-full"></div>Last online 3 days ago</div>
                                <div className="flex items-center justify-center text-[#ebebeb] text-sm gap-x-2">
                                    <MdLanguage size={18} />
                                    English</div>
                            </div>
                        </div>
                        <div className="flex flex-1 justify-center items-center relative">
                            <FixedContent />
                        </div>
                    </div>
                ))

            }

        </div>
    )
}

export default TopBar