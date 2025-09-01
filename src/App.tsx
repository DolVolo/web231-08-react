import './App.css'

// Import all components from separate files
import {
  WelcomeBanner,
  StudentInfo,
  OriginalCounter,
  ComponentExamplesSection,
  PropsAssignmentSection,
  ConditionalRenderingSection,
  RenderingListsSection,
  GPAAssignmentSection
} from './components'

function App() {
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

      {/* Original Counter Component */}
      <OriginalCounter />
      
      {/* Component Examples Section */}
      <ComponentExamplesSection />

      {/* Assignment 2.2: Props Section */}
      <PropsAssignmentSection />

      {/* Assignment 2.3: Conditional Rendering Section */}
      <ConditionalRenderingSection />

      {/* Assignment 2.4: Rendering Lists Section */}
      <RenderingListsSection />

      {/* Assignment: GPA Calculator Section */}
      <GPAAssignmentSection />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
