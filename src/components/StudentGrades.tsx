import { useState } from 'react'

// Component 12: Student Grades (Filtered and sorted lists)
function StudentGrades({ 
  students 
}: { 
  students: Array<{ id: number; name: string; grade: number; subject: string }> 
}) {
  const [filterSubject, setFilterSubject] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'grade'>('name');

  const subjects = ['all', ...Array.from(new Set(students.map(s => s.subject)))];

  const filteredAndSortedStudents = students
    .filter(student => filterSubject === 'all' || student.subject === filterSubject)
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return b.grade - a.grade; // Highest grade first
      }
    });

  const getGradeColor = (grade: number) => {
    if (grade >= 80) return '#28a745'; // Green
    if (grade >= 70) return '#ffc107'; // Yellow
    if (grade >= 60) return '#fd7e14'; // Orange
    return '#dc3545'; // Red
  };

  const getGradeLetter = (grade: number) => {
    if (grade >= 80) return 'A';
    if (grade >= 70) return 'B';
    if (grade >= 60) return 'C';
    if (grade >= 50) return 'D';
    return 'F';
  };

  return (
    <div style={{
      border: '2px solid #6f42c1',
      borderRadius: '12px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#f8f7ff',
      maxWidth: '500px'
    }}>
      <h3 style={{ color: '#6f42c1', marginTop: '0' }}>
        🎓 Student Grades ({filteredAndSortedStudents.length} students)
      </h3>
      
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Filter by Subject:
          </label>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'grade')}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="name">Name</option>
            <option value="grade">Grade (High to Low)</option>
          </select>
        </div>
      </div>

      {filteredAndSortedStudents.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          <p>📚 No students found for the selected criteria.</p>
        </div>
      ) : (
        <div>
          {filteredAndSortedStudents.map(student => (
            <div key={student.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              margin: '8px 0',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: '#333' }}>
                  {student.name}
                </h4>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                  {student.subject}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  backgroundColor: getGradeColor(student.grade),
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  marginBottom: '4px'
                }}>
                  {getGradeLetter(student.grade)}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {student.grade}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentGrades;
