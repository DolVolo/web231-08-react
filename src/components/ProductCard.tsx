// Component 4: Product Card (Props with different data types)
function ProductCard({ 
  name, 
  price, 
  discount, 
  image, 
  inStock, 
  rating 
}: { 
  name: string; 
  price: number; 
  discount?: number; 
  image: string; 
  inStock: boolean; 
  rating: number 
}) {
  const finalPrice = discount ? price - (price * discount / 100) : price;
  
  return (
    <div style={{
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      maxWidth: '300px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <span style={{ fontSize: '60px' }}>{image}</span>
      </div>
      <h3 style={{ color: '#333', margin: '10px 0' }}>{name}</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <span style={{ color: '#ffd700', marginRight: '5px' }}>
          {'⭐'.repeat(Math.floor(rating))}
        </span>
        <span style={{ color: '#666' }}>({rating}/5)</span>
      </div>

      <div style={{ margin: '10px 0' }}>
        {discount ? (
          <div>
            <span style={{ 
              textDecoration: 'line-through', 
              color: '#999', 
              marginRight: '10px' 
            }}>
              ฿{price}
            </span>
            <span style={{ 
              color: '#e74c3c', 
              fontWeight: 'bold', 
              fontSize: '18px' 
            }}>
              ฿{finalPrice.toFixed(2)}
            </span>
            <span style={{ 
              backgroundColor: '#e74c3c', 
              color: 'white', 
              padding: '2px 6px', 
              borderRadius: '4px', 
              fontSize: '12px', 
              marginLeft: '10px' 
            }}>
              -{discount}%
            </span>
          </div>
        ) : (
          <span style={{ 
            color: '#2ecc71', 
            fontWeight: 'bold', 
            fontSize: '18px' 
          }}>
            ฿{price}
          </span>
        )}
      </div>

      <div style={{ 
        padding: '8px 12px', 
        borderRadius: '6px', 
        textAlign: 'center',
        backgroundColor: inStock ? '#d4edda' : '#f8d7da',
        color: inStock ? '#155724' : '#721c24',
        border: `1px solid ${inStock ? '#c3e6cb' : '#f5c6cb'}`
      }}>
        {inStock ? '✅ In Stock' : '❌ Out of Stock'}
      </div>
    </div>
  )
}

export default ProductCard;
