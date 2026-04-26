import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_guw7w5b", // Imtiyaz's EmailJS Service ID
        "template_d7d00bo", // Imtiyaz's EmailJS Template ID
        form.current,
        "cDpAN3cTIyHo04PwZ" // Imtiyaz's EmailJS Public Key
      )
      .then(
        () => {
          setIsSending(false);
          form.current.reset(); // Reset form fields after sending
          toast.success("Message sent successfully! 🚀", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        },
        (error) => {
          console.error("Error sending message:", error);
          setIsSending(false);
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center py-24 px-[6vw] md:px-[10vw] lg:px-[15vw] overflow-hidden"
    >
      <ToastContainer />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8245ec] opacity-[0.15] blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">
          Get In Touch
        </h2>
        <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-6"></div>
      </div>

      {/* Contact Container */}
      <div className="relative z-10 w-full max-w-5xl bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Contact Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Let's <span className="text-[#8245ec]">work together!</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I'm always open to discussing product design work, new tech stack architectures, or exciting partnership opportunities.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#8245ec] group-hover:border-[#8245ec] transition-all duration-300">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-white font-semibold">imtiyazahamad703@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#8245ec] group-hover:border-[#8245ec] transition-all duration-300">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Phone</p>
                  <p className="text-white font-semibold">+91 70391 65313</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#8245ec] group-hover:border-[#8245ec] transition-all duration-300">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="text-white font-semibold">Thane, Maharashtra</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-5">
              
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="John Doe"
                  required
                  className="w-full p-3.5 rounded-xl bg-white/5 text-white border border-white/10 focus:outline-none focus:border-[#8245ec] focus:bg-white/10 transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-400 mb-2">Your Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="john@example.com"
                  required
                  className="w-full p-3.5 rounded-xl bg-white/5 text-white border border-white/10 focus:outline-none focus:border-[#8245ec] focus:bg-white/10 transition-all duration-300"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Job Opportunity / Freelance Project"
                  required
                  className="w-full p-3.5 rounded-xl bg-white/5 text-white border border-white/10 focus:outline-none focus:border-[#8245ec] focus:bg-white/10 transition-all duration-300"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-400 mb-2">Your Message</label>
                <textarea
                  name="message"
                  placeholder="Hi Imtiyaz, I would like to..."
                  rows="4"
                  required
                  className="w-full p-3.5 rounded-xl bg-white/5 text-white border border-white/10 focus:outline-none focus:border-[#8245ec] focus:bg-white/10 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className={`w-full py-4 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 
                  ${isSending 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#5922b9] to-[#8245ec] hover:scale-[1.02] shadow-[0_0_20px_rgba(130,69,236,0.4)] hover:shadow-[0_0_30px_rgba(130,69,236,0.6)]'
                  }`}
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
