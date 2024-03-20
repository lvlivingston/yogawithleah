import React, { useState, useEffect, useCallback } from 'react';
import backgroundImage from '../../images/new-ocean.png';
import youTubeIcon from '../../images/youtube.png';
import googleIcon from '../../images/google.png';
import instagramIcon from '../../images/instagram.png';
import whatsAppIcon from '../../images/whatsapp.png';
import spotifyIcon from '../../images/spotify.png';
import linkedInIcon from '../../images/linkedin.png';
import gitHubIcon from '../../images/github.png';
import './HomePage.css';

export default function HomePage({ setUser }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const youTubeUrl = 'https://www.youtube.com/@yogawithleah';
  const googleUrl = 'https://calendar.google.com/calendar/u/2?cid=c2VuZG1leW9nYXN0dWZmQGdtYWlsLmNvbQ';
  const instagramUrl = 'https://www.instagram.com/lvlivingston/';
  const whatsAppUrl = 'https://chat.whatsapp.com/BoMhhPeOqgL2MLiEFJ9REM';
  const spotifyUrl = 'https://open.spotify.com/user/1180246227?si=WvPRuD3-T5mi4wO697WSRg';
  const linkedInUrl = 'https://www.linkedin.com/in/livingstonleah/';
  const gitHubUrl = 'https://github.com/lvlivingston';
  
  const handleEmailChange = (event) => { 
    setEmail(event.target.value);
    console.log('Successfully changed the email');
  };

  const handleSubmit = async (event) => {
    console.log('Start of handleSubmit function');
    event.preventDefault();
    console.log('Hit prevent default function');
    try {
      const response = await fetch('https://yogawithleah.vercel.app/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      // const response = await fetch('/routes/api/subscribers', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email }),
      // });
      if (response.ok) {
        setSubmitted(true);
        console.log('Fetched subscribers url and submitted the email');
      } else {
        console.error('Unsuccessful attempt. Try to add your email another time.');
        console.log(response);
      }
    } catch (error) {
      console.error('Error 500: the function did nothing.', error);
    }
  };

  const handleEmailInput = useCallback(() => {
    const getScheduleButton = document.getElementById('getSchedule');
    const emailInput = document.getElementById('email');
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    getScheduleButton.disabled = !isValidEmail;
  }, []);
  console.log('Confirmed the email format');

  useEffect(() => {
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', handleEmailInput);
    return () => {
      emailInput.removeEventListener('input', handleEmailInput);
    };
  }, [handleEmailInput]);

  return (
    <main>
      <div className="header-container">
        <div className="header">
          Yoga with Leah
        </div>
      </div>
      <div className="image-container">
        <img
          src={backgroundImage}
          alt="Background"
          className="image"
        />
      </div>
      <div className="social">
        <h2 className="headline-brown">
        Free Online Classes On YouTube
        </h2>
        <div className="center">
          <a href={youTubeUrl} target="_blank" rel="noopener noreferrer">
            <img src={youTubeIcon} alt="YouTube" className="icon" />
          </a>&nbsp;&nbsp;
          <a href={googleUrl} target="_blank" rel="noopener noreferrer">
            <img src={googleIcon} alt="Google" className="icon" />
          </a>&nbsp;&nbsp;
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="icon" />
          </a>&nbsp;&nbsp;
          <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
            <img src={whatsAppIcon} alt="WhatsApp" className="icon" />
          </a>&nbsp;&nbsp;
          <a href={spotifyUrl} target="_blank" rel="noopener noreferrer">
            <img src={spotifyIcon} alt="Spotify" className="icon" />
          </a>&nbsp;&nbsp;
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            <img src={linkedInIcon} alt="LinkedIn" className="icon" />
          </a>&nbsp;&nbsp;
          <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
            <img src={gitHubIcon} alt="GitHub" className="icon" />
          </a>&nbsp;
        </div>
      </div>
      <div className="padding">
          <h2 className="headline-white">
            Private Lessons Available Upon Request
          </h2>
          <p className="text-white">
            Trained in the birthplace of yoga, Leah received her formal training in Rishikesh, India. 
            She's a 200hr RYT and Yoga Alliance member specialized in Ashtanga, Hatha, and therapeudic practices. 
          </p>
          <div className="center">
            <ul className="bulleted-list">
              <li><span className="letters">Y</span>our health journey starts now</li>
              <li><span className="letters">O</span>pen yourself to holistic health</li>
              <li><span className="letters">G</span>ain control of your mind and body</li>
              <li><span className="letters">A</span>spire to a life of balance</li>
            </ul>
          </div>
      </div>
      <div className="social">
        {submitted ? (
          <>
            <h2 className="headline-brown">
              Awesome... welcome to the tribe!
            </h2>
            <p className="text-brown-center">
              Did you already subscribe to the <br></br><a href="https://calendar.google.com/calendar/u/2?cid=c2VuZG1leW9nYXN0dWZmQGdtYWlsLmNvbQ" target="_blank" rel="noopener noreferrer" className="hyperlink">Google Calendar</a> and <a href="https://chat.whatsapp.com/BoMhhPeOqgL2MLiEFJ9REM" target="_blank" rel="noopener noreferrer" className="hyperlink">WhatsApp Group</a>?
            </p>
          </>
        ) : (
          <>
            <h2 className="headline-brown">
              Sign-Up for Email Updates
            </h2>
            <form action="/subscribers" method="POST" onSubmit={handleSubmit} className="input">
              <label htmlFor="email" className="text-brown">
                See the live class schedule for the upcoming month and get notified of new videos and events!
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
                className="input-text"
                value={email}
                onChange={handleEmailChange} 
              />
              <button id="getSchedule" type="submit" className="button-schedule">
                Get Schedule
              </button>
            </form>
          </>
        )}
      </div>
      <div className="footer">
        <h2 className="footertext-white">+1 (970) 389-6833</h2>
        <h2 className="footertext-white">sendmeyogastuff@gmail.com</h2>
        <p className="footertext-legal">Copyright © 2024 Yoga with Leah - All Rights Reserved</p>
      </div>
    </main>
  );
}
