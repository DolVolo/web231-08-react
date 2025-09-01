import GPACalculator from './GPACalculator';

export default function GPAAssignmentSection() {
  return (
    <div style={{ margin: '40px 0' }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#000000',
        backgroundColor: '#ffe6e6',
        padding: '15px',
        borderRadius: '8px',
        border: '2px solid #dc3545',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        🎯 Assignment: GPA Calculator
      </h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#000000', 
          textAlign: 'center', 
          marginBottom: '20px',
          backgroundColor: '#fff5f5',
          padding: '12px',
          borderRadius: '8px',
          border: '2px solid #dc3545',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          📚 Course & Grade Management with GPA Calculation
        </h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '20px' 
        }}>
          <GPACalculator />
        </div>
      </div>
    </div>
  );
}
