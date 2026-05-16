import styled from 'styled-components';

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SectionTitle = styled.p`
  font-size: 0.78rem;
  font-weight: 700;
  color: #374151;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Description = styled.p`
  font-size: 0.85rem;
  color: #4b5563;
  margin: 0;
  line-height: 1.6;
`;

export const CodeBlock = styled.pre`
  background: #0f172a;
  border-radius: 8px;
  padding: 14px 16px;
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.78rem;
  line-height: 1.7;
  overflow-x: auto;
  position: relative;
`;

export const DimLine = styled.span`
  display: block;
  color: #334155;
`;

export const MetaLine = styled.span`
  display: block;
  color: #7dd3fc;
`;


export const WarningBox = styled.div`
  background: #fff7ed;
  border: 1.5px solid #fed7aa;
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const WarningTitle = styled.p`
  font-size: 0.82rem;
  font-weight: 700;
  color: #9a3412;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const WarningText = styled.p`
  font-size: 0.8rem;
  color: #7c2d12;
  margin: 0;
  line-height: 1.55;
`;

export const CodeWrapper = styled.div`
  position: relative;
`;

export const CodeBlur = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(15, 23, 42, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
`;

export const AcceptNote = styled.p`
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.55;
  text-align: center;

  strong { color: #374151; }
`;

