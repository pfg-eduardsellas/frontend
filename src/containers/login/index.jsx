import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useLoginMutation, useRegisterMutation, useGoogleLoginMutation } from '../../api';
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
  GoogleButton,
  Divider,
  ErrorMessage,
} from './styles';

export default function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const [login, { isLoading: loggingIn }] = useLoginMutation();
  const [register, { isLoading: registering }] = useRegisterMutation();
  const [googleLogin, { isLoading: googleLoading }] = useGoogleLoginMutation();
  const loading = loggingIn || registering;

  const handleGoogleSuccess = async (credentialResponse) => {
    setFormError('');
    const result = await googleLogin({ credential: credentialResponse.credential });
    if (result.error) {
      setFormError(result.error.data?.detail ?? 'Google login failed');
      return;
    }
    onLogin(result.data.access_token, result.data.api_token ?? null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setFormError('Please enter your username and password');
      return;
    }
    setFormError('');

    if (isRegistering) {
      if (!email) {
        setFormError('Please enter your email');
        return;
      }
      const regResult = await register({ username, email, password });
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

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setFormError('Google login failed')}
          width="100%"
          useOneTap
        />

        <Divider>or</Divider>

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

          {isRegistering && (
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </InputGroup>
          )}

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
