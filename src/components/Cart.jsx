import { useState, useEffect, useCallback } from 'react';
import CartList from './CartList';

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error('Savatni yuklashda xatolik:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        alert('Bu mahsulot allaqachon savatda!');
        return prevItems;
      }

      return [...prevItems, product];
    });
  }, []);

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  useEffect(() => {
    window.addToCart = addToCart;
    return () => {
      delete window.addToCart;
    };
  }, [addToCart]);

  return (
    <div className="cart-section">
      <h2>Savat</h2>

      <CartList items={cartItems} onRemove={removeFromCart} />

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>Mahsulotlar soni:</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="cart-summary-row total">
            <span>Jami:</span>
            <span className="amount">${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
