import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './Landing.scss';

const Landing: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: '🎮',
      title: 'Interactive Learning',
      description: 'Engage with gamified environmental challenges and educational content that makes learning fun.'
    },
    {
      icon: '🏆',
      title: 'Achievement System',
      description: 'Earn EcoCoins, badges, and climb leaderboards as you complete missions and reduce your carbon footprint.'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Track your environmental impact with detailed analytics and personalized insights.'
    },
    {
      icon: '🌱',
      title: 'AR Missions',
      description: 'Use augmented reality to plant virtual trees and complete real-world environmental challenges.'
    },
    {
      icon: '👥',
      title: 'Community Impact',
      description: 'Join a global community of eco-warriors working together to save our planet.'
    },
    {
      icon: '🎯',
      title: 'Goal Tracking',
      description: 'Set and achieve personal environmental goals with guided missions and progress tracking.'
    }
  ];

  const goals = [
    {
      icon: '🌍',
      title: '1 Million Students',
      description: 'Empower 1 million students worldwide to become environmental champions by 2025'
    },
    {
      icon: '🌳',
      title: '10 Million Trees',
      description: 'Plant 10 million trees through our AR missions and real-world partnerships'
    },
    {
      icon: '📚',
      title: '1000 Schools',
      description: 'Partner with 1000+ educational institutions to integrate environmental education'
    },
    {
      icon: '⚡',
      title: '50% Carbon Reduction',
      description: 'Help students reduce their carbon footprint by 50% through gamified learning'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'High School Student',
      school: 'Green Valley High',
      content: 'CarbonCtrl made me realize how much impact I can have on the environment. The AR missions are incredible!',
      avatar: '👩‍🎓',
      rating: 5
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Environmental Science Teacher',
      school: 'Eco Academy',
      content: 'This platform has transformed how my students engage with environmental topics. The gamification works perfectly.',
      avatar: '👨‍🏫',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Middle School Student',
      school: 'Nature Middle School',
      content: 'I love earning EcoCoins and competing with my friends. It makes saving the planet so much fun!',
      avatar: '👧',
      rating: 5
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Sign Up & Choose Role',
      description: 'Create your account as a student, teacher, or administrator and get personalized access to the platform.',
      icon: '👤'
    },
    {
      step: '02',
      title: 'Complete Missions',
      description: 'Engage with interactive quizzes, AR missions, and mini-games to learn about environmental conservation.',
      icon: '🎯'
    },
    {
      step: '03',
      title: 'Track Impact',
      description: 'Monitor your progress, earn rewards, and see the real-world impact of your environmental actions.',
      icon: '📊'
    }
  ];

  const successStories = [
    {
      title: 'Green Valley High School',
      location: 'California, USA',
      achievement: 'Reduced school carbon footprint by 40%',
      students: '500+ students engaged',
      impact: '2,000 trees planted through AR missions',
      image: '🏫'
    },
    {
      title: 'Eco Academy',
      location: 'Toronto, Canada',
      achievement: 'Achieved zero-waste cafeteria',
      students: '300+ students participated',
      impact: '1,500 kg CO2 emissions reduced',
      image: '🌿'
    },
    {
      title: 'Nature Middle School',
      location: 'Melbourne, Australia',
      achievement: 'Created school-wide recycling program',
      students: '400+ students involved',
      impact: '3,000 EcoCoins earned collectively',
      image: '♻️'
    }
  ];


  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <motion.div 
            className="nav-logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="logo-icon">🌍</span>
            <span className="logo-text">CarbonCtrl</span>
          </motion.div>
          
          <div className="nav-actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <Link to="/login" className="btn btn--outline">Sign In</Link>
            <Link to="/signup" className="btn btn--primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="hero-title">
              Save the Planet,{' '}
              <span className="gradient-text">One Mission at a Time</span>
            </h1>
            <p className="hero-description">
              Join the world's most engaging environmental education platform. 
              Learn, play, and make a real impact on climate change through 
              gamified experiences and real-world actions.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn--primary btn--large">
                Start Your Journey
              </Link>
              <Link to="/login" className="btn btn--outline btn--large">
                Sign In
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-card">
              <div className="card-header">
                <div className="card-avatar">👤</div>
                <div className="card-info">
                  <div className="card-name">Eco Warrior</div>
                  <div className="card-level">Level 5 • 1,250 EcoCoins</div>
                </div>
              </div>
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-value">15</span>
                  <span className="stat-label">Trees Planted</span>
                </div>
                <div className="stat">
                  <span className="stat-value">2.3kg</span>
                  <span className="stat-label">CO2 Reduced</span>
                </div>
                <div className="stat">
                  <span className="stat-value">8</span>
                  <span className="stat-label">Badges</span>
                </div>
              </div>
              <div className="card-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
                <span className="progress-text">75% to Level 6</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Aim to Achieve Section */}
      <section className="goals-section">
        <div className="goals-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="section-title">What We Aim to Achieve</h2>
            <p className="section-description">
              Our ambitious goals for creating a sustainable future through education and technology.
            </p>
          </motion.div>
          
          <div className="goals-grid">
            {goals.map((goal, index) => (
              <motion.div 
                key={goal.title}
                className="goal-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="goal-icon">{goal.icon}</div>
                <h3 className="goal-title">{goal.title}</h3>
                <p className="goal-description">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="section-title">Why Choose CarbonCtrl?</h2>
            <p className="section-description">
              Experience the future of environmental education with cutting-edge 
              technology and proven learning methodologies.
            </p>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="how-it-works-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Get started with CarbonCtrl in three simple steps and begin your environmental journey.
            </p>
          </motion.div>
          
          <div className="steps-container">
            {howItWorks.map((step, index) => (
              <motion.div 
                key={step.step}
                className="step-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.2 }}
              >
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <div className="step-icon">{step.icon}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            <h2 className="section-title">What Our Community Says</h2>
            <p className="section-description">
              Hear from students, teachers, and schools who are making a real difference.
            </p>
          </motion.div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.name}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                    <p className="author-school">{testimonial.school}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories-section">
        <div className="success-stories-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.6 }}
          >
            <h2 className="section-title">Success Stories</h2>
            <p className="section-description">
              Real schools, real impact. See how institutions are transforming their environmental footprint.
            </p>
          </motion.div>
          
          <div className="success-stories-grid">
            {successStories.map((story, index) => (
              <motion.div 
                key={story.title}
                className="success-story-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="story-image">{story.image}</div>
                <div className="story-content">
                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-location">{story.location}</p>
                  <div className="story-achievement">
                    <span className="achievement-label">Achievement:</span>
                    <span className="achievement-text">{story.achievement}</span>
                  </div>
                  <div className="story-stats">
                    <div className="stat">
                      <span className="stat-label">Students</span>
                      <span className="stat-value">{story.students}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Impact</span>
                      <span className="stat-value">{story.impact}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-description">
              Join thousands of students, teachers, and environmental enthusiasts 
              who are already making a positive impact on our planet.
            </p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn--primary btn--large">
                Start Free Today
              </Link>
              <Link to="/login" className="btn btn--outline btn--large">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="trust-section">
        <div className="trust-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.2 }}
          >
            <h2 className="section-title">Trusted & Secure</h2>
            <p className="section-description">
              Your privacy and security are our top priorities. We're committed to protecting your data.
            </p>
          </motion.div>
          
          <div className="trust-grid">
            <motion.div 
              className="trust-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.4 }}
            >
              <div className="trust-icon">🔒</div>
              <h3>GDPR Compliant</h3>
              <p>Full compliance with European data protection regulations</p>
            </motion.div>
            
            <motion.div 
              className="trust-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.5 }}
            >
              <div className="trust-icon">🛡️</div>
              <h3>COPPA Certified</h3>
              <p>Child-safe platform with parental controls and monitoring</p>
            </motion.div>
            
            <motion.div 
              className="trust-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.6 }}
            >
              <div className="trust-icon">🔐</div>
              <h3>End-to-End Encryption</h3>
              <p>All data is encrypted and securely stored in the cloud</p>
            </motion.div>
            
            <motion.div 
              className="trust-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.7 }}
            >
              <div className="trust-icon">✅</div>
              <h3>Educational Standards</h3>
              <p>Aligned with international environmental education standards</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="contact-section">
        <div className="contact-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.8 }}
          >
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-description">
              Have questions? We're here to help you get started with CarbonCtrl.
            </p>
          </motion.div>
          
          <div className="contact-grid">
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 4.0 }}
            >
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h3>Email Support</h3>
                  <p>support@carbonctrl.com</p>
                  <span>24/7 response within 2 hours</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">💬</div>
                <div className="contact-details">
                  <h3>Live Chat</h3>
                  <p>Available 9 AM - 6 PM EST</p>
                  <span>Instant help from our team</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📚</div>
                <div className="contact-details">
                  <h3>Help Center</h3>
                  <p>Comprehensive guides & tutorials</p>
                  <span>Self-service resources</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="faq-section"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 4.2 }}
            >
              <h3>Frequently Asked Questions</h3>
              <div className="faq-list">
                <div className="faq-item">
                  <h4>Is CarbonCtrl free for schools?</h4>
                  <p>Yes! We offer free access for educational institutions with premium features available.</p>
                </div>
                <div className="faq-item">
                  <h4>What age groups is this suitable for?</h4>
                  <p>CarbonCtrl is designed for students aged 8-18, with content adapted for different grade levels.</p>
                </div>
                <div className="faq-item">
                  <h4>How do AR missions work?</h4>
                  <p>Students use their mobile devices to complete real-world environmental challenges through augmented reality.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-icon">🌍</span>
              <span className="logo-text">CarbonCtrl</span>
            </div>
            <p className="footer-description">
              Empowering the next generation to save our planet through 
              innovative education and real-world action.
            </p>
          </div>
          <div className="footer-links">
            <Link to="/login" className="footer-link">Sign In</Link>
            <Link to="/signup" className="footer-link">Sign Up</Link>
            <button className="footer-link">Privacy Policy</button>
            <button className="footer-link">Terms of Service</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CarbonCtrl. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
