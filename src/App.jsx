import { useState } from 'react'
import './App.css'

import TypePi from './UserComponent/Game/TypePi'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TypePi></TypePi>
    </>
  )
}

export default App
