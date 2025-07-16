import React, { useRef, useState, useEffect } from "react";
import NavBar from "../../components/NavBar";

import { Link } from "react-router-dom";



function AboutSection({element , enabled}) {
  return(
    <div className="min-h-screen ">
      <NavBar name="About Section Manager" url={"/section-manager"} urlName={"Back"} />
      <div className="flex flex-col mt-9  items-center w-full">
        <nav className="flex items-end gap-2">
          <Link to={'/section-manager/about-section'} className={`inline-block rounded-t-2xl border-t border-x  text-amber-400 text-xl transition decoration-1 ease-in-out px-6 pt-3 ${enabled==="main"?"pb-3 bg-amber-400/5":"pb-1"}`}>
            Main
          </Link>
          <Link to={'/section-manager/about-section/skills'} className={`inline-block rounded-t-2xl border-t border-x  text-amber-400 text-xl transition decoration-1 ease-in-out px-6 pt-3 ${enabled==="skills"?"pb-3 bg-amber-400/5":"pb-1"}`}>
            Skills
          </Link>
          <Link to={'/section-manager/about-section/goals'} className={`inline-block rounded-t-2xl border-t border-x  text-amber-400 text-xl transition decoration-1 ease-in-out px-6 pt-3 ${enabled==="goals"?"pb-3 bg-amber-400/5":"pb-1"}`}>
            Goals
          </Link>
          <Link to={'/section-manager/about-section/additional'} className={`inline-block rounded-t-2xl border-t border-x  text-amber-400 text-xl transition decoration-1 ease-in-out px-6 pt-3 ${enabled==="additional"?"pb-3 bg-amber-400/5":"pb-1"}`}>
            additional 
          </Link>
          <Link to={'/section-manager/about-section/works'} className={`inline-block rounded-t-2xl border-t border-x  text-amber-400 text-xl transition decoration-1 ease-in-out px-6 pt-3 ${enabled==="works"?"pb-3 bg-amber-400/5":"pb-1"}`}>
            Works
          </Link>
        </nav>
        <div className="border border-amber-400  w-3xl p-6 rounded-2xl">
          {element}
        </div>
      </div>
    </div>
  )
};

export default AboutSection