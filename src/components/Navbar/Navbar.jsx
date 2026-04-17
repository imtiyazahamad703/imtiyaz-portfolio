import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiSend } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll and change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition duration-300 px-[8vw] md:px-[10vw] lg:px-[15vw] ${
        isScrolled ? "bg-[#050414]/50 backdrop-blur-md shadow-md rounded-b-xl py-4" : "bg-transparent py-4"
      }`}
    >
      <div className="text-white flex justify-between items-center w-full max-w-[1600px] mx-auto">
        
        {/* === DESKTOP LAYOUT === */}
        <div className="hidden xl:flex w-full items-center justify-between">
          
          {/* Left: Menu Pill */}
          <div className="flex justify-start flex-1">
            <div className="bg-[#0b061e]/90 border border-gray-800/60 rounded-full p-1.5 flex items-center backdrop-blur-sm shadow-xl">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`px-8 py-2.5 rounded-full text-base font-medium transition-all duration-300 ease-out ${
                    activeSection === item.id || (activeSection === "" && item.id === "about")
                      ? "bg-[#8245ec] text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Socials & Hire Me */}
          <div className="flex items-center justify-end space-x-3 flex-1">
            <a
              href="https://github.com/imtiyazahamad703"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-gray-700/50 bg-[#0d081f]/80 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#df00fe] transition"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/imtiyazahamad703"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-gray-700/50 bg-[#0d081f]/80 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#df00fe] transition"
            >
              <FaLinkedin size={18} />
            </a>
            <a 
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleMenuItemClick("contact"); }}
              className="bg-[#df00fe] hover:bg-[#b500ce] text-white font-semibold py-2 px-5 rounded-full flex items-center space-x-2 transition"
            >
              <FiSend />
              <span>Hire Me</span>
            </a>
          </div>

        </div>

        {/* === MOBILE/TABLET LAYOUT === */}
        <div className="xl:hidden flex justify-end items-center w-full">

          {/* Mobile Menu Icon */}
          <div>
            {isOpen ? (
              <FiX
                className="text-3xl text-[#df00fe] cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <FiMenu
                className="text-3xl text-[#df00fe] cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[90%] bg-[#0b061e] border border-gray-800 bg-opacity-95 backdrop-blur-xl z-50 rounded-2xl shadow-2xl xl:hidden p-6">
          <ul className="flex flex-col items-center space-y-6 text-gray-300 text-lg">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer w-full text-center py-2 rounded-lg transition-colors ${
                  activeSection === item.id ? "bg-[#8245ec] text-white" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <button onClick={() => handleMenuItemClick(item.id)} className="w-full">
                  {item.label}
                </button>
              </li>
            ))}
            
            <div className="flex flex-col items-center space-y-4 pt-4 border-t border-gray-800 w-full">
               <a 
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleMenuItemClick("contact"); }}
                className="bg-[#df00fe] hover:bg-[#b500ce] text-white font-semibold py-3 w-full justify-center rounded-xl flex items-center space-x-2 transition"
              >
                <FiSend />
                <span>Hire Me</span>
              </a>
              <div className="flex space-x-6 pt-2">
                <a
                  href="https://github.com/imtiyazahamad703"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-gray-700 bg-black/30 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#df00fe]"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/imtiyazahamad703"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl border border-gray-700 bg-black/30 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#df00fe]"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
