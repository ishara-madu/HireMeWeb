import { IoLogoDropbox, IoLogoGithub, IoLogoSnapchat, IoLogoWordpress } from "react-icons/io5"

function FooterTop() {
  return (
    <div className="flex bg-[#373737] h-16 items-center justify-center">
        <div className="flex w-11/12 h-full justify-between items-center">
        <div className="text-lg font-bold text-[#ebebeb] flex">Top companies choose&nbsp;<a className="text-green-300" href="">Hire Me worker&nbsp;</a>to build in-demand career.</div>
        <div className="flex gap-x-5">
        <IoLogoWordpress size={40} color="#ebebeb"/>
        <IoLogoDropbox size={40} color="#ebebeb"/>
        <IoLogoSnapchat size={40} color="#ebebeb"/>
        <IoLogoGithub size={40} color="#ebebeb"/>
        </div>
        </div>
    </div>
  )
}

export default FooterTop