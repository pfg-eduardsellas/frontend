import { useEffect, useState } from 'react';
import HomePage from './containers/homePage/index.jsx';
import Login from './containers/login/index.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (accessToken, apiToken) => {
    localStorage.setItem('token', accessToken);
    if (apiToken) localStorage.setItem('api_token', apiToken);
    setToken(accessToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('api_token');
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
