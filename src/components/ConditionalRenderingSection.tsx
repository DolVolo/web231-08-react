// Item component with packed status
function Item({ name, isPacked }: { name: string; isPacked: boolean }) {
  return (
    <li style={{
      padding: '8px 0',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#2c3e50'
    }}>
      <span>{name}</span>
      <span style={{ fontSize: '18px' }}>
        {isPacked ? '✅' : '❌'}
      </span>
    </li>
  );
}

function PackingListBasic() {
  return (
    <section style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #007bff',
      margin: '20px',
      maxWidth: '400px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '20px' }}>
        🚀 Sally Ride's Packing List
      </h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}

// Item component with importance level
function ImportantItem({ name, importance }: { name: string; importance: number }) {
  return (
    <li style={{
      padding: '8px 0',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      color: '#2c3e50'
    }}>
      <span>{name}</span>
      {importance > 0 && ' '}
      {importance > 0 && (
        <i style={{ color: '#dc3545', fontSize: '14px' }}>
          (Importance: {importance})
        </i>
      )}
    </li>
  );
}

function PackingListWithImportance() {
  return (
    <section style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #28a745',
      margin: '20px',
      maxWidth: '400px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '20px' }}>
        📊 Sally Ride's Priority List
      </h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <ImportantItem 
          importance={9} 
          name="Space suit" 
        />
        <ImportantItem 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <ImportantItem 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}

// Drink component with conditional content
function Drink({ name }: { name: string }) {
  return (
    <section style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #6f42c1',
      margin: '20px',
      maxWidth: '350px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ 
        color: '#2c3e50', 
        marginBottom: '15px', 
        fontSize: '24px',
        textTransform: 'capitalize'
      }}>
        {name === 'tea' ? '🍵' : '☕'} {name}
      </h1>
      <dl style={{ margin: 0 }}>
        <dt style={{ fontWeight: 'bold', color: '#495057', marginTop: '10px' }}>
          Part of plant
        </dt>
        <dd style={{ margin: '5px 0 10px 20px', color: '#666' }}>
          {name === 'tea' ? 'leaf' : 'bean'}
        </dd>
        <dt style={{ fontWeight: 'bold', color: '#495057', marginTop: '10px' }}>
          Caffeine content
        </dt>
        <dd style={{ margin: '5px 0 10px 20px', color: '#666' }}>
          {name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}
        </dd>
        <dt style={{ fontWeight: 'bold', color: '#495057', marginTop: '10px' }}>
          Age
        </dt>
        <dd style={{ margin: '5px 0 10px 20px', color: '#666' }}>
          {name === 'tea' ? '4,000+ years' : '1,000+ years'}
        </dd>
      </dl>
    </section>
  );
}

function DrinkList() {
  return (
    <div style={{ margin: '30px 0' }}>
      <h3 style={{ 
        textAlign: 'center', 
        color: '#2c3e50',
        marginBottom: '20px',
        fontSize: '20px'
      }}>
        ☕ Beverage Information
      </h3>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <Drink name="tea" />
        <Drink name="coffee" />
      </div>
    </div>
  );
}

export default function ConditionalRenderingSection() {
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
      
      <div style={{ margin: '30px 0' }}>
        <h3 style={{ 
          textAlign: 'center', 
          color: '#2c3e50',
          marginBottom: '20px',
          fontSize: '20px'
        }}>
          📦 Packing Lists with Different Conditions
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <PackingListBasic />
          <PackingListWithImportance />
        </div>
      </div>

      <DrinkList />
    </div>
  );
}
