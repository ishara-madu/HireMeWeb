import { MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchBasedOnRating, setupRealtimeSubscription } from '../../features/basedOnRating/basedOnRatingThunk';
import LazyLoad from 'react-lazyload';
import { IoHeartOutline } from 'react-icons/io5';
function BasedOnRatings() {
    const [mouseOver, setMouseOver] = useState(null);

    const dispatch = useDispatch();

    const basedOnRating = useSelector((state) => state.basedOnRating.data);

    useEffect(() => {
        dispatch(fetchBasedOnRating());
        setupRealtimeSubscription(dispatch);
    }, [dispatch]);


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


    if (!basedOnRating) return <p>Loading...</p>;
    return (
        <div className="flex w-full h-auto justify-center items-center mt-8">
            <div className="flex w-11/12 h-full flex-col justify-center">
                <div className="text-2xl font-bold mb-5">Recommended to you based on ratings</div>
                <div className="flex w-full overflow-x-auto justify-start">
                    {
                        basedOnRating.map((data, index) => {
                            return (
                                <div key={index}  onMouseOver={() => { setMouseOver(index) }} onMouseLeave={() => { setMouseOver(null) }} className='flex h-[350px] justify-center items-start relative'>
                                    <div className="flex h-auto flex-col mx-5 gap-y-2 justify-center items-center shadow-sm shadow-black my-2 rounded-md">
                                        <div className="w-64 h-44 flex items-center justify-center rounded-lg overflow-hidden">
                                            <LazyLoad height={176} offset={100} once className='w-full h-full'>
                                                <img src={data.listings.images} alt={data.listings.title} className="flex w-full h-full object-cover" />
                                            </LazyLoad>
                                        </div>
                                        <div className='flex flex-col w-64 gap-y-1 p-1'>
                                            <p className={`flex-wrap text-sm font-bold`}>{data.listings.title}</p>
                                            <p className='text-xs opacity-60'>{data.name}</p>
                                            <div className='flex items-center gap-x-1'>
                                                <p className='font-semibold text-sm'>{data.rating.perc}</p>
                                                <div className='flex items-center'>
                                                    <StarIcons value={data.rating.perc} size={15} />
                                                </div>
                                                <p className='text-xs opacity-60'>{`(${(data.rating.rating).reduce((accumulator, currentValue) => accumulator + currentValue, 0)})`}</p>
                                            </div>
                                        </div>
                                    </div>
                                        {
                                            mouseOver === index && (
                                                <div className='flex flex-col items-center h-auto min-h-60 w-82 absolute bg-white rounded-sm shadow-lg z-20 p-3'>
                                                    <div>
                                                    <div className='text-lg font-bold'>{data.listings.title}</div>
                                                    <div className='text-xs opacity-60'>Java,python</div>
                                                    <p className='text-sm'>{data.listings.description}</p>
                                                    </div>
                                                    <div className='flex w-full justify-evenly items-center mt-3 bottom-2 absolute'>
                                                        <a href={`tel:${data.contact.phone}}`} onClick={()=>{navigator.clipboard.writeText(data.contact.phone).then(alert('Mobile number copy to clipboard'))}} className='flex h-12 w-52 bg-green-600 justify-center items-center rounded-sm text-base font-bold text-[#ebebeb]'>Mobile</a>
                                                        <div className='p-3 border border-black rounded-full'>
                                                            <IoHeartOutline size={24}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                </div>

                            )
                        }
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default BasedOnRatings