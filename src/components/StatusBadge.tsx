// Component 6: Status Badge (Simple conditional rendering)
function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <div style={{
      padding: '8px 16px',
      borderRadius: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: isActive ? '#d4edda' : '#f8d7da',
      color: isActive ? '#155724' : '#721c24',
      border: `2px solid ${isActive ? '#c3e6cb' : '#f5c6cb'}`
    }}>
      {isActive ? '🟢 Active' : '🔴 Inactive'}
    </div>
  );
}

export default StatusBadge;
