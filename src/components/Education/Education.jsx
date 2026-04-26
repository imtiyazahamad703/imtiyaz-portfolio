import React from "react";
import { education } from "../../constants"; // Import the education data

const Education = () => {
  return (
    <section
      id="education"
      className="py-20 md:py-32 px-[8vw] md:px-[10vw] lg:px-[15vw] font-sans bg-skills-gradient clip-path-custom-3"
    >
      {/* Section Title */}
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">EDUCATION</h2>
        <div className="w-24 h-1 bg-purple-500 mx-auto mt-6"></div>
        <p className="text-gray-400 mt-6 text-lg font-semibold">
          My education has been a journey of learning and development. Here are the details of my academic background
        </p>
      </div>

      {/* Education Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 lg:left-1/2 transform -translate-x-1/2 w-1 bg-white h-full"></div>

        {/* Education Entries */}
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className={`flex flex-row items-center w-full mb-16 relative ${
              index % 2 === 0 ? "lg:justify-end" : "lg:justify-start"
            }`}
          >
            {/* Timeline Circle */}
            <a
              href={edu.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-0 lg:left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-[#8245ec] w-12 h-12 lg:w-16 lg:h-16 rounded-full flex justify-center items-center z-10 overflow-hidden cursor-pointer hover:scale-125 transition-transform duration-300"
            >
              <img
                src={edu.img}
                alt={edu.school}
                className={`w-full h-full object-contain ${edu.id === 1 ? 'scale-[2.5]' : 'p-1'}`}
              />
            </a>

            {/* Content Section */}
            <div
              className={`w-full lg:w-[calc(50%-3rem)] p-6 pl-12 lg:p-10 rounded-3xl shadow-2xl border border-white/10 bg-gray-900/80 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] transform transition-transform duration-300 hover:scale-[1.02]`}
            >
              {/* Flex container for image and text */}
              <div className="flex items-center space-x-6">
                {/* School Logo/Image */}
                <a
                  href={edu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-24 h-16 bg-white rounded-md overflow-hidden flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <img
                    src={edu.img}
                    alt={edu.school}
                    className={`w-full h-full object-contain ${edu.id === 1 ? 'scale-[2.5]' : 'p-1'}`}
                  />
                </a>

                {/* Degree, School Name, and Date */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-xl font-semibold text-white">
                      {edu.degree}
                    </h3>
                    <h4 className="text-md sm:text-sm text-gray-300">
                      {edu.school}
                    </h4>
                  </div>
                  {/* Date at the bottom */}
                  <p className="text-sm text-gray-500 mt-2">{edu.date}</p>
                </div>
              </div>

              <p className="mt-6 text-gray-400 font-bold">Grade: {edu.grade}</p>
              <p className="mt-4 text-gray-300 text-justify leading-relaxed text-sm sm:text-base">{edu.desc}</p>
              {edu.board && (
                <p className="mt-4 text-gray-300 text-left leading-relaxed text-sm sm:text-base">
                  <span className="font-bold text-gray-400">Board:</span> {edu.board}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
