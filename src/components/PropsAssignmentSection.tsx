import { getImageUrl } from './utils';

// Profile component for scientists
function Profile({ person, imageSize = 70 }: { 
  person: {
    imageId: string;
    name: string;
    profession: string;
    discovery: string;
    awards: string[];
  }, 
  imageSize?: number 
}) {
  const imageSrc = getImageUrl(person);

  return (
    <section style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #ddd',
      margin: '20px',
      maxWidth: '400px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>{person.name}</h2>
      <img
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          border: '3px solid #007bff',
          marginBottom: '15px'
        }}
        src={imageSrc}
        alt={person.name}
        width={imageSize}
        height={imageSize}
      />
      <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
        <li style={{ marginBottom: '8px' }}>
          <b>Profession:</b> {person.profession}
        </li>
        <li style={{ marginBottom: '8px' }}>
          <b>Awards: {person.awards.length} </b>
          ({person.awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {person.discovery}
        </li>
      </ul>
    </section>
  );
}

function ScientistGallery() {
  return (
    <div style={{ margin: '30px 0' }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#2c3e50',
        marginBottom: '30px',
        fontSize: '28px'
      }}>
        🧬 Notable Scientists
      </h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <Profile person={{
          imageId: 'szV5sdG',
          name: 'Maria Skłodowska-Curie',
          profession: 'physicist and chemist',
          discovery: 'polonium (chemical element)',
          awards: [
            'Nobel Prize in Physics',
            'Nobel Prize in Chemistry',
            'Davy Medal',
            'Matteucci Medal'
          ],
        }} />
        <Profile person={{
          imageId: 'YfeOqp2',
          name: 'Katsuko Saruhashi',
          profession: 'geochemist',
          discovery: 'a method for measuring carbon dioxide in seawater',
          awards: [
            'Miyake Prize for geochemistry',
            'Tanaka Prize'
          ],
        }} />
      </div>
    </div>
  );
}

// Avatar component with responsive sizing
function Avatar({ person, size }: { 
  person: { name: string; imageId: string }, 
  size: number 
}) {
  const ratio = window.devicePixelRatio || 1;
  let thumbnailSize = 's';
  if (size * ratio > 90) {
    thumbnailSize = 'b';
  }
  
  return (
    <img
      style={{
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #007bff',
        margin: '10px'
      }}
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

function AvatarSizes() {
  return (
    <div style={{ 
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #6c757d',
      margin: '20px auto',
      maxWidth: '600px'
    }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>
        � Avatar with Different Sizes
      </h3>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <Avatar
          size={40}
          person={{
            name: 'Gregorio Y. Zara',
            imageId: '7vQD0fP'
          }}
        />
        <Avatar
          size={70}
          person={{
            name: 'Gregorio Y. Zara',
            imageId: '7vQD0fP'
          }}
        />
        <Avatar
          size={120}
          person={{
            name: 'Gregorio Y. Zara',
            imageId: '7vQD0fP'
          }}
        />
      </div>
      <p style={{ marginTop: '15px', color: '#666' }}>
        Gregorio Y. Zara - Filipino inventor and engineer
      </p>
    </div>
  );
}

// Card component for layout
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'white',
      border: '2px solid #ddd',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      maxWidth: '300px'
    }}>
      <div>
        {children}
      </div>
    </div>
  );
}

function CardExample() {
  return (
    <div style={{ margin: '30px 0' }}>
      <h3 style={{ 
        textAlign: 'center', 
        color: '#2c3e50',
        marginBottom: '20px',
        fontSize: '20px'
      }}>
        🃏 Card Component Example
      </h3>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <Card>
          <h1 style={{ color: '#007bff', marginBottom: '15px' }}>Photo</h1>
          <img
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #007bff'
            }}
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={100}
            height={100}
          />
        </Card>
        <Card>
          <h1 style={{ color: '#007bff', marginBottom: '15px' }}>About</h1>
          <p style={{ lineHeight: '1.6', color: '#666' }}>
            Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default function PropsAssignmentSection() {
  return (
    <div style={{ margin: '40px 0' }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#000000',
        backgroundColor: '#fff3cd',
        padding: '15px',
        borderRadius: '8px',
        border: '2px solid #ffc107',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        🎁 Assignment 2.2: Props Practice
      </h2>
      
      <ScientistGallery />
      <AvatarSizes />
      <CardExample />
    </div>
  );
}
