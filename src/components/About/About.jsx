import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Tilt from 'react-parallax-tilt';
import profileImage from '../../assets/profile2.png';
import CharacterModel from '../Character';

const About = () => {
  return (
    <section
      id="about"
      className="pb-20 pt-6 md:py-32 px-[8vw] md:px-[4vw] lg:px-[8vw] xl:px-[15vw] font-sans scroll-mt-20 md:scroll-mt-24 min-h-[70vh]"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center">
        {/* Left Side */}
        <div className="md:w-[45%] text-center md:text-left mt-12 md:mt-0 md:pr-8 lg:pr-16">
          {/* Greeting */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
            Hi, I am
          </h1>
          {/* Name */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Imtiyaz Ahamad
          </h2>
          {/* Skills Heading with Typing Effect */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#8245ec] leading-tight">
            <span className="text-white">I am a </span>
            <ReactTypingEffect
              text={[
                'AI Engineer',
                'AI Full-Stack Engineer',
              ]}
              speed={100}
              eraseSpeed={50}
              typingDelay={500}
              eraseDelay={2000}
              cursorRenderer={(cursor) => (
                <span className="text-[#8245ec]">{cursor}</span>
              )}
            />
          </h3>
          {/* About Me Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 mt-8 leading-relaxed md:leading-loose text-justify">
            Full-Stack Software Engineer with expertise in building scalable microservices, event driven backends, and high-performance web applications. Skilled in modern frameworks (NestJs, NextJs, ReactJs) and leveraging LLMs, RAG pipelines, and WebRTC to deliver enterprise-grade applications.
          </p>
          {/* Resume Button */}
          <a
            href="/extra-data/Imtiyaz_Ahamad_AI_Engineer.pdf"
            download="Imtiyaz_Ahamad_AI_Engineer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white py-3 px-8 rounded-full mt-5 text-lg font-bold transition duration-300 transform hover:scale-105"
            style={{
              background: 'linear-gradient(90deg, #8245ec, #a855f7)',
              boxShadow: '0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec',
            }}
          >
            DOWNLOAD CV
          </a>

        </div>
        {/* Right Side */}
        <div className="w-full md:w-[60%] flex justify-center md:justify-end h-[480px] md:h-[650px] md:-mt-16">
          <CharacterModel />
        </div>
      </div>
    </section>
  );
};

export default About;
