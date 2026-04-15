import {
  NavContainer,
  LeftSection,
  LogoContainer,
  LogoIconWrapper,
  LogoText,
  SelectWrapper,
  StyledSelectButton,
  PlusButton,
  RightSection,
  UserMenu,
  UserIconWrapper,
  UserName,
  ChevronIcon
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

const Navbar = ({ onLogout, onNewScan }) => {
  return (
    <NavContainer>
      <LeftSection>
        <LogoContainer>
          <LogoIconWrapper>
            <GlobeIcon />
          </LogoIconWrapper>
          <LogoText>WebTest Pro</LogoText>
        </LogoContainer>

        <SelectWrapper>
          <StyledSelectButton>
            <span>Select page</span>
            <ChevronDownIcon />
          </StyledSelectButton>
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
