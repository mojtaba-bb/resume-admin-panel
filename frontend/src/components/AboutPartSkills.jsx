import React, { useState, useEffect } from "react";
import { MdOutlineDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import Loding from "../pages/Loding";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


function AboutPartSkills() {
    const [isLoading, setIsLoading] = useState(false);
  const [changeIndex, setChangeIndex] = useState(null);
  const [updateId, setUpdateId] = useState(null)
  const [skill, setSkill] = useState({
    en: "",
    fa: "",
  });
  const [data, setData] = useState({
    title: {
      en: "",
      fa: "",
    },
    skill: [],
  });
  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/page-content/about/skills"
      );
      console.log(res.data)
      setUpdateId(res.data.about._id)
      
      setData(
        {
          title:res.data.about.title,
          skill:res.data.about.skill
        }
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setData({
        title: {
          en: "",
          fa: "",
        },
        skill: [],
      });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  const updateItem = (index, newValue) => {
    setData((prev) => ({
      ...prev,
      skill: prev.skill.map((item, i) =>
        i === index ? { ...item, en: newValue.en, fa: newValue.fa } : item
      ),
    }));
    setChangeIndex(null);
    setSkill({ en: "", fa: "" });
  };

  const newItem = (newValue) => {
    setData((prevItems) => ({
      ...prevItems,
      skill: [...prevItems.skill, newValue],
    }));
    setSkill({ en: "", fa: "" });
  };

  const removeItem = (index) => {
    setData((prev) => ({
      ...prev,
      skill: prev.skill.filter((item, i) => i !== index),
    }));
  };

  const sendData = async ()=>{
    try {
      const res = await axios.post(
        "http://localhost:3000/api/page-content/about/skills",data,
        {
          
          headers: { authorization: localStorage.getItem("Authorization") },
        }
      );
      console.log(res)
    } catch (error) {
      toast.error(error.message)
    }
    setIsLoading(false)
  }

  const updateData = async()=>{
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/page-content/about/skills",data,
        {
          
          headers: { authorization: localStorage.getItem("Authorization") },
        }
      );
      console.log(res)
    } catch (error) {
      toast.error(error.message)
    }
    setIsLoading(false)
  }

  const handleSubmit = (e) => {
  e.preventDefault();
  setIsLoading(true)
  updateId ===null?sendData():updateData()
};
  return (
        <>
        <Toaster/>
      <Loding visible={isLoading} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 text-amber-400"
      >
        <div>
          <label className="">skills title</label>
          <br />
          <div className="flex gap-3 ">
            <input
              type="text"
              className=" py-2 flex-1/2 border-b focus:border-b-4 accent-transparent  outline-none"
              value={data.title ? data.title.en : ""}
              onChange={(e) => {
                e.preventDefault();
                setData((prev) => ({
                  ...prev,
                  title: { ...prev.title, en: e.target.value },
                }));
              }}
              placeholder="English Title"
            />
            <input
              type="text"
              className=" py-2 border-b flex-1/2  focus:border-b-4 accent-transparent outline-none"
              value={data.title ? data.title.fa : ""}
              onChange={(e) => {
                e.preventDefault();
                setData((prev) => ({
                  ...prev,
                  title: { ...prev.title, fa: e.target.value },
                }));
              }}
              placeholder="Persian Title"
            />
          </div>
        </div>
        <div className="">
          <label className="">page Content</label>
          <div className="mt-3 flex flex-col gap-3">
            {data.skill.map((value, num) => (
              <div
                key={num}
                className="flex  border rounded text-amber-400 opacity-70 hover:opacity-100"
              >
                <span className="w-9 flex justify-center items-center border-r text-cyan-400">
                  {num}
                </span>
                <span className="truncate  flex-1/2 p-1 cursor-default">
                  {value.en}
                </span>

                <span className="truncate border-l flex-1/2  p-1 cursor-default">
                  {value.fa}
                </span>
                <button
                  className="w-9 p-1 justify-center items-center flex border-x cursor-pointer hover:bg-red-400/10 text-red-400"
                  onClick={(e) => {
                    e.preventDefault();
                    removeItem(num);
                  }}
                >
                  <AiOutlineClose />
                </button>
                <button
                  className="w-9 p-1 justify-center items-center flex cursor-pointer hover:bg-cyan-400/10 text-cyan-400"
                  onClick={(e) => {
                    e.preventDefault();
                    setChangeIndex(num);
                    setSkill({ en: value.en, fa: value.fa });
                  }}
                >
                  <FaPencilAlt />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-3 relative">
            <textarea
              value={skill.en}
              className="py-2 px-1 h-40 flex-1/2 border rounded resize-none accent-amber-400"
              placeholder="English Skill"
              onChange={(e) => {
                e.preventDefault();
                setSkill((prev) => ({ ...prev, en: e.target.value }));
              }}
            ></textarea>
            <textarea
              dir="rtl"
              value={skill.fa}
              className="placeholder:text-left py-2 px-1 h-40 flex-1/2 border rounded resize-none  accent-amber-400"
              placeholder="Persian Skill "
              onChange={(e) => {
                e.preventDefault();
                setSkill((prev) => ({ ...prev, fa: e.target.value }));
              }}
            ></textarea>
            <button
              onClick={(e) => {
                e.preventDefault();
                changeIndex === null
                  ? newItem(skill)
                  : updateItem(changeIndex, skill);
              }}
              className="absolute right-0 bottom-0 px-3 rounded py-1 border-cyan-400 hover:bg-cyan-400/5 text-cyan-400 text-sm border cursor-pointer"
            >
              {changeIndex === null ? "Add" : "Ok"}
            </button>
          </div>
        </div>
        <div className="flex w-fit self-end gap-3">
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
  )
}

export default AboutPartSkills