import './App.css'

// Import all components from separate files
import {
  OriginalCounter,
  PropsAssignmentSection,
  ConditionalRenderingSection,
  RenderingListsSection,
  GPAAssignmentSection,
  LearningReactChallenges
} from './components'

function App() {
  return (
    <>
      {/* Assignment 2.1: Learning React Challenges */}
      <LearningReactChallenges />

      {/* Original Counter Component */}
      <OriginalCounter />
      
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
