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
    _id:null,
    userName: "MojtabaDev_79",
    file: "",
    logoAlt:{
      en:"",
      fa:""
    },
    telegram: "",
    instagram: "",
    github: "",
    twitter: "",
    updatedAt:null,
    editedAt:null
  });

  function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: 'y', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    { label: 'w', seconds: 604800 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
    { label: 's', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count}${interval.label}`;
  }

  return 'now';
}


  const fetchMyInfo = async () => {
    
    try {
      
      const res = await axios.get(
        "http://localhost:3000/api/page-content/contact"
      );
      const img = await axios.get(
        `http://localhost:3000/api/media/${res.data.contactInfo.mainImage}`
      )


      setInfo(prev=>({
        ...prev,
        file:`http://localhost:3000${img.data.media.uri}`,
        logoAlt:{ en:img.data.media.alt.en , fa:img.data.media.alt.fa},
        
      }))
      setInfo(prev=>({
        ...prev,
        telegram:res.data.contactInfo.telegram,
        instagram:res.data.contactInfo.instagram,
        github:res.data.contactInfo.gitHub,
        twitter:res.data.contactInfo.twitter,
        userName:res.data.contactInfo.username,
        updatedAt:res.data.contactInfo.updatedAt,
        editedAt:timeAgo(res.data.contactInfo.updatedAt)
      }))
      
      setInfo(prev=>({
        ...prev,_id:res.data.contactInfo._id     }))
      setIsLoading(false);
    } catch (error) {
      if (error.status != 404) {
        toast.error(error.message);
      }
      console.log(error)
      setIsLoading(false);
    }

  };

const postData = async () => {
  const formData = new FormData();
  formData.append("mainProfile", info.file);               // فایل
  formData.append("userName", info.userName);              // رشته‌ها
 formData.append("logoAlt", JSON.stringify({
  fa: info.logoAlt.fa,
  en: info.logoAlt.en
}));
  
  formData.append("telegram", info.telegram);
  formData.append("instagram", info.instagram);
  formData.append("gitHub", info.github);
  formData.append("twitter", info.twitter);
  
  try {
    const res = await axios.post(
      "http://localhost:3000/api/page-content/contact",
      formData,
      {
        headers: {
          authorization: localStorage.getItem("Authorization"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res.data);
    toast.success("ذخیره شد!");
  } catch (error) {
    console.error("Error posting contact:", error);
    toast.error("خطا در ارسال داده");
  }
};
const updateData= async()=>{
    const formData = new FormData();
  formData.append("mainProfile", info.file);               // فایل
  formData.append("userName", info.userName);              // رشته‌ها
    formData.append("logoAlt", JSON.stringify({
  fa: info.logoAlt.fa,
  en: info.logoAlt.en
}));
  
  formData.append("telegram", info.telegram);
  formData.append("instagram", info.instagram);
  formData.append("gitHub", info.github);
  formData.append("twitter", info.twitter);
  
    try {
    const res = await axios.put(
      "http://localhost:3000/api/page-content/contact",
      formData,
      {
        headers: {
          authorization: localStorage.getItem("Authorization"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res.data);
    toast.success("ذخیره شد!");
  } catch (error) {
    console.error("Error posting contact:", error);
    toast.error("خطا در ارسال داده");
  }
  
}
  useEffect(() => {
    setIsLoading(true);
    fetchMyInfo();
  }, []);


  const [onChange, setOnChange] = useState("Telegram");

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen ">
      <Loding visible={isLoading} />
      <NavBar
        name={"Contact Section Maneger"}
        url={"/section-manager"}
        urlName={"Back"}
      />
      <Toaster />
      <div className="border-2 flex flex-col justify-between relative w-lg h-auto pb-6 gap-10 mx-auto my-6 overflow-hidden  rounded-2xl bg- border-amber-400">
        <span className="w-4/5 aspect-square z-0 bg-amber-400 rounded-full absolute -translate-x-[35%] -translate-y-1/2" />
        <span className="absolute bottom-3 text-amber-400 right-3 opacity-30 cursor-default">
            {info.editedAt}
        </span>
        <div className="z-10 flex flex-col  justify-center items-center">
          <input
            type="file"
            name="mainProfile"
            id="profileImage"
            onChange={(e) => {
              setInfo((prev) => ({
                ...prev,
                file: e.target.files[0],
              }));
            }}
            className="hidden"
          />
          <span className="w-4/12 relative mt-5 aspect-square block  bg-gray-800 overflow-hidden  border-8 border-gray-900 mx-auto rounded-full">
            <img
              src={
                info.file != ""
                  ? typeof info.file!= "string"
                  ?URL.createObjectURL(info.file)
                  : info.file:""
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
          <div className="p-3   rounded-2xl overflow-x-hidden flex-col gap-3 border justify-center items-center flex mt-5 text-amber-400/70">
            <span className="text-lg font-bold">Profile Alt</span>
            <div className="flex gap-3 ">
              <label htmlFor="profileImageAltEn" className="max-w-1/2">
                Eng :{" "}
                <input
                  type="text"
                  className=" field-sizing-fixed  outline-none border-b text-amber-400 border-white/30  w-24"
                  value={info.logoAlt.en}
                  onChange={(e)=>{
                    setInfo((prev)=>({
                      ...prev , logoAlt:{...prev , en:e.target.value}
                    }))
                  }}
                  name=""
                  id="profileImageAltEn"
                />
              </label>
              <label htmlFor="profileImageAltFa" className="max-w-1/2">
                Fa :{" "}
                <input
                  type="text"
                  className="field-sizing-fixed  outline-none border-b text-amber-400 border-white/30 w-24"
                  value={info.logoAlt.fa}
                  onChange={(e)=>{
                    setInfo((prev)=>({
                      ...prev , logoAlt:{...prev.logoAlt , fa:e.target.value}
                    }))
                  }}
                  id="profileImageAltFa"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="h-1/2 gap-3  flex flex-col justify-evenly">
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
                    twitter: e.target.value,
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
                  ? info.twitter
                  : ""
              }
              className=" flex-1 text-amber-400 flex px-3 items-center border-2 outline-0 border-amber-400/55 rounded-2xl"
            />
          </div>
          <span onClick={
            ()=>{
              info._id===null?postData():updateData()
            }
          } className=" px-6 rounded-full mx-auto flex font-bold  gap-3 cursor-pointer  items-center justify-center py-2 bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-teal-500 hover:to-green-500">
            <CiSaveUp1 className="text-xl" />
            <span className="font-semibold">Save Changes</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
