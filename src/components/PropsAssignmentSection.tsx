import ProductCard from './ProductCard';
import UserProfile from './UserProfile';

export default function PropsAssignmentSection() {
  const sampleProducts = [
    {
      name: "React Handbook",
      price: 899,
      discount: 20,
      image: "📚",
      inStock: true,
      rating: 4.8
    },
    {
      name: "JavaScript Guide",
      price: 1299,
      image: "💻",
      inStock: false,
      rating: 4.5
    },
    {
      name: "CSS Masterclass",
      price: 599,
      discount: 15,
      image: "🎨",
      inStock: true,
      rating: 4.9
    }
  ];

  const sampleUsers = [
    {
      name: "Alice Johnson",
      age: 25,
      email: "alice@example.com",
      avatar: "👩‍💻",
      skills: ["React", "TypeScript", "Node.js"],
      isOnline: true
    },
    {
      name: "Bob Smith",
      age: 30,
      email: "bob@example.com",
      avatar: "👨‍🎨",
      skills: ["UI/UX", "Figma", "Photoshop", "CSS"],
      isOnline: false
    }
  ];

  return (
    <div style={{ margin: '40px 0' }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#000000',
        backgroundColor: '#fff3cd',
        padding: '15px',
        borderRadius: '8px',
        border: '2px solid #ffc107',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        🎁 Assignment 2.2: Props Practice
      </h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#000000', 
          textAlign: 'center', 
          marginBottom: '20px',
          backgroundColor: '#e3f2fd',
          padding: '12px',
          borderRadius: '8px',
          border: '2px solid #2196f3',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          📦 Product Cards - Props with Different Data Types
        </h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '20px' 
        }}>
          {sampleProducts.map((product, index) => (
            <ProductCard 
              key={index}
              name={product.name}
              price={product.price}
              discount={product.discount}
              image={product.image}
              inStock={product.inStock}
              rating={product.rating}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#000000', 
          textAlign: 'center', 
          marginBottom: '20px',
          backgroundColor: '#f3e5f5',
          padding: '12px',
          borderRadius: '8px',
          border: '2px solid #9c27b0',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          👥 User Profiles - Props with Objects and Arrays
        </h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '20px' 
        }}>
          {sampleUsers.map((user, index) => (
            <UserProfile 
              key={index}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
