import { MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBasedOnRating } from '../../features/basedOnRating/basedOnRatingThunk';
import LazyLoad from 'react-lazyload';
function BasedOnRatings() {

    const dispatch = useDispatch();

    const basedOnRating = useSelector((state) => state.basedOnRating.data);

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

    return (
        <div className="flex w-full h-96 justify-center">
            <div className="flex w-11/12 h-full flex-col justify-center gap-y-4">
                <div className="text-2xl font-bold">Recommended to you based on ratings</div>
                <div className="flex w-full overflow-x-auto items-start justify-start">
                    {
                        basedOnRating.map((data) => {
                            return (
                                <div key={data} className="flex flex-col mx-5 gap-y-2 shadow-sm shadow-black my-2 rounded-md">
                                    <div className="w-64 h-44 flex items-center justify-center rounded-lg overflow-hidden">
                                        <LazyLoad height={176} offset={100} once className='w-full h-full'>
                                            <img src={data.listings.images} alt={data.listings.title} className="flex w-full h-full object-cover" />
                                        </LazyLoad>
                                    </div>
                                    <div className='flex flex-col w-64 gap-y-1 p-1'>
                                        <p className='flex-wrap text-sm font-bold'>{data.listings.title}</p>
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