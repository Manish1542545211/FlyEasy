// Course Topic 1-6: HTML5 Semantic Structure (<footer>, <article>, <section>)

import React from 'react';
import { Plane, Award, User, Mail, Phone, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const teamMembers = [
    { name: 'Angad', email: 'angad@chitkara.edu.in', phone: '+91 98765 01001' },
    { name: 'Manish', email: 'manish@chitkara.edu.in', phone: '+91 98765 01002' },
    { name: 'Neeraj', email: 'neeraj@chitkara.edu.in', phone: '+91 98765 01003' },
    { name: 'Pranav', email: 'pranav@chitkara.edu.in', phone: '+91 98765 01004' },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-container">
          {/* Brand & University Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <Plane className="logo-icon" />
              <span>FlyEasy</span>
            </div>
            <p className="footer-tagline">
              FlyEasy is an interactive flight booking application created by Chitkara University • CSE 2nd Year students for their Web Development course project.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/book">Search & Book Flight</Link></li>
              <li><Link to="/bookings">My Bookings</Link></li>
            </ul>
          </div>

          {/* Project Team Creators */}
          <div className="footer-col team-col">
            <h4>Project Creators</h4>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.name} className="team-member-item">
                  <div className="member-name">
                    <User size={13} className="member-icon" />
                    <strong>{member.name}</strong>
                  </div>
                  <div className="member-contact">
                    <span><Mail size={11} /> {member.email}</span>
                    <span><Phone size={11} /> {member.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Syllabus Topics */}
          <div className="footer-col">
            <h4>Syllabus Topics</h4>
            <div className="tags-cloud">
              <span className="topic-tag">HTML5 Semantics</span>
              <span className="topic-tag">CSS Flexbox & Grid</span>
              <span className="topic-tag">ES6+ JS</span>
              <span className="topic-tag">React Hooks</span>
              <span className="topic-tag">React Router v6</span>
              <span className="topic-tag">LocalStorage</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container bottom-wrap">
          <p>© 2026 FlyEasy Airlines. Built by CS Second Year Students of Chitkara University.</p>
          <p className="crafted-with">
            Crafted with React & Modern CSS3
          </p>
        </div>
      </div>
    </footer>
  );
}
