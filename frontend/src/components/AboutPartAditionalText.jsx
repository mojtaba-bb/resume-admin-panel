import React, { useState, useEffect } from "react";
import Loding from "../pages/Loding";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
function AboutPartAditionalText() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ additionalText: { en: "", fa: "" } });
  const [changeId, setChangeId] = useState(null)
  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/page-content/about/additional"
      );
      setChangeId(res.data.about._id)
      setData({
        additionalText: res.data.about.additionalText,
      });
    } catch (error) {
      toast(error.message);
      setData({ additionalText: { en: "", fa: "" } });
    }
    setIsLoading(false)
  };
  useEffect(() => {
    getData();
  }, []);


  const sendData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/page-content/about/additional",
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
  };

  const updateData = async () =>{
        try {
      const res = await axios.patch(
        "http://localhost:3000/api/page-content/about/additional",
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

  const handleSubmit = () => {
    setIsLoading(true);
    changeId===null?sendData():updateData()
  };

  return (
    <>
      <Toaster />
      <Loding visible={isLoading} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-6 text-amber-400"
      >
        <label className="">Additional text</label>
        <input
          type="text"
          className=" py-2 flex-1/2 border-b focus:border-b-4 accent-transparent  outline-none"
          placeholder="English Text"
          value={data.additionalText.en}
          onChange={(e) => {
            e.preventDefault();
            setData((prev) => ({
              ...prev,
              additionalText: { ...prev.additionalText, en: e.target.value },
            }));
          }}
        />
        <input
          type="text"
          dir="rtl"
          className="  py-2 flex-1/2 placeholder:text-left border-b focus:border-b-4 accent-transparent  outline-none"
          placeholder="Persian Text"
          value={data.additionalText.fa}
          onChange={(e) => {
            e.preventDefault();
            setData((prev) => ({
              ...prev,
              additionalText: { ...prev.additionalText, fa: e.target.value },
            }));
          }}
        />
        <div className="flex gap-3 justify-end">
          <button
            className="border w-fit px-5 py-2 rounded flex items-center  gap-2 text-red-400 hover:bg-red-400/5 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setIsLoading(true)
              getData();
            }}
          >
            Cancel
            <AiOutlineClose />
          </button>
          <button
            type="submit"
            className="border w-fit  px-5 py-2 rounded flex items-center  gap-2 text-green-400 hover:bg-green-400/5 cursor-pointer"
          >
            Save Changes
            <MdOutlineDone />
          </button>
        </div>
      </form>
    </>
  );
}

export default AboutPartAditionalText;
