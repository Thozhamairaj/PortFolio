import React from "react";
import { FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  // Smooth scroll function
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="text-white py-8 px-[12vw] md:px-[7vw] lg:px-[20vw]">
      <div className="container mx-auto text-center">
        {/* Name / Logo */}
        <h2 className="text-xl font-semibold text-purple-500">I'm your coding partner - Thozhamairaj</h2>

        {/* Social Media / Contact Icons - Responsive */}
        <div className="flex flex-wrap justify-center space-x-4 mt-6">
          {[
            { icon: <FaInstagram />, link: "https://www.instagram.com/thozhamai._.1434/", label: "Instagram" },
            { icon: <FaPhone />, link: "tel:+919080858198", label: "Phone" },
            { 
              icon: <FaEnvelope />, 
              link: "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=thozhamairaj@gmail.com", 
              label: "Email"
            },
            { 
              icon: <FaMapMarkerAlt />, 
              link: "https://www.google.com/maps/place/MAHALIPPATTY+TEMPLE/@10.7691881,78.3718622,856m/data=!3m1!1e3!4m6!3m5!1s0x3baa4145f4f614dd:0x28976ef2fe4ed7c0!8m2!3d10.7686845!4d78.3749083!16s%2Fg%2F11s5nknq6x?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D",
              label: "Location"
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="text-xl hover:text-purple-500 transition-transform transform hover:scale-110"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Copyright Text */}
        <p className="text-sm text-gray-400 mt-6">
          © 2025 Thozhamairaj . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
