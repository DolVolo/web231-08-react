// Component 9: Notification List (Conditional list rendering)
function NotificationList({ 
  notifications 
}: { 
  notifications: Array<{ id: number; message: string; type: 'info' | 'warning' | 'error' }> 
}) {
  if (notifications.length === 0) {
    return (
      <div style={{
        border: '2px dashed #ccc',
        borderRadius: '10px',
        padding: '30px',
        margin: '10px',
        textAlign: 'center',
        color: '#666'
      }}>
        <h3>📭 No Notifications</h3>
        <p>You're all caught up!</p>
      </div>
    );
  }

  return (
    <div style={{
      border: '2px solid #17a2b8',
      borderRadius: '10px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ color: '#17a2b8', marginTop: '0' }}>
        🔔 Notifications ({notifications.length})
      </h3>
      {notifications.map((notification) => (
        <div key={notification.id} style={{
          padding: '10px',
          margin: '8px 0',
          borderRadius: '5px',
          backgroundColor: 
            notification.type === 'error' ? '#f8d7da' :
            notification.type === 'warning' ? '#fff3cd' : '#d1ecf1',
          color:
            notification.type === 'error' ? '#721c24' :
            notification.type === 'warning' ? '#856404' : '#0c5460',
          border: `1px solid ${
            notification.type === 'error' ? '#f5c6cb' :
            notification.type === 'warning' ? '#faeeba' : '#bee5eb'
          }`
        }}>
          {notification.type === 'error' ? '❌' : 
           notification.type === 'warning' ? '⚠️' : 'ℹ️'} {notification.message}
        </div>
      ))}
    </div>
  );
}

export default NotificationList;
