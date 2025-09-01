// Component 11: Shopping Cart (List with quantities)
function ShoppingCart({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: { 
  items: Array<{ id: number; name: string; price: number; quantity: number; image: string }>;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div style={{
        border: '2px dashed #ccc',
        borderRadius: '12px',
        padding: '30px',
        margin: '10px',
        textAlign: 'center',
        color: '#666',
        maxWidth: '400px'
      }}>
        <h3>🛒 Shopping Cart</h3>
        <p>Your cart is empty</p>
        <p>Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div style={{
      border: '2px solid #28a745',
      borderRadius: '12px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#f8fff8',
      maxWidth: '400px'
    }}>
      <h3 style={{ color: '#28a745', marginTop: '0' }}>
        🛒 Shopping Cart ({totalItems} items)
      </h3>
      
      {items.map(item => (
        <div key={item.id} style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          margin: '8px 0',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}>
          <span style={{ fontSize: '30px', marginRight: '12px' }}>
            {item.image}
          </span>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 4px 0', color: '#333' }}>{item.name}</h4>
            <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
              ฿{item.price} each
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              -
            </button>
            <span style={{ 
              minWidth: '30px', 
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              +
            </button>
            <button
              onClick={() => onRemoveItem(item.id)}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '12px',
                marginLeft: '8px'
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      
      <div style={{
        borderTop: '2px solid #28a745',
        paddingTop: '12px',
        marginTop: '12px',
        textAlign: 'right'
      }}>
        <h4 style={{ margin: '0', color: '#28a745' }}>
          Total: ฿{totalPrice.toFixed(2)}
        </h4>
      </div>
    </div>
  );
}

export default ShoppingCart;
