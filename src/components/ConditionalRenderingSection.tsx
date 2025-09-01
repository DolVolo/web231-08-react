import { useState } from 'react';
import StatusBadge from './StatusBadge';
import WeatherWidget from './WeatherWidget';
import LoginStatus from './LoginStatus';
import NotificationList from './NotificationList';

export default function ConditionalRenderingSection() {
  const [isUserActive, setIsUserActive] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>({
    name: "John Doe",
    role: "admin"
  });

  const weatherData = [
    { temperature: 32, condition: 'sunny' as const },
    { temperature: 18, condition: 'rainy' as const },
    { temperature: 5, condition: 'snowy' as const },
    { temperature: 22, condition: 'cloudy' as const }
  ];

  const notifications = [
    { id: 1, message: "Your profile has been updated successfully", type: 'info' as const },
    { id: 2, message: "Warning: Your subscription expires in 3 days", type: 'warning' as const },
    { id: 3, message: "Error: Failed to save your changes", type: 'error' as const }
  ];

  return (
    <div style={{ margin: '40px 0' }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#000000',
        backgroundColor: '#e8f5e8',
        padding: '15px',
        borderRadius: '8px',
        border: '2px solid #28a745',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        🔀 Assignment 2.3: Conditional Rendering
      </h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#000000', 
          textAlign: 'center', 
          marginBottom: '20px',
          backgroundColor: '#fff3cd',
          padding: '12px',
          borderRadius: '8px',
          border: '2px solid #ffc107',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          🎛️ Status & Controls
        </h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <StatusBadge isActive={isUserActive} />
          <button 
            onClick={() => setIsUserActive(!isUserActive)}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Toggle Status
          </button>
          <button 
            onClick={() => setCurrentUser(currentUser ? null : { name: "John Doe", role: "admin" })}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Toggle Login
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#000000', 
          textAlign: 'center', 
          marginBottom: '20px',
          backgroundColor: '#d1ecf1',
          padding: '12px',
          borderRadius: '8px',
          border: '2px solid #17a2b8',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          🌤️ Weather Conditions
        </h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '15px' 
        }}>
          {weatherData.map((weather, index) => (
            <WeatherWidget 
              key={index}
              temperature={weather.temperature}
              condition={weather.condition}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#000000', 
          textAlign: 'center', 
          marginBottom: '20px',
          backgroundColor: '#f8d7da',
          padding: '12px',
          borderRadius: '8px',
          border: '2px solid #dc3545',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          🔐 User Authentication & Notifications
        </h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '20px' 
        }}>
          <LoginStatus user={currentUser} />
          <NotificationList notifications={notifications} />
        </div>
      </div>
    </div>
  );
}
