import React, { useState, useEffect } from "react";
import Loding from "../pages/Loding";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineDone } from "react-icons/md";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

function AboutPartWorksCount() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    workedProject: {
      title: {
        en: "",
        fa: "",
      },
      count: "0",
    },
    yearsWorked: {
      title: {
        en: "",
        fa: "",
      },
      count: "0",
    },
  });
  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/page-content/about/count"
      );
      setChangeId(res.data.about._id)
      setData(
        res.data.about,
    );
    } catch (error) {
      toast.error(error.message);
      setData({
    workedProject: {
      title: {
        en: "",
        fa: "",
      },
      count: "0",
    },
    yearsWorked: {
      title: {
        en: "",
        fa: "",
      },
      count: "0",
    },
  });
    }
    setIsLoading(false)
  };
  useEffect(() => {
    getData();
  }, []);


  const [changeId, setChangeId] = useState(null);

  const changeWP = (w, change)=>{
    
    if (w ==="WP") {
          if (change === "inc") {
            setData((prev)=>({
        ...prev,workedProject:{...prev.workedProject ,count:Number(prev.workedProject.count)+1}
      }))
    }
    if (change === "dec") {
      if (Number(data.workedProject.count)>0) {
              setData((prev)=>({
        ...prev,workedProject:{...prev.workedProject ,count:Number(prev.workedProject.count)-1}
      }))
      }
    }
    }
    if (w ==="YOW") {
          if (change === "inc") {
            setData((prev)=>({
        ...prev,yearsWorked:{...prev.yearsWorked ,count:Number(prev.yearsWorked.count)+1}
      }))
    }
    if (change === "dec") {
      if (Number(data.yearsWorked.count)>0) {
              setData((prev)=>({
        ...prev,yearsWorked:{...prev.yearsWorked ,count:Number(prev.yearsWorked.count)-1}
      }))
      }
    }
    }
    

  }

  const sendData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/page-content/about/count",
        data,
        {
          headers: { authorization: localStorage.getItem("Authorization") },
        }
      );
      console.log(res);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    setIsLoading(false);
  }

  const handleSubmit = () =>{
    setIsLoading(true)
    sendData()
  }

  return (
    <>
      <Loding visible={isLoading} />
      <Toaster />
      <form onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit()
      }} className="text-amber-400 flex flex-col gap-6">
                <div className="flex gap-6">
                          <div>
          <div className="grid grid-cols-2 gap-3 gap-y-6">
            <label className="col-span-2" htmlFor="">
              Years of work
            </label>
            <input
              type="text"
              placeholder="english title"
              className="py-2 border-b focus:border-b-4 accent-transparent  outline-none"
              value={data.yearsWorked.title.en}
              onChange={(e)=>{
                e.preventDefault()
                setData(
                  (prev)=>({
                    ...prev,
                    yearsWorked:{...prev.yearsWorked, title:{...prev.yearsWorked.title,en:e.target.value}},
                    
                    
                  })
                )
              }}
            />
            <input
              type="text"
              placeholder="persian title"
              dir="rtl"
              className="py-2 border-b placeholder:text-left focus:border-b-4 accent-transparent  outline-none"
              value={data.yearsWorked.title.fa}
              onChange={(e)=>{
                e.preventDefault()
                setData(
                  (prev)=>({
                    ...prev,
                    yearsWorked:{...prev.yearsWorked, title:{...prev.yearsWorked.title,fa:e.target.value}},
                    
                    
                  })
                )
              }}
            />
            <div className="flex flex-col  justify-center items-center gap-3 ">
              <button onClick={(e)=>{
                e.preventDefault()
                
                changeWP( 'YOW' , 'inc')
              }} className=" text-4xl text-cyan-400  w-full hover:text-cyan-800 cursor-pointer rounded flex justify-center items-center ">
                <FaChevronUp />
              </button>

              <div
                
                className="text-8xl cursor-default flex items-center justify-center shadow-lg  shadow-cyan-900 bg-cyan-600 text-white rounded-2xl p-3 aspect-square col-span-2 "
              >
                {data.yearsWorked.count}
              </div>
              <button onClick={(e)=>{
                e.preventDefault()
                
                changeWP( 'YOW' , 'dec')
              }} className=" text-4xl text-cyan-400  w-full hover:text-cyan-800 cursor-pointer rounded flex justify-center items-center ">
                <FaChevronDown />
              </button>
            </div>
            <input
              type="text"
              id="yownumber"
              className="aspect-video hidden border "
              placeholder="0"
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3 gap-y-6">
            <label className="col-span-2" htmlFor="">
              Work's count
            </label>
            <input
              type="text"
              placeholder="english title"
              className="py-2 border-b focus:border-b-4 accent-transparent  outline-none"
              value={data.workedProject.title.en}
              onChange={(e)=>{
                e.preventDefault()
                setData(
                  (prev)=>({
                    ...prev,
                    workedProject:{...prev.workedProject, title:{...prev.workedProject.title,en:e.target.value}},
                    
                    
                  })
                )
              }}
            />
            <input
              type="text"
              placeholder="persian title"
              dir="rtl"
              className="py-2 placeholder:text-left border-b focus:border-b-4 accent-transparent  outline-none"
              value={data.workedProject.title.fa}
              onChange={(e)=>{
                e.preventDefault()
                setData(
                  (prev)=>({
                    ...prev,
                    workedProject:{...prev.workedProject, title:{...prev.workedProject.title,fa:e.target.value}},
                    
                    
                  })
                )
              }}
            />
            <div className="flex flex-col  justify-center items-center gap-3 ">
              <button onClick={(e)=>{
                e.preventDefault()
                
                changeWP( 'WP' , 'inc')
              }} className="  text-4xl text-cyan-400  w-full hover:text-cyan-800 cursor-pointer rounded flex justify-center items-center " >
                <FaChevronUp />
              </button>

              <div
                
                className="text-8xl cursor-default flex items-center justify-center shadow-lg  shadow-cyan-900 bg-cyan-600 text-white rounded-2xl p-3 aspect-square col-span-2 "
              >
                {data.workedProject.count}
              </div>
              <button onClick={(e)=>{
                e.preventDefault()
                
                changeWP( 'WP' , 'dec')
              }} className=" text-4xl text-cyan-400  w-full hover:text-cyan-800 cursor-pointer rounded flex justify-center items-center ">
                <FaChevronDown />
              </button>
            </div>
            <input
              type="text"
              id="wcnumber"
              className="aspect-video hidden border "
              placeholder="0"
            />
          </div>
        </div>
                </div>
                <div className="flex  w-fit self-end gap-3">
                  <button className="border w-fit px-5 py-2 rounded flex items-center  gap-2 text-red-400 hover:bg-red-400/5 cursor-pointer" onClick={(e)=>{
                    e.preventDefault()
                    getData()
                  }}>
                    Cancel
                    <AiOutlineClose />
                  </button>
                  <button type="submit" className="border w-fit  px-5 py-2 rounded flex items-center  gap-2 text-green-400 hover:bg-green-400/5 cursor-pointer">
                    Save Changes
                    <MdOutlineDone />
                  </button>
                </div>
      </form>
    </>
  );
}

export default AboutPartWorksCount;
