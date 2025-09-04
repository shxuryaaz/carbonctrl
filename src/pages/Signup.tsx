import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth, UserRole } from '../context/AuthContext';
import './Signup.scss';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as UserRole,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.displayName, formData.role);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'student', label: 'Student', icon: '🎓', description: 'Learn and earn EcoCoins' },
    { value: 'teacher', label: 'Teacher', icon: '👨‍🏫', description: 'Guide and approve actions' },
    { value: 'admin', label: 'Admin', icon: '👨‍💼', description: 'Manage schools and events' },
  ];

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Side - Illustration */}
        <motion.div 
          className="signup-illustration"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="illustration-content">
            <motion.div 
              className="eco-icons"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.span 
                className="eco-icon"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                🌱
              </motion.span>
              <motion.span 
                className="eco-icon"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                🌳
              </motion.span>
              <motion.span 
                className="eco-icon"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                🌍
              </motion.span>
            </motion.div>
            <h1>Join the Eco Revolution</h1>
            <p>Be part of the solution. Learn, play, and make a real impact on our planet's future.</p>
            <div className="benefits">
              <div className="benefit">
                <span className="benefit-icon">🎯</span>
                <span>Set Eco Goals</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">🏅</span>
                <span>Earn Badges</span>
              </div>
              <div className="benefit">
                <span className="benefit-icon">🌱</span>
                <span>Make Impact</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Signup Form */}
        <motion.div 
          className="signup-form-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="signup-form">
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Start your eco-journey today!</p>
            </div>

            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="form">
              <div className="input-group">
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  disabled={loading}
                />
                <label htmlFor="displayName">Full Name</label>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  disabled={loading}
                />
                <label htmlFor="email">Email Address</label>
              </div>

              <div className="input-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  disabled={loading}
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="input-group">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  disabled={loading}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>

              {/* Role Selection */}
              <div className="role-selection">
                <label className="role-label">I am a:</label>
                <div className="role-options">
                  {roleOptions.map((option) => (
                    <motion.div
                      key={option.value}
                      className={`role-option ${formData.role === option.value ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, role: option.value as UserRole })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="role-icon">{option.icon}</div>
                      <div className="role-info">
                        <div className="role-name">{option.label}</div>
                        <div className="role-description">{option.description}</div>
                      </div>
                      <div className="role-radio">
                        <div className={`radio-dot ${formData.role === option.value ? 'active' : ''}`}></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                className="btn btn--primary btn--large"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="loading-spinner-small">
                    <div className="spinner"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            <motion.button
              type="button"
              className="btn btn--secondary btn--large google-btn"
              onClick={handleGoogleSignIn}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="google-icon">🔍</span>
              Continue with Google
            </motion.button>

            <div className="form-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="link">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
