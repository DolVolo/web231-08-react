import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
{/* assignment3 */}
import TodoApp from './Todolist.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <TodoApp />
  </StrictMode>,
)
