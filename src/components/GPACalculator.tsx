import { useState } from 'react'

// Component 13: GPA Calculator (Course management with grades)
function GPACalculator() {
  const [courseName, setCourseName] = useState('');
  const [grade, setGrade] = useState('');
  const [courses, setCourses] = useState<Array<{ id: number; name: string; grade: string; gpa: number }>>([]);
  const [showGPA, setShowGPA] = useState(false);

  const gradeToGPA = {
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D+': 1.5,
    'D': 1.0,
    'F': 0.0,
    'W': 0.0
  };

  const addCourse = () => {
    if (courseName.trim() === '' || grade === '') return;
    
    const newCourse = {
      id: Date.now(),
      name: courseName,
      grade: grade,
      gpa: gradeToGPA[grade as keyof typeof gradeToGPA]
    };
    
    setCourses([...courses, newCourse]);
    setCourseName('');
    setGrade('');
  };

  const deleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const calculateGPA = () => {
    if (courses.length === 0) return 0;
    
    const totalPoints = courses.reduce((sum, course) => sum + course.gpa, 0);
    return totalPoints / courses.length;
  };

  return (
    <div style={{
      border: '2px solid #dc3545',
      borderRadius: '12px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#fff5f5',
      maxWidth: '500px'
    }}>
      <h3 style={{ color: '#dc3545', marginTop: '0' }}>
        🎓 GPA Calculator ({courses.length} courses)
      </h3>
      
      {/* Input Section */}
      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            รายชื่อวิชา:
          </label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="กรอกชื่อวิชา..."
            style={{
              width: '100%',
              maxWidth: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            เกรด:
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          >
            <option value="">เลือกเกรด</option>
            <option value="A">A (4.0)</option>
            <option value="B+">B+ (3.5)</option>
            <option value="B">B (3.0)</option>
            <option value="C+">C+ (2.5)</option>
            <option value="C">C (2.0)</option>
            <option value="D+">D+ (1.5)</option>
            <option value="D">D (1.0)</option>
            <option value="F">F (0.0)</option>
            <option value="W">W (0.0)</option>
          </select>
        </div>
        
        <button
          onClick={addCourse}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            width: '100%'
          }}
        >
          ➕ เพิ่มรายวิชา
        </button>
      </div>

      {/* Course List */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#333', marginBottom: '15px' }}>
          📚 รายวิชาทั้งหมด:
        </h4>
        
        {courses.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#666', 
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px dashed #ddd'
          }}>
            <p>ยังไม่มีรายวิชา</p>
            <p>เพิ่มรายวิชาแรกของคุณด้านบน!</p>
          </div>
        ) : (
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            margin: 0
          }}>
            {courses.map(course => (
              <li key={course.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                margin: '8px 0',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '6px'
              }}>
                <div style={{ flex: 1 }}>
                  <span style={{ 
                    color: course.grade === 'F' ? '#dc3545' : '#333',
                    fontWeight: course.grade === 'F' ? 'bold' : 'normal',
                    fontSize: '16px'
                  }}>
                    📖 {course.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    backgroundColor: course.grade === 'F' ? '#dc3545' : 
                                   course.grade === 'A' ? '#28a745' :
                                   course.grade.includes('+') ? '#17a2b8' : '#ffc107',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {course.grade}
                  </span>
                  <span style={{ 
                    color: '#666', 
                    fontSize: '14px' 
                  }}>
                    ({course.gpa.toFixed(1)})
                  </span>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 10px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    🗑️ ลบ
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* GPA Calculation */}
      {courses.length > 0 && (
        <div style={{
          backgroundColor: '#e8f5e8',
          border: '2px solid #28a745',
          borderRadius: '8px',
          padding: '15px',
          textAlign: 'center'
        }}>
          <button
            onClick={() => setShowGPA(!showGPA)}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: showGPA ? '15px' : '0'
            }}
          >
            📊 {showGPA ? 'ซ่อน GPA' : 'คำนวณ GPA'}
          </button>
          
          {showGPA && (
            <div>
              <h3 style={{ 
                color: '#28a745', 
                margin: '10px 0',
                fontSize: '24px'
              }}>
                🎯 GPA ของคุณ: {calculateGPA().toFixed(2)}
              </h3>
              <div style={{ 
                fontSize: '14px', 
                color: '#666',
                marginTop: '10px'
              }}>
                <p>คำนวณจาก {courses.length} วิชา</p>
                <p>
                  {calculateGPA() >= 3.5 ? '🏆 เกรดเยี่ยม!' :
                   calculateGPA() >= 3.0 ? '👍 เกรดดี' :
                   calculateGPA() >= 2.5 ? '📈 เกรดปานกลาง' :
                   calculateGPA() >= 2.0 ? '⚠️ ควรปรับปรุง' :
                   '🔥 ต้องพยายามมากขึ้น!'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GPACalculator;
