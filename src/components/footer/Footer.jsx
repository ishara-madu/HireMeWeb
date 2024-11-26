import FooterBottom from "./FooterBottom"
import FooterTop from "./FooterTop"

function Footer() {
  return (
    <div>
        <FooterTop/>
        <div className="flex h-auto w-full justify-center bg-[#171717]">
            <div className="flex w-11/12 h-full items-start justify-around py-5">
            <div className="flex flex-col gap-y-3">
                <p className="text-[#ebebeb] text-lg font-semibold">About</p>
                <div className="flex flex-col gap-y-1">
                <p className="text-[#ebebeb] opacity-60 text-sm">About us</p>
                <p className="text-[#ebebeb] opacity-60 text-sm">Contact us</p>
                <p className="text-[#ebebeb] opacity-60 text-sm">Github</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                <p className="text-[#ebebeb] text-lg font-semibold">Discovery Hire Me</p>
                <div className="flex flex-col gap-y-1">
                <p className="text-[#ebebeb] opacity-60 text-sm">Get the app</p>
                <p className="text-[#ebebeb] opacity-60 text-sm">Help and support</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                <p className="text-[#ebebeb] text-lg font-semibold">Hire Me for Workers</p>
                <div className="flex flex-col gap-y-1">
                <p className="text-[#ebebeb] opacity-60 text-sm">Hire Me Workers</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                <p className="text-[#ebebeb] text-lg font-semibold">Legal & Accessibility</p>
                <div className="flex flex-col gap-y-1">
                <p className="text-[#ebebeb] opacity-60 text-sm">Privacy policy</p>
                <p className="text-[#ebebeb] opacity-60 text-sm">Terms and conditions</p>
                </div>
            </div>
            </div>
        </div>
        <FooterBottom/>
    </div>
  )
}

export default Footer