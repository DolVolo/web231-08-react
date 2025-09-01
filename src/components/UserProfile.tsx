// Component 5: User Profile (Props with nested objects)
function UserProfile({ 
  user 
}: { 
  user: {
    name: string;
    age: number;
    email: string;
    avatar: string;
    skills: string[];
    isOnline: boolean;
  }
}) {
  return (
    <div style={{
      border: '2px solid #3498db',
      borderRadius: '15px',
      padding: '20px',
      margin: '15px',
      backgroundColor: '#f8fbff',
      maxWidth: '350px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '15px' 
      }}>
        <div style={{ 
          fontSize: '50px', 
          marginRight: '15px' 
        }}>
          {user.avatar}
        </div>
        <div>
          <h3 style={{ color: '#2c3e50', margin: '0 0 5px 0' }}>
            {user.name}
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: user.isOnline ? '#2ecc71' : '#95a5a6',
              display: 'inline-block',
              marginLeft: '10px'
            }}></span>
          </h3>
          <p style={{ color: '#7f8c8d', margin: '0' }}>
            {user.age} years old
          </p>
          <p style={{ color: '#7f8c8d', margin: '5px 0' }}>
            📧 {user.email}
          </p>
        </div>
      </div>
      
      <div>
        <h4 style={{ color: '#34495e', marginBottom: '10px' }}>💼 Skills:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {user.skills.map((skill, index) => (
            <span key={index} style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
