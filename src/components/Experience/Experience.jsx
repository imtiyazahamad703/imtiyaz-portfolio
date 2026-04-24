import React from "react";
import { experiences } from "../../constants"; // Import your data

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-20 md:py-32 px-[8vw] md:px-[10vw] lg:px-[15vw] font-sans bg-skills-gradient clip-path-custom-2"
    >
      {/* Section Title */}
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">EXPERIENCE</h2>
        <div className="w-24 h-1 bg-purple-500 mx-auto mt-6"></div>
        <p className="text-gray-400 mt-6 text-lg font-semibold">
          A collection of my work experience and the roles I have taken in
          various organizations
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 lg:left-1/2 transform -translate-x-1/2 w-1 bg-white h-full"></div>

        {/* Experience Entries */}
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className={`flex flex-row items-center w-full mb-16 relative ${
              index % 2 === 0 ? "lg:justify-end" : "lg:justify-start"
            }`}
          >
            {/* Timeline Circle */}
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-0 lg:left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 border-4 border-[#8245ec] w-12 h-12 lg:w-16 lg:h-16 rounded-full flex justify-center items-center z-10 cursor-pointer hover:scale-125 transition-transform duration-300"
            >
              <img
                src={experience.img}
                alt={experience.company}
                className="w-full h-full object-contain bg-white rounded-full p-1"
              />
            </a>

            {/* Content Section */}
            <div
              className={`w-full lg:w-[calc(50%-3rem)] p-6 pl-12 lg:p-10 rounded-3xl shadow-2xl border border-white/10 bg-gray-900/80 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] transform transition-transform duration-300 hover:scale-[1.02]`}
            >
              {/* Flex container for image and text */}
              <div className="flex items-center space-x-6">
                {/* Company Logo/Image */}
                <a
                  href={experience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 h-16 bg-white rounded-md overflow-hidden flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <img
                    src={experience.img}
                    alt={experience.company}
                    className="w-full h-full object-contain p-1"
                  />
                </a>

                {/* Role, Company Name, and Date */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                      {experience.role}
                    </h3>
                    <h4 className="text-md sm:text-sm text-gray-300">
                      {experience.company}
                    </h4>
                  </div>
                  {/* Date at the bottom */}
                  <p className="text-sm text-gray-500 mt-2">{experience.date}</p>
                </div>
              </div>

              <p className="mt-6 text-gray-300 text-justify leading-relaxed text-sm sm:text-base">{experience.desc}</p>
              <div className="mt-6">
                <h5 className="font-semibold text-white mb-3">Skills:</h5>
                <ul className="flex flex-wrap mt-2">
                  {experience.skills.map((skill, index) => (
                    <li
                      key={index}
                      className="bg-[#8245ec] text-gray-300 px-4 py-1 text-xs sm:text-sm rounded-lg mr-2 mb-2 border border-gray-400"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certificate Button */}
              {experience.certificateLink && (
                <div className="mt-6">
                  <a
                    href={experience.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800/80 hover:bg-[#8245ec] text-gray-300 hover:text-white border border-gray-600 hover:border-[#8245ec] rounded-xl text-sm font-medium transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Certificate
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
