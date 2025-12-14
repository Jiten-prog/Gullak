import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, X, ChevronDown } from 'lucide-react';
import gullakLogo from '../logo/gullak.jpeg';

function MegaMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="mega-menu-overlay" onClick={onClose}></div>
      <div className="mega-menu">
        <div className="mega-menu-content">
          <div className="mega-menu-columns">
            <div className="mega-menu-column">
              <h3 className="mega-menu-heading">All Collections</h3>
              <ul className="mega-menu-list">
                <li><Link to="/products/plush-toys" onClick={onClose}>Stuffed Toys</Link></li>
                <li><Link to="/products/crochet" onClick={onClose}>Crochet</Link></li>
                <li><Link to="/products/baby-toys" onClick={onClose}>Baby Toys</Link></li>
                <li><Link to="/products/interactive" onClick={onClose}>Interactive</Link></li>
              </ul>
            </div>
            <div className="mega-menu-column">
              <h3 className="mega-menu-heading">By Color</h3>
              <ul className="mega-menu-list">
                <li><a href="#">Green</a></li>
                <li><a href="#">Pink</a></li>
                <li><a href="#">Teal</a></li>
                <li><a href="#">Lavender</a></li>
                <li><a href="#">Yellow</a></li>
              </ul>
            </div>
            <div className="mega-menu-column">
              <h3 className="mega-menu-heading">Shop By</h3>
              <ul className="mega-menu-list">
                <li><a href="#">New Collection</a></li>
                <li><a href="#">Favorites of the Season</a></li>
                <li><a href="#">Discounts</a></li>
                <li><a href="#">Trending</a></li>
              </ul>
            </div>
            <div className="mega-menu-column mega-menu-image-column">
              <div className="mega-menu-image-container">
                <img src="https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=600&h=400&fit=crop" alt="Plush toys" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CollectionsSidebar({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="collections-overlay" onClick={onClose}></div>
      <div className="collections-sidebar">
        <div className="collections-header">
          <h2 className="collections-title">Collections List</h2>
          <button className="collections-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="collections-content">
          <div className="collections-list">
            <Link to="/products/plush-toys" className="collections-item" onClick={onClose}>Stuffed Toys</Link>
            <Link to="/products/crochet" className="collections-item" onClick={onClose}>Crochet</Link>
            <Link to="/products/baby-toys" className="collections-item" onClick={onClose}>Baby Toys</Link>
            <Link to="/products/interactive" className="collections-item" onClick={onClose}>Interactive</Link>
          </div>
          <div className="collections-featured">
            <div className="collections-product-card">
              <div className="collections-badge">Save $6</div>
              <div className="collections-product-image">
                <img src="https://images.unsplash.com/photo-1587912781763-9b857c226797?w=400&h=400&fit=crop" alt="Crochet Cow" />
              </div>
              <h3 className="collections-product-name">Crochet Cow</h3>
            </div>
          </div>
        </div>
        <div className="collections-swirl">
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            <path d="M 20,50 Q 30,20 50,30 Q 70,40 60,60" stroke="#fbbf24" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.3"/>
          </svg>
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [collectionsSidebarOpen, setCollectionsSidebarOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [navHovered, setNavHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavCollapsed(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`nav-container ${navCollapsed && !navHovered ? 'collapsed' : ''}`}
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => setNavHovered(false)}
    >
      <div className="nav-inner">
        <div className="nav-left">
          <button className="nav-button" onClick={() => setMegaMenuOpen(!megaMenuOpen)}>
            <span>Shop</span>
            <ChevronDown size={16} />
          </button>
          <button className="nav-button" onClick={() => setCollectionsSidebarOpen(true)}>
            <span>Collections</span>
            <ChevronDown size={16} />
          </button>
          <button className="nav-button">About Us</button>
          <button className="nav-button">Blog</button>
        </div>

        <Link to="/" className="nav-logo">
          <img src={gullakLogo} alt="Gullak - The Toy House" style={{ height: '50px', width: 'auto' }} />
        </Link>

        <div className="nav-right">
          <button className="nav-icon-button">
            <Search size={20} />
          </button>
          <button className="nav-icon-button">
            <User size={20} />
          </button>
          <button className="nav-icon-button">
            <ShoppingCart size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="nav-button">
              <span>En</span>
              <ChevronDown size={16} />
            </button>
            <span className="nav-separator">|</span>
            <button className="nav-button">
              <span>🇺🇸</span>
              <span>USD $</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
      <CollectionsSidebar isOpen={collectionsSidebarOpen} onClose={() => setCollectionsSidebarOpen(false)} />
    </nav>
  );
}
