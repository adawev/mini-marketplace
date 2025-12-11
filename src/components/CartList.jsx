import CartItem from './CartItem';

function CartList({ items, onRemove }) {
  if (items.length === 0) {
    return (
      <div className="cart-empty">
        Savat bo'sh. Mahsulot qo'shing!
      </div>
    );
  }

  return (
    <div className="cart-items">
      {items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default CartList;
