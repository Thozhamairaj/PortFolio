// Skills Section Logo's
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';
import bootstrapLogo from './assets/tech_logo/bootstrap.png';
import nodejsLogo from './assets/tech_logo/nodejs.png';
import expressjsLogo from './assets/tech_logo/express.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import mongodbLogo from './assets/tech_logo/mongodb.png';
import javaLogo from './assets/tech_logo/java.png';
import pythonLogo from './assets/tech_logo/python.png';
import gitLogo from './assets/tech_logo/git.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import postmanLogo from './assets/tech_logo/postman.png';
import Numpy from './assets/tech_logo/NumPy.jpg';
import Pandas from './assets/tech_logo/pandas.jpg';
import TensorFlow from './assets/tech_logo/tensorflow.png';
import CV2 from './assets/tech_logo/opencv.png';
import Keras from './assets/tech_logo/keras.jpg';
import Adaptability from './assets/tech_logo/adaptable.png';
import Communication from './assets/tech_logo/communicate.png';
import ProblemSolving from './assets/tech_logo/problem.png';
import QuickLearner from './assets/tech_logo/quick.png';
import Teamwork from './assets/tech_logo/team.png';

// Experience Section Logo's
import SkillCraft from './assets/company_logo/skill.jpeg';
import GenAI from './assets/company_logo/genai.png';

// Education Section Logo's
import GovtLogo from './assets/education_logo/govt.jpeg';
import KonguLogo from './assets/education_logo/Kongu.png';

// Project Section Logo's
import College from './assets/work_logo/college2.png';
import Finance from './assets/work_logo/finance1.jpg';
import weather from './assets/work_logo/weather1.png';
import Donor from './assets/work_logo/donor.jpeg';
import Memory from './assets/work_logo/memory.png';
import KMRL from './assets/work_logo/train.png';


// Certificate Section Logo's
import MERN from './assets/certificate/MERN.jpg';
import Mobile from './assets/certificate/mobile.jpg';
import Oracle from './assets/certificate/oracle.png';
import Responsive from './assets/certificate/resp.png';
import Network from './assets/certificate/demi.png';
import Azure from './assets/certificate/azure.jpg';
import Apex from './assets/certificate/apex.jpg';

