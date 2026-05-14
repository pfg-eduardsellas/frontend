import {
  StatCard,
  StatLabel,
  StatValue,
  StatsBar,
  ScanStatusPill,
  PulsingDot,
  StatIcon,
  StatInfo,
} from "./styles";

const STAT_CARDS = [
  { key: "nodes", label: "Nodes", icon: "fa-solid fa-circle-nodes" },
  { key: "pages", label: "Pages", icon: "fa-solid fa-file-lines" },
  { key: "errors", label: "Errors", icon: "fa-solid fa-triangle-exclamation" },
  {
    key: "violations",
    label: "A11y Issues",
    icon: "fa-solid fa-universal-access",
  },
  { key: "paths", label: "Test Paths", icon: "fa-solid fa-route" },
];

function DashboardStats({ graphActions, savedPaths, activeScan }) {
  const values = {
    nodes: graphActions.length,
    pages: graphActions.filter((a) => a.type === "URL").length,
    errors: graphActions.reduce((s, a) => s + (a.errors?.length ?? 0), 0),
    violations: graphActions.reduce(
      (s, a) => s + (a.accessibility_violations?.length ?? 0),
      0,
    ),
    paths: savedPaths.length,
  };

  const isActive =
    activeScan?.status === "running" || activeScan?.status === "pending";

  return (
    <StatsBar>
      {STAT_CARDS.map((card) => (
        <StatCard key={card.key}>
          <StatInfo>
            <StatValue>{values[card.key]}</StatValue>
            <StatLabel>{card.label}</StatLabel>
          </StatInfo>
          <StatIcon>
            <i className={card.icon}></i>
          </StatIcon>
        </StatCard>
      ))}
      {activeScan && activeScan.status != "done" && (
        <ScanStatusPill $status={activeScan.status}>
          <PulsingDot $animate={isActive} />
          {activeScan.status}
        </ScanStatusPill>
      )}
    </StatsBar>
  );
}

export default DashboardStats;
