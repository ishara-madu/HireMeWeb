import LazyLoad from 'react-lazyload'
import Footer from '../components/footer/Footer'
import LeftNav from '../components/leftNav/LeftNav'
import { CiSearch } from 'react-icons/ci'

function Notifications() {
  return (
    <div className="flex h-full min-h-svh items-center justify-start w-full flex-col bg-[#ebebeb] relative">
      <div className="flex h-full flex-1 items-start justify-center w-full">
        <LeftNav />
        <div className="flex justify-start gap-y-5 flex-col items-start w-11/12">
          <div className="flex w-full mt-10 text-3xl font-bold">Your listnings</div>
          <div className="flex w-full flex-col gap-y-5">
            <div className="flex w-full justify-between">
              <div className="flex w-96 h-12 border rounded-sm border-zinc-400 relative items-center justify-start">
                <div className="flex opacity-60 w-12 h-12 justify-center items-center">
                  <CiSearch size={25} />
                </div>
                <input type="text" className="flex flex-1 h-full outline-none bg-transparent" placeholder="Search your listning" />
              </div>
              <div className="flex justify-center items-center w-60 rounded-sm h-12 bg-green-500 text-[#ebebeb] font-bold text-base">
                New listing
              </div>
            </div>
            <div className="flex w-full h-32 border border-zinc-400 gap-x-3 rounded-sm">
              <LazyLoad>
                <img src="https://via.placeholder.com/300x200" alt="Placeholder" className="w-32 h-32 object-cover" />
              </LazyLoad>
              <div className="flex w-[40%] h-full py-2 flex-col gap-y-1 font-semibold">
                <div className="flex">Title is here</div>
                <div className="flex text-sm font-normal opacity-70">Short descriptioon is here</div>
              </div>
              <div className="flex flex-1 items-center justify-center px-2 gap-x-2">
                <div className="flex items-center text-sm font-bold">Process</div>
                <div className="flex flex-1 bg-zinc-400 h-2">
                  <div className="flex h-full w-[10%] bg-green-500"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 place-content-center gap-y-8 place-items-center pb-5">
              <div className="flex h-auto flex-col mx-5 gap-y-2 justify-center items-center shadow-2xl shadow-black my-2 rounded-sm overflow-hidden">
                <div className="w-64 h-44 flex items-center justify-center overflow-hidden">
                  <LazyLoad height={176} offset={100} once className='w-full h-full'>
                    <img src={'data.image'} alt={'data.title'} className="flex w-full h-full object-cover" />
                  </LazyLoad>
                </div>
                <div className='flex flex-col w-64 gap-y-1 p-1'>
                  <p className={`flex-wrap text-sm font-bold`}>{'data.title'}</p>
                  <p className='text-xs opacity-60'>{'data.short'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Notifications