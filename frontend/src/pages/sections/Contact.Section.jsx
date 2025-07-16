import React from "react";
import NavBar from "../../components/NavBar";
import { MdHexagon } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { AiOutlineEdit } from "react-icons/ai";
import { BiLogoTelegram } from "react-icons/bi";
import { FiInstagram } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import { CiSaveUp1 } from "react-icons/ci";
import { FaUserCog } from "react-icons/fa";
function ContactSection() {
  return (
    <div className="min-h-screen ">
      <NavBar
        name={"Contact Section Maneger"}
        url={"/section-manager"}
        urlName={"Back"}
      />
      <div className="border-2 flex flex-col justify-between relative w-lg aspect-[9/10] mx-auto my-6 overflow-hidden  rounded-2xl bg- border-amber-400">
        <span className="w-4/5 aspect-square z-0 bg-amber-400 rounded-full absolute -translate-x-[35%] -translate-y-1/2" />
        <div className="z-10 flex flex-col  justify-center items-center">
          <span className="w-4/12 mt-5 aspect-square block overflow-hidden bg-gray-800  border-8 border-gray-900 mx-auto rounded-full" >
          <span className="w-full h-full bg-black/15 opacity-0 transition-all hover:opacity-100 backdrop-blur-md cursor-pointer flex justify-center items-center">
            <FaUserCog className="w-1/3 h-1/3 text-white"/>
          </span>
          </span>
          <span className="text-2xl flex items-center  rounded cursor-pointer  gap-3 font-semibold text-white">
            <ImProfile />
            MojtabaDev_79
            <AiOutlineEdit />
          </span>
        </div>
        <div className="h-1/2  flex flex-col justify-evenly">
          <div className="flex justify-center gap-3">
            <span className="relative block h-fit w-fit text-amber-400 cursor-pointer hover:text-amber-600">
              <MdHexagon className="text-6xl   rotate-90 " />
              <BiLogoTelegram className=" absolute text-3xl block top-1/2 left-1/2 -translate-1/2 !text-gray-900 " />
            </span>
            <span className="relative block h-fit w-fit text-amber-400 cursor-pointer hover:text-amber-600">
              <MdHexagon className="text-6xl   rotate-90 " />
              <FiInstagram className=" absolute text-3xl block top-1/2 left-1/2 -translate-1/2 !text-gray-900 " />
            </span>
            <span className="relative block h-fit w-fit text-amber-400 cursor-pointer hover:text-amber-600">
              <MdHexagon className="text-6xl   rotate-90 " />
              <FaGithub className=" absolute text-3xl block top-1/2 left-1/2 -translate-1/2 !text-gray-900 " />
            </span>
            <span className="relative block h-fit w-fit text-amber-400 cursor-pointer hover:text-amber-600">
              <MdHexagon className="text-6xl   rotate-90 " />
              <FaXTwitter className=" absolute text-3xl block top-1/2 left-1/2 -translate-1/2 !text-gray-900 " />
            </span>
          </div>
          <div className="flex justify-center w-5/6 aspect-[12/1.5] mx-auto">
            <input type="text" className=" flex-1 text-amber-400 flex px-3 items-center border-2 outline-0 border-amber-400/55 rounded-2xl rounded-r-none"/>
            <span className="p-2 hover:bg-green-500/10 cursor-pointer h-full aspect-square border-y-2 border-r-2 rounded-r-2xl border-amber-400/55">
              <MdOutlineDone  className="text-amber-400 w-full h-full"/>
            </span>

          </div>
          <span className=" px-6 rounded-full mx-auto flex font-bold  gap-3 cursor-pointer  items-center justify-center py-2 bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-teal-500 hover:to-green-500">
              <CiSaveUp1 className="text-xl"/>
              <span className="font-semibold">
                  Save Changes
              </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
