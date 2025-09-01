import InfoCard from './InfoCard';

export default function ComponentExamplesSection() {
  return (
    <div style={{ margin: '30px 0' }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#000000',
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        border: '2px solid #007bff',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        📦 Component Examples
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
        <InfoCard 
          icon="⚛️"
          title="React Components" 
          description="Components are independent, reusable pieces of code. They work like JavaScript functions but return HTML elements."
        />
        <InfoCard 
          icon="🔄"
          title="Reusable Code" 
          description="Write once, use everywhere! Components help you build encapsulated elements that manage their own state."
        />
        <InfoCard 
          icon="🎨"
          title="Props & State" 
          description="Components can receive data via props and maintain their own internal state for dynamic behavior."
        />
      </div>
    </div>
  );
}
