import { useEffect, useRef, useState } from 'react';
import TokenModal from '../tokenModal';
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
  UserWrapper,
  UserDropdownMenu,
  UserDropdownItem,
  UserIconWrapper,
  UserName,
  ChevronIcon,
} from './styles';

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M21 2l-9.6 9.6" />
    <path d="M15.5 7.5l3 3L22 7l-3-3" />
  </svg>
);

const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
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
  const [scanOpen, setScanOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);

  const scanRef = useRef(null);
  const userRef = useRef(null);

  const activeScan = scans.find((s) => s.id === selectedScan);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (scanRef.current && !scanRef.current.contains(e.target)) setScanOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <NavContainer>
        <LeftSection>
          <LogoContainer>
            <LogoIconWrapper>
              <GlobeIcon />
            </LogoIconWrapper>
            <LogoText>WebTest Pro</LogoText>
          </LogoContainer>

          <SelectWrapper ref={scanRef}>
            <StyledSelectButton onClick={() => setScanOpen((v) => !v)}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activeScan ? activeScan.target_url : 'Select scan'}
              </span>
              <ChevronDownIcon />
            </StyledSelectButton>

            {scanOpen && (
              <DropdownMenu>
                {scans.length === 0 ? (
                  <DropdownEmpty>No scans yet.</DropdownEmpty>
                ) : (
                  scans.map((scan) => (
                    <DropdownItem
                      key={scan.id}
                      $active={scan.id === selectedScan}
                      onClick={() => { onSelectScan(scan.id); setScanOpen(false); }}
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
          <UserWrapper ref={userRef}>
            <UserMenu onClick={() => setUserOpen((v) => !v)}>
              <UserIconWrapper>
                <UserIcon />
              </UserIconWrapper>
              <UserName>Account</UserName>
              <ChevronIcon>
                <ChevronDownIcon />
              </ChevronIcon>
            </UserMenu>

            {userOpen && (
              <UserDropdownMenu>
                <UserDropdownItem
                  $divider
                  onClick={() => { setTokenModalOpen(true); setUserOpen(false); }}
                >
                  <KeyIcon />
                  Verification token
                </UserDropdownItem>
                <UserDropdownItem
                  $danger
                  onClick={() => { setUserOpen(false); onLogout(); }}
                >
                  <LogOutIcon />
                  Sign out
                </UserDropdownItem>
              </UserDropdownMenu>
            )}
          </UserWrapper>
        </RightSection>
      </NavContainer>

      <TokenModal isOpen={tokenModalOpen} onClose={() => setTokenModalOpen(false)} />
    </>
  );
};

export default Navbar;
