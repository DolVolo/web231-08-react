import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

// Component: Original Counter (The original Vite + React counter demo)
function OriginalCounter() {
  const name = 'CSMJU'
  const message = 'สอบเสร็จแล้วสบายใจจัง'
  const [count, setCount] = useState(0)
  const [fontSize, setFontSize] = useState(32) // เริ่มต้นที่ 32px
  const status = false; // true = เขียว, false = แดง

  return (
    <>
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
    </>
  )
}

export default OriginalCounter;
