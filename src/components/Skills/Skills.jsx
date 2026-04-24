// src/components/Skills/Skills.jsx
import React from "react";
import { SkillsInfo } from "../../constants";
import Tilt from "react-parallax-tilt";

const Skills = () => (
  <section
    id="skills"
    className="py-20 md:py-32 px-[8vw] md:px-[10vw] lg:px-[15vw] font-sans bg-skills-gradient clip-path-custom"
  >
    {/* Section Title */}
    <div className="text-center mb-16 md:mb-24">
      <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">SKILLS</h2>
      <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-6"></div>
      <p className="text-gray-400 mt-6 text-lg font-semibold">
      A collection of my technical skills and expertise honed through various projects and experiences
      </p>
    </div>

    {/* Skill Categories */}
    <div className="flex flex-wrap gap-1 lg:gap-5 py-10 justify-between">
      {SkillsInfo.map((category) => (
        <div
          key={category.title}
          className="bg-gray-900/80 backdrop-blur-md px-6 sm:px-10 py-8 sm:py-10 mb-10 w-full sm:w-[48%] rounded-3xl border border-white/10 
          shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] hover:shadow-[0_0_25px_2px_rgba(130,69,236,0.5)] transition-shadow duration-300"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
            {category.title}
          </h3>

          {/* Skill Items - 3 per row on larger screens */}
          <Tilt
            key={category.title}
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <div className="flex flex-wrap justify-center gap-3 w-full">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-center space-x-2 bg-transparent border-2 border-gray-700 rounded-3xl py-2 px-3 sm:px-4 text-center"
                >
                  <img
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                  <span className="text-xs sm:text-sm text-gray-300">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </Tilt>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
