import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  font-family: 'Inter', sans-serif;
`;

export const RightPane = styled.div`
  width: 480px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 3rem 2.5rem;
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 0.35rem;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1.75rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const Label = styled.label`
  font-size: 0.7rem;
  font-weight: 700;
  color: #374151;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const Input = styled.input`
  padding: 0.7rem 0.9rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  color: #111827;
  background: white;
  transition: border-color 0.15s, box-shadow 0.15s;

  &::placeholder { color: #9ca3af; }

  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }
`;

export const ForgotLink = styled.a`
  font-size: 0.8rem;
  color: #7c3aed;
  text-align: right;
  cursor: pointer;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

export const SignInButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #7c3aed;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 0.25rem;

  &:hover:not(:disabled) { background: #6d28d9; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1.25rem 0;
  color: #9ca3af;
  font-size: 0.78rem;
  font-weight: 500;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
`;

export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.72rem;
  background: white;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;

  &:hover { background: #f9fafb; border-color: #d1d5db; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const RegisterRow = styled.p`
  font-size: 0.82rem;
  color: #6b7280;
  text-align: center;
  margin: 1.25rem 0 0;
`;

export const RegisterLink = styled.span`
  color: #7c3aed;
  font-weight: 600;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.8rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
`;

/* kept for compatibility */
export const ButtonGroup = styled.div`display: none;`;
export const Button = styled.button`display: none;`;
