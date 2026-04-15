import styled from 'styled-components';

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #6b7280;
`;

export const Input = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 0.875rem;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
  &:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
`;

export const TextArea = styled.textarea`
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 0.78rem;
  font-family: 'Courier New', Courier, monospace;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.15s, box-shadow 0.15s;
  &:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  user-select: none;
`;

export const AdvancedToggle = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 0.78rem;
  font-weight: 600;
  color: #6366f1;
  cursor: pointer;
  text-align: left;
  &:hover { text-decoration: underline; }
`;

export const AdvancedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
`;

export const ErrorText = styled.p`
  font-size: 0.75rem;
  color: #dc2626;
  margin: 0;
`;

export const PrimaryButton = styled.button`
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 9px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  &:hover:not(:disabled) { background: #4f46e5; }
  &:disabled { background: #a5b4fc; cursor: not-allowed; }
`;

export const SecondaryButton = styled.button`
  background: none;
  color: #6b7280;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 9px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
  &:hover { border-color: #9ca3af; color: #374151; }
`;

export const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
