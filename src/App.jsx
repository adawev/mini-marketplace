import { useEffect } from 'react';
import Cart from './components/Cart';
import { ProductList } from './components/ProductList';
import './styles/main.css';

function App() {
  useEffect(() => {
    const productList = new ProductList('products-grid', (product) => {
      if (window.addToCart) {
        window.addToCart(product);
      }
    });

    productList.init();
  }, []);

  return (
    <div className="container">
      <h1>Mini Marketplace</h1>

      <div className="marketplace">
        <div className="products-section">
          <h2>Products</h2>
          <div id="products-grid"></div>
        </div>

        <Cart />
      </div>
    </div>
  );
}

export default App;
