import React, { useEffect,useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCloudUpload } from "react-icons/io5";
import axios from "axios";

function ResumeComponent({ className }) {
  const [resume, setResume] = useState("");


  // هندلر آپلود رزومه
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      // فرض می‌کنیم API { url, fileName } برمی‌گرداند
      
      toast.success(res.data.message.en);
      setResume(res.data.resume)
    } catch (error) {
      toast.error(error.message.en);
    }
  };
    const handleResumeUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.put(
        "http://localhost:3000/api/resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      // فرض می‌کنیم API { url, fileName } برمی‌گرداند
      console.log(res)
      toast.success(res.data.message.en);
    } catch (error) {
      toast.error(error.message.en);
    }
  };
  
  useEffect(() => {const fetchResume = async ()=>{
    try {
         
        const res = await axios.get("http://localhost:3000/api/resume",{headers:{authorization: localStorage.getItem("Authorization"),}})
        toast.success(res.data.message.en)
        setResume(res.data.resume)
    } catch (error) {
        toast.error(error.data.message.en)
    }
    }
    fetchResume()
  }, [])
  

  return (
    <>
      <Toaster />
      <div className={className}>
        <IoCloudUpload className="h-24 w-24 text-gray-400" />
        <h1 className="text-lg font-bold text-gray-600">Upload Resume</h1>

        {/* input مخفی */}
        <input
          type="file"
          accept="application/pdf"
          id="resumeUpload"
          className="hidden"
          onChange={!resume ? handleResumeUpload :handleResumeUpdate}
        />

        {/* کلید آپلود */}
        <label
          htmlFor="resumeUpload"
          className="w-5/12 text-center text-sm font-bold text-zinc-800/80 border border-zinc-800/30 rounded px-3 py-2 cursor-pointer hover:bg-zinc-800/10 transition-all duration-200"
        >
          {!resume ? "Upload" : "Update"}
        </label>

        {/* نمایش لینک فایل آپلود شده */}
        {resume.fileName && (
          <a
            href={`http://localhost:3000${resume.url}`}
              target="_blank"
                rel="noopener noreferrer"

            className="text-cyan-500 text-sm font-bold truncate w-5/12 hover:text-cyan-800 hover:underline transition-all duration-200"
          >
            {resume.fileName}
          </a>
        )}
      </div>
    </>
  );
}

export default ResumeComponent;
