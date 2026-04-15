import { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import LeftSection from "./components/LeftSection";
import ScanTerminal from "./components/ScanTerminal";
import NewScanModal from "./components/NewScanModal";
import {
  Container,
  Wrapper,
  RightSection,
  ScanPanel,
  PanelTitle,
  ScanButton,
  PathDisplay,
  ScanList,
  ScanItem,
  ScanUrl,
  ScanMeta,
  StatusBadge,
  ScanDetailPanel,
  ScanInfoSection,
  ScanInfoGrid,
  ScanInfoItem,
  ScanInfoLabel,
  ScanInfoValue,
  ScanErrorMessage,
  PathItem,
  PathItemText,
  DeleteButton,
} from "./styles";

const POLL_INTERVAL_MS = 3000;

function HomePage({ onLogout }) {
  const [scans, setScans] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [scanDetail, setScanDetail] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [newScanOpen, setNewScanOpen] = useState(false);
  const [testPathMode, setTestPathMode] = useState(false);
  const [selectedPath, setSelectedPath] = useState([]);
  const [savedPaths, setSavedPaths] = useState([]);
  const [savingPath, setSavingPath] = useState(false);

  // ── Fetch scan list ──────────────────────────────────────────────────────
  const fetchScans = useCallback(async () => {
    try {
      const res = await fetch("/api/scans", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) {
        if (res.status === 401) onLogout();
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setScans(data);

      // Auto-select the most recent scan if none is selected yet
      setSelectedScan((prev) => {
        if (prev === null && data.length > 0) return data[0].id;
        return prev;
      });
    } catch (e) {
      setFetchError(e.message);
    }
  }, []);

  useEffect(() => {
    fetchScans();
  }, [fetchScans]);

  // ── Poll scan list while any scan is running ─────────────────────────────
  useEffect(() => {
    const hasRunning = scans.some(
      (s) => s.status === "running" || s.status === "pending"
    );
    if (!hasRunning) return;
    const id = setInterval(fetchScans, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [scans, fetchScans]);

  // ── Fetch detail of selected scan ─────────────────────────────────────────
  const fetchScanDetail = useCallback(async () => {
    if (!selectedScan) return;
    try {
      const res = await fetch(`/api/scans/${selectedScan}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) {
        const data = await res.json();
        setScanDetail(data);
        // Keep scan list status in sync
        setScans((prev) =>
          prev.map((s) => (s.id === data.id ? { ...s, ...data } : s))
        );
      }
    } catch {
      // silent
    }
  }, [selectedScan]);

  useEffect(() => {
    setScanDetail(null);
    if (selectedScan) fetchScanDetail();
  }, [selectedScan]); // eslint-disable-line react-hooks/exhaustive-deps

  // Poll detail while selected scan is pending/running
  useEffect(() => {
    const isActive =
      scanDetail?.status === "running" || scanDetail?.status === "pending";
    if (!isActive) return;
    const id = setInterval(fetchScanDetail, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [scanDetail?.status, fetchScanDetail]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ── Saved paths CRUD ─────────────────────────────────────────────────────
  const fetchPaths = useCallback(async () => {
    if (!selectedScan) return;
    try {
      const res = await fetch(`/api/scans/${selectedScan}/path`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) setSavedPaths(await res.json());
    } catch {
      /* silent */
    }
  }, [selectedScan]);

  const handleSavePath = async () => {
    if (!selectedScan || selectedPath.length === 0) return;
    setSavingPath(true);
    try {
      const res = await fetch(`/api/scans/${selectedScan}/path`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ path: selectedPath.join(",") }),
      });
      if (res.ok) {
        setTestPathMode(false);
        setSelectedPath([]);
        fetchPaths();
      }
    } catch {
      /* silent */
    } finally {
      setSavingPath(false);
    }
  };

  const handleDeletePath = async (pathId) => {
    try {
      const res = await fetch(`/api/scans/${selectedScan}/path/${pathId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) setSavedPaths((prev) => prev.filter((p) => p.id !== pathId));
    } catch {
      /* silent */
    }
  };

  // Clear test path and reload saved paths when selected scan changes
  useEffect(() => {
    setTestPathMode(false);
    setSelectedPath([]);
    setSavedPaths([]);
    fetchPaths();
  }, [selectedScan, fetchPaths]);

  // Toggle a node in the path. Deselecting a node removes it and everything after it.
  const handleNodeToggle = useCallback((nodeId) => {
    setSelectedPath((prev) => {
      const idx = prev.indexOf(nodeId);
      if (idx !== -1) return prev.slice(0, idx); // deselect this and subsequent
      return [...prev, nodeId];
    });
  }, []);

  const activeScan = scans.find((s) => s.id === selectedScan);
  const isActive =
    scanDetail?.status === "running" || scanDetail?.status === "pending";

  return (
    <Container>
      <Navbar onLogout={onLogout} onNewScan={() => setNewScanOpen(true)} />
      <Wrapper>
        {/* ── Graph Area ── */}
        <LeftSection
          activeScan={activeScan}
          selectedScan={selectedScan}
          testPathMode={testPathMode}
          selectedPath={selectedPath}
          onNodeToggle={handleNodeToggle}
        />

        {/* ── Right Panel ── */}
        <RightSection>
          {/* Scan history */}
          <ScanPanel style={{ flex: 1, minHeight: 0 }}>
            <PanelTitle>Scans ({scans.length})</PanelTitle>
            <ScanList>
              {scans.length === 0 && (
                <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: 0 }}>
                  No scans yet. Enter a URL and hit "Start scan".
                </p>
              )}
              {scans.map((scan) => (
                <ScanItem
                  key={scan.id}
                  $active={scan.id === selectedScan}
                  onClick={() => setSelectedScan(scan.id)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <StatusBadge $status={scan.status}>
                      {scan.status}
                    </StatusBadge>
                    <ScanMeta>#{scan.id}</ScanMeta>
                  </div>
                  <ScanUrl title={scan.target_url}>{scan.target_url}</ScanUrl>
                  <ScanMeta>{formatDate(scan.created_at)}</ScanMeta>
                </ScanItem>
              ))}
            </ScanList>
          </ScanPanel>
          {/* Test Path */}
          <ScanPanel>
            <PanelTitle>Test Path</PanelTitle>

            {testPathMode ? (
              <>
                <p style={{ fontSize: "0.78rem", color: "#6b7280", margin: 0 }}>
                  {selectedPath.length === 0
                    ? "Select a URL node to start the path."
                    : `${selectedPath.length} node${
                        selectedPath.length !== 1 ? "s" : ""
                      } selected`}
                </p>

                {selectedPath.length > 0 && (
                  <PathDisplay readOnly value={selectedPath.join(",")} />
                )}

                <div style={{ display: "flex", gap: 6 }}>
                  <ScanButton
                    $secondary
                    style={{ flex: 1 }}
                    onClick={() => {
                      setTestPathMode(false);
                      setSelectedPath([]);
                    }}
                  >
                    Cancel
                  </ScanButton>
                  <ScanButton
                    style={{ flex: 1 }}
                    disabled={selectedPath.length === 0 || savingPath}
                    onClick={handleSavePath}
                  >
                    {savingPath ? "Saving…" : "Save path"}
                  </ScanButton>
                </div>
              </>
            ) : (
              <>
                <ScanButton
                  onClick={() => setTestPathMode(true)}
                  disabled={activeScan?.status !== "done"}
                  title={
                    activeScan?.status !== "done"
                      ? "Scan must be complete to build a path"
                      : ""
                  }
                >
                  New test path
                </ScanButton>

                {savedPaths.length > 0 && (
                  <ScanList style={{ maxHeight: 160 }}>
                    {savedPaths.map((p) => (
                      <PathItem key={p.id}>
                        <PathItemText title={p.path}>{p.path}</PathItemText>
                        <DeleteButton
                          onClick={() => handleDeletePath(p.id)}
                          title="Delete path"
                        >
                          ✕
                        </DeleteButton>
                      </PathItem>
                    ))}
                  </ScanList>
                )}

                {savedPaths.length === 0 && activeScan?.status === "done" && (
                  <p
                    style={{ fontSize: "0.78rem", color: "#9ca3af", margin: 0 }}
                  >
                    No paths saved yet.
                  </p>
                )}
              </>
            )}
          </ScanPanel>
        </RightSection>
      </Wrapper>

      <NewScanModal
        isOpen={newScanOpen}
        onClose={() => setNewScanOpen(false)}
        onLogout={onLogout}
        onScanCreated={(newScan) => {
          setScans((prev) => [newScan, ...prev]);
          setSelectedScan(newScan.id);
        }}
      />

      {/* ── Scan Detail Panel ── */}
      {scanDetail && (
        <>
          <ScanTerminal logs={scanDetail.logs ?? []} isActive={isActive} />
          {/*<ScanDetailPanel>
            <ScanInfoSection>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <StatusBadge $status={scanDetail.status}>
                  {scanDetail.status}
                </StatusBadge>
                <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                  #{scanDetail.id}
                </span>
              </div>
              <ScanInfoGrid>
                <ScanInfoItem>
                  <ScanInfoLabel>URL</ScanInfoLabel>
                  <ScanInfoValue title={scanDetail.target_url}>
                    {scanDetail.target_url}
                  </ScanInfoValue>
                </ScanInfoItem>
                <ScanInfoItem>
                  <ScanInfoLabel>Iniciado</ScanInfoLabel>
                  <ScanInfoValue>
                    {formatDate(scanDetail.created_at)}
                  </ScanInfoValue>
                </ScanInfoItem>
                {scanDetail.finished_at && (
                  <ScanInfoItem>
                    <ScanInfoLabel>Finalizado</ScanInfoLabel>
                    <ScanInfoValue>
                      {formatDate(scanDetail.finished_at)}
                    </ScanInfoValue>
                  </ScanInfoItem>
                )}
                <ScanInfoItem>
                  <ScanInfoLabel>Páginas máx.</ScanInfoLabel>
                  <ScanInfoValue>{scanDetail.max_pages}</ScanInfoValue>
                </ScanInfoItem>
                <ScanInfoItem>
                  <ScanInfoLabel>Profundidad</ScanInfoLabel>
                  <ScanInfoValue>{scanDetail.max_depth}</ScanInfoValue>
                </ScanInfoItem>
                <ScanInfoItem>
                  <ScanInfoLabel>Acciones</ScanInfoLabel>
                  <ScanInfoValue>{scanDetail.max_actions}</ScanInfoValue>
                </ScanInfoItem>
                <ScanInfoItem>
                  <ScanInfoLabel>In-domain</ScanInfoLabel>
                  <ScanInfoValue>
                    {scanDetail.in_domain ? "Sí" : "No"}
                  </ScanInfoValue>
                </ScanInfoItem>
              </ScanInfoGrid>
              {scanDetail.error_message && (
                <ScanErrorMessage>
                  ⚠ {scanDetail.error_message}
                </ScanErrorMessage>
              )}
            </ScanInfoSection>
          </ScanDetailPanel>*/}
        </>
      )}
    </Container>
  );
}

export default HomePage;
