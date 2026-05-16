import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus, faKey, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import TokenModal from "../tokenModal";
import Button from "../button";
import {
  NavContainer,
  LeftSection,
  LogoContainer,
  LogoText,
  SelectWrapper,
  DropdownMenu,
  DropdownItem,
  DropdownItemTop,
  DropdownUrl,
  DropdownMeta,
  DropdownStatus,
  DropdownEmpty,
  NavTabs,
  RightSection,
  UserMenu,
  UserWrapper,
  UserDropdownMenu,
  UserIconWrapper,
  UserName,
  ChevronIcon,
} from "./styles";

const UserIcon = () => <FontAwesomeIcon icon={faUser} />;
const ChevronDownIcon = () => <FontAwesomeIcon icon={faChevronDown} />;
const PlusIcon = () => <FontAwesomeIcon icon={faPlus} />;
const KeyIcon = () => <FontAwesomeIcon icon={faKey} />;
const LogOutIcon = () => <FontAwesomeIcon icon={faRightFromBracket} />;

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const Navbar = ({
  onLogout,
  onNewScan,
  scans = [],
  selectedScan,
  onSelectScan,
  currentPage,
  onNavigate,
}) => {
  const [scanOpen, setScanOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);

  const scanRef = useRef(null);
  const userRef = useRef(null);

  const activeScan = selectedScan;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (scanRef.current && !scanRef.current.contains(e.target))
        setScanOpen(false);
      if (userRef.current && !userRef.current.contains(e.target))
        setUserOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <NavContainer>
        <LeftSection>
          <LogoContainer>
            <img src="/src/assets/logo.svg" alt="Testify Logo" width={28} />
            <LogoText>TESTIFY</LogoText>
          </LogoContainer>

          <SelectWrapper ref={scanRef}>
            <Button variant="select" onClick={() => setScanOpen((v) => !v)}>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {activeScan ? activeScan.target_url : "Select scan"}
              </span>
              <ChevronDownIcon />
            </Button>

            {scanOpen && (
              <DropdownMenu>
                {scans.length === 0 ? (
                  <DropdownEmpty>No scans yet.</DropdownEmpty>
                ) : (
                  scans.map((scan) => (
                    <DropdownItem
                      key={scan.id}
                      $active={scan.id === selectedScan?.id}
                      onClick={() => {
                        onSelectScan(scan);
                        setScanOpen(false);
                      }}
                    >
                      <DropdownItemTop>
                        <DropdownStatus $status={scan.status}>
                          {scan.status}
                        </DropdownStatus>
                        <DropdownMeta>#{scan.id}</DropdownMeta>
                      </DropdownItemTop>
                      <DropdownUrl title={scan.target_url}>
                        {scan.target_url}
                      </DropdownUrl>
                      <DropdownMeta>{formatDate(scan.created_at)}</DropdownMeta>
                    </DropdownItem>
                  ))
                )}
              </DropdownMenu>
            )}

            <Button variant="icon" onClick={onNewScan} title="New scan" icon={<PlusIcon />} />
          </SelectWrapper>
          <NavTabs>
            <Button variant="tab" active={currentPage === "home"} onClick={() => onNavigate("home")}>Dashboard</Button>
            <Button variant="tab" active={currentPage === "testPaths"} onClick={() => onNavigate("testPaths")}>Test Paths</Button>
          </NavTabs>
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
                <Button
                  variant="menu-item"
                  divider
                  icon={<KeyIcon />}
                  text="Verification token"
                  onClick={() => { setTokenModalOpen(true); setUserOpen(false); }}
                />
                <Button
                  variant="menu-item"
                  danger
                  icon={<LogOutIcon />}
                  text="Sign out"
                  onClick={() => { setUserOpen(false); onLogout(); }}
                />
              </UserDropdownMenu>
            )}
          </UserWrapper>
        </RightSection>
      </NavContainer>

      <TokenModal
        isOpen={tokenModalOpen}
        onClose={() => setTokenModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
