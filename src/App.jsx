import { useState } from 'react';
import HomePage from './containers/homePage/index.jsx';
import Login from './containers/login/index.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <Login onLogin={(t) => {
      localStorage.setItem('token', t);
      setToken(t);
    }} />
  }

  return (
    <HomePage onLogout={() => {
      localStorage.removeItem('token');
      setToken(null);
    }} />
  )
}

export default App

