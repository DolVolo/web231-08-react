import { people, recipes } from './data';
import { getImageUrl } from './utils';

// Scientists List Component
function ScientistsList() {
  const chemists = people.filter(person => 
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person => 
    person.profession !== 'chemist'
  );

  return (
    <article style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #007bff',
      margin: '20px',
      maxWidth: '800px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '24px' }}>
        🧬 Scientists
      </h1>
      
      <h2 style={{ color: '#007bff', marginTop: '20px', marginBottom: '15px' }}>
        🧪 Chemists
      </h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {chemists.map(person =>
          <li key={person.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '10px 0',
            borderBottom: '1px solid #eee'
          }}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #007bff'
              }}
            />
            <p style={{ margin: 0, color: '#2c3e50', lineHeight: '1.4' }}>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
      
      <h2 style={{ color: '#28a745', marginTop: '20px', marginBottom: '15px' }}>
        👥 Everyone Else
      </h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {everyoneElse.map(person =>
          <li key={person.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '10px 0',
            borderBottom: '1px solid #eee'
          }}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #28a745'
              }}
            />
            <p style={{ margin: 0, color: '#2c3e50', lineHeight: '1.4' }}>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </article>
  );
}

// Simple Recipe List
function SimpleRecipeList() {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #ffc107',
      margin: '20px',
      maxWidth: '400px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '20px' }}>
        🍽️ Recipes (Simple)
      </h1>
      {recipes.map(recipe =>
        <div key={recipe.id} style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#ffc107', fontSize: '18px', marginBottom: '10px' }}>
            {recipe.name}
          </h2>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#2c3e50' }}>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient} style={{ marginBottom: '5px' }}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// Recipe Component for Modular Version
function Recipe({ name, ingredients }: { 
  name: string; 
  ingredients: string[] 
}) {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
      marginBottom: '15px'
    }}>
      <h2 style={{ color: '#495057', fontSize: '18px', marginBottom: '10px' }}>
        {name}
      </h2>
      <ul style={{ margin: 0, paddingLeft: '20px', color: '#6c757d' }}>
        {ingredients.map(ingredient =>
          <li key={ingredient} style={{ marginBottom: '5px' }}>
            {ingredient}
          </li>
        )}
      </ul>
    </div>
  );
}

// Modular Recipe List
function ModularRecipeList() {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #6f42c1',
      margin: '20px',
      maxWidth: '400px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '20px' }}>
        🍽️ Recipes (Modular)
      </h1>
      {recipes.map(recipe =>
        <Recipe {...recipe} key={recipe.id} />
      )}
    </div>
  );
}

// Poem Component
function Poem() {
  const poem = {
    lines: [
      'I write, erase, rewrite',
      'Erase again, and then',
      'A poppy blooms.'
    ]
  };

  let output: React.ReactElement[] = [];

  // Fill the output array
  poem.lines.forEach((line, i) => {
    output.push(
      <hr key={i + '-separator'} style={{
        border: 'none',
        borderTop: '2px solid #dee2e6',
        margin: '10px 0'
      }} />
    );
    output.push(
      <p key={i + '-text'} style={{
        margin: '10px 0',
        color: '#2c3e50',
        fontSize: '16px',
        fontStyle: 'italic',
        textAlign: 'center'
      }}>
        {line}
      </p>
    );
  });
  
  // Remove the first <hr />
  output.shift();

  return (
    <article style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #e74c3c',
      margin: '20px',
      maxWidth: '400px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#2c3e50', 
        marginBottom: '15px', 
        fontSize: '18px',
        textAlign: 'center'
      }}>
        🌸 Haiku Poem
      </h2>
      {output}
    </article>
  );
}

export default function RenderingListsSection() {
  return (
    <div style={{ margin: '40px 0' }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#000000',
        backgroundColor: '#e6f3ff',
        padding: '15px',
        borderRadius: '8px',
        border: '2px solid #007bff',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        📋 Assignment 2.4: Rendering Lists
      </h2>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        margin: '30px 0'
      }}>
        <ScientistsList />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        margin: '30px 0'
      }}>
        <SimpleRecipeList />
        <ModularRecipeList />
        <Poem />
      </div>
    </div>
  );
}
