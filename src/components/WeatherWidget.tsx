// Component 7: Weather Widget (Multiple conditions)
function WeatherWidget({ 
  temperature, 
  condition 
}: { 
  temperature: number; 
  condition: 'sunny' | 'rainy' | 'cloudy' | 'snowy' 
}) {
  const getWeatherIcon = () => {
    switch (condition) {
      case 'sunny': return '☀️';
      case 'rainy': return '🌧️';
      case 'cloudy': return '☁️';
      case 'snowy': return '❄️';
      default: return '🌤️';
    }
  };

  const getTemperatureColor = () => {
    if (temperature >= 30) return '#e74c3c'; // Hot - Red
    if (temperature >= 20) return '#f39c12'; // Warm - Orange
    if (temperature >= 10) return '#3498db'; // Cool - Blue
    return '#9b59b6'; // Cold - Purple
  };

  const getTemperatureMessage = () => {
    if (temperature >= 35) return 'Very Hot! Stay hydrated!';
    if (temperature >= 25) return 'Perfect weather!';
    if (temperature >= 15) return 'A bit cool, maybe a light jacket?';
    if (temperature >= 5) return 'Cold! Wear warm clothes!';
    return 'Freezing! Bundle up!';
  };

  return (
    <div style={{
      border: '2px solid #ddd',
      borderRadius: '15px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
      maxWidth: '250px'
    }}>
      <div style={{ fontSize: '60px', marginBottom: '10px' }}>
        {getWeatherIcon()}
      </div>
      <h3 style={{ 
        color: getTemperatureColor(), 
        margin: '10px 0',
        fontSize: '24px'
      }}>
        {temperature}°C
      </h3>
      <p style={{ 
        color: '#666', 
        fontWeight: 'bold',
        textTransform: 'capitalize',
        margin: '10px 0'
      }}>
        {condition}
      </p>
      <p style={{ 
        color: '#333', 
        fontSize: '14px',
        fontStyle: 'italic'
      }}>
        {getTemperatureMessage()}
      </p>
    </div>
  );
}

export default WeatherWidget;
