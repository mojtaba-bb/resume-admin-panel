import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { MdHexagon } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { AiOutlineEdit } from "react-icons/ai";
import { BiLogoTelegram } from "react-icons/bi";
import { FiInstagram } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Loding from "../Loding.jsx";
import toast, { Toaster } from "react-hot-toast";
import { CiSaveUp1 } from "react-icons/ci";
import { FaUserCog } from "react-icons/fa";
import axios from "axios";
function ContactSection() {
  const [info, setInfo] = useState({
    userName: "MojtabaDev_79",
    profileImage: "",
    profileImageAltEn: "",
    profileImageAltFa: "",
    telegram: "",
    instagram: "",
    github: "",
    x: "",
  });
  const fetchMyInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/page-content/contact"
      );
      setIsLoading(false);
    } catch (error) {
      if (error.status != 404) {
        toast.error(error.message);
      }

      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchMyInfo();
  }, []);

  useEffect(() => {
    console.log(info);
  }, [info]);
  const [onChange, setOnChange] = useState("Telegram");

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen ">
      <Loding visible={isLoading} />
      <NavBar
        name={"Contact Section Maneger"}
        url={"/section-manager"}
        urlName={"Back"}
      />
      <Toaster />
      <div className="border-2 flex flex-col justify-between relative w-lg aspect-[9/10] mx-auto my-6 overflow-hidden  rounded-2xl bg- border-amber-400">
        <span className="w-4/5 aspect-square z-0 bg-amber-400 rounded-full absolute -translate-x-[35%] -translate-y-1/2" />
        <div className="z-10 flex flex-col  justify-center items-center">
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            onChange={(e) => {
              setInfo((prev) => ({
                ...prev,
                profileImage: e.target.files[0],
              }));
            }}
            className="hidden"
          />
          <span className="w-4/12 relative mt-5 aspect-square block  bg-gray-800 overflow-hidden  border-8 border-gray-900 mx-auto rounded-full">
            <img
              src={
                info.profileImage != ""
                  ? URL.createObjectURL(info.profileImage)
                  : ""
              }
              alt=""
              className="w-full h-full object-cover absolute  border-0 outline-0"
            />

            <label
              htmlFor="profileImage"
              className="w-full h-full bg-black/15 opacity-0 rounded-full transition-all hover:opacity-100 backdrop-blur-md cursor-pointer flex justify-center items-center"
            >
              <FaUserCog className="w-1/3 h-1/3 text-white" />
            </label>
          </span>
          <label
            htmlFor="userName"
            className="text-2xl flex items-center  rounded cursor-pointer  gap-3 font-semibold text-white"
          >
            <ImProfile />

            <input
              type="text"
              id="userName"
              onChange={(e) => {
                e.preventDefault();
                setInfo((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }));
              }}
              className="field-sizing-content focus:border-b outline-none"
              value={info.userName}
            />

            <AiOutlineEdit />
          </label>
          <div className="p-3 rounded-2xl flex-col gap-3 border justify-center items-center flex mt-5 text-amber-400/70">
            <span className="text-lg font-bold">Profile Alt</span>
            <div className="flex gap-3">
              <label htmlFor="profileImageAltEn">
                Eng :{" "}
                <input
                  type="text"
                  className="field-sizing-content outline-none border-b text-amber-400 border-white/30  min-w-24"
                  value={info.profileImageAltEn}
                  onChange={(e)=>{
                    setInfo((prev)=>({
                      ...prev , profileImageAltEn:e.target.value
                    }))
                  }}
                  name=""
                  id="profileImageAltEn"
                />
              </label>
              <label htmlFor="profileImageAltFa">
                Fa :{" "}
                <input
                  type="text"
                  className="field-sizing-content outline-none border-b text-amber-400 border-white/30 min-w-24"
                  value={info.profileImageAltFa}
                  onChange={(e)=>{
                    setInfo((prev)=>({
                      ...prev , profileImageAltFa:e.target.value
                    }))
                  }}
                  id="profileImageAltFa"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="h-1/2  flex flex-col justify-evenly">
          <div className="flex justify-center gap-3">
            <span
              onClick={() => {
                setOnChange("Telegram");
              }}
              className="relative block h-fit w-fit text-amber-400 cursor-pointer hover:text-amber-600"
            >
              <MdHexagon className="text-6xl   rotate-90 " />
              <BiLogoTelegram className=" absolute text-3xl block top-1/2 left-1/2 -translate-1/2 !text-gray-900 " />
            </span>
            <span
              onClick={() => {
                setOnChange("Instagram");
              }}
              className="relative block h-fit w-fit text-amber-400 cursor-pointer hover:text-amber-600"
            >
              <MdHexagon className="text-6xl   rotate-90 " />
              <FiInstagram className=" absolute text-3xl block top-1/2 left-1/2 -translate-1/2 !text-gray-900 " />
            </span>
            <span
              onClick={() => {
                setOnChange("GitHub");
              }}
              className="relative block h-fit w-fit text-amber-400 cursor-pointer hover:text-amber-600"
            >
              <MdHexagon className="text-6xl   rotate-90 " />
              <FaGithub className=" absolute text-3xl block top-1/2 left-1/2 -translate-1/2 !text-gray-900 " />
            </span>
            <span
              onClick={() => {
                setOnChange("X");
              }}
              className="relative block h-fit w-fit text-amber-400 cursor-pointer hover:text-amber-600"
            >
              <MdHexagon className="text-6xl   rotate-90 " />
              <FaXTwitter className=" absolute text-3xl block top-1/2 left-1/2 -translate-1/2 !text-gray-900 " />
            </span>
          </div>
          <div className="flex justify-center w-5/6 aspect-[12/1.5] mx-auto">
            <input
              type="text"
              onChange={(e) => {
                e.preventDefault();

                if (onChange === "Telegram") {
                  setInfo((prev) => ({
                    ...prev,
                    telegram: e.target.value,
                  }));
                }
                if (onChange === "Instagram") {
                  setInfo((prev) => ({
                    ...prev,
                    instagram: e.target.value,
                  }));
                }
                if (onChange === "GitHub") {
                  setInfo((prev) => ({
                    ...prev,
                    github: e.target.value,
                  }));
                }
                if (onChange === "X") {
                  setInfo((prev) => ({
                    ...prev,
                    x: e.target.value,
                  }));
                }
              }}
              placeholder={`${onChange} link is empty`}
              value={
                onChange === "Telegram"
                  ? info.telegram
                  : onChange === "Instagram"
                  ? info.instagram
                  : onChange === "GitHub"
                  ? info.github
                  : onChange === "X"
                  ? info.x
                  : ""
              }
              className=" flex-1 text-amber-400 flex px-3 items-center border-2 outline-0 border-amber-400/55 rounded-2xl"
            />
          </div>
          <span className=" px-6 rounded-full mx-auto flex font-bold  gap-3 cursor-pointer  items-center justify-center py-2 bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-teal-500 hover:to-green-500">
            <CiSaveUp1 className="text-xl" />
            <span className="font-semibold">Save Changes</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
