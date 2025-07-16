import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { RxUpdate } from "react-icons/rx";
import NavBar from "../../components/NavBar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loding from "../Loding";

function HomeSection() {
  const [isLoading, setIsLoading] = useState(false);

  // ——— INITIAL STATE ———
  const [initialData, setInitialData] = useState({
    id: null,
    title: { en: "", fa: "" },
    jobTitle: { en: "", fa: "" },
    job: "",
    status: { en: "", fa: "" },
    contentEn: [],
    contentFa: [],
    media: {
      mainImage: null,            // URI from server, e.g. "/public/home/...jpg"
      previewMainImage: null,     // blob preview URL
      mainImageName: "",
      mainImageAlt: { en: "", fa: "" },

      profileImage: null,         // URI from server
      previewProfileImage: null,  // blob preview URL
      profileImageName: "",
      profileImageAlt: { en: "", fa: "" },
    },
  });

  // temporarily hold newly selected files
  const [files, setFiles] = useState({
    mainImage: null,
    profileImage: null,
  });

  // content input states
  const [inputEn, setInputEn] = useState("");
  const [editIndexEn, setEditIndexEn] = useState(null);
  const [inputFa, setInputFa] = useState("");
  const [editIndexFa, setEditIndexFa] = useState(null);

  // ——— 1. FETCH INITIAL DATA ———
  const fetchHomeData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/page-content/home");
      const data = res.data.homeContent;

      // fetch media info in parallel
      const [mainImgRes, profileImgRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/media/${data.mainImage}`),
        axios.get(`http://localhost:3000/api/media/${data.profileImage}`),
      ]);

      const mainImage = mainImgRes.data.media;
      const profileImage = profileImgRes.data.media;

      setInitialData({
        id: data._id,
        title: data.title,
        jobTitle: data.jobTitle.title,
        job: data.jobTitle.job,
        status: data.status,
        contentEn: data.content.en,
        contentFa: data.content.fa,
        media: {
          mainImage: mainImage.uri,
          previewMainImage: null,
          mainImageName: mainImage.fileName,
          mainImageAlt: { ...mainImage.alt },

          profileImage: profileImage.uri,
          previewProfileImage: null,
          profileImageName: profileImage.fileName,
          profileImageAlt: { ...profileImage.alt },
        },
      });
    } catch (err) {
      console.log("Error fetching home data:", err);
      toast.error(err?.response?.data?.message?.en || "Error fetching data");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHomeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ——— 2. SYNC status.fa WHEN status.en CHANGES ———
  useEffect(() => {
    const en = initialData.status.en;
    let fa = "";
    if (en === "I'm busy") fa = "سرم شلوغه";
    if (en === "On vacation") fa = "در تعطیلات";
    if (en === "Ready to work") fa = "آماده به کار";

    if (fa && initialData.status.fa !== fa) {
      setInitialData((prev) => ({
        ...prev,
        status: { en: en, fa },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData.status.en]);

  // ——— 3. CONTENT EN HANDLERS ———
  const handleAddOrEditEn = () => {
    if (inputEn.trim() === "") return;
    setInitialData((prev) => {
      const arr = [...prev.contentEn];
      if (editIndexEn !== null) {
        arr[editIndexEn] = inputEn.trim();
      } else {
        arr.push(inputEn.trim());
      }
      return { ...prev, contentEn: arr };
    });
    setInputEn("");
    setEditIndexEn(null);
  };

  const handleEditEn = (index) => {
    setInputEn(initialData.contentEn[index]);
    setEditIndexEn(index);
  };

  const handleDeleteEn = (index) => {
    setInitialData((prev) => {
      const arr = prev.contentEn.filter((_, i) => i !== index);
      return { ...prev, contentEn: arr };
    });
    if (editIndexEn === index) {
      setInputEn("");
      setEditIndexEn(null);
    }
  };

  // ——— 4. CONTENT FA HANDLERS ———
  const handleAddOrEditFa = () => {
    if (inputFa.trim() === "") return;
    setInitialData((prev) => {
      const arr = [...prev.contentFa];
      if (editIndexFa !== null) {
        arr[editIndexFa] = inputFa.trim();
      } else {
        arr.push(inputFa.trim());
      }
      return { ...prev, contentFa: arr };
    });
    setInputFa("");
    setEditIndexFa(null);
  };

  const handleEditFa = (index) => {
    setInputFa(initialData.contentFa[index]);
    setEditIndexFa(index);
  };

  const handleDeleteFa = (index) => {
    setInitialData((prev) => {
      const arr = prev.contentFa.filter((_, i) => i !== index);
      return { ...prev, contentFa: arr };
    });
    if (editIndexFa === index) {
      setInputFa("");
      setEditIndexFa(null);
    }
  };

  // ——— 5. FILE CHANGE HANDLER ———
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setFiles((prev) => ({
      ...prev,
      [field]: file,
    }));

    const objectUrl = URL.createObjectURL(file);
    setInitialData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        [`preview${field.charAt(0).toUpperCase() + field.slice(1)}`]: objectUrl,
        [`${field}Name`]: file.name,
      },
    }));
  };

  // ——— 6. SUBMIT HANDLER ———
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();

      // title
      formData.append(
        "title",
        JSON.stringify({ en: initialData.title.en, fa: initialData.title.fa })
      );

      // jobTitle
      formData.append(
        "jobTitle",
        JSON.stringify({
          title: {
            en: initialData.jobTitle.en,
            fa: initialData.jobTitle.fa,
          },
          job: initialData.job,
        })
      );

      // status
      formData.append(
        "status",
        JSON.stringify({ en: initialData.status.en, fa: initialData.status.fa })
      );

      // content
      formData.append(
        "content",
        JSON.stringify({
          en: initialData.contentEn,
          fa: initialData.contentFa,
        })
      );

      // mainImageAlt
      formData.append(
        "mainImageAlt",
        JSON.stringify({
          en: initialData.media.mainImageAlt.en,
          fa: initialData.media.mainImageAlt.fa,
        })
      );

      // profileImageAlt
      formData.append(
        "profileImageAlt",
        JSON.stringify({
          en: initialData.media.profileImageAlt.en,
          fa: initialData.media.profileImageAlt.fa,
        })
      );

      // if new main image selected
      if (files.mainImage) {
        formData.append("mainImage", files.mainImage);
      }

      // if new profile image selected
      if (files.profileImage) {
        formData.append("profileImage", files.profileImage);
      }

      const res = await axios.put(
        "http://localhost:3000/api/page-content/home",
        formData,
        {
          
          headers: { authorization: localStorage.getItem("Authorization"),"Content-Type": "multipart/form-data" },
        }
      );

      toast.success(res.data.message || "Saved successfully");
    } catch (error) {
      console.log("Error Response from server:", error.response);
      const backendMessage =
        error?.response?.data?.message?.en || "Error saving data";
      toast.error(backendMessage);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-gray-100">
      <Loding visible={isLoading} />
      <Toaster />
      <NavBar name="Home Section Manager" url={"/section-manager"} urlName={"Back"} />

      <main className="flex justify-center py-16">
        <form
          onSubmit={handleSubmit}
          className="border border-amber-400 rounded-xl p-6 w-full max-w-2xl bg-white/5 backdrop-blur-sm shadow-md"
        >
          {/* Title (EN + FA) */}
          <label className="block text-amber-300 font-semibold mb-2">Title</label>
          <div className="flex gap-2">
            <input
              value={initialData.title.en}
              onChange={(e) =>
                setInitialData((prev) => ({
                  ...prev,
                  title: { ...prev.title, en: e.target.value },
                }))
              }
              placeholder="Title (EN)"
              className="w-1/2 p-2 rounded bg-gray-800 border border-amber-500 text-white focus:ring-amber-400"
            />
            <input
              value={initialData.title.fa}
              onChange={(e) =>
                setInitialData((prev) => ({
                  ...prev,
                  title: { ...prev.title, fa: e.target.value },
                }))
              }
              placeholder="Title (FA)"
              className="w-1/2 p-2 rounded bg-gray-800 border border-amber-500 text-white focus:ring-amber-400"
            />
          </div>

          {/* Job Title (EN + FA) */}
          <label className="block text-amber-300 font-semibold mb-2 mt-4">Job Title</label>
          <div className="flex gap-2">
            <input
              value={initialData.jobTitle.en}
              onChange={(e) =>
                setInitialData((prev) => ({
                  ...prev,
                  jobTitle: { ...prev.jobTitle, en: e.target.value },
                }))
              }
              placeholder="Job Title (EN)"
              className="w-1/2 p-2 rounded bg-gray-800 border border-amber-500 text-white focus:ring-amber-400"
            />
            <input
              value={initialData.jobTitle.fa}
              onChange={(e) =>
                setInitialData((prev) => ({
                  ...prev,
                  jobTitle: { ...prev.jobTitle, fa: e.target.value },
                }))
              }
              placeholder="Job Title (FA)"
              className="w-1/2 p-2 rounded bg-gray-800 border border-amber-500 text-white focus:ring-amber-400"
            />
          </div>

          {/* Job */}
          <label className="block text-amber-300 font-semibold mb-2 mt-4">Job</label>
          <input
            value={initialData.job}
            onChange={(e) =>
              setInitialData((prev) => ({ ...prev, job: e.target.value }))
            }
            placeholder="Job"
            className="w-full p-2 rounded bg-gray-800 border border-amber-500 text-white focus:ring-amber-400"
          />

          {/* Status */}
          <label className="block text-amber-300 font-semibold mb-2 mt-4">Status</label>
          <div className="flex gap-5">
            {["I'm busy", "On vacation", "Ready to work"].map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={initialData.status.en === s}
                  onChange={(e) =>
                    setInitialData((prev) => ({
                      ...prev,
                      status: { ...prev.status, en: e.target.value },
                    }))
                  }
                  className="accent-amber-400"
                />
                <span className="text-white hover:text-amber-300">{s}</span>
              </label>
            ))}
          </div>

          {/* Content */}
          <label className="block text-amber-300 font-semibold mb-2 mt-4">Content</label>
          <div className="flex gap-4">
            {/* EN */}
            <div className="w-1/2 flex flex-col">
              <ul className="mb-2 list-inside list-disc">
                {initialData.contentEn.map((it, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{it}</span>
                    <div className="flex gap-2">
                      <FaPencilAlt
                        onClick={() => handleEditEn(i)}
                        className="text-blue-400 cursor-pointer"
                      />
                      <CgClose
                        onClick={() => handleDeleteEn(i)}
                        className="text-red-500 cursor-pointer"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex gap-1">
                <input
                  value={inputEn}
                  onChange={(e) => setInputEn(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddOrEditEn())
                  }
                  placeholder="Add EN content"
                  className="flex-grow p-2 rounded bg-gray-800 border border-amber-500 text-white focus:ring-amber-400"
                />
                <div
                  className="text-green-500 cursor-pointer h-full block aspect-square p-1 border rounded"
                  onClick={handleAddOrEditEn}
                >
                  <FaPlus className="h-full w-full" />
                </div>
              </div>
            </div>

            {/* FA */}
            <div className="w-1/2 flex flex-col">
              <ul className="mb-2 list-inside list-disc">
                {initialData.contentFa.map((it, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{it}</span>
                    <div className="flex gap-2">
                      <FaPencilAlt
                        onClick={() => handleEditFa(i)}
                        className="text-blue-400 cursor-pointer"
                      />
                      <CgClose
                        onClick={() => handleDeleteFa(i)}
                        className="text-red-500 cursor-pointer"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex gap-1">
                <input
                  value={inputFa}
                  onChange={(e) => setInputFa(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddOrEditFa())
                  }
                  placeholder="Add FA content"
                  className="flex-grow p-2 rounded bg-gray-800 border border-amber-500 text-white focus:ring-amber-400"
                />
                <div
                  className="text-green-500 cursor-pointer h-full block aspect-square p-1 border rounded"
                  onClick={handleAddOrEditFa}
                >
                  <FaPlus className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Media Section */}
          <label className="block text-amber-300 font-semibold mb-2 mt-4">Media</label>
          <div className="flex gap-2">
            {/* Main Image */}
            <div className="w-1/2">
              <label className="block text-amber-300/70 mb-1 text-sm">Main Image</label>
              <div className="flex gap-1">
                <a
                  href={
                    initialData.media.previewMainImage
                      ? initialData.media.previewMainImage
                      : `http://localhost:3000${initialData.media.mainImage}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 flex-1 border p-1 rounded overflow-hidden border-amber-300 cursor-pointer text-amber-300/40 hover:text-amber-300/60 mb-1 text-sm"
                >
                  {initialData.media.mainImageName
                    ? initialData.media.mainImageName
                    : "Main image"}
                </a>
                <label
                  htmlFor="mainImage"
                  className="w-9 h-9 flex items-center justify-center rounded border text-green-400 hover:text-green-600 cursor-pointer"
                >
                  <RxUpdate />
                </label>
              </div>
              <input
                type="file"
                id="mainImage"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "mainImage")}
              />
              <label className="block text-amber-300 font-semibold mb-2 mt-1">Alt</label>
              <div className="flex gap-1">
                <input
                  value={initialData.media.mainImageAlt.en}
                  onChange={(e) =>
                    setInitialData((prev) => ({
                      ...prev,
                      media: {
                        ...prev.media,
                        mainImageAlt: {
                          ...prev.media.mainImageAlt,
                          en: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="English Alt"
                  className="p-2 w-1/2 rounded bg-gray-800 border border-amber-500 text-white focus:ring-amber-400"
                />
                <input
                  value={initialData.media.mainImageAlt.fa}
                  onChange={(e) =>
                    setInitialData((prev) => ({
                      ...prev,
                      media: {
                        ...prev.media,
                        mainImageAlt: {
                          ...prev.media.mainImageAlt,
                          fa: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="Alt (FA)"
                  className="p-2 w-1/2 rounded bg-gray-800 border border-amber-500 text-white focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Profile Image */}
            <div className="w-1/2">
              <label className="block text-amber-300/70 mb-1 text-sm">Profile Image</label>
              <div className="flex gap-1">
                <a
                  href={
                    initialData.media.previewProfileImage
                      ? initialData.media.previewProfileImage
                      : `http://localhost:3000${initialData.media.profileImage}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-9 border p-1 rounded overflow-hidden border-amber-300 cursor-pointer text-amber-300/40 hover:text-amber-300/60 mb-1 text-sm"
                >
                  {initialData.media.profileImageName
                    ? initialData.media.profileImageName
                    : "Profile image"}
                </a>
                <label
                  htmlFor="profileImage"
                  className="w-9 h-9 flex items-center justify-center rounded border text-green-400 hover:text-green-600 cursor-pointer"
                >
                  <RxUpdate />
                </label>
              </div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "profileImage")}
              />
              <label className="block text-amber-300 font-semibold mb-2 mt-1">Alt</label>
              <div className="flex gap-1">
                <input
                  value={initialData.media.profileImageAlt.en}
                  onChange={(e) =>
                    setInitialData((prev) => ({
                      ...prev,
                      media: {
                        ...prev.media,
                        profileImageAlt: {
                          ...prev.media.profileImageAlt,
                          en: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="Alt English"
                  className="p-2 w-1/2 rounded bg-gray-800 border border-amber-500 text-white focus:ring-amber-400"
                />
                <input
                  value={initialData.media.profileImageAlt.fa}
                  onChange={(e) =>
                    setInitialData((prev) => ({
                      ...prev,
                      media: {
                        ...prev.media,
                        profileImageAlt: {
                          ...prev.media.profileImageAlt,
                          fa: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="Alt (FA)"
                  className="p-2 w-1/2 rounded bg-gray-800 border border-amber-500 text-white focus:ring-amber-400"
                />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="w-full flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="border border-rose-500 px-4 py-2 rounded text-rose-500 hover:bg-rose-500/10 transition"
              onClick={fetchHomeData}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border border-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-500/10 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default HomeSection;
