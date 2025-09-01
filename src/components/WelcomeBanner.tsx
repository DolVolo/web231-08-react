// Component 1: Welcome Banner
function WelcomeBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{
      backgroundColor: '#61dafb',
      color: '#282c34',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      margin: '20px 0'
    }}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  )
}

export default WelcomeBanner;
