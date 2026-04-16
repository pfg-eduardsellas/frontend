import { useEffect, useState } from 'react';
import HomePage from './containers/homePage/index.jsx';
import Login from './containers/login/index.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (t) => {
    localStorage.setItem('token', t);
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Global 401 handler: fired by the RTK Query baseQuery when any request returns 401.
  useEffect(() => {
    window.addEventListener('api:unauthorized', handleLogout);
    return () => window.removeEventListener('api:unauthorized', handleLogout);
  }, []);

  if (!token) return <Login onLogin={handleLogin} />;

  return <HomePage onLogout={handleLogout} />;
}

export default App;
