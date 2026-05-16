import { useEffect, useState } from "react";
import styled from "styled-components";
import HomePage from "./containers/homePage/index.jsx";
import TestPathsPage from "./containers/testPathsPage/index.jsx";
import Login from "./containers/login/index.jsx";
import Navbar from "./components/navbar/index.jsx";
import NewScanModal from "./components/newScanModal/index.jsx";
import { useGetScansQuery } from "./api.jsx";
import { POLL_INTERVAL_MS } from "./containers/homePage/helpers.js";

const AppFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const PageArea = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
`;

function AuthenticatedApp({ onLogout }) {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedScan, setSelectedScan] = useState(null);
  const [newScanOpen, setNewScanOpen] = useState(false);

  const { data: scans = [] } = useGetScansQuery();

  const effectiveSelectedScan = selectedScan ?? scans[0] ?? null;

  const hasRunning = scans.some(
    (s) => s.status === "running" || s.status === "pending",
  );
  useGetScansQuery(undefined, {
    skip: !hasRunning,
    pollingInterval: POLL_INTERVAL_MS,
  });

  return (
    <AppFrame>
      <Navbar
        onLogout={onLogout}
        onNewScan={() => setNewScanOpen(true)}
        scans={scans}
        selectedScan={effectiveSelectedScan}
        onSelectScan={setSelectedScan}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <PageArea>
        {currentPage === "testPaths" ? (
          <TestPathsPage selectedScan={effectiveSelectedScan} />
        ) : (
          <HomePage selectedScan={effectiveSelectedScan} />
        )}
      </PageArea>

      <NewScanModal
        isOpen={newScanOpen}
        onClose={() => setNewScanOpen(false)}
        onScanCreated={(newScan) => {
          setSelectedScan(newScan.id);
          setNewScanOpen(false);
        }}
      />
    </AppFrame>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (accessToken, apiToken) => {
    localStorage.setItem("token", accessToken);
    if (apiToken) localStorage.setItem("api_token", apiToken);
    setToken(accessToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("api_token");
    setToken(null);
  };

  useEffect(() => {
    window.addEventListener("api:unauthorized", handleLogout);
    return () => window.removeEventListener("api:unauthorized", handleLogout);
  }, []);

  if (!token) return <Login onLogin={handleLogin} />;

  return <AuthenticatedApp onLogout={handleLogout} />;
}

export default App;
