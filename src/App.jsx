import { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Home, Swap, Tokens } from './pages';
import { AuthProvider } from './contexts/AuthContext';
import { SwapProvider } from './contexts/SwapContext';




function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-[100vw] h-[100vh] '>
      <AuthProvider>
        <SwapProvider>
          <Routes>

            <Route path='/' element={ <Home /> } />

            <Route path="/swap" element={ <Swap /> }  />

            <Route path="/tokens" element={ <Tokens /> } />

          </Routes>
        </SwapProvider>
      </AuthProvider>
    </div>
  )
}

export default App
