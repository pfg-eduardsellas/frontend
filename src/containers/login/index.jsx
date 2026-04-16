import { useState } from 'react';
import { useLoginMutation, useRegisterMutation } from '../../api';
import {
  LoginContainer,
  LoginCard,
  Title,
  Form,
  InputGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
  ErrorMessage,
} from './styles';

export default function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const [login, { isLoading: loggingIn }] = useLoginMutation();
  const [register, { isLoading: registering }] = useRegisterMutation();
  const loading = loggingIn || registering;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setFormError('Please enter your username and password');
      return;
    }
    setFormError('');

    if (isRegistering) {
      const regResult = await register({ username, password });
      if (regResult.error) {
        setFormError(regResult.error.data?.detail ?? 'Registration failed');
        return;
      }
    }

    const loginResult = await login({ username, password });
    if (loginResult.error) {
      setFormError(loginResult.error.data?.detail ?? 'Wrong username or password');
      return;
    }

    onLogin(loginResult.data.access_token, loginResult.data.api_token ?? null);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>PFG Bot Panel</Title>
        <Form onSubmit={handleSubmit}>
          {formError && <ErrorMessage>{formError}</ErrorMessage>}

          <InputGroup>
            <Label>Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </InputGroup>

          <ButtonGroup>
            <Button
              type="button"
              $secondary
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Back to login' : 'Create account'}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? 'Loading...'
                : isRegistering
                ? 'Create account'
                : 'Sign in'}
            </Button>
          </ButtonGroup>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
}
