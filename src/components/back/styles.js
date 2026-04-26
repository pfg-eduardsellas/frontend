import styled, { keyframes } from 'styled-components';

const float1 = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(-70px, 60px) scale(1.05); }
  66%  { transform: translate(50px, -50px) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
`;

const float2 = keyframes`
  0%   { top: 40%; left: 30%; transform: scale(1.05); }
  33%  { top: 10%; left: 10%; transform: scale(0.95); }
  66%  { top: 30%; left: 15%; transform: scale(0.95); }
  100% { top: 40%; left: 30%; transform: scale(1.05); }
`;

const float3 = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  40%  { transform: translate(-50px, -60px) scale(1.1); }
  80%  { transform: translate(30px, 30px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
`;

export const BackWrapper = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.5rem 3rem;
  background-color: #f0eeff;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(139, 92, 246, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139, 92, 246, 0.12) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 1;
    pointer-events: none;
  }
`;

export const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.55;
  pointer-events: none;
  z-index: 0;
  isolation: isolate;
`;


export const Blob1 = styled(Blob)`
  width: 350px;
  height: 350px;
  background: #a78bfa;
  bottom: -60px;
  right: -60px;
  animation: ${float1} 18s ease-in-out infinite;
`;

export const Blob2 = styled(Blob)`
  width: 280px;
  height: 280px;
  background: #5c6ae5;
  top: 40%;
  left: 30%;
  animation: ${float2} 20s cubic-bezier(.7,-0.02,.2,1) infinite;
`;

export const Blob3 = styled(Blob)`
  width: 200px;
  height: 200px;
  background: #e879f9;
  top: 15%;
  right: 10%;
  animation: ${float3} 16s ease-in-out infinite;
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BrandDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #7c3aed;
  flex-shrink: 0;
`;

export const BrandName = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: 0.01em;
`;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-bottom: 1rem;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 5rem);
  font-weight: 800;
  color: #111827;
  line-height: 1.15;
  margin: 0;
`;

export const HeroHighlight = styled.em`
  color: #7c3aed;
  font-style: italic;
`;

export const HeroSub = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  max-width: 460px;
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 2.5rem;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const StatNum = styled.span`
  font-size: 1.4rem;
  font-weight: 800;
  color: #111827;
`;

export const StatLabel = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;
