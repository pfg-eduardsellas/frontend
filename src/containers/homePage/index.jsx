import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import LeftSection from "./components/LeftSection";
import ScanTerminal from "./components/ScanTerminal";
import NewScanModal from "./components/NewScanModal";
import PathRunsModal from "./components/PathRunsModal";
import DashboardStats from "./components/DashboardStats";
import ErrorsTable from "./components/ErrorsTable";
import AccessibilityTable from "./components/AccessibilityTable";
import TestPathModal from "./components/TestPathModal";
import {
  useGetScansQuery,
  useGetScanQuery,
  useGetPathsQuery,
  useDeletePathMutation,
  useGetScanActionsQuery,
} from "../../api";
import { POLL_INTERVAL_MS, formatScheduleBadge } from "./helpers";
import {
  Container,
  Wrapper,
  BottomPanels,
  ScanPanel,
  ScanButton,
  ScanList,
  PathItem,
  PathItemText,
  DeleteButton,
  HistoryButton,
  ScheduleBadge,
  PanelSectionHeader,
  PanelSectionTitle,
  PanelCountBadge,
  CollapseIcon,
} from "./styles";

function CollapsiblePanel({
  title,
  count,
  countColor,
  countTextColor,
  children,
  defaultOpen = true,
  style,
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <ScanPanel style={style}>
      <PanelSectionHeader onClick={() => setOpen((o) => !o)}>
        <PanelSectionTitle>{title}</PanelSectionTitle>
        {count != null && (
          <PanelCountBadge
            $color={countColor ?? "#e5e7eb"}
            $textColor={countTextColor ?? "#374151"}
          >
            {count}
          </PanelCountBadge>
        )}
        <CollapseIcon $open={open}>▼</CollapseIcon>
      </PanelSectionHeader>
      {open && children}
    </ScanPanel>
  );
}

function HomePage({ onLogout }) {
  const [selectedScan, setSelectedScan] = useState(null);
  const [newScanOpen, setNewScanOpen] = useState(false);
  const [runModalPath, setRunModalPath] = useState(null);
  const [testPathOpen, setTestPathOpen] = useState(false);

  const [scansPolling, setScansPolling] = useState(POLL_INTERVAL_MS);
  const [detailPolling, setDetailPolling] = useState(0);

  const { data: scans = [] } = useGetScansQuery(undefined, {
    pollingInterval: scansPolling,
  });

  useEffect(() => {
    const hasRunning = scans.some(
      (s) => s.status === "running" || s.status === "pending",
    );
    setScansPolling(hasRunning ? POLL_INTERVAL_MS : 0);
  }, [scans]);

  const { data: scanDetail } = useGetScanQuery(selectedScan, {
    skip: !selectedScan,
    pollingInterval: detailPolling,
  });

  useEffect(() => {
    const isActive =
      scanDetail?.status === "running" || scanDetail?.status === "pending";
    setDetailPolling(isActive ? POLL_INTERVAL_MS : 0);
  }, [scanDetail?.status]);

  const { data: savedPaths = [] } = useGetPathsQuery(selectedScan, {
    skip: !selectedScan,
  });

  const activeScan = scans.find((s) => s.id === selectedScan);
  const { data: actionsData } = useGetScanActionsQuery(selectedScan, {
    skip: !selectedScan || activeScan?.status !== "done",
  });
  const graphActions = actionsData?.actions ?? [];

  const [deletePath] = useDeletePathMutation();

  const isActive =
    scanDetail?.status === "running" || scanDetail?.status === "pending";

  if (selectedScan === null && scans.length > 0) {
    setSelectedScan(scans[0].id);
  }

  const handleSelectScan = (id) => setSelectedScan(id);
  const handleDeletePath = (pathId) =>
    deletePath({ scanId: selectedScan, pathId });

  const totalErrors = graphActions.reduce(
    (s, a) => s + (a.errors?.length ?? 0),
    0,
  );
  const totalViolations = graphActions.reduce(
    (s, a) => s + (a.accessibility_violations?.length ?? 0),
    0,
  );

  return (
    <Container>
      <Navbar
        onLogout={onLogout}
        onNewScan={() => setNewScanOpen(true)}
        scans={scans}
        selectedScan={selectedScan}
        onSelectScan={handleSelectScan}
      />
      <Wrapper>
        <DashboardStats
          graphActions={graphActions}
          savedPaths={savedPaths}
          activeScan={activeScan}
        />

        <LeftSection activeScan={activeScan} selectedScan={selectedScan} />

        <BottomPanels>
          {/* Errors */}
          <CollapsiblePanel
            title="Action Errors"
            count={totalErrors}
            countColor={totalErrors > 0 ? "#dc2626" : "#e5e7eb"}
            countTextColor={totalErrors > 0 ? "white" : "#9ca3af"}
          >
            {!selectedScan ? (
              <p style={{ fontSize: "0.78rem", color: "#9ca3af", margin: 0 }}>
                Select a scan to see errors.
              </p>
            ) : (
              <ErrorsTable graphActions={graphActions} />
            )}
          </CollapsiblePanel>

          {/* Test Paths */}
          <CollapsiblePanel
            title="Test Paths"
            count={savedPaths.length}
            countColor="#eef2ff"
            countTextColor="#6366f1"
          >
            <ScanButton
              onClick={() => setTestPathOpen(true)}
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
              <ScanList style={{ maxHeight: 200 }}>
                {savedPaths.map((p) => (
                  <PathItem key={p.id}>
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <PathItemText title={p.path}>{p.path}</PathItemText>
                      {formatScheduleBadge(p) && (
                        <ScheduleBadge>{formatScheduleBadge(p)}</ScheduleBadge>
                      )}
                    </div>
                    <HistoryButton
                      onClick={() => setRunModalPath(p)}
                      title="View run history"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="12 8 12 12 14 14" />
                        <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                      </svg>
                    </HistoryButton>
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
              <p style={{ fontSize: "0.78rem", color: "#9ca3af", margin: 0 }}>
                No paths saved yet.
              </p>
            )}
          </CollapsiblePanel>

          {/* Accessibility */}
          <CollapsiblePanel
            title="Accessibility"
            count={totalViolations}
            countColor={totalViolations > 0 ? "#ea580c" : "#e5e7eb"}
            countTextColor={totalViolations > 0 ? "white" : "#9ca3af"}
          >
            {!selectedScan ? (
              <p style={{ fontSize: "0.78rem", color: "#9ca3af", margin: 0 }}>
                Select a scan to see accessibility issues.
              </p>
            ) : (
              <AccessibilityTable graphActions={graphActions} />
            )}
          </CollapsiblePanel>
        </BottomPanels>
      </Wrapper>

      <NewScanModal
        isOpen={newScanOpen}
        onClose={() => setNewScanOpen(false)}
        onScanCreated={(newScan) => handleSelectScan(newScan.id)}
      />

      {scanDetail && (
        <ScanTerminal logs={scanDetail.logs ?? []} isActive={isActive} />
      )}

      <PathRunsModal
        isOpen={!!runModalPath}
        onClose={() => setRunModalPath(null)}
        scanId={selectedScan}
        path={runModalPath}
      />

      <TestPathModal
        isOpen={testPathOpen}
        onClose={() => setTestPathOpen(false)}
        scanId={activeScan?.status === "done" ? selectedScan : null}
      />
    </Container>
  );
}

export default HomePage;
