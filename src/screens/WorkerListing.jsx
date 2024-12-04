import { CiSearch } from "react-icons/ci"
import Footer from "../components/footer/Footer"
import LeftNav from "../components/leftNav/LeftNav"
import LazyLoad from "react-lazyload"
import placeholder from '../assets/placeholder.svg'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchListning } from "../features/listing/listingThunk"
import getCookie from "../util/getCookie"
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from "react-router-dom"
function WorkerListing() {
  const [search, setsearch] = useState('')
  const dispatch = useDispatch()
  const { data, loading, error,filters } = useSelector(state => state.listings)
  useEffect(() => {
    dispatch(fetchListning({ userId: getCookie('uid') }));
  }, [dispatch,filters])

  const sercheddata = data?.filter(val => {
    return val.title === null || val.title === undefined || val.title === '' || (val.title && val.title.toLowerCase().includes(search.toLowerCase()));
  });
  
  const submitted = sercheddata?.filter(val => val.submission === true);
  const unsubmitted = sercheddata?.filter(val => val.submission === false);

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  };

  const checkPercentage = (data) => {
    let percentage = 0;
    const tablenames = ["title", "description.short", "description.long", "description.keypoints", "tags.tagList", "category", "options.availability", "options.experienceLevel", "image","submission"];

    tablenames.forEach((name) => {
      if (getNestedValue(data, name)) {
        percentage += (100 / tablenames.length);
      }
    });

    return `${percentage}%`;
  };


  const handleManageResults = (id)=>{
    sessionStorage.setItem('listingFilter',id)
  }
  return (
    <div className="flex h-full min-h-svh items-center justify-start w-full flex-col bg-[#ebebeb] relative">
      <div className="flex h-full flex-1 items-start justify-center w-full">
        <LeftNav />
        <div className="flex justify-start gap-y-5 flex-col items-start w-11/12 mb-20">
          <div className="flex w-full mt-10 text-3xl font-bold">Your listnings</div>
          <div className="flex w-full flex-col gap-y-5">
            <div className="flex w-full justify-between">
              <div className="flex w-96 h-12 border rounded-sm border-zinc-400 relative items-center justify-start">
                <div className="flex opacity-60 w-12 h-12 justify-center items-center">
                  <CiSearch size={25} />
                </div>
                <input onChange={(e) => setsearch(e.target.value)} value={search} type="text" className="flex flex-1 h-full outline-none bg-transparent" placeholder="Search your listning" />
              </div>
              <Link to={`/show-listings/manage`} onClick={()=>{handleManageResults()}} className="flex justify-center items-center w-60 rounded-sm h-12 bg-green-500 text-[#ebebeb] font-bold text-base cursor-pointer">
                New listing
              </Link>
            </div>
            {
              loading &&
              <div className="flex items-center justify-center">
                <LoadingSpinner />
              </div>
            }
            {
              (!loading && !error) &&
              <div className="flex flex-col gap-y-5">
                {
                  unsubmitted?.map((data, index) => (
                    <Link to={`/show-listings/manage`} onClick={()=>handleManageResults(data.id)} key={index} className="flex w-full h-auto  border border-zinc-400 gap-x-3 rounded-sm group relative cursor-pointer">
                      <LazyLoad>
                        <img src={data.image || placeholder} alt="Placeholder" className="w-44 h-32 bg-zinc-200 object-contain" />
                      </LazyLoad>
                      <div className="flex flex-1 group-hover:opacity-5 duration-300">
                        <div className="flex w-[40%] h-full py-2 flex-col justify-between font-semibold">
                          <div className="flex flex-col">
                            <div className="flex">{data.title}</div>
                            <div className="flex text-sm font-normal opacity-70">{data.descritption && data.description.short}</div>
                          </div>
                          <div className="flex text-xs opacity-60">{`Draft : ${data.submission ? 'published' : 'unpublished'}`}</div>
                        </div>
                        <div className="flex flex-1 items-center justify-center px-2 gap-x-2">
                          <div className="flex items-center text-sm font-bold">{parseInt(checkPercentage(data)) >= 100 ? 'Completed' : 'Process'}</div>
                          <div className="flex flex-1 bg-zinc-400 h-2">
                            <div className="flex h-full bg-green-500" style={{ width: checkPercentage(data) }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full h-full absolute top-0 left-0 bg-opacity-0 opacity-0 group-hover:opacity-100 group-hover:text-green-600 duration-300 z-50 justify-center items-center font-bold">Edit/Manage listing</div>
                    </Link>
                  ))
                }

                <div className="grid grid-cols-4 place-content-center gap-y-8 place-items-center pb-5">
                  {
                    submitted?.map((data, index) => (
                      <div key={index} className="flex h-auto flex-col group mx-5 gap-y-2 justify-start items-center min-h-72 shadow-2xl shadow-black my-2 rounded-sm overflow-hidden relative cursor-pointer">
                        <div className="w-64 h-44 flex items-start justify-center overflow-hidden group-hover:opacity-5 duration-300">
                          <LazyLoad height={176} offset={100} once className='w-full h-full'>
                            <img src={data.image || placeholder} alt={data.title} className="flex w-full h-full bg-zinc-200 object-contain" />
                          </LazyLoad>
                        </div>
                        <div className='flex flex-col w-64 gap-y-1 p-1 px-2 group-hover:opacity-5 duration-300'>
                          <p className={`flex-wrap text-sm font-bold`}>{data.title}</p>
                          <p className='text-xs opacity-60'>{data.description.short}</p>
                        </div>
                        <div className="flex w-full h-full absolute top-0 left-0 bg-opacity-0 opacity-0 group-hover:opacity-100 group-hover:text-green-600 duration-300 z-50 justify-center items-center font-bold">Edit/Manage listing</div>
                      </div>
                    ))

                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default WorkerListing