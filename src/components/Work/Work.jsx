import React from "react";
import { projects } from "../../constants";

const Work = () => {
  return (
    <section id="work" className="py-20 md:py-32 px-[8vw] md:px-[10vw] lg:px-[15vw] font-sans relative z-10">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">Projects</h2>
        <div className="w-24 h-1 bg-purple-500 mx-auto mt-6"></div>
      </div>

      <div className="flex flex-col gap-12 relative pb-[10vh]">
        {projects.map((project, index) => {
          const formattedId = (index + 1).toString().padStart(2, '0');
          
          return (
            <div 
              key={project.id} 
              className="scroll-stack-card w-full bg-[#080517] border border-purple-500/20 overflow-hidden p-6 md:p-12 lg:p-16 shadow-[0_-15px_40px_rgba(0,0,0,0.6)]"
              style={{
                '--card-top': `${15 + (index * 2)}vh`,
                zIndex: index,
              }}
            >
              <div className="content-grid">
                {/* Left Side: Content */}
                <div className="flex flex-col justify-between h-full card-top-row">
                  <div>
                    <div className="id-brand-group mb-6">
                      <span className="huge-number font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-800 mr-3 md:mr-4 align-baseline">
                        {formattedId}.
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight inline align-baseline">
                        {project.title}
                      </h3>
                    </div>
                    
                    <div className="project-description text-gray-300 text-lg md:text-xl leading-relaxed mb-8 md:pr-8">
                      <p className="text-justify">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-10">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-purple-900/30 border border-purple-500/30 text-purple-200 text-sm font-semibold rounded-full px-4 py-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-row flex-nowrap gap-4 lg:gap-6 items-center mt-auto live-btn-star">
                    {project.webapp && (
                      <a href={project.webapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all shadow-[0_0_15px_rgba(130,69,236,0.4)] hover:shadow-[0_0_25px_rgba(130,69,236,0.6)] hover:-translate-y-1 whitespace-nowrap">
                        View Live
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white underline underline-offset-8 decoration-purple-500 decoration-2 transition-colors font-semibold text-base lg:text-lg flex items-center gap-1.5 lg:gap-2 whitespace-nowrap">
                        View Code
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 lg:w-5 lg:h-5 shrink-0 text-purple-500">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Side: Image */}
                <div className="flex items-center justify-center">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`main-image w-full h-auto aspect-video md:aspect-auto md:h-[350px] lg:h-[400px] object-cover rounded-3xl shadow-xl border border-white/5 ${project.id === 1 ? 'object-[15%_center]' : project.id === 3 ? 'object-top' : 'object-center'}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Work;
