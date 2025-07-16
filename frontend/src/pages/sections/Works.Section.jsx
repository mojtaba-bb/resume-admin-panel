import React from "react";
import NavBar from "../../components/NavBar";
import { IoClose } from "react-icons/io5";
import { MdOutlinePermMedia } from "react-icons/md";
function WorksSection() {
  const postList = [ 
    { media: null, title: "1", content: "", status: "" },
    { media: null, title: "1", content: "", status: "" },
    { media: null, title: "1", content: "", status: "" },
    { media: null, title: "1", content: "", status: "" },
    { media: null, title: "1", content: "", status: "" }
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar
        name={"Works Section Manager"}
        secoundUrl={"/content-manager/posts/add-post"}
        secoundUrlName={"Add Post"}
        classNameSecoundUrl={"text-cyan-400 hover:bg-cyan-400/5"}
        urlName={"Back"}
        url={"/section-manager"}
        className={""}
        classN={""}
      />
      <div className="flex-1 flex">
        <div className="min-w-52 w-1/4 border-amber-400 bg-black/15 flex justify-center flex-col border-r">
          <form className="  my-6 text-amber-400 flex justify-center p-3 flex-col  gap-3">
            <label>Page title</label>
            <input
              type="text"
              className="border  p-3 rounded   outline-none"
              placeholder="English Title"
            />
            <input
              type="text"
              className="border p-3 rounded  outline-none"
              placeholder="Persian Title"
            />
            <div className="flex flex-wrap max-h-56 gap-1">
              <span className="text-xs p-3 py-2 gap-3 text-gray-600 hover:text-red-600 cursor-pointer h-fit flex items-center justify-center  rounded-2xl border">
                post 1
                <IoClose />
              </span>
            </div>
          </form>
        </div>
        <div className="flex flex-col flex-1">
          <table className="text-amber-400 ">
            
              <tr className=" font-normal  border-b border-amber-400/35 bg-gray-950">
                <th className="w-20 border-r border-amber-400/35"></th>
                <th className="font-normal w-1/5 min-w-28 border-r border-amber-400/35 py-3">Title</th>
                <th className="font-normal truncate border-r border-amber-400/35">Content</th>
                <th className="font-normal border-r w-40 border-amber-400/35">Status</th>
                <th className="font-normal w-20 ">Add</th>
              </tr>
            
            
              {postList.map((post, index) => (
                <tr  className="border-b hover:bg-black/20 border-amber-400/35">
                  <td className="p-1 border-r border-amber-400/35">
                    {post.media ? (
                      ""
                    ) : (
                      <div
                        className={`w-18 text-gray-100 flex justify-center items-center aspect-square rounded ${
                          post.media ? "" : "bg-gray-600"
                        }`}
                      >
                        <MdOutlinePermMedia />
                      </div>
                    )}
                  </td>
                  <td className="border-r px-1 cursor-default border-amber-400/35">{post.title}</td>
                  <td className="border-r px-1 cursor-default border-amber-400/35">{post.content}</td>
                  <td className="border-r px-1 cursor-default border-amber-400/35">{post.status}</td>
                  <td className=" cursor-pointer ">
                    <div className="flex justify-center items-center">
                      <span className=" w-5 h-5 flex justify-center items-center rounded border ">
                        <span className="block w-3 h-3 rounded bg-amber-600"/>
                      </span>
                    </div>

                    
                  </td>
                </tr>
              ))}
            
          </table>
        </div>
      </div>
    </div>
  );
}

export default WorksSection;
