import Badge from "../../../../components/badge";
import { BADGE_TYPES } from "../../../../components/badge/constant";
import GraphViewer from "../../../../components/graph/graphViewer";
import { Wrapper, GraphHeader } from "./styles";

function LeftSection({ activeScan, selectedScan, testPathMode, selectedPath, onNodeToggle }) {
  return (
    <Wrapper>
      <GraphHeader>
        <Badge type={BADGE_TYPES.PAGE} text="Page" />
        <Badge type={BADGE_TYPES.BUTTON} text="Button" />
        <Badge type={BADGE_TYPES.LINK} text="Link" />
        <Badge type={BADGE_TYPES.FORM} text="Form" />
      </GraphHeader>

      <GraphViewer
        scanId={activeScan?.status === "done" ? selectedScan : null}
        testPathMode={testPathMode}
        selectedPath={selectedPath}
        onNodeToggle={onNodeToggle}
      />
    </Wrapper>
  );
}

export default LeftSection;