export const SkillsInfo = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'React JS', logo: reactjsLogo },
      { name: 'Bootstrap', logo: bootstrapLogo }
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node JS', logo: nodejsLogo },
      { name: 'Express JS', logo: expressjsLogo },
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'MongoDB', logo: mongodbLogo }
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'Java', logo: javaLogo },
      { name: 'Python', logo: pythonLogo },
      { name: 'JavaScript', logo: javascriptLogo }
    ],
  },
  {
    title: 'AI/ML',
    skills: [
      { name: 'Python', logo: pythonLogo },
      {name: 'Numpy', logo: Numpy},
      {name: 'Pandas', logo: Pandas},
      {name: 'TensorFlow', logo: TensorFlow},
      {name: 'CV', logo: CV2},
      {name: 'Keras', logo: Keras}
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', logo: gitLogo },
      { name: 'GitHub', logo: githubLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Postman', logo: postmanLogo }
    ],
  },
  {
    title: 'Others',
    skills: [
      { name: 'Communication', logo: Communication },
      { name: 'Teamwork', logo: Teamwork },
      { name: 'Quick Learner', logo: QuickLearner },
      { name: 'Adaptability', logo: Adaptability },
      { name: 'Problem Solving', logo: ProblemSolving }
    ],
  }
];

  export const experiences = [
    {
      id: 0,
      img: SkillCraft,
      role: "Cybersecurity Internship",
      company: "SkillCraft Technology",
      date: "November 2024 - December 2024",
      desc: "I completed a Cybersecurity internship at SkillCraft Technology, where I gained hands-on experience in various aspects of cybersecurity. During this internship, I worked on real-world projects that involved identifying vulnerabilities, implementing security measures, and understanding the latest trends in cybersecurity.",
      skills: [
        "Encryption Techniques",
        "Decryption Methods",
        "Password Security",
        "Key Logging techniques",
        "Network Security Basics"
      ],
    },
    {
      id: 1,
      img: GenAI,
      role: "AI/ML/Generative AI Internship",
      company: "Generative AI Consortium",
      date: "November 2024 - April 2025 (6 weeks)",
      desc: "I undertook an AI/ML/Generative AI internship at the Generative AI Consortium, where I worked on projects involving artificial intelligence and machine learning. This internship provided me with practical experience in developing AI models, understanding generative algorithms, and applying machine learning techniques to solve complex problems.",
      skills: [
        "ML Algorithms",
        "Generative AI Models",
        "Data Preprocessing",
        "Model Training and Evaluation",
        "Python Programming"
      ]
        
    }
    
  ];
  
  export const education = [
    {
      id: 0,
      img: KonguLogo,
      school: "Kongu Engineering College, Erode",
      date: "2023 - 2027",
      grade: "8.48 CGPA",
      desc: "I am currently pursuing my Bachelor's degree in Artificial Intelligence and Machine Learning (B.Tech - AIML) at Kongu Engineering College. My coursework includes subjects such as Data Structures and Algorithms, Database Management Systems, Web Development, Machine Learning, and Artificial Intelligence. I have been actively involved in various projects and hackathons that have allowed me to apply theoretical knowledge to practical scenarios, enhancing my problem-solving skills and technical expertise.",
      degree: "BTech - AIML (Artificial Intelligence & Machine Learning)",
    },
    {
      id: 1,
      img: GovtLogo,
      school: "Government Higher Secondary School, Thogaimalai",
      date: "2021 - 2023",
      grade: "88.8%",
      desc: "I completed my class 11 & 12 education from Government Higher Secondary School, Thogaimalai, under the Tamil Nadu State Board, where I studied Physics, Chemistry, Mathematics, and Biology (PCMB).",
      degree: "BioMaths",
    },
    {
      id: 2,
      img: GovtLogo,
      school: "Government High School, Udaiyapatty",
      date: "2019 - 2021",
      grade: "93%",
      desc: "I completed my class 9 & 10 education from Government High School, Udaiyapatty, under the Tamil Nadu State Board.",
    }
  ];
  
  export const projects = [
    {
      id: 0,
      title: " Recommends Personalized College Options for Counselling Student",
      description:
        "A React.js-based web application that helps students find suitable college options based on their preferences and academic profiles. The app allows users to input their interests, location, budget, and academic scores to receive personalized college recommendations. It features an intuitive user interface, real-time search capabilities, and detailed college profiles to assist students in making informed decisions about their higher education.",
      image: College,
      tags: ["React", "CSS", "Python", "ML", "Node.js", "MongoDB"],
      github: "https://github.com/SUBITCHAKALAKSHMI-A/CounselHive",
      // webapp: "https://githubprofiledetective.netlify.app/",
    },
    {
      id: 1,
      title: "Financial Aid and Development Support System",
      description:
        "A comprehensive financial aid web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform enables users to apply for financial assistance, track their application status, and access various support services. The application features a user-friendly interface, secure authentication, and an admin panel for managing applications and disbursing funds efficiently.",
      image: Finance,
      tags: ["React", "JavaScript", "CSS", "Node.js", "Python", "MongoDB"],
      github: "https://github.com/premkumark2005/Finance_Assistant",
      webapp: "https://welth-ruddy.vercel.app/",
    },
    {
      id: 2,
      title: "Weather prediction App",
      description:
        "A dynamic weather application built with React.js that provides real-time weather updates for any location worldwide. Users can search for cities to get current weather conditions, forecasts, and other meteorological data presented in an intuitive and visually appealing interface.",
      image: weather,
      tags: ["React", "CSS", "Weather API", "Node.js", "MongoDB"],
      github: "https://github.com/Thozhamairaj/Weather_Part2",
      webapp: "https://ourprediction.netlify.app/",
    },
    {
      id: 3,
      title: "Blood Donor Connect",
      description:
        "Blood Donor Connect is a web application designed to facilitate the connection between blood donors and recipients in need. Built using HTML, JavaScript, Node.js, MongoDB, and CSS, the platform allows users to register as donors, search for available blood types, and request donations. The application features a user-friendly interface, secure data management, and real-time notifications to ensure timely communication between donors and recipients.",
      image: Donor,
      tags: ["HTML", "JavaScript", "Node.js", "MongoDB", "CSS"],
      github: "https://github.com/premkumark2005/blood_donor",
      // webapp: "https://blooddonorconnect.netlify.app/",
    },
    {
      id: 4,
      title: "Digital Memory Vault",
      description:
        "The Digital Memory Vault is a secure web application that allows users to store and manage their personal memories, such as photos, videos, and notes. Built using HTML, JavaScript, Node.js, MongoDB, and CSS, the platform provides a user-friendly interface for uploading and organizing memories. It features robust security measures to ensure that users' data remains private and protected.",
      image: Memory,
      tags: ["React", "Python", "Node.js", "FastAPI","PostgreSQL", "CSS"],
      github: "https://github.com/Pramodk2006/notee",
      // webapp: "https://digitalmemoryvault.netlify.app/",
    },
    {
      id: 5,
      title: "AI-Driven Train Induction Planning & Scheduling for Kochi Metro Rail Limited (KMRL)",
      description:
        "An AI-powered system designed to optimize train induction planning and scheduling for Kochi Metro Rail Limited (KMRL). The system utilizes machine learning algorithms to analyze passenger flow, peak hours, and operational constraints to create efficient train schedules. This project aims to enhance the overall efficiency of metro operations, reduce wait times, and improve passenger satisfaction through intelligent scheduling solutions.",
      image: KMRL,
      tags: ["Python", "Machine Learning", "Data Analysis","AI"],
      github: "https://github.com/Pramodk2006/KMRL",
      // webapp: "https://kmrl-ai-scheduler.netlify.app/",
    }
     ];
     
     export const certificates = [
      {
        id: 0,
        title: "MERN Stack Development",
        image: MERN, // add path if you have an image, e.g. import cert1 from './assets/certs/cert1.png'
      },
      {
        id: 1,
        title: "Oracle Apex Cloud Developer",
        image: Apex, // add path if you have an image, e.g. import cert2 from './assets/certs/cert2.png'
      },
      {
        id: 2,
        title: "Azure AI Engineer Associate",
        image: Azure, // add path if you have an image, e.g. import cert3 from './assets/certs/cert3.png'
      },{
        id: 3,
        title: "Demistifying Network (DMN)",
        image: Network, // add path if you have an image, e.g. import cert4 from './assets/certs/cert4.png'
      },{
        id: 4,
        title: "AI Foundations Associate",
        image: Oracle,
         // add path if you have an image, e.g. import cert5 from './assets/certs/cert5.png'
      },{
        id: 5,
        title: "Responsible & Safe AI Systems",
        image: Responsive,
         // add path if you have an image, e.g. import cert6 from './assets/certs/cert6.png'
      },{
        id: 6,
        title: "Mobile Application Development",
        image: Mobile, // add path if you have an image, e.g. import cert7 from './assets/certs/cert7.png'
      }
    ];