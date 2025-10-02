import { useState } from 'react';
import { Phone, ShoppingCart, User, MessageCircle, ChevronDown } from 'lucide-react';
import './Login.css';
import '../FridoHero.css';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    console.log('Phone number submitted:', phoneNumber);
  };

  const categories = [
    { id: 'insoles', name: 'Insoles' },
    { id: 'cushions', name: 'Cushions' },
    { id: 'car', name: 'Car Essentials' },
    { id: 'chairs', name: 'Chairs' },
    { id: 'maternity', name: 'Maternity' },
    { id: 'pillows', name: 'Pillows' },
    { id: 'desks', name: 'Desks' },
    { id: 'footwear', name: 'Footwear' },
    { id: 'socks', name: 'Barefoot Socks' },
    { id: 'orthotics', name: 'Frido Orthotics' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'masks', name: 'Masks' },
    { id: 'mobility', name: 'Mobility' }
  ];

  return (
    <div className="login-page">
      {/* Header */}
      <header className="header login-header">
        <div className="header-content">
          <div className="header-nav">
            <a href="/" className="logo">Gullak</a>
            
            {/* Desktop Navigation */}
            <nav className="nav-desktop">
              <div className="dropdown">
                <button className="nav-item">
                  Products <ChevronDown className="icon-sm" />
                </button>
                <div className="dropdown-content">
                  <div className="dropdown-grid">
                    {categories.map(cat => (
                      <a key={cat.id} href="#" className="dropdown-item">
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <a href="/#bestsellers" className="nav-item">Bestsellers</a>
              <a href="/#business" className="nav-item">Business</a>
              <a href="/#reviews" className="nav-item">Reviews</a>
            </nav>

            {/* Contact & Cart */}
            <div className="header-actions">
              <div className="contact-info">
                <div className="contact-item">
                  <Phone className="icon-sm" />
                  +91 7498476544
                </div>
                <div>Mon-Sat: 10am-7pm</div>
              </div>
              <a href="/login" className="login-button active" aria-label="Login">
                <User className="icon-lg" />
              </a>
              <a href="/" className="cart-button">
                <ShoppingCart className="icon-lg" />
                <span className="cart-badge">0</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      
      <div className="login-content-wrapper">
        <div className="login-illustration">
          <div className="illustration-pattern">
            <div className="pattern-person person-1"></div>
            <div className="pattern-person person-2"></div>
            <div className="pattern-person person-3"></div>
            <div className="pattern-emoji">😊</div>
            <div className="pattern-emoji emoji-2">❤️</div>
            <div className="pattern-z">Z</div>
            <div className="pattern-z z-2">Z</div>
            <div className="pattern-z z-3">Z</div>
            <div className="pattern-star star-1">✦</div>
            <div className="pattern-star star-2">✦</div>
            <div className="pattern-star star-3">✦</div>
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-form-content">
            <h2 className="login-title">Login to your frido Account</h2>

            {!showEmailLogin ? (
              <form onSubmit={handlePhoneSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-input"
                    placeholder="Enter 10 digit phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength="10"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <button type="submit" className="verify-button">
                  Get Verified
                </button>

                <div className="divider">
                  <span>Or</span>
                </div>

                <button
                  type="button"
                  className="email-button"
                  onClick={() => setShowEmailLogin(true)}
                >
                  Sign in with email
                </button>
              </form>
            ) : (
              <form onSubmit={(e) => e.preventDefault()} className="login-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button type="submit" className="verify-button">
                  Sign In
                </button>

                <button
                  type="button"
                  className="back-to-phone"
                  onClick={() => setShowEmailLogin(false)}
                >
                  ← Back to phone login
                </button>
              </form>
            )}

            <div className="login-help">
              Need <a href="#" className="help-link">Help?</a>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Widget */}
      <div className="whatsapp-widget">
        <button 
          className="whatsapp-button"
          onClick={() => {
            window.open('https://wa.me/917498476544', '_blank');
          }}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="whatsapp-icon" />
          <div className="whatsapp-notification">1</div>
        </button>
      </div>
    </div>
  );
};

export default Login;