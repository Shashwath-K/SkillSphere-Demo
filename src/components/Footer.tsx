import React from 'react';
// Using react-icons again as in your previous examples
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const socials = [
    { name: 'GitHub', icon: FaGithub, link: 'https://github.com/Shashwath-K' },
    { name: 'LinkedIn', icon: FaLinkedin, link: 'https://linkedin.com' }, // Replace with actual LinkedIn
    { name: 'Twitter', icon: FaTwitter, link: 'https://twitter.com' }, // Replace with actual Twitter
];

const Footer = () => {
  return (
    <footer style={{
      padding: '1.5rem 1rem', // Slightly more padding
      marginTop: '2rem',
      backgroundColor: '#217fb6',
      borderTop: '1px solid #e7e7e7',
      fontSize: '0.875rem',
      color: '#6c757d',
      fontFamily: '"Montserrat", sans-serif' // Added Montserrat font
    }}>
      {/* Social Icons Container */}
      <div style={{
        marginBottom: '1rem', // Space between icons and text
        textAlign: 'center'
      }}>
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              margin: '0 0.75rem', // Adjust spacing
              color: '#f7f7f7', // Darker gray for icons
              fontSize: '1.25rem', // Icon size
              display: 'inline-block', // Needed for margin
              transition: 'color 0.2s ease-in-out', // Smooth hover effect
            }}
            aria-label={social.name}
            onMouseOver={(e) => (e.currentTarget.style.color = '#c0c0bf')} // Blue on hover
            onMouseOut={(e) => (e.currentTarget.style.color = '#f7f7f7')} // Back to gray
          >
            <social.icon />
          </a>
        ))}
      </div>

      {/* Copyright and Credit Container */}
      <div style={{
        textAlign: 'center',
        lineHeight: '1.5' // Improve line spacing
      }}>
        {/* Copyright */}
        <p style={{ margin: '0 0 0.25rem 0', color : '#f6f6f6' }}> {/* Small bottom margin */}
          &copy; {new Date().getFullYear()} SkillSphere. All rights reserved.
        </p>

        {/* Credit Line */}
        <p style={{ fontSize: '0.75rem', margin: 0, color: '#f2f2f2' }}> {/* Smaller font size, no margin */}
          Designed and managed by{' '}
          <a
            href='https://www.github.com/Shashwath-K'
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#f7f7f7', // Blue link color
              fontWeight: '600', // Semi-bold
              textDecoration: 'none', // No underline initially
            }}
            onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            @Shashwath-K
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;