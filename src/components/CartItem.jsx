function CartItem({item, onRemove}) {
    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title}/>
            <div className="cart-item-info">
                <h4>{item.title}</h4>
                <div className="price">${item.price.toFixed(2)}</div>
                <button
                    className="btn btn-danger"
                    onClick={() => onRemove(item.id)}
                >
                    O'chirish
                </button>
            </div>
        </div>
    );
}

export default CartItem;
