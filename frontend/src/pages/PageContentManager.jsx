import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome, FaUserAlt, FaQuoteRight,
  FaProjectDiagram, FaEnvelope, FaTools
} from 'react-icons/fa';

const sections = [
  { name: "Home", icon: <FaHome />, path: "/section-manager/home-section" },
  { name: "About", icon: <FaUserAlt />, path: "/section-manager/about-section" },
  { name: "Quote", icon: <FaQuoteRight />, path: "/section-manager/quote-section" },
  { name: "Works", icon: <FaProjectDiagram />, path: "/section-manager/works-section" },
  { name: "Contact", icon: <FaEnvelope />, path: "/section-manager/contact-section" },
  { name: "Footer", icon: <FaTools />,inactive:true, path: "/section-manager/footer-section" },
];

function PageContentManager() {
  return (
    <div className="w-full h-full min-h-screen  text-white">
      {/* navbar */}
      <nav className="h-1/12 flex px-15  justify-between items-center border-b border-white text-center mb-10">
        <span className="text-white text-2xl font-bold">Site Sections Manager</span>
        <Link
          to="/"
          className="mt-2 inline-block px-6 py-1 border border-cyan-400 text-white rounded-full hover:bg-cyan-500/20  transition"
        >
          Home
        </Link>
      </nav>

      {/* grid cards */}
      <div className="flex justify-center">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ name, icon, path ,inactive }) => (
            inactive?            <span
              key={name}
              
              className="w-72 h-72 bg-gray-800   rounded-2xl relative  flex flex-col items-center justify-center transition-all duration-300 group"
            > 
              <div className='w-full h-full absolute bg-black/60 rounded-2xl'>

              </div>
              <div className="text-5xl text-cyan-400 ">{icon}</div>
              <span className="mt-4 text-xl font-semibold ">{name}</span>
            </span>:
            <Link
              key={name}
              to={path}
              className="w-72 h-72 bg-gray-800 rounded-2xl shadow-lg hover:shadow-cyan-500/30 hover:bg-cyan-700/10 flex flex-col items-center justify-center transition-all duration-300 group"
            >
              <div className="text-5xl text-cyan-400 group-hover:text-cyan-200">{icon}</div>
              <span className="mt-4 text-xl font-semibold group-hover:text-white">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageContentManager;
