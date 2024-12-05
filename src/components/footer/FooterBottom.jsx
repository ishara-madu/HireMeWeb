import profileImg from '../../assets/logo_white.png'
function FooterBottom() {
    return (
        <div className="flex w-full h-16 items-center justify-center bg-[#171717] border-t">
            <div className="flex text-[#ebebeb] w-11/12 h-full items-center justify-center gap-x-3">
                <div className="flex text-xl h-full items-center">
                    <img src={profileImg} alt="" className='w-full h-[90%] object-cover'/>
                </div>
                <div className="text-xs">© 2024 Hire Me, Inc.</div>
            </div>
        </div>
    )
}

export default FooterBottom