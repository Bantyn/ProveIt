import React, { useState } from 'react';
import ContactHero from '../../ContactCom/ContactHero';
import ContactSection from '../../ContactCom/ContactSection';
import FAQ from './FAQ';
import Earth from '../../ContactCom/Earth'
const Contact = () => {
  const [darkMode, setDarkMode] = useState(true);
  const categories = {
    "web-dev": "Web Development",
    "mobile-dev": "Mobile Development",
    "ui-ux": "UI / UX Design",
    copywriting: "Copywriting",
  };

  const faqData = {
    "web-dev": [
      {
        question: "What is web development?",
        answer:
          "Web development is the process of building and maintaining websites using front-end and back-end technologies.",
      },
      {
        question: "What languages are required?",
        answer:
          "HTML, CSS, JavaScript for frontend and Node.js, Python, PHP, or Java for backend.",
      },
    ],
    "mobile-dev": [
      {
        question: "What is mobile development?",
        answer:
          "Mobile development focuses on building applications for Android and iOS devices.",
      },
    ],
    "ui-ux": [
      {
        question: "What is UI/UX?",
        answer:
          "UI focuses on visuals, UX focuses on user experience and usability.",
      },
    ],
    copywriting: [
      {
        question: "What is copywriting?",
        answer:
          "Copywriting is writing persuasive text for marketing and branding purposes.",
      },
    ],
  };
  return (
    <div className={darkMode ? 'dark bg-black' : 'bg-white'}>
      <ContactHero darkMode={darkMode ? 'dark bg-black' : 'bg-white'} />
      <ContactSection darkMode={darkMode} setDarkMode={setDarkMode} />
      <FAQ
        title="Frequently Asked Questions"
        subtitle="Let's answer some questions"
        categories={categories}
        faqData={faqData}
      />

      <Earth />
    </div>
  );
};

export default Contact;