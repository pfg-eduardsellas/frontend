import { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import styled from "styled-components";
import HomePage from "./containers/homePage/index.jsx";
import TestPathsPage from "./containers/testPathsPage/index.jsx";
import Login from "./containers/login/index.jsx";
import Navbar from "./components/navbar/index.jsx";
import NewScanModal from "./components/newScanModal/index.jsx";
import {
  useGetScansQuery,
  useGetScanQuery,
  useDeleteScanMutation,
  useRerunScanMutation,
} from "./api.jsx";
import Modal from "./components/modal";
import Button from "./components/button";
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
  const [selectedScanId, setSelectedScanId] = useState(null);
  const [newScanOpen, setNewScanOpen] = useState(false);
  const [scanToDelete, setScanToDelete] = useState(null);
  const [scanToRerun, setScanToRerun] = useState(null);

  const { data: scans = [] } = useGetScansQuery();
  const [deleteScan, { isLoading: deleting }] = useDeleteScanMutation();
  const [rerunScan, { isLoading: rerunning }] = useRerunScanMutation();

  const effectiveScanId = selectedScanId ?? scans[0]?.id ?? null;

  const isActiveStatus = (s) =>
    s?.status === "running" || s?.status === "pending";

  const listScan = scans.find((s) => s.id === effectiveScanId) ?? null;
  const selectedIsActive = isActiveStatus(listScan);

  const { data: scanDetail, refetch: refetchScanDetail } = useGetScanQuery(
    effectiveScanId,
    {
      skip: !effectiveScanId,
      pollingInterval: selectedIsActive ? POLL_INTERVAL_MS : 0,
    },
  );

  useEffect(() => {
    if (
      effectiveScanId &&
      !isActiveStatus(listScan) &&
      isActiveStatus(scanDetail)
    ) {
      refetchScanDetail();
    }
  }, [effectiveScanId, listScan?.status, scanDetail?.status]);

  const effectiveSelectedScan = scanDetail ?? listScan;

  const hasRunning = scans.some(
    (s) => s.status === "running" || s.status === "pending",
  );
  useGetScansQuery(undefined, {
    skip: !hasRunning,
    pollingInterval: POLL_INTERVAL_MS,
  });

  const handleConfirmDelete = async () => {
    await deleteScan(scanToDelete.id);
    if (scanToDelete.id === selectedScanId) setSelectedScanId(null);
    setScanToDelete(null);
  };

  const handleConfirmRerun = async () => {
    const rerun = await rerunScan(scanToRerun.id).unwrap();
    setSelectedScanId(rerun.id);
    setScanToRerun(null);
  };

  return (
    <AppFrame>
      <Navbar
        onLogout={onLogout}
        onNewScan={() => setNewScanOpen(true)}
        scans={scans}
        selectedScan={effectiveSelectedScan}
        onSelectScan={(scan) => setSelectedScanId(scan.id)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <PageArea>
        {currentPage === "testPaths" ? (
          <TestPathsPage selectedScan={effectiveSelectedScan} />
        ) : (
          <HomePage
            selectedScan={effectiveSelectedScan}
            onDeleteScan={setScanToDelete}
            onRerunScan={setScanToRerun}
          />
        )}
      </PageArea>

      <NewScanModal
        isOpen={newScanOpen}
        onClose={() => setNewScanOpen(false)}
        onScanCreated={(newScan) => {
          setSelectedScanId(newScan.id);
          setNewScanOpen(false);
        }}
      />

      <Modal
        isOpen={!!scanToDelete}
        onClose={() => setScanToDelete(null)}
        title="Delete scan"
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              text="Cancel"
              onClick={() => setScanToDelete(null)}
              disabled={deleting}
            />
            <Button
              variant="danger"
              text={deleting ? "Deleting…" : "Delete"}
              onClick={handleConfirmDelete}
              disabled={deleting}
            />
          </>
        }
      >
        Are you sure you want to delete the scan for{" "}
        <strong>{scanToDelete?.target_url}</strong>? This action cannot be
        undone.
      </Modal>

      <Modal
        isOpen={!!scanToRerun}
        onClose={() => setScanToRerun(null)}
        title="Rerun scan"
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              text="Cancel"
              onClick={() => setScanToRerun(null)}
              disabled={rerunning}
            />
            <Button
              variant="primary"
              text={rerunning ? "Rerunning…" : "Rerun"}
              onClick={handleConfirmRerun}
              disabled={rerunning}
            />
          </>
        }
      >
        Rerunning the scan for <strong>{scanToRerun?.target_url}</strong> will
        delete all its tests, logs and results, and overwrite its actions. This
        action cannot be undone.
      </Modal>
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
    googleLogout();
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
