import { useState } from 'react';
import {
  LoginContainer, LoginCard, Title, Form,
  InputGroup, Label, Input, ButtonGroup, Button, ErrorMessage
} from './styles';

export default function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter your username and password');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        // Registro
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || 'Registration failed');
        }
        // Si el registro es exitoso, logueamos automáticamente
      }

      // Login
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const loginRes = await fetch('/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
      });

      if (!loginRes.ok) {
        const data = await loginRes.json();
        throw new Error(data.detail || 'Wrong username or password');
      }

      const { access_token } = await loginRes.json();
      onLogin(access_token);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>PFG Bot Panel</Title>
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <InputGroup>
            <Label>Username</Label>
            <Input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="admin"
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Password</Label>
            <Input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••"
              required
            />
          </InputGroup>

          <ButtonGroup>
            <Button type="button" $secondary onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? 'Back to login' : 'Create account'}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Loading...' : isRegistering ? 'Create account' : 'Sign in'}
            </Button>
          </ButtonGroup>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
}
