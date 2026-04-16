import { useEffect, useRef, useState } from 'react';
import {
  NavContainer,
  LeftSection,
  LogoContainer,
  LogoIconWrapper,
  LogoText,
  SelectWrapper,
  StyledSelectButton,
  PlusButton,
  DropdownMenu,
  DropdownItem,
  DropdownItemTop,
  DropdownUrl,
  DropdownMeta,
  DropdownStatus,
  DropdownEmpty,
  RightSection,
  UserMenu,
  UserIconWrapper,
  UserName,
  ChevronIcon,
} from './styles';

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString('en-US', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

const Navbar = ({ onLogout, onNewScan, scans = [], selectedScan, onSelectScan }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const activeScan = scans.find((s) => s.id === selectedScan);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <NavContainer>
      <LeftSection>
        <LogoContainer>
          <LogoIconWrapper>
            <GlobeIcon />
          </LogoIconWrapper>
          <LogoText>WebTest Pro</LogoText>
        </LogoContainer>

        <SelectWrapper ref={wrapperRef}>
          <StyledSelectButton onClick={() => setOpen((v) => !v)}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {activeScan ? activeScan.target_url : 'Select scan'}
            </span>
            <ChevronDownIcon />
          </StyledSelectButton>

          {open && (
            <DropdownMenu>
              {scans.length === 0 ? (
                <DropdownEmpty>No scans yet.</DropdownEmpty>
              ) : (
                scans.map((scan) => (
                  <DropdownItem
                    key={scan.id}
                    $active={scan.id === selectedScan}
                    onClick={() => { onSelectScan(scan.id); setOpen(false); }}
                  >
                    <DropdownItemTop>
                      <DropdownStatus $status={scan.status}>{scan.status}</DropdownStatus>
                      <DropdownMeta>#{scan.id}</DropdownMeta>
                    </DropdownItemTop>
                    <DropdownUrl title={scan.target_url}>{scan.target_url}</DropdownUrl>
                    <DropdownMeta>{formatDate(scan.created_at)}</DropdownMeta>
                  </DropdownItem>
                ))
              )}
            </DropdownMenu>
          )}

          <PlusButton onClick={onNewScan} title="New scan">
            <PlusIcon />
          </PlusButton>
        </SelectWrapper>
      </LeftSection>

      <RightSection>
        <UserMenu onClick={onLogout} style={{ cursor: 'pointer' }} title="Sign out">
          <UserIconWrapper>
            <UserIcon />
          </UserIconWrapper>
          <UserName>Sign out</UserName>
          <ChevronIcon>
            <ChevronDownIcon />
          </ChevronIcon>
        </UserMenu>
      </RightSection>
    </NavContainer>
  );
};

export default Navbar;
