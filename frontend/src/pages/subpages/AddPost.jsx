import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { LiaLanguageSolid } from "react-icons/lia";
import { MdDone } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "../../components/NavBar.jsx";
import { useParams } from "react-router-dom";
import { IoRemoveOutline } from "react-icons/io5";
import { TbCancel } from "react-icons/tb";
import { MdSaveAlt } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { FaChevronUp } from "react-icons/fa";

import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import axios from "axios";
function AddPost() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("is loading ended");
      reader.onerror = () => console.log("is loading error");
      reader.readAsDataURL(file);
    });
  }, []);
  const MAX_LENGTH = 4;
  const { getRootProps, acceptedFiles, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  const statusValues = ["Draft", "Published", "Archived"];

  const { id } = useParams();

  const [data, setData] = useState({
    title: {
      en: "",
      fa: "",
    },
    content: [],
    seo: "",
    tags: [],
    links: [],
    media: [],
    status: "",
  });
  const [lang, setLang] = useState("en");
  const [media, setMedia] = useState([]);
  const [contentInput, setContentInput] = useState({ en: "", fa: "" });
  useEffect(() => {
    acceptedFiles.map((file) => {
      setMedia((prevItems) => {
        const fileForm = {
          file: file,
          alt: {
            en: "",
            fa: "",
          },
        };
        const newArray = [...prevItems, fileForm];
        return newArray.slice(Math.max(0, newArray.length - MAX_LENGTH));
      });
    });
  }, [acceptedFiles]);

  useEffect(() => {
    console.log(media);
  }, [media]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const getData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
      setData({
        title: res.data.post.title,
        content: res.data.post.content,
        seo: res.data.post.seo,
        tags: res.data.post.tags,
        links: res.data.post.links,
        media: res.data.post.media,
        status: res.data.post.status,
      });
      console.log(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeImage = (index, newFile) => {
    const updatedImages = [...media];
    updatedImages[index].file = newFile;
    setMedia(updatedImages);
  };

  const moveImage = (index, dir) => {
    const updatedArray = [...media];
    if (dir === "up") {
      const prev = updatedArray[index - 1];
      updatedArray[index - 1] = updatedArray[index];
      updatedArray[index] = prev;
      setMedia(updatedArray);
    }
    if (dir === "down") {
      const prev = updatedArray[index + 1];
      updatedArray[index + 1] = updatedArray[index];
      updatedArray[index] = prev;
      setMedia(updatedArray);
    }
  };

  const removeImage = (index) => {
    const updatedArray = [...media];
    const newArray = updatedArray.filter((item, num) => num !== index);
    setMedia(newArray);
  };

  const changeAlt = (index, lang, value) => {
    const updatedArray = [...media];
    if (lang === "en") {
      updatedArray[index].alt.en = value;
    }
    if (lang === "fa") {
      updatedArray[index].alt.fa = value;
    }
    setMedia(updatedArray);
  };

  const changeStatus = (value) => {
    const newData = { ...data };
    console.log(value);
    newData.status = value;
    setData(newData);
  };

  const [linkediting, setLinkediting] = useState(null);

  const addLink = (value) => {
    if (value.name === "") {
      toast.error("Add name to link");
    } else if (value.url === "") {
      toast.error("Add Url to link");
    } else {
      const updatedData = { ...data };
      updatedData.links.push(value);
      setData(updatedData);
      setLinkInput({ name: "", url: "" });
    }
  };

  const editLink = (value, index) => {
    const updatedData = { ...data };
    updatedData.links[index] = value;
    setData(updatedData);
    setLinkInput({ name: "", url: "" });
    setLinkediting(null);
  };

  const removeLink = (index) => {
    const updatedData = { ...data };
    const newArray = updatedData.links.filter((item, num) => num !== index);
    updatedData.links = newArray;
    setData(updatedData);
  };

  const addTag = (value) => {
    if (value.url === "") {
      toast.error("Add text to tag");
    } else {
      const updatedData = { ...data };
      updatedData.tags.push(value);
      setData(updatedData);
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    const updatedData = { ...data };
    const newArray = updatedData.tags.filter((item, num) => num !== index);
    updatedData.tags = newArray;
    setData(updatedData);
  };

  const [editingContent, setEditingContent] = useState(null);

  const addContent = () => {
    if (contentInput.en === "") {
      toast.error("Add text to English content");
    } else if (contentInput.fa === "") {
      toast.error("Add translition content");
    } else {
      const updatedData = { ...data };
      updatedData.content.push(contentInput);
      setData(updatedData);
      setContentInput({ en: "", fa: "" });
    }
  };
  const editContent = (value , index) => {

    if (value.en === "") {
      toast.error("Add text to English content");
    } else if (value.fa === "") {
      toast.error("Add translition content");
    } else {
      const updatedData = { ...data };
      updatedData.content[index]=value;
      console.log(index)
      setData(updatedData);
      setContentInput({ en: "", fa: "" });
      setEditingContent(null)
    }

  };

  const removeContent = (index) => {
    const updatedData = { ...data };
    const newArray = updatedData.content.filter((item, num) => num !== index);
    updatedData.content = newArray;
    setData(updatedData);

  };
  const changeContentValue = (value, lang) => {
    const newContent = { ...contentInput };
    if (lang === "en") {
      newContent.en = value;
    }
    if (lang === "fa") {
      newContent.fa = value;
    }
    setContentInput(newContent);
  };

  const changeTitle = (value, lang) => {
    const updatedData = { ...data };
    if (lang === "en") {
      updatedData.title.en = value;
    }
    if (lang === "fa") {
      updatedData.title.fa = value;
    }
    setData(updatedData);
  };

  const [linkInput, setLinkInput] = useState({ name: "", url: "" });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, []);

  return (
    <div className="min-h-screen  text-white">
      <Toaster />
      <NavBar name={"Add Post"} url={"/content-manager"} urlName={"Back"} />
      <form className="mx-auto w-3xl flex flex-col  my-6  border text-amber-400 p-6 rounded gap-y-6">
        {
          //Title Part
        }

        <div className="flex flex-col gap-3">
          <label>Post title</label>
          <div className="flex gap-3">
            <input
              type="text"
              className="border-b py-1 flex-1/2 focus:border-b-4 outline-none"
              placeholder="English Title"
              value={data.title.en}
              onChange={(e) => {
                e.preventDefault();
                changeTitle(e.target.value, "en");
              }}
            />
            <input
              type="text"
              className="border-b py-1 flex-1/2 focus:border-b-4 outline-none"
              placeholder="Persian Title"
              value={data.title.fa}
              onChange={(e) => {
                e.preventDefault();
                changeTitle(e.target.value, "fa");
              }}
            />
          </div>
        </div>
              
        {
          //Content Part
        }

        <div className="flex flex-col gap-3">
          <label>Post content</label>
          <div>
            {data.content.map((value, index) => (
              <div key={index} className="border rounded flex ">
                <span className="block border-r truncate flex-1 p-1">
                  {value.en}
                </span>
                <span className="block flex-1 truncate p-1">{value.fa}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditingContent(index);
                    setContentInput({
                      en: value.en,
                      fa: value.fa,
                    });
                  }}
                  className="w-8   flex items-center hover:bg-green-500/10 cursor-pointer border-l p-1 "
                >
                  <AiOutlineForm className="w-full text-green-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeContent(index);
                  }}
                  className="w-8   flex items-center  hover:bg-red-500/10 cursor-pointer  border-l p-1 "
                >
                  <IoRemoveOutline className="w-full text-red-500" />
                </button>
              </div>
            ))}
          </div>
          <div className="relative">
            <textarea
              name=""
              id=""
              className={`resize-none ${
                lang === "en" ? "" : "hidden"
              } outline-none p-3  w-full border rounded h-60`}
              placeholder="English Content"
              value={contentInput.en}
              onChange={(e) => {
                e.preventDefault();
                changeContentValue(e.target.value, "en");
              }}
            />
            <textarea
              name=""
              id=""
              dir="rtl"
              className={`resize-none ${
                lang === "en" ? "hidden" : ""
              }  outline-none p-3 pb-10 w-full border rounded h-60 placeholder:text-left`}
              placeholder="Persian Content"
              value={contentInput.fa}
              onChange={(e) => {
                e.preventDefault();
                changeContentValue(e.target.value, "fa");
              }}
            ></textarea>
            <button
              onClick={(e) => {
                e.preventDefault();
                lang === "en" ? setLang("fa") : setLang("en");
              }}
              className="text-3xl hover:text-cyan-400 text-cyan-900 z-10  flex gap-3 absolute bottom-3 left-3 opacity-50 hover:opacity-100 cursor-pointer items-center"
            >
              <span className="text-sm">
                {lang === "en" ? "English" : "Persian"}
              </span>
              <LiaLanguageSolid />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (editingContent===null) {
                  addContent(contentInput);
                } else {
                  editContent(contentInput , editingContent)
                }
                
              }}
              className="text-2xl p-0.5 px-3 absolute bottom-[1px] right-0 flex gap-1 cursor-pointer rounded border items-center  hover:text-green-700 text-green-500 "
            >
              <span className="text-sm">{editingContent===null?"Add" : "Done"}</span>
              {editingContent===null?<IoAdd /> : <MdDone />}
              
            </button>
          </div>
        </div>

        {
          //Tags Part
        }

        <div className="flex flex-col relative gap-3">
          <label>Post tags</label>
          <div className="flex gap-3 flex-wrap ">
            {data.tags.map((value, index) => (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  removeTag(index);
                }}
                key={index}
                className={`p-2 text-gray-600 hover:text-red-500 cursor-pointer px-5 border rounded-full flex items-center gap-5 text-sm `}
              >
                {value}
                <span className={` rounded-full block aspect-square `}>
                  <IoClose />
                </span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              className="border-b py-1 flex-1 rounded-r  outline-none"
              placeholder="Tag"
              value={tagInput}
              onChange={(e) => {
                e.preventDefault();
                setTagInput(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                addTag(tagInput);
              }}
              className="text-2xl p-0.5 border-t border-x absolute bottom-[0px] right-0 flex cursor-pointer rounded  items-center border-amber-400  hover:text-green-700 text-green-500 "
            >
              <IoAdd />
            </button>
          </div>
        </div>

        {
          //Links Part
        }
        <div className="flex flex-col relative gap-3">
          <label>Post links</label>
          {data.links.map((value, key) => (
            <div key={key} className="border rounded flex ">
              <span className="border-r block  p-1 min-w-1/5 px-1 w-auto max-w-1/2">
                {value.name}
              </span>
              <span className="block flex-1 p-1">{value.url}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setLinkediting(key);
                  setLinkInput({
                    name: value.name,
                    url: value.url,
                  });
                }}
                className="w-8   flex items-center hover:bg-green-500/10 cursor-pointer border-l p-1 "
              >
                <AiOutlineForm className="w-full text-green-500" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeLink(key);
                }}
                className="w-8   flex items-center  hover:bg-red-500/10 cursor-pointer  border-l p-1 "
              >
                <IoRemoveOutline className="w-full text-red-500" />
              </button>
            </div>
          ))}
          <div className="flex ">
            <input
              type="text"
              className="border-b py-1 min-w-1/5 w-auto max-w-1/2  outline-none"
              placeholder="Name"
              value={linkInput.name}
              onChange={(e) => {
                e.preventDefault();
                const updatedInput = { ...linkInput };
                updatedInput.name = e.target.value;
                setLinkInput(updatedInput);
              }}
            />
            <input
              type="text"
              className="border-b ml-1 py-1 flex-1  pr-1  outline-none"
              placeholder="Link"
              value={linkInput.url}
              onChange={(e) => {
                e.preventDefault();
                const updatedInput = { ...linkInput };
                updatedInput.url = e.target.value;
                setLinkInput(updatedInput);
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                if (linkediting === null) {
                  addLink(linkInput);
                } else {
                  editLink(linkInput, linkediting);
                }
              }}
              className="text-2xl p-0.5 border   flex cursor-pointer rounded-t rounded-r  items-center border-amber-400  hover:text-green-700 text-green-500 "
            >
              {linkediting === null ? <IoAdd /> : <MdDone />}
            </button>
          </div>
        </div>

        {
          // Status Part
        }

        <div className="flex flex-col gap-3">
          <label>Status</label>

          <div className="flex gap-3 items-center">
            {statusValues.map((text, index) => (
              <>
                {" "}
                <label
                  key={index}
                  className={`p-2 px-5 border rounded-full flex items-center gap-5 text-sm ${
                    data.status === text.toLowerCase() ? "text-cyan-400" : ""
                  }`}
                  htmlFor={text.toLowerCase()}
                >
                  {text}
                  <span
                    className={`w-[10px] h-[10px] rounded-full block aspect-square ${
                      data.status === text.toLowerCase()
                        ? "bg-cyan-400"
                        : "border"
                    }`}
                  ></span>
                </label>
                <input
                  key={index}
                  type="radio"
                  className="hidden"
                  name="status"
                  id={text.toLowerCase()}
                  onChange={(e) => {
                    console.log(e);
                    changeStatus(e.target.attributes.id.nodeValue);
                  }}
                />
              </>
            ))}
          </div>
        </div>

        {
          // Media Part
        }

        <div className={`flex flex-col gap-3 `}>
          <label>Media</label>
          <div
            className={`flex flex-col  gap-3 ${
              media.length > 0 ? "" : "hidden"
            }`}
          >
            {media.length > 0 ? (
              media.map((file, key) => (
                <div key={key} className="rounded border relative flex">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeImage(key);
                    }}
                    className="absolute top-3 right-3 text-lg bg-red-400 rounded text-gray-900 cursor-pointer hover:bg-red-700 "
                  >
                    <IoClose />
                  </button>
                  <span className="absolute bottom-3 right-3 text-xs opacity-80 rounded  cursor-default  ">
                    {file.file.type} | {parseInt(file.file.size / 1000)}KB
                  </span>
                  <div
                    className={`absolute bottom-1/2 flex  flex-col gap-6 transform-[translateY(50%)] right-3 ${
                      media.length < 2 ? "hidden" : ""
                    }`}
                  >
                    <FaChevronUp
                      onClick={() => {
                        moveImage(key, "up");
                      }}
                      className={`text-cyan-900 hover:text-cyan-500 cursor-pointer ${
                        key === 0 ? "hidden" : ""
                      }`}
                    />
                    <FaChevronDown
                      onClick={() => {
                        moveImage(key, "down");
                      }}
                      className={`text-cyan-900 hover:text-cyan-500 cursor-pointer ${
                        key === media.length - 1 ? "hidden" : ""
                      }`}
                    />
                  </div>
                  <label
                    className="relative cursor-pointer"
                    htmlFor={"image" + key + "change"}
                  >
                    <img
                      className="w-44 rounded border-r aspect-square object-contain"
                      src={URL.createObjectURL(file.file)}
                      alt=""
                    />
                    <span className="w-44  aspect-square flex justify-center items-center text-amber-400/0 hover:text-amber-400/80 text-4xl rounded top-0 absolute  bg-black/0 hover:bg-black/50  z-10">
                      <AiOutlineForm />
                    </span>
                  </label>
                  <input
                    type="file"
                    name=""
                    id={"image" + key + "change"}
                    onChange={(e) => {
                      e.preventDefault();
                      changeImage(key, e.target.files[0]);
                    }}
                    className="hidden"
                  />
                  <div className="flex-1 flex flex-col p-3 justify-center  gap-3">
                    <label>Alt</label>
                    <input
                      type="text"
                      className="border-b w-3/4 py-1  rounded-r  outline-none"
                      placeholder="English alt"
                      value={file.alt.en}
                      onChange={(e) => {
                        e.preventDefault();
                        changeAlt(key, "en", e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="border-b w-3/4 py-1  rounded-r  outline-none"
                      placeholder="Persian alt"
                      value={file.alt.fa}
                      onChange={(e) => {
                        e.preventDefault();
                        changeAlt(key, "fa", e.target.value);
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div
            className={`drop-zone cursor-pointer mx-auto ${
              media.length === MAX_LENGTH ? "hidden" : ""
            }`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div
              className={`w-72 aspect-video text-3xl flex flex-col ${
                isDragActive ? "opacity-100" : "opacity-40"
              } hover:opacity-100 justify-center items-center rounded border `}
            >
              <IoCloudUploadOutline />
              <span className="text-sm">Upload Files</span>
            </div>
          </div>
        </div>

        {
          // Buttons Part
        }

        <div className=" grid grid-cols-2 w-max gap-3 ml-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              setData({
                title: {
                  en: "",
                  fa: "",
                },
                content: {
                  en: "",
                  fa: "",
                },
                seo: "",
                tags: [],
                links: [{ name: "", url: "" }],
                media: [],
                status: "",
              });
              setMedia([]);
            }}
            className="w-full flex justify-center items-center gap-3 px-3 py-1 rounded border text-red-500 hover:bg-red-500/10 cursor-pointer "
          >
            <TbCancel />
            Cancel
          </button>
          <button className="w-fit flex items-center gap-3 px-3 py-1 rounded bg-green-400 text-gray-900 hover:bg-green-800 cursor-pointer ">
            <MdSaveAlt />
            Save Changes
          </button>
        </div>
        
      </form>

      <Toaster />
    </div>
  );
}

export default AddPost;
