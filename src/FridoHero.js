import React, { useState } from 'react';
import { Search, User, ShoppingCart, X, ChevronDown } from 'lucide-react';
import gullakLogo from './logo/gullak.jpeg';

// Mega Menu Component
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
                <li><a href="#">Stuffed Toys</a></li>
                <li><a href="#">Clothes</a></li>
                <li><a href="#">Accessories</a></li>
                <li><a href="#">Footwear</a></li>
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
                <img 
                  src="https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=600&h=400&fit=crop" 
                  alt="Plush toys"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Collections Sidebar Component
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
            <a href="#" className="collections-item">Stuffed Toys</a>
            <a href="#" className="collections-item">Clothes</a>
            <a href="#" className="collections-item">Accessories</a>
            <a href="#" className="collections-item">Footwear</a>
          </div>

          <div className="collections-featured">
            <div className="collections-product-card">
              <div className="collections-badge">Save $6</div>
              <div className="collections-product-image">
                <img 
                  src="https://images.unsplash.com/photo-1587912781763-9b857c226797?w=400&h=400&fit=crop" 
                  alt="Crochet Cow"
                />
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

export default function ToyoLandingPage() {
  const [showDiscount, setShowDiscount] = useState(true);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [collectionsSidebarOpen, setCollectionsSidebarOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [navHovered, setNavHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  const slides = [
    { bg: 'linear-gradient(to bottom right, #ef4444, #f97316)', color: 'red' }, // Red-Orange
    { bg: 'linear-gradient(to bottom right, #16a34a, #22c55e)', color: 'green' }, // Green
    { bg: 'linear-gradient(to bottom right, #1e3a8a, #3b82f6)', color: 'blue' } // Dark Blue
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Handle scroll to collapse/expand navbar
  React.useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const heroBottom = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setNavCollapsed(scrollPosition > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show email popup after 40 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmailPopup(true);
    }, 40000); // 40 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .hero-section {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          padding-top: 0;
          transition: background 0.5s ease-in-out;
        }

        .hero-slides-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          pointer-events: none;
        }

        .hero-slide.active {
          opacity: 1;
          pointer-events: auto;
        }

        .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 30;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 3.5rem;
          height: 3.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .carousel-button:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .carousel-button-prev {
          left: 2rem;
        }

        .carousel-button-next {
          right: 2rem;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 30;
          display: flex;
          gap: 0.75rem;
        }

        .carousel-indicator {
          width: 3rem;
          height: 0.5rem;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .carousel-indicator.active {
          background: white;
          width: 4rem;
        }

        .hero-background-svg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          width: 100%;
          height: 100%;
        }

        .nav-container {
          position: fixed;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          z-index: 100;
          background: white;
          border-radius: 9999px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-container.collapsed {
          top: 1rem;
          left: 50%;
          right: auto;
          transform: translateX(-50%);
          width: auto;
          padding: 0.5rem 1rem;
        }

        .nav-container.collapsed .nav-inner {
          padding: 0.5rem 1rem;
        }

        .nav-container.collapsed .nav-left,
        .nav-container.collapsed .nav-right {
          opacity: 0;
          visibility: hidden;
          width: 0;
          overflow: hidden;
        }

        .nav-container.collapsed .nav-logo {
          position: static;
          transform: none;
        }

        .nav-container.collapsed:hover {
          left: 1rem;
          right: 1rem;
          transform: none;
          width: auto;
          padding: 0;
        }

        .nav-container.collapsed:hover .nav-inner {
          padding: 1rem 1.5rem;
        }

        .nav-container.collapsed:hover .nav-left,
        .nav-container.collapsed:hover .nav-right {
          opacity: 1;
          visibility: visible;
          width: auto;
        }

        .nav-container.collapsed:hover .nav-logo {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 2rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-button {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #374151;
          background: none;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s;
          font-size: 1rem;
          white-space: nowrap;
        }

        .nav-button:hover {
          color: #ef4444;
        }

        .nav-logo {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2.25rem;
          font-weight: bold;
          color: #ef4444;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-icon-button {
          color: #374151;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s;
          padding: 0.5rem;
        }

        .nav-icon-button:hover {
          color: #ef4444;
        }

        .nav-separator {
          color: #d1d5db;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
          padding: 8rem 1rem 8rem;
          text-align: center;
        }

        .hero-title {
          font-size: 4.5rem;
          font-weight: bold;
          color: white;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .hero-bear-container {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }

        .hero-bear-circle {
          width: 20rem;
          height: 20rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8rem;
        }

        .decorative-plus-1 {
          position: absolute;
          top: 24rem;
          left: 8rem;
          color: #fcd34d;
          font-size: 2.5rem;
          font-weight: 300;
        }

        .decorative-plus-2 {
          position: absolute;
          bottom: 8rem;
          right: 8rem;
          color: #fcd34d;
          font-size: 2.5rem;
          font-weight: 300;
        }

        /* Animated Banner */
        .banner-section {
          position: relative;
          background: #fef3c7;
          padding: 1.5rem 0;
          overflow: hidden;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .marquee-container {
          display: flex;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }

        .marquee-text {
          font-size: 3.5rem;
          font-weight: bold;
          color: #ef4444;
          display: inline-block;
          margin: 0 2rem;
        }

        /* Product Categories */
        .categories-section {
          position: relative;
          z-index: 10;
          background: #fef3c7;
          padding: 2rem 1rem;
        }

        .categories-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .category-card {
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s;
          cursor: pointer;
        }

        .category-card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .category-image {
          width: 100%;
          height: 12rem;
          object-fit: cover;
        }

        .category-card-blue {
          background: #1e3a8a;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 12rem;
        }

        .category-logo-badge {
          background: white;
          border-radius: 9999px;
          padding: 1rem 2rem;
        }

        .category-logo-text {
          font-size: 1.8rem;
          font-weight: bold;
          color: #ef4444;
        }

        .category-card-pink {
          background: linear-gradient(to bottom right, #ec4899, #db2777);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 12rem;
        }

        .category-card-green {
          background: #16a34a;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 12rem;
        }

        .category-card-orange {
          background: linear-gradient(to bottom right, #f97316, #ef4444);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 12rem;
        }

        .category-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: white;
        }

        /* Product Showcase Section */
        .showcase-section {
          position: relative;
          background: #fef3c7;
          padding: 2rem 1rem;
          overflow: hidden;
        }

        .showcase-decor-right {
          position: absolute;
          bottom: 5rem;
          right: 5rem;
          width: 12rem;
          height: 12rem;
          opacity: 0.4;
        }

        .showcase-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .showcase-logo-badge {
          display: inline-block;
          background: white;
          border-radius: 9999px;
          padding: 0.75rem 2rem;
          margin-bottom: 1.5rem;
        }

        .showcase-logo-text {
          font-size: 2.25rem;
          font-weight: bold;
          color: #ef4444;
        }

        .showcase-title {
          font-size: 3rem;
          font-weight: bold;
          color: #ef4444;
          margin-bottom: 1.5rem;
        }

        .showcase-tabs {
          display: flex;
          justify-content: center;
          gap: 0;
          background: white;
          border-radius: 9999px;
          padding: 0.5rem;
          max-width: 48rem;
          margin: 0 auto;
          border: 2px solid #111827;
          overflow-x: auto;
        }

        .showcase-tab {
          flex: 1;
          padding: 1rem 2rem;
          border: none;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          font-size: 1.125rem;
          color: #111827;
          transition: all 0.3s;
          border-radius: 9999px;
          white-space: nowrap;
        }

        .showcase-tab.active {
          background: linear-gradient(to right, #ef4444, #dc2626);
          color: white;
        }

        .showcase-tab:hover:not(.active) {
          color: #ef4444;
        }

        .showcase-products {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 3rem;
        }

        @media (min-width: 640px) {
          .showcase-products {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .showcase-products {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .product-card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 2px solid #111827;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-0.5rem);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .product-image-container {
          position: relative;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 20rem;
        }

        .product-image {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .product-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #7c3aed;
          color: white;
          font-weight: bold;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
        }

        .product-info {
          padding: 1.5rem;
          text-align: center;
          border-top: 2px solid #111827;
        }

        .product-name {
          font-size: 1.25rem;
          font-weight: bold;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .product-price {
          font-size: 1.125rem;
          color: #4b5563;
        }

        .product-price-sale {
          color: #ef4444;
          font-weight: bold;
        }

        .product-price-original {
          text-decoration: line-through;
          color: #9ca3af;
          margin-left: 0.5rem;
        }

        /* Mega Menu Styles */
        .mega-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 40;
        }

        .mega-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          z-index: 50;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
          border-radius: 1.5rem;
          overflow: hidden;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mega-menu-content {
          padding: 3rem 2rem;
        }

        .mega-menu-columns {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        .mega-menu-column {
          position: relative;
        }

        .mega-menu-heading {
          font-size: 1.125rem;
          font-weight: bold;
          color: #4338ca;
          margin-bottom: 1.5rem;
        }

        .mega-menu-list {
          list-style: none;
        }

        .mega-menu-list li {
          margin-bottom: 1rem;
        }

        .mega-menu-list a {
          color: #111827;
          text-decoration: none;
          transition: color 0.3s;
          font-size: 0.95rem;
        }

        .mega-menu-list a:hover {
          color: #ef4444;
        }

        .mega-menu-image-column {
          position: relative;
        }

        .mega-menu-image-container {
          border-radius: 1.5rem;
          overflow: hidden;
          border: 3px solid #ef4444;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .mega-menu-image-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 0%, transparent 50%, rgba(239, 68, 68, 0.1) 100%);
          pointer-events: none;
        }

        .mega-menu-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .mega-menu-swirl {
          position: absolute;
          bottom: -2rem;
          left: -2rem;
          width: 8rem;
          height: 8rem;
          opacity: 0.2;
        }

        @media (max-width: 1024px) {
          .mega-menu-columns {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .mega-menu-image-column {
            grid-column: span 2;
          }
        }

        @media (max-width: 640px) {
          .mega-menu-columns {
            grid-template-columns: 1fr;
          }
          
          .mega-menu-image-column {
            grid-column: span 1;
          }
        }

        /* Collections Sidebar Styles */
        .collections-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 60;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .collections-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 400px;
          max-width: 90vw;
          height: 100vh;
          background: #fef3c7;
          z-index: 70;
          overflow-y: auto;
          animation: slideInLeft 0.3s ease-out;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .collections-header {
          position: relative;
          padding: 2rem;
          background: white;
          border-bottom: 2px solid #111827;
        }

        .collections-title {
          font-size: 1.875rem;
          font-weight: bold;
          color: #ef4444;
          padding-right: 3rem;
        }

        .collections-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .collections-close:hover {
          background: #dc2626;
          transform: rotate(90deg);
        }

        .collections-content {
          padding: 2rem;
          position: relative;
        }

        .collections-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .collections-item {
          font-size: 1.5rem;
          font-weight: bold;
          color: #111827;
          text-decoration: none;
          transition: all 0.3s;
          padding: 0.5rem 0;
        }

        .collections-item:hover {
          color: #ef4444;
          transform: translateX(0.5rem);
        }

        .collections-featured {
          margin-top: 3rem;
        }

        .collections-product-card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 2px solid #111827;
          position: relative;
        }

        .collections-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #7c3aed;
          color: white;
          font-weight: bold;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          z-index: 10;
        }

        .collections-product-image {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 16rem;
        }

        .collections-product-image img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .collections-product-name {
          text-align: center;
          font-size: 1.25rem;
          font-weight: bold;
          color: #111827;
          padding: 1.5rem;
          border-top: 2px solid #111827;
        }

        .collections-swirl {
          position: absolute;
          bottom: 4rem;
          right: 2rem;
          width: 8rem;
          height: 8rem;
          pointer-events: none;
        }

        /* About Section */
        .about-section {
          position: relative;
          background: linear-gradient(to right, #fcd34d, #fbbf24);
          padding: 2rem 1rem;
          overflow: hidden;
        }

        .about-swirl-1 {
          position: absolute;
          top: 5rem;
          left: 33.333%;
          width: 12rem;
          height: 12rem;
          opacity: 0.3;
        }

        .about-swirl-2 {
          position: absolute;
          bottom: 5rem;
          right: 5rem;
          width: 8rem;
          height: 8rem;
          opacity: 0.3;
        }

        .about-container {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 768px) {
          .about-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .about-content {
          position: relative;
          z-index: 10;
        }

        .about-heading {
          font-size: 3rem;
          font-weight: bold;
          color: #ef4444;
          margin-bottom: 1rem;
        }

        .about-subheading {
          font-size: 2.2rem;
          font-weight: bold;
          color: #111827;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .about-text {
          font-size: 1.125rem;
          color: #1f2937;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .about-button {
          margin-top: 2rem;
          background: linear-gradient(to right, #ef4444, #dc2626);
          color: white;
          font-weight: bold;
          padding: 1rem 3rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .about-button:hover {
          background: linear-gradient(to right, #dc2626, #b91c1c);
          transform: scale(1.05);
        }

        .about-images {
          position: relative;
          z-index: 10;
        }

        .about-logo-badge {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -2rem);
          z-index: 20;
          background: white;
          border-radius: 9999px;
          padding: 0.75rem 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .about-logo-text {
          font-size: 1.875rem;
          font-weight: bold;
          color: #ef4444;
        }

        .about-image-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 3rem;
        }

        .about-image-card {
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .about-image-card img {
          width: 100%;
          height: 16rem;
          object-fit: cover;
        }

        .about-image-card-tall {
          grid-row: span 2;
        }

        .about-image-card-tall img {
          height: 100%;
        }

        /* Favorites Section */
        .favorites-section {
          position: relative;
          background: #fef3c7;
          padding: 2rem 1rem;
          overflow: hidden;
        }

        .favorites-decor-1 {
          position: absolute;
          top: 0;
          left: 0;
          width: 24rem;
          height: 24rem;
        }

        .favorites-decor-2 {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 24rem;
          height: 24rem;
        }

        .favorites-container {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
        }

        .favorites-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .favorites-logo-badge {
          display: inline-block;
          background: white;
          border-radius: 9999px;
          padding: 0.75rem 2rem;
          margin-bottom: 1.5rem;
        }

        .favorites-logo-text {
          font-size: 2.25rem;
          font-weight: bold;
          color: #ef4444;
        }

        .favorites-title {
          font-size: 3rem;
          font-weight: bold;
          color: #1e3a8a;
          margin-bottom: 1rem;
        }

        .favorites-subtitle {
          font-size: 1.25rem;
          color: #374151;
        }

        .countdown-banner {
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .countdown-inner {
          position: relative;
          height: 31.25rem;
        }

        .countdown-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .countdown-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .countdown-heading {
          font-size: 2.2rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1.5rem;
        }

        .countdown-boxes {
          display: flex;
          gap: 1rem;
        }

        .countdown-box {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          min-width: 100px;
          text-align: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .countdown-box-blue {
          background: #60a5fa;
        }

        .countdown-number {
          font-size: 3rem;
          font-weight: bold;
          color: #ef4444;
        }

        .countdown-number-white {
          color: white;
        }

        .countdown-label {
          font-size: 0.875rem;
          color: #374151;
          margin-top: 0.5rem;
        }

        .countdown-label-white {
          color: white;
        }

        /* Promotional Banner Section */
        .promo-banner-section {
          position: relative;
          background: #fef3c7;
          padding: 2rem 1rem;
          overflow: hidden;
        }

        .promo-banner-container {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          border-radius: 2rem;
          overflow: hidden;
        }

        .promo-banner-content {
          position: relative;
          min-height: 32rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 2rem;
        }

        .promo-banner-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .promo-banner-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
        }

        .promo-banner-logo {
          position: relative;
          z-index: 10;
          background: white;
          border-radius: 9999px;
          padding: 0.75rem 2rem;
          margin-bottom: 2rem;
          display: inline-block;
        }

        .promo-banner-title {
          position: relative;
          z-index: 10;
          font-size: 3rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .promo-banner-subtitle {
          position: relative;
          z-index: 10;
          font-size: 1.25rem;
          color: white;
          margin-bottom: 2rem;
          max-width: 42rem;
          line-height: 1.6;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
        }

        .promo-banner-button {
          position: relative;
          z-index: 10;
          background: linear-gradient(to right, #ef4444, #dc2626);
          color: white;
          font-weight: bold;
          font-size: 1.125rem;
          padding: 1rem 3rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .promo-banner-button:hover {
          background: linear-gradient(to right, #dc2626, #b91c1c);
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .promo-banner-title {
            font-size: 2.5rem;
          }
          
          .promo-banner-subtitle {
            font-size: 1rem;
          }
        }

        /* Newsletter Section */
        .newsletter-section {
          position: relative;
          background: linear-gradient(to right, #fcd34d, #fbbf24);
          padding: 2rem 1rem;
          overflow: hidden;
        }

        .newsletter-swirl-1 {
          position: absolute;
          top: 2.5rem;
          left: 2.5rem;
          width: 8rem;
          height: 8rem;
        }

        .newsletter-swirl-2 {
          position: absolute;
          top: 2.5rem;
          right: 2.5rem;
          width: 10rem;
          height: 10rem;
        }

        .newsletter-container {
          position: relative;
          z-index: 10;
          max-width: 56rem;
          margin: 0 auto;
          text-align: center;
        }

        .newsletter-logo-badge {
          display: inline-block;
          background: white;
          border-radius: 9999px;
          padding: 0.75rem 2rem;
          margin-bottom: 1.5rem;
        }

        .newsletter-logo-text {
          font-size: 1.875rem;
          font-weight: bold;
          color: #ef4444;
        }

        .newsletter-heading {
          font-size: 2.2rem;
          font-weight: bold;
          color: #111827;
          margin-bottom: 1rem;
        }

        .newsletter-text {
          font-size: 1.125rem;
          color: #1f2937;
          margin-bottom: 2rem;
        }

        .newsletter-form-container {
          max-width: 42rem;
          margin: 0 auto;
        }

        .newsletter-form {
          position: relative;
          background: white;
          border-radius: 9999px;
          padding: 0.5rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border: 4px solid black;
        }

        .newsletter-form-inner {
          display: flex;
          align-items: center;
        }

        .newsletter-input {
          flex: 1;
          padding: 1rem 1.5rem;
          background: transparent;
          outline: none;
          color: #374151;
          border: none;
          font-size: 1rem;
        }

        .newsletter-input::placeholder {
          color: #9ca3af;
        }

        .newsletter-button {
          background: linear-gradient(to right, #ef4444, #dc2626);
          color: white;
          font-weight: bold;
          padding: 1rem 2rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .newsletter-button:hover {
          background: linear-gradient(to right, #dc2626, #b91c1c);
          transform: scale(1.05);
        }

        /* Footer */
        .footer-section {
          background: linear-gradient(to right, #fcd34d, #fbbf24);
          padding: 2rem 1rem;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .footer-links {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .footer-column h4 {
          font-weight: bold;
          color: #111827;
          margin-bottom: 1rem;
          font-size: 1.125rem;
        }

        .footer-column ul {
          list-style: none;
        }

        .footer-column li {
          margin-bottom: 0.5rem;
        }

        .footer-column a {
          color: #1f2937;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-column a:hover {
          color: #ef4444;
        }

        .footer-column a.underlined {
          text-decoration: underline;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid #eab308;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
          }
        }

        .footer-social {
          display: flex;
          gap: 1rem;
        }

        .footer-social a {
          color: #111827;
          transition: color 0.3s;
        }

        .footer-social a:hover {
          color: #ef4444;
        }

        .footer-payment {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .payment-badge {
          background: white;
          border-radius: 0.25rem;
          padding: 0.25rem 0.5rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          font-weight: bold;
          font-size: 0.75rem;
        }

        .payment-amex {
          color: #2563eb;
        }

        .payment-apple {
          color: #111827;
        }

        .payment-diners {
          color: #2563eb;
        }

        .payment-discover {
          color: #ea580c;
        }

        .payment-google {
          color: #111827;
        }

        .payment-mastercard {
          color: #dc2626;
        }

        .payment-shop {
          color: #7c3aed;
        }

        .payment-visa {
          color: #1e3a8a;
        }

        .footer-currency {
          border: 2px solid #111827;
          border-radius: 9999px;
          padding: 0.5rem 1.5rem;
          background: none;
          color: #111827;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s;
        }

        .footer-currency:hover {
          background: #111827;
          color: #fbbf24;
        }

        /* Scroll to Top Button */
        .scroll-top-button {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 50;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          padding: 1rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
        }

        .scroll-top-button:hover {
          background: #dc2626;
          transform: scale(1.1);
        }

        /* Discount Popup */
        .discount-popup {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 50;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          max-width: 20rem;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }

        .discount-close {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          color: #9ca3af;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s;
        }

        .discount-close:hover {
          color: #4b5563;
        }

        .discount-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .discount-label {
          font-size: 0.875rem;
          color: #4b5563;
          font-weight: 500;
        }

        .discount-amount {
          font-size: 2.25rem;
          font-weight: bold;
          color: #ef4444;
        }

        /* Email Popup Modal */
        .email-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-out;
        }

        .email-popup {
          position: relative;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          border: 4px solid #ef4444;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          padding: 3rem 2.5rem;
          max-width: 600px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes popIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .email-popup-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1.25rem;
          font-weight: bold;
        }

        .email-popup-close:hover {
          background: #dc2626;
          transform: rotate(90deg);
        }

        .email-popup-logo {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .email-popup-title {
          font-size: 2rem;
          font-weight: bold;
          color: #111827;
          text-align: center;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .email-popup-subtitle {
          font-size: 1.125rem;
          font-weight: 600;
          color: #ef4444;
          text-align: center;
          margin-bottom: 2rem;
        }

        .email-popup-form {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .email-popup-input {
          flex: 1;
          min-width: 200px;
          padding: 0.875rem 1.5rem;
          border: 2px solid #111827;
          border-radius: 9999px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
        }

        .email-popup-input:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .email-popup-input::placeholder {
          color: #9ca3af;
        }

        .email-popup-button {
          background: #ef4444;
          color: white;
          font-weight: bold;
          padding: 0.875rem 2.5rem;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .email-popup-button:hover {
          background: #dc2626;
          transform: scale(1.05);
        }

        @media (max-width: 640px) {
          .email-popup {
            padding: 2rem 1.5rem;
          }

          .email-popup-title {
            font-size: 1.5rem;
          }

          .email-popup-subtitle {
            font-size: 1rem;
          }

          .email-popup-form {
            flex-direction: column;
          }

          .email-popup-input,
          .email-popup-button {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 4rem;
          }
          
          .marquee-text {
            font-size: 3rem;
          }
          
          .about-heading {
            font-size: 3rem;
          }
          
          .about-subheading {
            font-size: 2rem;
          }
          
          .favorites-title {
            font-size: 2.5rem;
          }
          
          .countdown-heading {
            font-size: 2rem;
          }
          
          .newsletter-heading {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="hero-section">
        <nav 
          className={`nav-container ${navCollapsed && !navHovered ? 'collapsed' : ''}`}
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
        >
          <div className="nav-inner">
            <div className="nav-left">
              <button 
                className="nav-button"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              >
                <span>Shop</span>
                <ChevronDown size={16} />
              </button>
              <button 
                className="nav-button"
                onClick={() => setCollectionsSidebarOpen(true)}
              >
                <span>Collections</span>
                <ChevronDown size={16} />
              </button>
              <button className="nav-button">About Us</button>
              <button className="nav-button">Blog</button>
            </div>

            <div className="nav-logo">
              <img 
                src={gullakLogo} 
                alt="Gullak - The Toy House" 
                style={{ height: '50px', width: 'auto' }}
              />
            </div>

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

        <div className="hero-slides-container">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ background: slide.bg }}
            >
              <svg className="hero-background-svg" viewBox="0 0 1440 800" preserveAspectRatio="none">
                <path d="M0,400 Q360,200 720,400 T1440,400 L1440,0 L0,0 Z" fill="#F59E0B" opacity="0.3"/>
                <path d="M0,600 Q360,400 720,600 T1440,600 L1440,800 L0,800 Z" fill="#DC2626" opacity="0.2"/>
              </svg>

              <div className="hero-content">
                <h1 className="hero-title">
                  Playtime Is<br />Best Time!
                </h1>

                <div className="hero-bear-container">
                  <div className="hero-bear-circle">🧸</div>
                </div>
              </div>

              <div className="decorative-plus-1">+</div>
              <div className="decorative-plus-2">+</div>
            </div>
          ))}
        </div>

        <button className="carousel-button carousel-button-prev" onClick={prevSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button className="carousel-button carousel-button-next" onClick={nextSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <div className="banner-section">
        <div className="marquee-container">
          <span className="marquee-text">CRAFTING SMILES, ONE TOY AT A TIME</span>
          <span className="marquee-text">CRAFTING SMILES, ONE TOY AT A TIME</span>
          <span className="marquee-text">CRAFTING SMILES, ONE TOY AT A TIME</span>
        </div>
      </div>

      <div className="categories-section">
        <div className="categories-grid">
          <div className="category-card">
            <img 
              src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&h=400&fit=crop" 
              alt="Plush toys" 
              className="category-image"
            />
          </div>
          
          <div className="category-card category-card-blue">
            <div className="category-logo-badge">
              <h2 className="category-logo-text">Featured</h2>
            </div>
          </div>
          
          <div className="category-card">
            <img 
              src="https://images.unsplash.com/photo-1587912781763-9b857c226797?w=600&h=400&fit=crop" 
              alt="Crochet toys" 
              className="category-image"
            />
          </div>

          <div className="category-card">
            <img 
              src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&h=500&fit=crop" 
              alt="Baby toys" 
              className="category-image"
            />
          </div>
          
          <div className="category-card category-card-pink">
            <h2 className="category-title">Best Sellers</h2>
          </div>
          
          <div className="category-card">
            <img 
              src="https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=600&h=400&fit=crop" 
              alt="Stuffed animals" 
              className="category-image"
            />
          </div>

          <div className="category-card category-card-green">
            <h2 className="category-title">New Collection</h2>
          </div>
          
          <div className="category-card">
            <img 
              src="https://images.unsplash.com/photo-1558329420-d6f1a0d269d8?w=600&h=400&fit=crop" 
              alt="Plush sheep" 
              className="category-image"
            />
          </div>
          
          <div className="category-card category-card-orange">
            <h2 className="category-title">Trending</h2>
          </div>
        </div>
      </div>

      <div className="showcase-section">
        <div className="showcase-decor-right">
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            <path d="M 30,50 Q 40,20 60,40 Q 80,60 50,70 Q 20,80 30,50" stroke="#16a34a" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="showcase-container">
          <div className="showcase-header">
            <h2 className="showcase-title">Our Favourite Collections</h2>
            
            <div className="showcase-tabs">
              <button className="showcase-tab active">Stuffed Toys</button>
              <button className="showcase-tab">Accessories</button>
              <button className="showcase-tab">Clothes</button>
              <button className="showcase-tab">Footwear</button>
            </div>
          </div>

          <div className="showcase-products">
            <div className="product-card">
              <div className="product-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1563373726-c07fcb50e0ee?w=400&h=400&fit=crop" 
                  alt="Crochet Cuddly Bunny"
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">Crochet Cuddly Bunny</h3>
                <p className="product-price">$24.99</p>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1587912781763-9b857c226797?w=400&h=400&fit=crop" 
                  alt="Crochet Bear"
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">Crochet Bear</h3>
                <p className="product-price">$29.99</p>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image-container">
                <div className="product-badge">Save $5</div>
                <img 
                  src="https://images.unsplash.com/photo-1558329420-d6f1a0d269d8?w=400&h=400&fit=crop" 
                  alt="Crochet Hippo"
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">Crochet Hippo</h3>
                <p className="product-price">
                  <span className="product-price-sale">$19.99</span>
                  <span className="product-price-original">$24.99</span>
                </p>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image-container">
                <div className="product-badge">Save $11</div>
                <img 
                  src="https://images.unsplash.com/photo-1563373726-c07fcb50e0ee?w=400&h=400&fit=crop" 
                  alt="Crochet Bunny with a Bow"
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">Crochet Bunny with a Bow</h3>
                <p className="product-price">
                  <span className="product-price-sale">$18.99</span>
                  <span className="product-price-original">$29.99</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-swirl-1">
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            <path d="M 30,50 Q 40,20 60,40 Q 80,60 50,70 Q 20,80 30,50" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="about-swirl-2">
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            <path d="M 30,20 Q 50,10 60,30 Q 70,50 50,60" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="about-container">
          <div className="about-content">
            <h2 className="about-heading">About Us</h2>
            <h3 className="about-subheading">Hard Work and a Passion for Quality</h3>
            <p className="about-text">
              Toyo has established itself as a premier destination for parents and caregivers seeking top-quality baby clothes, footwear, stuffed toys, and accessories.
            </p>
            <p className="about-text">
              With a commitment to providing a delightful shopping experience and a wide range of meticulously curated products.
            </p>
            <button className="about-button">Learn More</button>
          </div>

          <div className="about-images">
            <div className="about-image-grid">
              <div className="about-image-card">
                <img 
                  src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop" 
                  alt="Mother with baby"
                />
              </div>
              
              <div className="about-image-card about-image-card-tall">
                <img 
                  src="https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=400&h=600&fit=crop" 
                  alt="Plush giraffe and lamb"
                />
              </div>
              
              <div className="about-image-card">
                <img 
                  src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop" 
                  alt="Baby playing with toys"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="favorites-section">
        <div className="favorites-decor-1">
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
            <path d="M 0,100 Q 50,50 100,100" stroke="#4F46E5" strokeWidth="20" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="favorites-decor-2">
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
            <path d="M 100,0 Q 150,50 200,100" stroke="#EC4899" strokeWidth="20" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="favorites-container">
          <div className="favorites-header">
            <h2 className="favorites-title">Favorites of the Season</h2>
            <p className="favorites-subtitle">Explore our most beloved products now.</p>
          </div>

          <div className="countdown-banner">
            <div className="countdown-inner">
              <img 
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1400&h=500&fit=crop" 
                alt="Children playing with toys" 
                className="countdown-image"
              />
              <div className="countdown-overlay">
                <h3 className="countdown-heading">Don't Miss the Final Sale!</h3>
                <div className="countdown-boxes">
                  <div className="countdown-box">
                    <div className="countdown-number">00</div>
                    <div className="countdown-label">Days</div>
                  </div>
                  <div className="countdown-box">
                    <div className="countdown-number">00</div>
                    <div className="countdown-label">Hours</div>
                  </div>
                  <div className="countdown-box">
                    <div className="countdown-number">00</div>
                    <div className="countdown-label">Minutes</div>
                  </div>
                  <div className="countdown-box countdown-box-blue">
                    <div className="countdown-number countdown-number-white">00</div>
                    <div className="countdown-label countdown-label-white">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="promo-banner-section">
        <div className="promo-banner-container">
          <div className="promo-banner-content">
            <img 
              src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1400&h=600&fit=crop" 
              alt="Children with toys" 
              className="promo-banner-bg"
            />
            <div className="promo-banner-overlay"></div>
            


            <h2 className="promo-banner-title">Save Up to 50%</h2>
            <p className="promo-banner-subtitle">
              Our curated collections are meant to inspire your creative side and provide you.
            </p>
            <button className="promo-banner-button">Shop Now</button>
          </div>
        </div>
      </div>

      <div className="newsletter-section">
        <div className="newsletter-swirl-1">
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            <path d="M 20,50 Q 30,20 50,30 Q 70,40 60,60 Q 50,80 30,70" stroke="#EC4899" strokeWidth="8" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="newsletter-swirl-2">
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            <path d="M 30,20 Q 50,10 60,30 Q 70,50 50,60" stroke="#EF4444" strokeWidth="8" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="newsletter-container">
          <h2 className="newsletter-heading">Sign Up to the Newsletter</h2>
          <p className="newsletter-text">
            Be the first to get notified about New Arrivals, Discounts, and Bargain Deals!
          </p>
          
          <div className="newsletter-form-container">
            <div className="newsletter-form">
              <div className="newsletter-form-inner">
                <input
                  type="email"
                  placeholder="Add Your E-Mail Here"
                  className="newsletter-input"
                />
                <button className="newsletter-button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-links">
            <div className="footer-column">
              <h4>Home</h4>
              <ul>
                <li><a href="#" className="underlined">Home</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Policy</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Shop</h4>
              <ul>
                <li><a href="#">Best Sellers</a></li>
                <li><a href="#">Trending</a></li>
                <li><a href="#">New Collection</a></li>
                <li><a href="#">Favorites</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>About Us</h4>
              <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact Us</h4>
              <ul>
                <li><a href="#">Customer Service</a></li>
                <li><a href="#">Gifts Page</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
                <li><a href="#">Shipping Information</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-social">
              <a href="#">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>

            <div className="footer-payment">
              <div className="payment-badge payment-amex">AMEX</div>
              <div className="payment-badge payment-apple">Apple Pay</div>
              <div className="payment-badge payment-diners">Diners Club</div>
              <div className="payment-badge payment-discover">DISCOVER</div>
              <div className="payment-badge payment-google">Google Pay</div>
              <div className="payment-badge payment-mastercard">Mastercard</div>
              <div className="payment-badge payment-shop">Shop Pay</div>
              <div className="payment-badge payment-visa">VISA</div>
            </div>

            <button className="footer-currency">
              <span>United States USD $</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </footer>

      <button className="scroll-top-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {showDiscount && (
        <div className="discount-popup">
          <button onClick={() => setShowDiscount(false)} className="discount-close">
            <X size={20} />
          </button>
          <div className="discount-content">
            <p className="discount-label">Welcome Discount</p>
            <h2 className="discount-amount">Get 10% Off</h2>
          </div>
        </div>
      )}

      {showEmailPopup && (
        <div className="email-popup-overlay" onClick={() => setShowEmailPopup(false)}>
          <div className="email-popup" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowEmailPopup(false)} className="email-popup-close">
              ×
            </button>

            <div className="email-popup-logo">
              <img 
                src={gullakLogo} 
                alt="Gullak - The Toy House" 
                style={{ height: '50px', width: 'auto' }}
              />
            </div>

            <h2 className="email-popup-title">
              Get 10% Off Your First Order!
            </h2>
            <p className="email-popup-subtitle">
              Sign Up And Get 10% Off Your First Order
            </p>

            <form className="email-popup-form" onSubmit={(e) => { e.preventDefault(); setShowEmailPopup(false); }}>
              <input
                type="email"
                placeholder="Add Your E-Mail Here"
                className="email-popup-input"
                required
              />
              <button type="submit" className="email-popup-button">
                Subscribe
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}