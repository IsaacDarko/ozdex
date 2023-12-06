import { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Home, Swap, Tokens } from './pages';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-tr from-black via-slate-900 to-[#8e0f79]'>
      <Routes>

        <Route path='/' element={ <Home /> } />

        <Route path="/swap" element={ <Swap /> }  />

        <Route path="/tokens" element={ <Tokens /> } />

      </Routes>

    </div>
  )
}

export default App
