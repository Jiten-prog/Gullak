import { useState, useEffect } from 'react';
import { ChevronDown, Phone, Mail, ShoppingCart, Menu, X, Star, ArrowRight, Check, Play, Heart, MessageCircle, Share, Instagram, Pause, Maximize, User } from 'lucide-react';
import './FridoHero.css';

// Centralized Image Configuration
const IMAGE_CONFIG = {
  hero: {
    carousel: [
      "https://images.unsplash.com/photo-1586201375761-83865001e26c?w=600&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=500&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=500&fit=crop"
    ]
  },
  categories: [
    { id: 1, name: 'Insoles', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop' },
    { id: 2, name: 'Cushions', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop' },
    { id: 3, name: 'Car Essentials', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&h=200&fit=crop' },
    { id: 4, name: 'Chairs', image: 'https://images.unsplash.com/photo-1586201375761-83865001e26c?w=200&h=200&fit=crop' },
    { id: 5, name: 'Maternity', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop' },
    { id: 6, name: 'Pillows', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=200&h=200&fit=crop' },
    { id: 7, name: 'Desks', image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=200&h=200&fit=crop' },
    { id: 8, name: 'Footwear', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&h=200&fit=crop' },
    { id: 9, name: 'Barefoot', image: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=200&h=200&fit=crop' }
  ],
  bestSellers: [
    { id: 1, name: 'Frido Wedge Cushion', price: '₹2,999', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop', badge: 'Hot selling' },
    { id: 2, name: 'Lumbar Support Pillow', price: '₹1,499', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop', badge: null },
    { id: 3, name: 'Memory Foam Insoles', price: '₹899', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop', badge: null },
    { id: 4, name: 'Ergonomic Chair', price: '₹12,999', image: 'https://images.unsplash.com/photo-1586201375761-83865001e26c?w=300&h=300&fit=crop', badge: 'Hot selling' }
  ],
  reels: [
    {
      id: 1,
      title: "Perfect Posture in 30 Days",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0",
      likes: "12.5K",
      comments: "234",
      description: "Transform your workspace setup"
    },
    {
      id: 2,
      title: "Ergonomic Chair Setup Guide",
      thumbnail: "https://images.unsplash.com/photo-1586201375761-83865001e26c?w=300&h=400&fit=crop",
      embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0",
      likes: "8.3K",
      comments: "156",
      description: "How to adjust your chair properly"
    },
    {
      id: 3,
      title: "Back Pain Relief Exercises",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=400&fit=crop",
      embedUrl: "https://www.youtube.com/embed/oUFJJNQGwhk?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0",
      likes: "15.2K",
      comments: "321",
      description: "Quick exercises for office workers"
    },
    {
      id: 4,
      title: "Customer Success Story",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      embedUrl: "https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0",
      likes: "9.7K",
      comments: "187",
      description: "Real results from real customers"
    }
  ]
};

const FridoHero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('chairs');
  const [playingReels, setPlayingReels] = useState(new Set());
  const [loadingReels, setLoadingReels] = useState(new Set());
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // WhatsApp Configuration
  const whatsappNumber = "+917498476544";
  const businessName = "Frido Support";
  const welcomeMessage = "Hi! Welcome to Frido! How can we help you find the perfect ergonomic solution today?";

  // Use centralized image config
  const shopCategories = IMAGE_CONFIG.categories;
  const bestSellers = IMAGE_CONFIG.bestSellers;
  const carouselImages = IMAGE_CONFIG.hero.carousel;
  const reelsData = IMAGE_CONFIG.reels;

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

  const testimonials = [
    { name: 'Rahul K.', rating: 5, text: 'The ergonomic chair completely transformed my work-from-home experience!' },
    { name: 'Priya M.', rating: 5, text: 'Amazing comfort cushions. My back pain is significantly reduced.' },
    { name: 'Amit S.', rating: 5, text: 'Best investment for workplace wellness. Highly recommend!' }
  ];

  const features = [
    { icon: '🎯', title: 'Expert Design', desc: 'Ergonomically crafted for maximum comfort' },
    { icon: '🛡️', title: 'Quality Guarantee', desc: '7-day return policy & warranty' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Quick & secure shipping nationwide' },
    { icon: '💼', title: 'Corporate Solutions', desc: 'Bulk orders for business wellness' }
  ];

  const handleReelClick = (reelId) => {
    setLoadingReels(prev => new Set([...prev, reelId]));
    
    setTimeout(() => {
      setLoadingReels(prev => {
        const newSet = new Set(prev);
        newSet.delete(reelId);
        return newSet;
      });
      
      setPlayingReels(prev => new Set([...prev, reelId]));
    }, 1000);
  };

  const handleReelStop = (reelId) => {
    setPlayingReels(prev => {
      const newSet = new Set(prev);
      newSet.delete(reelId);
      return newSet;
    });
  };

  const handleFullscreen = (reelId) => {
    const iframe = document.getElementById(`reel-${reelId}`);
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="frido-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-nav">
            <div className="logo">Frido</div>
            
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
              <a href="#" className="nav-item">Bestsellers</a>
              <a href="#" className="nav-item">Business</a>
              <a href="#" className="nav-item">Reviews</a>
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
              <a href="/login" className="login-button" aria-label="Login">
                <User className="icon-lg" />
              </a>
              <button className="cart-button">
                <ShoppingCart className="icon-lg" />
                <span className="cart-badge">0</span>
              </button>
              <button 
                className="mobile-menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="icon-lg" /> : <Menu className="icon-lg" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            {categories.map(cat => (
              <a key={cat.id} href="#" className="mobile-menu-item">
                {cat.name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-grid">
            <div className="hero-text">
              <div>
                <div className="hero-badge">
                  Your Trust, Our Priority ✨
                </div>
                <h1 className="hero-title">
                  Experience Best of 
                  <span className="hero-title-accent">Comfort with Frido</span>
                </h1>
                <p className="hero-description">
                  Discover innovative ergonomic products designed to alleviate neck, back & foot pain. 
                  Shop premium insoles, pillows, cushions & more for ultimate comfort and wellness.
                </p>
              </div>

              <div className="hero-buttons">
                <button className="btn-primary">
                  Shop Now <ArrowRight className="icon-md" />
                </button>
                <button className="btn-secondary">
                  Get Expert Help
                </button>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">4.8/5</div>
                  <div className="stat-label">Customer Rating</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">7 Days</div>
                  <div className="stat-label">Return Policy</div>
                </div>
              </div>
            </div>

            <div className="hero-image">
              <div className="hero-carousel">
                <div 
                  className="carousel-container"
                  style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                >
                  {carouselImages.map((image, index) => (
                    <div key={index} className="carousel-slide">
                      <img 
                        src={image}
                        alt={`Ergonomic Product ${index + 1}`}
                        className="carousel-image"
                      />
                    </div>
                  ))}
                </div>
                <div className="carousel-indicators">
                  {carouselImages.map((_, index) => (
                    <div
                      key={index}
                      className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-content">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose Frido?
            </h2>
            <p className="section-description">
              We're committed to providing the best ergonomic solutions for your comfort and wellness needs.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="category-section">
        <div className="category-content">
          <h2 className="section-title">Shop by Category</h2>
          
          <div className="category-grid">
            {shopCategories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-image-wrapper">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="category-image"
                  />
                </div>
                <div className="category-name">{category.name}</div>
              </div>
            ))}
          </div>

          <div className="bestsellers-header">
            <h2 className="section-title">Best Sellers</h2>
            <a href="#" className="view-all-link">
              View all <ArrowRight className="icon-sm" />
            </a>
          </div>

          <div className="bestsellers-grid">
            {bestSellers.map((product) => (
              <div key={product.id} className="bestseller-card">
                {product.badge && (
                  <div className="bestseller-badge">{product.badge}</div>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="bestseller-image"
                />
                <div className="bestseller-info">
                  <h3 className="bestseller-name">{product.name}</h3>
                  <div className="bestseller-price">{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Reels Section */}
      <section className="instagram-reels">
        <div className="reels-content">
          <div className="reels-header">
            <h2 className="reels-title">
              <Instagram className="icon-lg" />
              See Us In Action
            </h2>
            <p className="reels-description">
              Watch real customers share their Frido experience and learn tips for better ergonomic health
            </p>
          </div>

          <div className="reels-grid">
            {reelsData.map((reel) => (
              <div 
                key={reel.id} 
                className={`reel-card ${playingReels.has(reel.id) ? 'playing' : ''}`}
              >
                <div className="reel-video-container">
                  {playingReels.has(reel.id) ? (
                    <>
                      <iframe
                        id={`reel-${reel.id}`}
                        src={reel.embedUrl}
                        className="reel-iframe"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={reel.title}
                      />
                      <div className="reel-controls">
                        <button 
                          className="reel-control-btn"
                          onClick={() => handleReelStop(reel.id)}
                          title="Stop video"
                        >
                          <X className="icon-sm" />
                        </button>
                        <button 
                          className="reel-control-btn"
                          onClick={() => handleFullscreen(reel.id)}
                          title="Fullscreen"
                        >
                          <Maximize className="icon-sm" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <img 
                        src={reel.thumbnail} 
                        alt={reel.title}
                        className="reel-thumbnail"
                        onClick={() => handleReelClick(reel.id)}
                      />
                      {loadingReels.has(reel.id) && (
                        <div className="reel-loading"></div>
                      )}
                      <div 
                        className={`reel-overlay ${loadingReels.has(reel.id) ? 'hidden' : ''}`}
                        onClick={() => handleReelClick(reel.id)}
                      >
                        <div className="reel-play-icon">
                          <Play className="icon-md" style={{fill: 'currentColor'}} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="reel-info">
                  <h3 className="reel-title">{reel.title}</h3>
                  <p className="reel-description" style={{fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem'}}>
                    {reel.description}
                  </p>
                  <div className="reel-stats">
                    <div className="reel-stat">
                      <Heart className="icon-sm" />
                      {reel.likes}
                    </div>
                    <div className="reel-stat">
                      <MessageCircle className="icon-sm" />
                      {reel.comments}
                    </div>
                    <div className="reel-stat">
                      <Share className="icon-sm" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="instagram-cta">
            <a href="https://www.instagram.com/myfrido/" target="_blank" rel="noopener noreferrer" className="instagram-button">
              <Instagram className="icon-md" />
              Follow @myfrido for more tips
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="testimonials-content">
          <div className="section-header">
            <h2 className="section-title">
              Community Reviews
            </h2>
            <p className="section-description">What our customers are saying</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="icon-sm" style={{fill: 'currentColor'}} />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">Frido</div>
              <p className="footer-description">
                Your trusted partner for ergonomic comfort and wellness solutions.
              </p>
              <div className="footer-contact">
                <Phone className="icon-sm" />
                +91 7498476544
              </div>
              <div className="footer-contact">
                <Mail className="icon-sm" />
                help@myfrido.com
              </div>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">About Us</a>
                <a href="#" className="footer-link">Contact</a>
                <a href="#" className="footer-link">Support</a>
                <a href="#" className="footer-link">Track Order</a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Categories</h3>
              <div className="footer-links">
                <a href="#" className="footer-link">Chairs</a>
                <a href="#" className="footer-link">Cushions</a>
                <a href="#" className="footer-link">Insoles</a>
                <a href="#" className="footer-link">Pillows</a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Business Hours</h3>
              <div className="footer-hours">
                <div>Mon - Sat: 10am - 7pm</div>
                <div className="footer-badge">
                  🔒 Guaranteed Safe Checkout
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Frido. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Widget */}
      <div className="whatsapp-widget">
        <button 
          className="whatsapp-button"
          onClick={() => setShowWhatsAppPopup(!showWhatsAppPopup)}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="whatsapp-icon" />
          <div className="whatsapp-notification">1</div>
        </button>

        <div className={`whatsapp-popup ${showWhatsAppPopup ? 'show' : ''}`}>
          <div className="whatsapp-header">
            <div className="whatsapp-avatar">F</div>
            <div className="whatsapp-info">
              <h3>{businessName}</h3>
              <div className="whatsapp-status">Typically replies instantly</div>
            </div>
            <button 
              className="whatsapp-close"
              onClick={() => setShowWhatsAppPopup(false)}
            >
              <X className="icon-sm" />
            </button>
          </div>
          
          <div className="whatsapp-body">
            <div className="whatsapp-message">
              {welcomeMessage}
              <div className="whatsapp-time">Just now</div>
            </div>
          </div>
          
          <div className="whatsapp-footer">
            <button 
              className="whatsapp-chat-button"
              onClick={() => {
                const message = encodeURIComponent(welcomeMessage);
                window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
              }}
            >
              <MessageCircle className="icon-sm" />
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FridoHero;