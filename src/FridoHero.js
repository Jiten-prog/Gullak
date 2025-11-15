import { useState, useEffect } from 'react';
import { ChevronDown, Phone, Mail, ShoppingCart, Menu, X, Star, ArrowRight, Check, Play, Heart, MessageCircle, Share, Instagram, Pause, Maximize, User } from 'lucide-react';
import './FridoHero.css';

// Centralized Image Configuration
const IMAGE_CONFIG = {
  hero: {
    carousel: [
      "https://cdn.shopify.com/s/files/1/0553/0419/2034/files/1nov2025-desktop.jpg?v=1762154799&width=1944",
      "https://cdn.shopify.com/s/files/1/0553/0419/2034/files/DOD_UPI_Update_Banner.jpg?v=1754565325&width=2160",
      "https://cdn.shopify.com/s/files/1/0553/0419/2034/files/1nov2025-desktop.jpg?v=1762154799&width=1944",
      "https://cdn.shopify.com/s/files/1/0553/0419/2034/files/Mobility_banner.png?v=1743073369&width=1944"
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
    { id: 1, name: 'Gullak Wedge Cushion', price: '₹2,999', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop', badge: 'Hot selling' },
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

  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categoryScroll, setCategoryScroll] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  // WhatsApp Configuration
  const whatsappNumber = "+919530640463";
  const businessName = "Gullak Support";
  const welcomeMessage = "Hi! Welcome to Gullak! How can we help you find the perfect ergonomic solution today?";

  // Use centralized image config
  const shopCategories = IMAGE_CONFIG.categories;
  const bestSellers = IMAGE_CONFIG.bestSellers;
  const carouselImages = IMAGE_CONFIG.hero.carousel;
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
    { id: 'orthotics', name: 'Gullak Orthotics' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'masks', name: 'Masks' },
    { id: 'mobility', name: 'Mobility' }
  ];

  const newArrivals = [
    { id: 1, name: 'Gullak Pro Lumbar Cushion', price: '₹1,799', originalPrice: '₹2,999', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop', badge: 'New' },
    { id: 2, name: 'ErgoFlex Memory Foam Pillow', price: '₹999', originalPrice: '₹1,499', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=300&h=300&fit=crop', badge: 'New' },
    { id: 3, name: 'ComfortMax Gel Insoles', price: '₹699', originalPrice: '₹1,199', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop', badge: 'New' },
    { id: 4, name: 'FlexiDesk Standing Converter', price: '₹8,999', originalPrice: '₹14,999', image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=300&h=300&fit=crop', badge: 'New' }
  ];

  const features = [
    { icon: '🎯', title: 'Expert Design', desc: 'Ergonomically crafted for maximum comfort' },
    { icon: '🛡️', title: 'Quality Guarantee', desc: '7-day return policy & warranty' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Quick & secure shipping nationwide' },
    { icon: '💼', title: 'Corporate Solutions', desc: 'Bulk orders for business wellness' }
  ];



  const scrollCategories = (direction) => {
    const maxScroll = Math.max(0, shopCategories.length - 4);
    setCategoryScroll(prev => {
      if (direction === 'left') {
        return Math.max(0, prev - 1);
      } else {
        return Math.min(maxScroll, prev + 1);
      }
    });
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    setCartCount(prev => prev + 1);
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
            <div className="logo">
              <span className="gullak-g">G</span>
              <span className="gullak-u">u</span>
              <span className="gullak-l1">l</span>
              <span className="gullak-l2">l</span>
              <span className="gullak-a">a</span>
              <span className="gullak-k">k</span>
            </div>
            
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
              <a href="#" className="nav-item">Search</a>
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
                <span className="cart-badge">{cartCount}</span>
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

      {/* Promo Banner */}
      <div className="promo-banner">
        <div className="promo-content">
          <span className="promo-text">
            🔥 LIMITED TIME OFFER: Get <strong>40% OFF</strong> on all ergonomic products! 
          </span>
          <span className="promo-cta">Shop Now & Save Big!</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
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
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-content">
          <div className="section-header">
            <h2 className="section-title">
  Why Choose <span className="gullak-g">G</span><span className="gullak-u">u</span><span className="gullak-l1">l</span><span className="gullak-l2">l</span><span className="gullak-a">a</span><span className="gullak-k">k</span>?
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
          <div className="category-header">
            <h2 className="section-title">Shop by Category</h2>
            <div className="category-nav">
              <button 
                className="category-nav-btn"
                onClick={() => scrollCategories('left')}
                disabled={categoryScroll === 0}
              >
                <ChevronDown className="icon-md" style={{transform: 'rotate(90deg)'}} />
              </button>
              <button 
                className="category-nav-btn"
                onClick={() => scrollCategories('right')}
                disabled={categoryScroll >= shopCategories.length - 4}
              >
                <ChevronDown className="icon-md" style={{transform: 'rotate(-90deg)'}} />
              </button>
            </div>
          </div>
          
          <div className="category-slider">
            <div 
              className="category-grid"
              style={{ transform: `translateX(-${categoryScroll * 25}%)` }}
            >
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

      {/* New Arrivals */}
      <section className="new-arrivals">
        <div className="new-arrivals-content">
          <div className="section-header">
            <h2 className="section-title">
              New Arrivals
            </h2>
            <p className="section-description">Discover our latest ergonomic innovations</p>
          </div>

          <div className="new-arrivals-grid">
            {newArrivals.map((product) => (
              <div key={product.id} className="new-arrival-card">
                <div className="new-arrival-badge">{product.badge}</div>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="new-arrival-image"
                />
                <div className="new-arrival-info">
                  <h3 className="new-arrival-name">{product.name}</h3>
                  <div className="new-arrival-pricing">
                    <span className="new-arrival-price">{product.price}</span>
                    <span className="new-arrival-original-price">{product.originalPrice}</span>
                  </div>
                  <button 
                    className="new-arrival-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
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
              <div className="footer-brand">
                <span className="gullak-g">G</span>
                <span className="gullak-u">u</span>
                <span className="gullak-l1">l</span>
                <span className="gullak-l2">l</span>
                <span className="gullak-a">a</span>
                <span className="gullak-k">k</span>
              </div>
              <p className="footer-description">
                Your trusted partner for ergonomic comfort and wellness solutions.
              </p>
              <div className="footer-contact">
                <Phone className="icon-sm" />
                +91 7498476544
              </div>
              <div className="footer-contact">
                <Mail className="icon-sm" />
                help@mygullak.com
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
            <p>&copy; 2025 Gullak. All rights reserved. | Privacy Policy | Terms of Service</p>
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
            <div className="whatsapp-avatar">G</div>
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