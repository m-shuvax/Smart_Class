import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './features/navigation/Navbar'
import {BrowserRouter} from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>

      </div>
    </>
  )
}

export default App
