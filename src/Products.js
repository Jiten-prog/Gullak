import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/common.css';

const categoryData = {
  'plush-toys': {
    name: 'Plush Toys',
    products: [
      { id: 1, name: 'Soft Teddy Bear', price: 29.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=400&fit=crop', colors: ['#8b4513', '#d2b48c', '#a0522d', '#cd853f'], discount: null },
      { id: 2, name: 'Plush Bunny', price: 24.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1587912781763-9b857c226797?w=400&h=400&fit=crop', colors: ['#ffffff', '#ffc0cb', '#d3d3d3', '#ffff00'], discount: null },
      { id: 3, name: 'Stuffed Elephant', price: 34.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=400&h=400&fit=crop', colors: ['#808080', '#a9a9a9', '#696969', '#2f4f4f'], discount: null },
      { id: 4, name: 'Soft Sheep', price: 19.99, originalPrice: 24.99, image: 'https://images.unsplash.com/photo-1558329420-d6f1a0d269d8?w=400&h=400&fit=crop', colors: ['#ffffff', '#f5f5dc', '#fffacd', '#ffefd5'], discount: 5 },
    ]
  },
  'crochet': {
    name: 'Crochet Toys',
    products: [
      { id: 5, name: 'Crochet Bunny', price: 24.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1563373726-c07fcb50e0ee?w=400&h=400&fit=crop', colors: ['#ffffff', '#ffc0cb', '#d3d3d3', '#ffff00'], discount: null },
      { id: 6, name: 'Crochet Bear', price: 25.00, originalPrice: null, image: 'https://images.unsplash.com/photo-1587912781763-9b857c226797?w=400&h=400&fit=crop', colors: ['#808080', '#800080', '#8b4513', '#008000'], discount: null },
      { id: 7, name: 'Crochet Hippo', price: 19.99, originalPrice: 24.99, image: 'https://images.unsplash.com/photo-1558329420-d6f1a0d269d8?w=400&h=400&fit=crop', colors: ['#ffffff', '#800080', '#20b2aa', '#008000'], discount: 5 },
      { id: 8, name: 'Crochet Llama', price: 25.00, originalPrice: 33.00, image: 'https://images.unsplash.com/photo-1563373726-c07fcb50e0ee?w=400&h=400&fit=crop', colors: ['#87ceeb', '#ffffff', '#f5f5dc', '#20b2aa'], discount: 8 },
    ]
  },
  'baby-toys': {
    name: 'Baby Toys',
    products: [
      { id: 9, name: 'Baby Rattle', price: 14.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop', colors: ['#ffc0cb', '#87ceeb', '#98fb98', '#ffe4b5'], discount: null },
      { id: 10, name: 'Soft Teether', price: 12.99, originalPrice: 16.99, image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=400&fit=crop', colors: ['#ffc0cb', '#87ceeb', '#98fb98', '#ffe4b5'], discount: 3 },
      { id: 11, name: 'Baby Blocks', price: 18.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1587912781763-9b857c226797?w=400&h=400&fit=crop', colors: ['#ff6347', '#4169e1', '#ffd700', '#32cd32'], discount: null },
      { id: 12, name: 'Soft Rattle Toy', price: 15.99, originalPrice: 19.99, image: 'https://images.unsplash.com/photo-1558329420-d6f1a0d269d8?w=400&h=400&fit=crop', colors: ['#ffc0cb', '#87ceeb', '#98fb98', '#ffe4b5'], discount: 4 },
    ]
  },
  'interactive': {
    name: 'Interactive Toys',
    products: [
      { id: 13, name: 'Musical Toy', price: 39.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=400&fit=crop', colors: ['#ff6347', '#4169e1', '#ffd700', '#32cd32'], discount: null },
      { id: 14, name: 'Light-Up Toy', price: 34.99, originalPrice: 44.99, image: 'https://images.unsplash.com/photo-1587912781763-9b857c226797?w=400&h=400&fit=crop', colors: ['#ff6347', '#4169e1', '#ffd700', '#32cd32'], discount: 10 },
      { id: 15, name: 'Interactive Puzzle', price: 29.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1558329420-d6f1a0d269d8?w=400&h=400&fit=crop', colors: ['#ff6347', '#4169e1', '#ffd700', '#32cd32'], discount: null },
      { id: 16, name: 'Smart Toy', price: 49.99, originalPrice: 59.99, image: 'https://images.unsplash.com/photo-1563373726-c07fcb50e0ee?w=400&h=400&fit=crop', colors: ['#ff6347', '#4169e1', '#ffd700', '#32cd32'], discount: 10 },
    ]
  }
};

function Products() {
  const { category } = useParams();
  const categoryInfo = categoryData[category] || categoryData['plush-toys'];
  const [showDiscount, setShowDiscount] = useState(true);
  const [viewMode, setViewMode] = useState('grid-4');
  const [sortBy, setSortBy] = useState('best-selling');

  return (
    <>
      <Navbar />
      <div style={styles.container}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
        .collection-hero { background: linear-gradient(to bottom right, #ef4444, #f97316); min-height: 50vh; display: flex; align-items: center; justify-content: center; position: relative; }
        .collection-title { font-size: 5rem; font-weight: bold; color: white; text-align: center; position: relative; z-index: 10; }
        .filters-section { background: #fef3c7; padding: 2rem 1rem; }
        .filters-container { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
        .items-count { font-size: 1.125rem; color: #ef4444; font-weight: 600; }
        .filters-bar { display: flex; align-items: center; gap: 1rem; background: white; border: 2px solid #111827; border-radius: 9999px; padding: 0.75rem 1.5rem; flex: 1; max-width: 50rem; flex-wrap: wrap; }
        .filter-button { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; cursor: pointer; font-weight: 600; color: #111827; padding: 0.5rem 1rem; font-size: 1rem; }
        .filter-button:hover { color: #ef4444; }
        .sort-select { background: none; border: none; font-weight: 600; color: #111827; cursor: pointer; padding: 0.5rem; outline: none; font-size: 1rem; }
        .products-section { background: #fef3c7; padding: 2rem 1rem 4rem; }
        .products-container { max-width: 1400px; margin: 0 auto; }
        .products-grid { display: grid; gap: 2rem; margin-bottom: 3rem; grid-template-columns: repeat(4, 1fr); }
        .products-grid.grid-3 { grid-template-columns: repeat(3, 1fr); }
        .products-grid.grid-2 { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 1200px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .collection-title { font-size: 3rem; } .products-grid, .products-grid.grid-3 { grid-template-columns: repeat(2, 1fr); } }
        .product-card { background: white; border: 2px solid #111827; border-radius: 1.5rem; overflow: hidden; transition: all 0.3s; cursor: pointer; }
        .product-card:hover { transform: translateY(-0.5rem); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); }
        .product-image-container { position: relative; padding: 2rem; min-height: 16rem; display: flex; align-items: center; justify-content: center; background: #fafafa; }
        .product-discount-badge { position: absolute; top: 1rem; left: 1rem; background: #7c3aed; color: white; font-weight: bold; padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.875rem; z-index: 10; }
        .product-image { width: 100%; height: auto; max-height: 14rem; object-fit: contain; }
        .product-info { padding: 1.5rem; border-top: 2px solid #111827; text-align: center; }
        .product-name { font-size: 1.125rem; font-weight: bold; color: #111827; margin-bottom: 0.75rem; }
        .product-colors { display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 0.75rem; }
        .color-swatch { width: 1.5rem; height: 1.5rem; border-radius: 50%; border: 2px solid #d1d5db; cursor: pointer; }
        .product-pricing { display: flex; gap: 0.5rem; justify-content: center; align-items: center; }
        .product-price { font-size: 1.25rem; font-weight: bold; color: #ef4444; }
        .product-original-price { font-size: 1rem; color: #9ca3af; text-decoration: line-through; }
        .discount-popup { position: fixed; bottom: 2rem; left: 2rem; z-index: 50; background: white; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); padding: 1.5rem; max-width: 20rem; border: 3px solid #111827; }
        .discount-close { position: absolute; top: 0.75rem; right: 0.75rem; background: #ef4444; color: white; border: none; border-radius: 50%; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .discount-content p { font-size: 0.875rem; color: #4b5563; font-weight: 500; margin-bottom: 0.5rem; }
        .discount-content h2 { font-size: 2rem; font-weight: bold; color: #ef4444; }
      `}</style>

      <div style={styles.heroSection} className="collection-hero">
        <h1 className="collection-title">{categoryInfo.name}</h1>
      </div>

      <div className="filters-section">
        <div className="filters-container">
          <div className="items-count">{categoryInfo.products.length} items</div>
          <div className="filters-bar">
            <button className="filter-button">Color <ChevronDown size={16} /></button>
            <div style={{ width: '1px', height: '1.5rem', background: '#d1d5db' }}></div>
            <button className="filter-button">Price <ChevronDown size={16} /></button>
            <div style={{ width: '1px', height: '1.5rem', background: '#d1d5db' }}></div>
            <span style={{ fontWeight: 600, color: '#111827' }}>Sort By:</span>
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="products-section">
        <div className="products-container">
          <div className={`products-grid ${viewMode}`}>
            {categoryInfo.products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  {product.discount && <div className="product-discount-badge">Save ${product.discount}</div>}
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-colors">
                    {product.colors.map((color, idx) => (
                      <div key={idx} className="color-swatch" style={{ background: color }}></div>
                    ))}
                  </div>
                  <div className="product-pricing">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice && <span className="product-original-price">${product.originalPrice.toFixed(2)}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDiscount && (
        <div className="discount-popup">
          <button onClick={() => setShowDiscount(false)} className="discount-close">
            <X size={16} />
          </button>
          <div className="discount-content">
            <p>Welcome Discount</p>
            <h2>Get 10% Off</h2>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
}

const styles = {
  container: { background: '#fef3c7', minHeight: '100vh' },
  heroSection: { background: 'linear-gradient(to bottom right, #ef4444, #f97316)', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }
};

export default Products;
