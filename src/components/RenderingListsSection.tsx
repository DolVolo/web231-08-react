import { useState } from 'react';
import TaskList from './TaskList';
import ShoppingCart from './ShoppingCart';
import StudentGrades from './StudentGrades';

export default function RenderingListsSection() {
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
  );
}
