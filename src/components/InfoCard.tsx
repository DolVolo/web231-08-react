// Component 2: Info Card
function InfoCard({ icon, title, description }: { 
  icon: string; 
  title: string; 
  description: string 
}) {
  return (
    <div style={{
      border: '2px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ color: '#282c34' }}>{icon} {title}</h3>
      <p style={{ color: '#666' }}>{description}</p>
    </div>
  )
}

export default InfoCard;
