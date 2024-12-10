/* eslint-disable react/prop-types */
import { MdLanguage, MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import FixedContent from "./FixedContent";

// eslint-disable-next-line react/prop-types
function TopBar({ data }) {


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
    const timeAgo = (lastSeen) => {
        if (!lastSeen) return "Never";
        const lastSeenDate = new Date(lastSeen);
        const now = new Date();
        const diffMs = now - lastSeenDate;

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day(s) ago`;
        if (hours > 0) return `${hours} hour(s) ago`;
        if (minutes > 0) return `${minutes} minute(s) ago`;
        return true;
    };

    return (
        <div className='flex w-full h-auto bg-[#373737] py-8 justify-center items-center'>

            <div className="flex w-10/12 h-auto">
                <div className="flex w-7/12 flex-col gap-y-3">
                    <div className="text-3xl text-[#ebebeb] font-semibold">{data?.title}</div>
                    <div className="flex text-lg text-[#ebebeb] font-normal">{data?.description?.short}</div>
                    <div className="flex gap-x-2 text-[#ecb835] text-sm">
                        <div className="flex font-bold">{data?.rating?.perc}</div>
                        <div className="flex">
                            <StarIcons value={data?.rating?.perc} size={18} />
                        </div>
                        <div className="flex text-green-400 underline">{`(${(data.rating.rating)?.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toLocaleString()})`}</div>
                    </div>
                    <div className="flex text-[#ebebeb] text-sm">by &nbsp;<div className="flex text-green-400 underline" >{data?.users?.name}</div></div>
                    <div className="flex text-[#ebebeb] opacity-60 text-xs">{data?.tags?.tagList?.join(', ')}</div>
                    <div className="flex text-[#ebebeb] gap-x-2 items-center">
                        <div className="flex text-[#ebebeb] text-sm items-center gap-x-2"><div className={`flex h-3 w-3 ${timeAgo(data?.users?.last_seen) === true ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>{timeAgo(data?.users?.last_seen) === true ? 'Online' : timeAgo(data?.users?.last_seen)}</div>
                        <div className={`${data?.users?.languages ? 'flex' : 'hidden'} items-center justify-center text-[#ebebeb] text-sm gap-x-2`}>
                            <MdLanguage size={18} />
                            {data?.users?.languages}</div>
                    </div>
                </div>
                <div className="flex flex-1 justify-center items-center relative">
                    <FixedContent data={data} />
                </div>
            </div>


        </div>
    )
}

export default TopBar