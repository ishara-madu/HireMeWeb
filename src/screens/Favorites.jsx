import LazyLoad from 'react-lazyload'
import LeftNav from '../components/leftNav/LeftNav'
import { CiBookmarkCheck, CiSearch } from 'react-icons/ci'
import Footer from '../components/footer/Footer'
import placeholder from '../assets/placeholder.svg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites } from '../features/favorites/favoritesThunk'
import LoadingSpinner from '../components/LoadingSpinner'
import { useState } from 'react'
import { setFilters } from '../features/listing/listingSlice'
import { MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

function Favorites() {
  const dispatch = useDispatch();
  const [fevId, setFavId] = useState([]);
  const [mouseOver, setMouseOver] = useState(null);
  const navigate = useNavigate()
  const [searchValue, setsearchValue] = useState('')

  const { data: favorites, loading } = useSelector((state) => state.favorites);


  useEffect(() => {
    const fevIds = JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch(fetchFavorites(fevIds));
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

    dispatch(fetchFavorites(JSON.parse(localStorage.getItem("favorites")) || []));
  }


  const handleListClick = (data) => {
    dispatch(setFilters({ id: data }));
    sessionStorage.setItem("listingFilter", JSON.stringify({ id: data }));
    navigate(`/listing`)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }


  const filteredValues = favorites?.filter(favorite => favorite?.title?.toLowerCase().includes(searchValue.toLowerCase()) || favorite?.description?.short?.toLowerCase().includes(searchValue.toLowerCase()) || favorite?.description?.long?.toLowerCase().includes(searchValue.toLowerCase()) || favorite?.users?.locationName?.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className="flex h-full min-h-svh items-center justify-start w-full flex-col bg-[#ebebeb] relative">
      <div className="flex h-full flex-1 items-start justify-center w-full">
        <LeftNav />
        <div className="flex justify-start gap-y-5 flex-col items-start w-11/12">
          <div className="flex w-full mt-10 text-3xl font-bold">Favorite Picks</div>
          <div className="flex w-full flex-col gap-y-5">
            <div className="flex w-full justify-between">
              <div className="flex w-96 h-12 border rounded-sm border-zinc-400 relative items-center justify-start">
                <div className="flex opacity-60 w-12 h-12 justify-center items-center">
                  <CiSearch size={25} />
                </div>
                <input type="text" value={searchValue} onChange={(e) => (setsearchValue(e.target.value))} className="flex flex-1 h-full outline-none bg-transparent" placeholder="Find in your favorites..." />
              </div>
            </div>
            {
              (favorites.length !== 0 && !loading) ?
                <div className="grid grid-cols-4 place-content-center gap-y-8 place-items-center pb-5">
                  {
                    filteredValues?.map((data, index) => (
                      <div key={index} onMouseOver={() => { setMouseOver(index) }} onMouseLeave={() => { setMouseOver(null) }} className='flex h-[370px] justify-center items-start relative'>
                        <div className="flex h-auto flex-col mx-5 gap-y-2 justify-center items-center shadow-sm shadow-black my-2 rounded-sm overflow-hidden">
                          <div className="w-64 h-44 flex items-center justify-center overflow-hidden">
                            <LazyLoad height={176} offset={100} once className='w-full h-full'>
                              <img src={data?.image?.publicUrl || placeholder} alt={data.title} className="flex w-full h-full object-contain" />
                            </LazyLoad>
                          </div>
                          <div className='flex flex-col w-64 gap-y-1 p-1'>
                            <p className={`flex-wrap text-sm font-bold`}>{data?.title}</p>
                            <p className='text-xs opacity-60'>{data?.users?.locationName}</p>
                            <p className='text-xs opacity-80 font-bold'>{data?.users?.name}</p>
                            <div className='flex items-center gap-x-1'>
                              <p className='font-semibold text-sm'>{data?.rating?.perc}</p>
                              <div className='flex items-center'>
                                <StarIcons value={data.rating.perc} size={15} />
                              </div>
                              <p className='text-xs opacity-60'>{`(${(data.rating.rating).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toLocaleString()})`}</p>
                            </div>
                          </div>
                        </div>
                        {
                          mouseOver === index && (
                            <div onClick={() => (handleListClick(data?.id))} className='flex flex-col items-center justify-between h-auto min-h-72 w-[290px] absolute bg-[#ececec] border border-[#b1b0b0] rounded-md shadow-2xl z-20 p-3'>
                              <div className='w-full'>
                                <div className='flex flex-col mb-1 gap-y-0.5'>
                                  <div className='text-lg font-bold leading-5'>{data?.title}</div>
                                  <div className='text-xs opacity-60'>{data?.tags?.tagList?.join(',')}</div>
                                  <p className='text-sm'>{data?.description?.short}</p>
                                </div>
                                <div className='flex flex-col gap-y-2'>
                                  <p className='text-sm flex items-center'><CiBookmarkCheck size={20} />{data?.description?.keypoints[0]}</p>
                                  <p className='text-sm flex items-center'><CiBookmarkCheck size={20} />{data?.description?.keypoints[1]}</p>
                                  <p className='text-sm flex items-center'><CiBookmarkCheck size={20} />{data?.description?.keypoints[2]}</p>
                                </div>
                              </div>
                              <div className='flex w-full justify-evenly items-center mt-4'>
                                <a href={`tel:${data?.users?.contact?.phone}}`} onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(data?.users?.contact?.phone).then(alert('Mobile number copy to clipboard')) }} className='flex h-12 w-52 bg-green-600 justify-center items-center rounded-sm text-base font-bold text-[#ebebeb]'>Mobile</a>
                                <div onClick={(e) => {
                                  e.stopPropagation();
                                  handleFavorites(data?.id)
                                }} className='p-[10px] border border-black hover:bg-[#e0e1e1] rounded-full'>
                                  {
                                    (fev?.includes(data?.id) || fevId?.includes(data?.id)) ? (
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
                    ))
                  }
                </div>
                :
                loading ?
                  (
                    <div className="flex w-full justify-center items-center h-auto min-h-80">
                      <LoadingSpinner />
                    </div>
                  ) :
                  (<div className="flex w-full h-auto min-h-80 items-center justify-center">
                    <div className="flex w-full h-full justify-center items-center text-sm text-gray-600">Your favorite is empty.</div>
                  </div>
                  )
            }

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Favorites