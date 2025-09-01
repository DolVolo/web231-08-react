// Component 3: Student Info
function StudentInfo({ studentName, studentId }: { studentName: string; studentId: string }) {
  return (
    <div style={{
      backgroundColor: '#f0f8ff',
      border: '2px solid #4169e1',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0',
      color: '#000000' // เพิ่มสีดำให้ข้อความ
    }}>
      <h3 style={{ color: '#4169e1', marginTop: '0' }}>👨‍🎓 Student Information</h3>
      <p style={{ color: '#333333', fontSize: '16px', margin: '10px 0' }}>
        <strong>Name:</strong> {studentName}
      </p>
      <p style={{ color: '#333333', fontSize: '16px', margin: '10px 0' }}>
        <strong>Student ID:</strong> {studentId}
      </p>
    </div>
  )
}

export default StudentInfo;
