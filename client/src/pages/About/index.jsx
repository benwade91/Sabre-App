import React from 'react';
import github from './images/github.png';
import linkedin from './images/linkedin.png';
import './style.css'

const About = () => {
  return (
    <div className="aboutSection">
      <h2>About...</h2>
      <p>This app was created by Ben Wade!</p>
      <a href="https://www.linkedin.com/in/ben-wade-6abb621b7/">
        <img
          src={linkedin}
          alt="linkedIn"
          className="socialPng"
        />
        LinkedIn
      </a>
      <a href="https://github.com/benwade91">
        <img
          src={github}
          alt="GitHub"
          className="socialPng"
        />
        GitHub
      </a>
    </div>
  )
}
export default About
