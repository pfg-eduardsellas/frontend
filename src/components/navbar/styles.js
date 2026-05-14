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
  height: 100%;
  border-right: 1px solid #e5e7eb;
  padding-right: 1rem;
`;

export const LogoText = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #0f172a;
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 280px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  z-index: 200;
  overflow: hidden;
  max-height: 320px;
  overflow-y: auto;
`;

export const DropdownItem = styled.div`
  padding: 9px 14px;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  background: ${({ $active }) => $active ? '#eef2ff' : 'white'};
  &:last-child { border-bottom: none; }
  &:hover { background: ${({ $active }) => $active ? '#eef2ff' : '#f8fafc'}; }
`;

export const DropdownItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
`;

export const DropdownUrl = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DropdownMeta = styled.span`
  font-size: 0.7rem;
  color: #94a3b8;
`;

export const DropdownStatus = styled.span`
  font-size: 0.62rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${({ $status }) => ({
    pending: '#fef3c7', running: '#dbeafe', done: '#d1fae5', error: '#fee2e2',
  }[$status] ?? '#f3f4f6')};
  color: ${({ $status }) => ({
    pending: '#92400e', running: '#1e40af', done: '#065f46', error: '#991b1b',
  }[$status] ?? '#374151')};
`;

export const DropdownEmpty = styled.p`
  font-size: 0.8rem;
  color: #94a3b8;
  padding: 12px 14px;
  margin: 0;
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

export const NavTabs = styled.div`
  display: flex;
  gap: 2px;
`;

export const NavTab = styled.button`
  background: none;
  border: none;
  padding: 6px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $active }) => ($active ? '#6366f1' : '#64748b')};
  border-bottom: 2px solid ${({ $active }) => ($active ? '#6366f1' : 'transparent')};
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;
  &:hover { color: #6366f1; }
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

export const UserWrapper = styled.div`
  position: relative;
`;

export const UserDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  z-index: 200;
  overflow: hidden;
`;

export const UserDropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ $danger }) => $danger ? '#dc2626' : '#0f172a'};
  text-align: left;
  transition: background 0.12s;
  border-bottom: ${({ $divider }) => $divider ? '1px solid #f1f5f9' : 'none'};

  &:hover {
    background: ${({ $danger }) => $danger ? '#fef2f2' : '#f8fafc'};
  }

  svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    color: ${({ $danger }) => $danger ? '#dc2626' : '#64748b'};
  }
`;
