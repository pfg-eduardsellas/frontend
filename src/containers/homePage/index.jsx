import ScanTerminal from "./components/ScanTerminal";
import DashboardStats from "./components/DashboardStats";
import ErrorsTable from "./components/ErrorsTable";
import AccessibilityTable from "./components/AccessibilityTable";
import GraphViewer from "../../components/graph/graphViewer";
import Accordion from "../../components/acordion";
import CounterBadge from "../../components/counterBadge";
import Badge from "../../components/badge";
import { BADGE_TYPES } from "../../components/badge/constant";
import { useGetScanActionsQuery } from "../../api";
import {
  Container,
  Wrapper,
  GraphSection,
  GraphHeader,
  BottomPanels,
} from "./styles";

function HomePage({ selectedScan }) {
  const { data: actionsData } = useGetScanActionsQuery(selectedScan?.id, {
    skip: !selectedScan || selectedScan.status !== "done",
  });
  const graphActions = actionsData?.actions ?? [];

  const isActive =
    selectedScan?.status === "running" || selectedScan?.status === "pending";

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
      <Wrapper>
        <DashboardStats
          graphActions={graphActions}
          savedPaths={[]}
          activeScan={selectedScan}
        />

        <GraphSection>
          <GraphHeader>
            <Badge type={BADGE_TYPES.PAGE} text="Page" />
            <Badge type={BADGE_TYPES.BUTTON} text="Button" />
            <Badge type={BADGE_TYPES.LINK} text="Link" />
            <Badge type={BADGE_TYPES.FORM} text="Form" />
          </GraphHeader>
          <GraphViewer
            scanId={selectedScan?.status === "done" ? selectedScan.id : null}
          />
        </GraphSection>

        <BottomPanels>
          <Accordion
            plain
            title="Action Errors"
            isDefaultOpen
            className="w-full"
            headerRight={<CounterBadge type="error" count={totalErrors} />}
          >
            {!selectedScan ? (
              <p style={{ fontSize: "0.78rem", color: "#9ca3af", margin: 0 }}>
                Create a scan to see errors.
              </p>
            ) : (
              <ErrorsTable graphActions={graphActions} />
            )}
          </Accordion>

          <Accordion
            plain
            title="Accessibility"
            className="w-full"
            isDefaultOpen
            headerRight={<CounterBadge type="others" count={totalViolations} />}
          >
            {!selectedScan ? (
              <p style={{ fontSize: "0.78rem", color: "#9ca3af", margin: 0 }}>
                Create a scan to see accessibility issues.
              </p>
            ) : (
              <AccessibilityTable graphActions={graphActions} />
            )}
          </Accordion>
        </BottomPanels>
      </Wrapper>

      {selectedScan && (
        <ScanTerminal logs={selectedScan.logs ?? []} isActive={isActive} />
      )}
    </Container>
  );
}

export default HomePage;
