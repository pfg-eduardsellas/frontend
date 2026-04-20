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
  {
    key: "nodes",
    label: "Nodes",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    icon: "fa-solid fa-circle-nodes",
  },
  {
    key: "pages",
    label: "Pages",
    color: "#0070e0",
    bg: "#dbeafe",
    border: "#bfdbfe",
    icon: "fa-solid fa-file-lines",
  },
  {
    key: "errors",
    label: "Errors",
    color: "#dc2626",
    bg: "#fee2e2",
    border: "#fecaca",
    icon: "fa-solid fa-triangle-exclamation",
  },
  {
    key: "violations",
    label: "A11y Issues",
    color: "#ea580c",
    bg: "#ffedd5",
    border: "#fed7aa",
    icon: "fa-solid fa-universal-access",
  },
  {
    key: "paths",
    label: "Test Paths",
    color: "#059669",
    bg: "#d1fae5",
    border: "#6ee7b7",
    icon: "fa-solid fa-route",
  },
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
        <StatCard key={card.key} $bg={card.bg} $border={card.border}>
          <StatInfo>
            <StatValue $color={card.color}>{values[card.key]}</StatValue>
            <StatLabel>{card.label}</StatLabel>
          </StatInfo>
          <StatIcon $color={card.color}>
            <i class={card.icon}></i>
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
