// Profile components for different scientists
function ProfileAklilu() {
  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <img 
        src="https://i.imgur.com/lICfvbD.jpg" 
        alt="Aklilu Lemma"
        style={{ 
          width: '150px', 
          height: '150px', 
          borderRadius: '50%', 
          objectFit: 'cover',
          border: '3px solid #007bff'
        }}
      />
      <h3 style={{ margin: '10px 0', color: '#2c3e50' }}>Aklilu Lemma</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>Ethiopian scientist and physician</p>
    </div>
  );
}

function ProfileKatsuko() {
  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <img 
        src="https://i.imgur.com/jA8hHMpm.jpg" 
        alt="Katsuko Saruhashi"
        style={{ 
          width: '150px', 
          height: '150px', 
          borderRadius: '50%', 
          objectFit: 'cover',
          border: '3px solid #007bff'
        }}
      />
      <h3 style={{ margin: '10px 0', color: '#2c3e50' }}>Katsuko Saruhashi</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>Japanese geochemist</p>
    </div>
  );
}

function ProfileAlan() {
  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
      <img 
        src="https://i.imgur.com/QIrZWGIs.jpg" 
        alt="Alan L. Hart"
        style={{ 
          width: '150px', 
          height: '150px', 
          borderRadius: '50%', 
          objectFit: 'cover',
          border: '3px solid #007bff'
        }}
      />
      <h3 style={{ margin: '10px 0', color: '#2c3e50' }}>Alan L. Hart</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>American physician and writer</p>
    </div>
  );
}

function Gallery() {
  return (
    <section style={{
      backgroundColor: '#f8f9fa',
      padding: '30px',
      borderRadius: '10px',
      border: '2px solid #007bff',
      margin: '20px auto',
      maxWidth: '800px'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#2c3e50',
        marginBottom: '30px',
        fontSize: '28px'
      }}>
        🧬 Amazing Scientists
      </h1>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <ProfileAklilu />
        <ProfileKatsuko />
        <ProfileAlan />
      </div>
    </section>
  );
}

function Congratulations() {
  return (
    <div style={{
      textAlign: 'center',
      backgroundColor: '#d4edda',
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #28a745',
      margin: '20px auto',
      maxWidth: '600px'
    }}>
      <h1 style={{ 
        color: '#155724',
        fontSize: '32px',
        margin: '0'
      }}>
        🎉 Good job!
      </h1>
      <p style={{ 
        color: '#155724',
        fontSize: '18px',
        marginTop: '10px'
      }}>
        You've successfully completed the React Components Challenge!
      </p>
    </div>
  );
}

export default function LearningReactChallenges() {
  return (
    <div style={{ margin: '40px 0' }}>
      <div style={{
        textAlign: 'center',
        backgroundColor: '#fff3cd',
        padding: '20px',
        borderRadius: '10px',
        border: '2px solid #ffc107',
        margin: '20px auto',
        maxWidth: '800px'
      }}>
        <h2 style={{ 
          color: '#856404',
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '0 0 10px 0'
        }}>
          📚 LEARNING React - ทำ Challenges แต่ละหัวข้อ à Project
        </h2>
        <h3 style={{ 
          color: '#856404',
          fontSize: '20px',
          margin: '0'
        }}>
          🧩 Assignment 2.1: Component Challenge
        </h3>
      </div>
      
      <Gallery />
      <Congratulations />
    </div>
  );
}
