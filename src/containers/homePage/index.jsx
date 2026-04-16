import { useCallback, useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import LeftSection from './components/LeftSection';
import ScanTerminal from './components/ScanTerminal';
import NewScanModal from './components/NewScanModal';
import {
  useGetScansQuery,
  useGetScanQuery,
  useGetPathsQuery,
  useCreatePathMutation,
  useDeletePathMutation,
  useGetScanActionsQuery,
} from '../../api';
import {
  DAYS,
  DEFAULT_WEEK_SCHEDULE,
  POLL_INTERVAL_MS,
  formatScheduleBadge,
} from './helpers';
import {
  Container,
  Wrapper,
  RightSection,
  ScanPanel,
  PanelTitle,
  ScanButton,
  PathDisplay,
  ScanList,
  PathItem,
  PathItemText,
  DeleteButton,
  ScheduleBox,
  ScheduleTimeInput,
  DayRow,
  DayLabel,
  RepeatWeekRow,
  ScheduleBadge,
  ErrorList,
  ErrorItem,
  ErrorMessage,
  ErrorMeta,
} from './styles';

function HomePage({ onLogout }) {
  const [selectedScan, setSelectedScan] = useState(null);
  const [newScanOpen, setNewScanOpen] = useState(false);

  // ── Test path state ──────────────────────────────────────────────────────
  const [testPathMode, setTestPathMode] = useState(false);
  const [selectedPath, setSelectedPath] = useState([]);
  const [weekSchedule, setWeekSchedule] = useState(DEFAULT_WEEK_SCHEDULE);
  const [scheduleTime, setScheduleTime] = useState('');
  const [repeatWeekly, setRepeatWeekly] = useState(false);

  // Polling intervals tracked in state so hooks don't reference their own result.
  const [scansPolling, setScansPolling] = useState(POLL_INTERVAL_MS);
  const [detailPolling, setDetailPolling] = useState(0);

  // ── RTK Query: scan list ──────────────────────────────────────────────────
  const { data: scans = [] } = useGetScansQuery(undefined, {
    pollingInterval: scansPolling,
  });

  // Stop polling once no scan is running/pending.
  useEffect(() => {
    const hasRunning = scans.some(
      (s) => s.status === 'running' || s.status === 'pending'
    );
    setScansPolling(hasRunning ? POLL_INTERVAL_MS : 0);
  }, [scans]);

  // ── RTK Query: selected scan detail ──────────────────────────────────────
  const { data: scanDetail } = useGetScanQuery(selectedScan, {
    skip: !selectedScan,
    pollingInterval: detailPolling,
  });

  // Poll detail while the selected scan is active.
  useEffect(() => {
    const isActive =
      scanDetail?.status === 'running' || scanDetail?.status === 'pending';
    setDetailPolling(isActive ? POLL_INTERVAL_MS : 0);
  }, [scanDetail?.status]);

  // ── RTK Query: saved paths ────────────────────────────────────────────────
  const { data: savedPaths = [] } = useGetPathsQuery(selectedScan, {
    skip: !selectedScan,
  });

  // ── RTK Query: graph actions (for error panel) ────────────────────────────
  const activeScan = scans.find((s) => s.id === selectedScan);
  const { data: actionsData } = useGetScanActionsQuery(selectedScan, {
    skip: !selectedScan || activeScan?.status !== 'done',
  });
  const graphActions = actionsData?.actions ?? [];

  // ── RTK Query: mutations ──────────────────────────────────────────────────
  const [createPath, { isLoading: savingPath }] = useCreatePathMutation();
  const [deletePath] = useDeletePathMutation();

  const isActive =
    scanDetail?.status === 'running' || scanDetail?.status === 'pending';

  // ── Auto-select first scan ────────────────────────────────────────────────
  if (selectedScan === null && scans.length > 0) {
    setSelectedScan(scans[0].id);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
  const resetTestPath = () => {
    setTestPathMode(false);
    setSelectedPath([]);
    setWeekSchedule(DEFAULT_WEEK_SCHEDULE);
    setScheduleTime('');
    setRepeatWeekly(false);
  };

  const handleSelectScan = (id) => {
    setSelectedScan(id);
    resetTestPath();
  };

  const handleSavePath = async () => {
    if (!selectedScan || selectedPath.length === 0) return;
    const result = await createPath({
      scanId: selectedScan,
      path: selectedPath.join(','),
      schedule_days: DAYS.filter(({ key }) => weekSchedule[key]).map(({ key }) => key),
      schedule_time: scheduleTime || null,
      repeat_weekly: repeatWeekly,
    });
    if (!result.error) resetTestPath();
  };

  const handleDeletePath = (pathId) => {
    deletePath({ scanId: selectedScan, pathId });
  };

  // Toggle a node in the path. Deselecting removes it and everything after it.
  const handleNodeToggle = useCallback((nodeId) => {
    setSelectedPath((prev) => {
      const idx = prev.indexOf(nodeId);
      if (idx !== -1) return prev.slice(0, idx);
      return [...prev, nodeId];
    });
  }, []);

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
          {/* Action errors */}
          <ScanPanel style={{ flex: 1, minHeight: 0 }}>
            <PanelTitle>Action errors</PanelTitle>
            {(() => {
              const actionsWithErrors = graphActions.filter(
                (a) => a.errors?.length > 0
              );
              if (!selectedScan) {
                return (
                  <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0 }}>
                    Select a scan to see errors.
                  </p>
                );
              }
              if (actionsWithErrors.length === 0) {
                return (
                  <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0 }}>
                    No errors recorded.
                  </p>
                );
              }
              return (
                <ErrorList>
                  {actionsWithErrors.map((action) =>
                    action.errors.map((err, i) => (
                      <ErrorItem key={`${action.id}-${i}`}>
                        <ErrorMeta>
                          {action.type} #{action.id}
                        </ErrorMeta>
                        <ErrorMessage>{err}</ErrorMessage>
                      </ErrorItem>
                    ))
                  )}
                </ErrorList>
              );
            })()}
          </ScanPanel>

          {/* Test Path */}
          <ScanPanel>
            <PanelTitle>Test Path</PanelTitle>

            {testPathMode ? (
              <>
                <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: 0 }}>
                  {selectedPath.length === 0
                    ? 'Select a URL node to start the path.'
                    : `${selectedPath.length} node${selectedPath.length !== 1 ? 's' : ''} selected`}
                </p>

                {selectedPath.length > 0 && (
                  <PathDisplay readOnly value={selectedPath.join(',')} />
                )}

                <ScheduleBox>
                  {DAYS.map(({ key, label }) => (
                    <DayRow key={key}>
                      <input
                        type="checkbox"
                        checked={weekSchedule[key]}
                        onChange={(e) =>
                          setWeekSchedule((prev) => ({ ...prev, [key]: e.target.checked }))
                        }
                        style={{ accentColor: '#6366f1', cursor: 'pointer' }}
                      />
                      <DayLabel $enabled={weekSchedule[key]}>{label}</DayLabel>
                    </DayRow>
                  ))}

                  <label
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#6b7280',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      paddingTop: 6,
                      borderTop: '1px solid #e5e7eb',
                      marginTop: 2,
                    }}
                  >
                    Time
                    <ScheduleTimeInput
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </label>

                  <RepeatWeekRow>
                    <input
                      type="checkbox"
                      checked={repeatWeekly}
                      onChange={(e) => setRepeatWeekly(e.target.checked)}
                      style={{ accentColor: '#6366f1', cursor: 'pointer' }}
                    />
                    Repeat every week
                  </RepeatWeekRow>
                </ScheduleBox>

                <div style={{ display: 'flex', gap: 6 }}>
                  <ScanButton $secondary style={{ flex: 1 }} onClick={resetTestPath}>
                    Cancel
                  </ScanButton>
                  <ScanButton
                    style={{ flex: 1 }}
                    disabled={selectedPath.length === 0 || savingPath}
                    onClick={handleSavePath}
                  >
                    {savingPath ? 'Saving…' : 'Save path'}
                  </ScanButton>
                </div>
              </>
            ) : (
              <>
                <ScanButton
                  onClick={() => setTestPathMode(true)}
                  disabled={activeScan?.status !== 'done'}
                  title={
                    activeScan?.status !== 'done'
                      ? 'Scan must be complete to build a path'
                      : ''
                  }
                >
                  New test path
                </ScanButton>

                {savedPaths.length > 0 && (
                  <ScanList style={{ maxHeight: 160 }}>
                    {savedPaths.map((p) => (
                      <PathItem key={p.id}>
                        <div
                          style={{
                            flex: 1,
                            minWidth: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                          }}
                        >
                          <PathItemText title={p.path}>{p.path}</PathItemText>
                          {formatScheduleBadge(p) && (
                            <ScheduleBadge>{formatScheduleBadge(p)}</ScheduleBadge>
                          )}
                        </div>
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

                {savedPaths.length === 0 && activeScan?.status === 'done' && (
                  <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0 }}>
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
        onScanCreated={(newScan) => handleSelectScan(newScan.id)}
      />

      {scanDetail && (
        <ScanTerminal logs={scanDetail.logs ?? []} isActive={isActive} />
      )}
    </Container>
  );
}

export default HomePage;
