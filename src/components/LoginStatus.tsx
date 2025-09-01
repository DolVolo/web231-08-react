// Component 8: Login Status (Conditional with user data)
function LoginStatus({ 
  user 
}: { 
  user: { name: string; role: string } | null 
}) {
  if (!user) {
    return (
      <div style={{
        border: '2px solid #ffc107',
        borderRadius: '10px',
        padding: '20px',
        margin: '10px',
        backgroundColor: '#fff3cd',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#856404', margin: '0 0 10px 0' }}>
          🔒 Please Login
        </h3>
        <button style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{
      border: '2px solid #28a745',
      borderRadius: '10px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#d4edda',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#155724', margin: '0 0 10px 0' }}>
        👋 Welcome back, {user.name}!
      </h3>
      <p style={{ color: '#155724', margin: '5px 0' }}>
        Role: {user.role === 'admin' ? '👑 Administrator' : '👤 User'}
      </p>
      {user.role === 'admin' && (
        <div style={{ marginTop: '10px' }}>
          <button style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}>
            Admin Panel
          </button>
        </div>
      )}
      <button style={{
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Logout
      </button>
    </div>
  );
}

export default LoginStatus;
