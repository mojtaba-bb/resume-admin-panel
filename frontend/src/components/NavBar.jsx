import React from "react";
import { Link } from "react-router-dom";
function NavBar({ name, url, secoundUrl , secoundUrlName , urlName ,className ,classN , classNameSecoundUrl ,classNameSecoundUrlHover}) {
  
  return (
    <nav className={`h-18 flex px-10 py-4 w-full justify-between items-center border-b text-amber-400 ${className}`}>
      <span className=" text-2xl font-bold cursor-default">{name}</span>
      
      {secoundUrl ? (
        <div className="flex items-center gap-3">
          <Link
          to={secoundUrl}
          className={`px-5 py-1 border   rounded-full hover:bg-amber-500/10 transition ${classNameSecoundUrl}`}
        >
          {secoundUrlName}
        </Link>
          <Link
          to={url}
          className={`px-5 py-1 border   rounded-full hover:bg-amber-500/10 transition ${classN}`}
        >
          {urlName}
        </Link>

        </div>
      ) : url ? (
                <Link
          to={url}
          className={`px-5 py-1 border   rounded-full hover:bg-amber-500/10 transition ${classN}`}
        >
          {urlName}
        </Link>
      ):""
    }
    </nav>
  );
}

export default NavBar;
