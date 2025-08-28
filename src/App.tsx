import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// ============================================
// Assignment 2.1: Components Practice
// ============================================

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

// ============================================
// Assignment 2.2: Props Practice
// ============================================

// Component 4: Product Card (Props with different data types)
function ProductCard({ 
  name, 
  price, 
  discount, 
  image, 
  inStock, 
  rating 
}: { 
  name: string; 
  price: number; 
  discount?: number; 
  image: string; 
  inStock: boolean; 
  rating: number 
}) {
  const finalPrice = discount ? price - (price * discount / 100) : price;
  
  return (
    <div style={{
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      maxWidth: '300px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <span style={{ fontSize: '60px' }}>{image}</span>
      </div>
      <h3 style={{ color: '#333', margin: '10px 0' }}>{name}</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <span style={{ color: '#ffd700', marginRight: '5px' }}>
          {'⭐'.repeat(Math.floor(rating))}
        </span>
        <span style={{ color: '#666' }}>({rating}/5)</span>
      </div>

      <div style={{ margin: '10px 0' }}>
        {discount ? (
          <div>
            <span style={{ 
              textDecoration: 'line-through', 
              color: '#999', 
              marginRight: '10px' 
            }}>
              ฿{price}
            </span>
            <span style={{ 
              color: '#e74c3c', 
              fontWeight: 'bold', 
              fontSize: '18px' 
            }}>
              ฿{finalPrice.toFixed(2)}
            </span>
            <span style={{ 
              backgroundColor: '#e74c3c', 
              color: 'white', 
              padding: '2px 6px', 
              borderRadius: '4px', 
              fontSize: '12px', 
              marginLeft: '10px' 
            }}>
              -{discount}%
            </span>
          </div>
        ) : (
          <span style={{ 
            color: '#2ecc71', 
            fontWeight: 'bold', 
            fontSize: '18px' 
          }}>
            ฿{price}
          </span>
        )}
      </div>

      <div style={{ 
        padding: '8px 12px', 
        borderRadius: '6px', 
        textAlign: 'center',
        backgroundColor: inStock ? '#d4edda' : '#f8d7da',
        color: inStock ? '#155724' : '#721c24',
        border: `1px solid ${inStock ? '#c3e6cb' : '#f5c6cb'}`
      }}>
        {inStock ? '✅ In Stock' : '❌ Out of Stock'}
      </div>
    </div>
  )
}

// Component 5: User Profile (Props with nested objects)
function UserProfile({ 
  user 
}: { 
  user: {
    name: string;
    age: number;
    email: string;
    avatar: string;
    skills: string[];
    isOnline: boolean;
  }
}) {
  return (
    <div style={{
      border: '2px solid #3498db',
      borderRadius: '15px',
      padding: '20px',
      margin: '15px',
      backgroundColor: '#f8fbff',
      maxWidth: '350px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '15px' 
      }}>
        <div style={{ 
          fontSize: '50px', 
          marginRight: '15px' 
        }}>
          {user.avatar}
        </div>
        <div>
          <h3 style={{ color: '#2c3e50', margin: '0 0 5px 0' }}>
            {user.name}
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: user.isOnline ? '#2ecc71' : '#95a5a6',
              display: 'inline-block',
              marginLeft: '10px'
            }}></span>
          </h3>
          <p style={{ color: '#7f8c8d', margin: '0' }}>
            {user.age} years old
          </p>
          <p style={{ color: '#7f8c8d', margin: '5px 0' }}>
            📧 {user.email}
          </p>
        </div>
      </div>
      
      <div>
        <h4 style={{ color: '#34495e', marginBottom: '10px' }}>💼 Skills:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {user.skills.map((skill, index) => (
            <span key={index} style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// Assignment 2.3: Conditional Rendering Practice
// ============================================

// Component 6: Status Badge (Simple conditional rendering)
function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <div style={{
      padding: '8px 16px',
      borderRadius: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: isActive ? '#d4edda' : '#f8d7da',
      color: isActive ? '#155724' : '#721c24',
      border: `2px solid ${isActive ? '#c3e6cb' : '#f5c6cb'}`
    }}>
      {isActive ? '🟢 Active' : '🔴 Inactive'}
    </div>
  );
}

// Component 7: Weather Widget (Multiple conditions)
function WeatherWidget({ 
  temperature, 
  condition 
}: { 
  temperature: number; 
  condition: 'sunny' | 'rainy' | 'cloudy' | 'snowy' 
}) {
  const getWeatherIcon = () => {
    switch (condition) {
      case 'sunny': return '☀️';
      case 'rainy': return '🌧️';
      case 'cloudy': return '☁️';
      case 'snowy': return '❄️';
      default: return '🌤️';
    }
  };

  const getTemperatureColor = () => {
    if (temperature >= 30) return '#e74c3c'; // Hot - Red
    if (temperature >= 20) return '#f39c12'; // Warm - Orange
    if (temperature >= 10) return '#3498db'; // Cool - Blue
    return '#9b59b6'; // Cold - Purple
  };

  const getTemperatureMessage = () => {
    if (temperature >= 35) return 'Very Hot! Stay hydrated!';
    if (temperature >= 25) return 'Perfect weather!';
    if (temperature >= 15) return 'A bit cool, maybe a light jacket?';
    if (temperature >= 5) return 'Cold! Wear warm clothes!';
    return 'Freezing! Bundle up!';
  };

  return (
    <div style={{
      border: '2px solid #ddd',
      borderRadius: '15px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
      maxWidth: '250px'
    }}>
      <div style={{ fontSize: '60px', marginBottom: '10px' }}>
        {getWeatherIcon()}
      </div>
      <h3 style={{ 
        color: getTemperatureColor(), 
        margin: '10px 0',
        fontSize: '24px'
      }}>
        {temperature}°C
      </h3>
      <p style={{ 
        color: '#666', 
        fontWeight: 'bold',
        textTransform: 'capitalize',
        margin: '10px 0'
      }}>
        {condition}
      </p>
      <p style={{ 
        color: '#333', 
        fontSize: '14px',
        fontStyle: 'italic'
      }}>
        {getTemperatureMessage()}
      </p>
    </div>
  );
}

// Component 8: Login Status (Conditional with user data)
function LoginStatus({ 
  user 
}: { 
  user: { name: string; role: string } | null 
}) {
  if (!user) {
    return (
      <div style={{
        border: '2px solid #ffc107',
        borderRadius: '10px',
        padding: '20px',
        margin: '10px',
        backgroundColor: '#fff3cd',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#856404', margin: '0 0 10px 0' }}>
          🔒 Please Login
        </h3>
        <button style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{
      border: '2px solid #28a745',
      borderRadius: '10px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#d4edda',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#155724', margin: '0 0 10px 0' }}>
        👋 Welcome back, {user.name}!
      </h3>
      <p style={{ color: '#155724', margin: '5px 0' }}>
        Role: {user.role === 'admin' ? '👑 Administrator' : '👤 User'}
      </p>
      {user.role === 'admin' && (
        <div style={{ marginTop: '10px' }}>
          <button style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}>
            Admin Panel
          </button>
        </div>
      )}
      <button style={{
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Logout
      </button>
    </div>
  );
}

// Component 9: Notification List (Conditional list rendering)
function NotificationList({ 
  notifications 
}: { 
  notifications: Array<{ id: number; message: string; type: 'info' | 'warning' | 'error' }> 
}) {
  if (notifications.length === 0) {
    return (
      <div style={{
        border: '2px dashed #ccc',
        borderRadius: '10px',
        padding: '30px',
        margin: '10px',
        textAlign: 'center',
        color: '#666'
      }}>
        <h3>📭 No Notifications</h3>
        <p>You're all caught up!</p>
      </div>
    );
  }

  return (
    <div style={{
      border: '2px solid #17a2b8',
      borderRadius: '10px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ color: '#17a2b8', marginTop: '0' }}>
        🔔 Notifications ({notifications.length})
      </h3>
      {notifications.map((notification) => (
        <div key={notification.id} style={{
          padding: '10px',
          margin: '8px 0',
          borderRadius: '5px',
          backgroundColor: 
            notification.type === 'error' ? '#f8d7da' :
            notification.type === 'warning' ? '#fff3cd' : '#d1ecf1',
          color:
            notification.type === 'error' ? '#721c24' :
            notification.type === 'warning' ? '#856404' : '#0c5460',
          border: `1px solid ${
            notification.type === 'error' ? '#f5c6cb' :
            notification.type === 'warning' ? '#faeeba' : '#bee5eb'
          }`
        }}>
          {notification.type === 'error' ? '❌' : 
           notification.type === 'warning' ? '⚠️' : 'ℹ️'} {notification.message}
        </div>
      ))}
    </div>
  );
}

// ============================================
// Assignment 2.4: Rendering Lists Practice
// ============================================

// Component 10: Task List (Interactive list with add/remove)
function TaskList({ 
  tasks, 
  onAddTask, 
  onToggleTask, 
  onDeleteTask 
}: { 
  tasks: Array<{ id: number; text: string; completed: boolean; priority: 'high' | 'medium' | 'low' }>; 
  onAddTask: (text: string) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{
      border: '2px solid #007bff',
      borderRadius: '12px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#f8f9fa',
      maxWidth: '400px'
    }}>
      <h3 style={{ color: '#007bff', marginTop: '0' }}>
        📝 Task Manager ({tasks.length} tasks)
      </h3>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <button type="submit" style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Add
          </button>
        </div>
      </form>

      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          <p>📋 No tasks yet!</p>
          <p>Add your first task above.</p>
        </div>
      ) : (
        <div>
          {tasks.map(task => (
            <div key={task.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              margin: '8px 0',
              backgroundColor: task.completed ? '#e8f5e8' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '6px',
              opacity: task.completed ? 0.7 : 1
            }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{
                flex: 1,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#666' : '#333'
              }}>
                {task.text}
              </span>
              <span style={{
                backgroundColor: getPriorityColor(task.priority),
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                marginRight: '10px'
              }}>
                {task.priority}
              </span>
              <button
                onClick={() => onDeleteTask(task.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Component 11: Shopping Cart (List with quantities)
function ShoppingCart({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: { 
  items: Array<{ id: number; name: string; price: number; quantity: number; image: string }>;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div style={{
        border: '2px dashed #ccc',
        borderRadius: '12px',
        padding: '30px',
        margin: '10px',
        textAlign: 'center',
        color: '#666',
        maxWidth: '400px'
      }}>
        <h3>🛒 Shopping Cart</h3>
        <p>Your cart is empty</p>
        <p>Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div style={{
      border: '2px solid #28a745',
      borderRadius: '12px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#f8fff8',
      maxWidth: '400px'
    }}>
      <h3 style={{ color: '#28a745', marginTop: '0' }}>
        🛒 Shopping Cart ({totalItems} items)
      </h3>
      
      {items.map(item => (
        <div key={item.id} style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          margin: '8px 0',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}>
          <span style={{ fontSize: '30px', marginRight: '12px' }}>
            {item.image}
          </span>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 4px 0', color: '#333' }}>{item.name}</h4>
            <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
              ฿{item.price} each
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              -
            </button>
            <span style={{ 
              minWidth: '30px', 
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              +
            </button>
            <button
              onClick={() => onRemoveItem(item.id)}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '12px',
                marginLeft: '8px'
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      
      <div style={{
        borderTop: '2px solid #28a745',
        paddingTop: '12px',
        marginTop: '12px',
        textAlign: 'right'
      }}>
        <h4 style={{ margin: '0', color: '#28a745' }}>
          Total: ฿{totalPrice.toFixed(2)}
        </h4>
      </div>
    </div>
  );
}

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

function App() {
  const [name, setName] = useState('CSMJU')
  //message
  const [message, setMessage] = useState('สอบเสร็จแล้วสบายใจจัง')
  const [count, setCount] = useState(0)
  const [fontSize, setFontSize] = useState(32) // เริ่มต้นที่ 32px
  const status = false; // true = เขียว, false = แดง 

  // Sample data for Props Assignment
  const sampleProducts = [
    {
      name: "React Handbook",
      price: 899,
      discount: 20,
      image: "📚",
      inStock: true,
      rating: 4.8
    },
    {
      name: "JavaScript Guide",
      price: 1299,
      image: "💻",
      inStock: false,
      rating: 4.5
    },
    {
      name: "CSS Masterclass",
      price: 599,
      discount: 15,
      image: "🎨",
      inStock: true,
      rating: 4.9
    }
  ];

  const sampleUsers = [
    {
      name: "Alice Johnson",
      age: 25,
      email: "alice@example.com",
      avatar: "👩‍💻",
      skills: ["React", "TypeScript", "Node.js"],
      isOnline: true
    },
    {
      name: "Bob Smith",
      age: 30,
      email: "bob@example.com",
      avatar: "👨‍🎨",
      skills: ["UI/UX", "Figma", "Photoshop", "CSS"],
      isOnline: false
    }
  ];

  // Sample data for Conditional Rendering Assignment
  const [isUserActive, setIsUserActive] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>({
    name: "John Doe",
    role: "admin"
  });

  const weatherData = [
    { temperature: 32, condition: 'sunny' as const },
    { temperature: 18, condition: 'rainy' as const },
    { temperature: 5, condition: 'snowy' as const },
    { temperature: 22, condition: 'cloudy' as const }
  ];

  const notifications = [
    { id: 1, message: "Your profile has been updated successfully", type: 'info' as const },
    { id: 2, message: "Warning: Your subscription expires in 3 days", type: 'warning' as const },
    { id: 3, message: "Error: Failed to save your changes", type: 'error' as const }
  ];

  // Sample data for Rendering Lists Assignment
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React Components", completed: true, priority: 'high' as const },
    { id: 2, text: "Practice Props", completed: true, priority: 'medium' as const },
    { id: 3, text: "Master Conditional Rendering", completed: false, priority: 'high' as const },
    { id: 4, text: "Understand List Rendering", completed: false, priority: 'low' as const }
  ]);

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "React Book", price: 599, quantity: 2, image: "📚" },
    { id: 2, name: "JavaScript Course", price: 1299, quantity: 1, image: "💻" },
    { id: 3, name: "CSS Guide", price: 399, quantity: 3, image: "🎨" }
  ]);

  const studentsData = [
    { id: 1, name: "Alice Johnson", grade: 92, subject: "Mathematics" },
    { id: 2, name: "Bob Smith", grade: 78, subject: "Physics" },
    { id: 3, name: "Carol Davis", grade: 85, subject: "Mathematics" },
    { id: 4, name: "David Wilson", grade: 69, subject: "Chemistry" },
    { id: 5, name: "Emma Brown", grade: 94, subject: "Physics" },
    { id: 6, name: "Frank Miller", grade: 72, subject: "Chemistry" }
  ];

  // Functions for TaskList
  const addTask = (text: string) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority: 'medium' as const
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Functions for ShoppingCart
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  }; 

  return (
    <>
      {/* เพิ่ม Components Assignment */}
      <WelcomeBanner 
        title="🎯 React Components Assignment" 
        subtitle="Assignment 2.1: Learning React Components with Reusable Code"
      />
      
      <StudentInfo 
        studentName="[Your Name Here]" 
        studentId="[Your Student ID]"
      />

      {/* Original Code Section */}
      <div>
        <h1 className={status ? "green-txt" : "red-txt"} style={{ fontSize: `${fontSize}px` }}>{name}</h1>
        <h2>{message}</h2>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1);
          setFontSize((fontSize) => fontSize + 2); // เพิ่มขนาดตัวอักษร 2px ทุกครั้งที่คลิก
        }}>
          count is {count}
        </button>
        <button onClick={() => {
          setCount((count) => count - 1);
          setFontSize((fontSize) => fontSize - 2); // ลดขนาดตัวอักษร 2px ทุกครั้งที่คลิก
        }}>
          ลบ count
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      {/* Components Demo Section */}
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

      {/* Assignment 2.2: Props Section */}
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
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            color: '#000000', 
            textAlign: 'center', 
            marginBottom: '20px',
            backgroundColor: '#e3f2fd',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #2196f3',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            📦 Product Cards - Props with Different Data Types
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '20px' 
          }}>
            {sampleProducts.map((product, index) => (
              <ProductCard 
                key={index}
                name={product.name}
                price={product.price}
                discount={product.discount}
                image={product.image}
                inStock={product.inStock}
                rating={product.rating}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            color: '#000000', 
            textAlign: 'center', 
            marginBottom: '20px',
            backgroundColor: '#f3e5f5',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #9c27b0',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            👥 User Profiles - Props with Objects and Arrays
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '20px' 
          }}>
            {sampleUsers.map((user, index) => (
              <UserProfile 
                key={index}
                user={user}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Assignment 2.3: Conditional Rendering Section */}
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
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            color: '#000000', 
            textAlign: 'center', 
            marginBottom: '20px',
            backgroundColor: '#fff3cd',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #ffc107',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            🎛️ Status & Controls
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <StatusBadge isActive={isUserActive} />
            <button 
              onClick={() => setIsUserActive(!isUserActive)}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Toggle Status
            </button>
            <button 
              onClick={() => setCurrentUser(currentUser ? null : { name: "John Doe", role: "admin" })}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Toggle Login
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            color: '#000000', 
            textAlign: 'center', 
            marginBottom: '20px',
            backgroundColor: '#d1ecf1',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #17a2b8',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            🌤️ Weather Conditions
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '15px' 
          }}>
            {weatherData.map((weather, index) => (
              <WeatherWidget 
                key={index}
                temperature={weather.temperature}
                condition={weather.condition}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            color: '#000000', 
            textAlign: 'center', 
            marginBottom: '20px',
            backgroundColor: '#f8d7da',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #dc3545',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            🔐 User Authentication & Notifications
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '20px' 
          }}>
            <LoginStatus user={currentUser} />
            <NotificationList notifications={notifications} />
          </div>
        </div>
      </div>

      {/* Assignment 2.4: Rendering Lists Section */}
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
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            color: '#000000', 
            textAlign: 'center', 
            marginBottom: '20px',
            backgroundColor: '#fff3cd',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #ffc107',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            📝 Interactive Task Manager & 🛒 Shopping Cart
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '20px' 
          }}>
            <TaskList 
              tasks={tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
            <ShoppingCart 
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            color: '#000000', 
            textAlign: 'center', 
            marginBottom: '20px',
            backgroundColor: '#f3e5f5',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #9c27b0',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            🎓 Student Grades - Filtered & Sorted Lists
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '20px' 
          }}>
            <StudentGrades students={studentsData} />
          </div>
        </div>
      </div>

      {/* Assignment: GPA Calculator Section */}
      <div style={{ margin: '40px 0' }}>
        <h2 style={{ 
          textAlign: 'center', 
          color: '#000000',
          backgroundColor: '#ffe6e6',
          padding: '15px',
          borderRadius: '8px',
          border: '2px solid #dc3545',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          🎯 Assignment: GPA Calculator
        </h2>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            color: '#000000', 
            textAlign: 'center', 
            marginBottom: '20px',
            backgroundColor: '#fff5f5',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #dc3545',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            📚 Course & Grade Management with GPA Calculation
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '20px' 
          }}>
            <GPACalculator />
          </div>
        </div>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
