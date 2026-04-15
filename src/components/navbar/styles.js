import styled from 'styled-components';

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LogoIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #0076f5; /* Adjusted to closely match image */
  border-radius: 6px;
  color: white;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const LogoText = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledSelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0.875rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #0f172a;
  cursor: pointer;
  min-width: 170px;
  
  &:hover {
    background-color: #f1f5f9;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: #64748b;
  }
`;

export const PlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #0f172a;
  cursor: pointer;
  
  &:hover {
    background-color: #f1f5f9;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const UserIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #e2e8f0;
  border-radius: 50%;
  color: #475569;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0f172a;
`;

export const ChevronIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;
