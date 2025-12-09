import React, { useState, useEffect, useRef } from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Tilt from 'react-parallax-tilt';
import myPhoto from "./myPhoto.jpg";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://portfolio-pkl4.onrender.com/';

const About = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const userKeyRef = useRef(null);

  useEffect(() => {
    // initialize user key once
    let stored = localStorage.getItem('userKey');
    if (!stored) {
      stored = uuidv4();
      localStorage.setItem('userKey', stored);
    }
    userKeyRef.current = stored;

    const userLiked = localStorage.getItem('userLiked') === 'true';
    const userDisliked = localStorage.getItem('userDisliked') === 'true';
    setLiked(userLiked);
    setDisliked(userDisliked);

    // Fetch counts from backend
    axios
      .get(`${API_URL}likes`, { headers: { 'x-user-key': stored } })
      .then((res) => {
        setLikeCount(res.data.likes);
        setDislikeCount(res.data.dislikes);
      })
      .catch((err) => console.error('Error fetching likes:', err));
  }, []);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    const userKey = userKeyRef.current;
    try {
      if (liked) {
        const res = await axios.post(`${API_URL}unlike`, {}, { headers: { 'x-user-key': userKey } });
        setLikeCount(res.data.likes);
        setLiked(false);
        localStorage.setItem('userLiked', 'false');
      } else {
        const res = await axios.post(`${API_URL}like`, {}, { headers: { 'x-user-key': userKey } });
        setLikeCount(res.data.likes);
        setLiked(true);
        localStorage.setItem('userLiked', 'true');

        if (disliked) {
          const disRes = await axios.post(`${API_URL}undislike`, {}, { headers: { 'x-user-key': userKey } });
          setDislikeCount(disRes.data.dislikes);
          setDisliked(false);
          localStorage.setItem('userDisliked', 'false');
        }
      }
    } catch (err) {
      console.error('Error with like action:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async () => {
    if (loading) return;
    setLoading(true);
    const userKey = userKeyRef.current;
    try {
      if (disliked) {
        const res = await axios.post(`${API_URL}undislike`, {}, { headers: { 'x-user-key': userKey } });
        setDislikeCount(res.data.dislikes);
        setDisliked(false);
        localStorage.setItem('userDisliked', 'false');
      } else {
        const res = await axios.post(`${API_URL}dislike`, {}, { headers: { 'x-user-key': userKey } });
        setDislikeCount(res.data.dislikes);
        setDisliked(true);
        localStorage.setItem('userDisliked', 'true');

        if (liked) {
          const liRes = await axios.post(`${API_URL}unlike`, {}, { headers: { 'x-user-key': userKey } });
          setLikeCount(liRes.data.likes);
          setLiked(false);
          localStorage.setItem('userLiked', 'false');
        }
      }
    } catch (err) {
      console.error('Error disliking:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="about"
      className="py-4 px-[7vw] md:px-[7vw] lg:px-[20vw] font-sans mt-16 md:mt-24 lg:mt-32"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center">
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          {/* Greeting */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
            Hi, I am
          </h1>
          {/* Name */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Thozhamairaj
          </h2>
          {/* Skills Heading with Typing Effect */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#8245ec] leading-tight">
            <ReactTypingEffect
              text={[
                'a Web Developer',
                'an AI Engineer',
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
          <p className="text-base sm:text-lg md:text-lg text-gray-400 mb-10 mt-8 leading-relaxed">
            Aspiring AI Engineer & Web Developer seeking an opportunity to
            apply skills in machine learning, full-stack development, and
            problem-solving to build impactful, scalable solutions in a growth-
            focused organization.
          </p>
          
          {/* Buttons Container */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center mt-5">
            {/* Resume Button */}
            <a
              href="https://drive.google.com/uc?export=download&id=1bram5c1YS3EZrwqOvCsauV7akGQ31ciN"
              download="Thozhamairaj_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white py-3 px-8 rounded-full text-lg font-bold transition duration-300 transform hover:scale-105"
              style={{
                background: 'linear-gradient(90deg, #8245ec, #a855f7)',
                boxShadow: '0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec',
              }}
            >
              DOWNLOAD RESUME
            </a>

            {/* Like Button */}
            <button
              onClick={handleLike}
              disabled={loading}
              className={`flex items-center gap-2 p-3 px-4 rounded-full transition duration-300 transform hover:scale-110 ${
                liked ? 'bg-purple-600' : 'bg-gray-700'
              } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {liked ? (
                <AiFillLike className="text-white text-2xl" />
              ) : (
                <AiOutlineLike className="text-white text-2xl" />
              )}
              <span className="text-white font-semibold">{likeCount}</span>
            </button>

            {/* Dislike Button */}
            <button
              onClick={handleDislike}
              disabled={loading}
              className={`flex items-center gap-2 p-3 px-4 rounded-full transition duration-300 transform hover:scale-110 ${
                disliked ? 'bg-red-600' : 'bg-gray-700'
              } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {disliked ? (
                <AiFillDislike className="text-white text-2xl" />
              ) : (
                <AiOutlineDislike className="text-white text-2xl" />
              )}
              <span className="text-white font-semibold">{dislikeCount}</span>
            </button>
          </div>
        </div>
        {/* Right Side - Photo */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Tilt
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 border-4 border-purple-700 rounded-full"
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <img
              src={myPhoto}
              alt="Thozhamairaj"
              className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]"
            />
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default About;
