import { MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchBasedOnRating } from '../../features/basedOnRating/basedOnRatingThunk';
import LazyLoad from 'react-lazyload';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import ContentLoader from 'react-content-loader';
import { CiBookmarkCheck } from 'react-icons/ci';
function BasedOnRatings() {
    const [mouseOver, setMouseOver] = useState(null);
    const dispatch = useDispatch();
    const [fevId,setFavId] = useState([]);

    const { data: basedOnRating, loading } = useSelector((state) => state.basedOnRating);


    useEffect(() => {
        dispatch(fetchBasedOnRating());
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

    const fev = JSON.parse(localStorage.getItem("favorites")) || [];
    const handleFavorites = (favId) => {
        const included = fev.includes(favId);
        if (!included) {
            setFavId([favId])
            fev.push(favId);
            localStorage.setItem("favorites", JSON.stringify(fev));
        } else {
            setFavId([""])
            const index = fev.indexOf(favId);
            fev.splice(index, 1); // Remove the value at the found index
            localStorage.setItem("favorites", JSON.stringify(fev));
        }
    }



    return (
        <div className="flex w-full h-auto justify-center items-center mt-8">
            <div className="flex w-11/12 h-full flex-col justify-center">
                <div className="text-2xl font-bold mb-5">Recommended to you based on ratings</div>
                <div className="flex w-full overflow-x-auto justify-start">
                    {
                        !loading ? (
                            basedOnRating.map((data, index) => {
                                return (
                                    <div key={index} onMouseOver={() => { setMouseOver(index) }} onMouseLeave={() => { setMouseOver(null) }} className='flex h-[350px] justify-center items-start relative'>
                                        <div className="flex h-auto flex-col mx-5 gap-y-2 justify-center items-center shadow-sm shadow-black my-2 rounded-sm overflow-hidden">
                                            <div className="w-64 h-44 flex items-center justify-center overflow-hidden">
                                                <LazyLoad height={176} offset={100} once className='w-full h-full'>
                                                    <img src={data.image} alt={data.title} className="flex w-full h-full object-cover" />
                                                </LazyLoad>
                                            </div>
                                            <div className='flex flex-col w-64 gap-y-1 p-1'>
                                                <p className={`flex-wrap text-sm font-bold`}>{data.title}</p>
                                                <p className='text-xs opacity-60'>{data.users.name}</p>
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
                                                <div className='flex flex-col items-center justify-between h-auto min-h-72 w-[290px] absolute bg-[#ececec] border border-[#b1b0b0] rounded-md shadow-2xl z-20 p-3'>
                                                    <div className='w-full'>
                                                        <div className='flex flex-col mb-1 gap-y-0.5'>
                                                            <div className='text-lg font-bold leading-5'>{data.title}</div>
                                                            <div className='text-xs opacity-60'>{data.tags.tagList.map(element => `${element},`)}</div>
                                                            <p className='text-sm'>{data.description.short}</p>
                                                        </div>
                                                        <div className='flex flex-col gap-y-2'>
                                                            <p className='text-sm flex items-center'><CiBookmarkCheck size={20} />{data.description.keypoints[0]}</p>
                                                            <p className='text-sm flex items-center'><CiBookmarkCheck size={20} />{data.description.keypoints[1]}</p>
                                                            <p className='text-sm flex items-center'><CiBookmarkCheck size={20} />{data.description.keypoints[2]}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex w-full justify-evenly items-center mt-4'>
                                                        <a href={`tel:${data.users.contact.phone}}`} onClick={() => { navigator.clipboard.writeText(data.users.contact.phone).then(alert('Mobile number copy to clipboard')) }} className='flex h-12 w-52 bg-purple-500 justify-center items-center rounded-sm text-base font-bold text-[#ebebeb]'>Mobile</a>
                                                        <div onClick={() => {
                                                            handleFavorites(data.id)
                                                        }} className='p-[10px] border border-black hover:bg-[#e0e1e1] rounded-full'>
                                                            {
                                                                (fev.includes(data.id) || fevId.includes(data.id)) ? (
                                                                    <IoHeart size={24} color="red" />
                                                                ) : (
                                                                    <IoHeartOutline size={24} color="black" />
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                )
                            }
                            )
                        ) : (
                            <>
                                <div className='flex w-full h-[350px] items-center'>
                                    <div className="flex h-auto w-full justify-center items-center rounded-md">
                                        <ContentLoader
                                            viewBox="0 0 350 100%"
                                            height={350}
                                            width={"100%"}
                                            backgroundColor="#f3f3f3"
                                            foregroundColor="#ecebeb"
                                            className='flex relative items-center'
                                        >
                                            <rect x="0" y="20" rx="4" ry="4" width="256" height="256" />
                                            <rect x="300" y="50" rx="4" ry="4" width="800" height="40" />
                                            <rect x="300" y="130" rx="4" ry="4" width="800" height="40" />
                                            <rect x="300" y="210" rx="4" ry="4" width="800" height="40" />
                                        </ContentLoader>
                                    </div>
                                </div>

                            </>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default BasedOnRatings