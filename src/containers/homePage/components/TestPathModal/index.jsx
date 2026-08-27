import { useCallback, useEffect, useState } from "react";
import Modal from "../../../../components/modal";
import GraphViewer from "../../../../components/graph/graphViewer";
import { useCreatePathMutation } from "../../../../api";
import { DAYS, DEFAULT_WEEK_SCHEDULE } from "../../helpers";
import Button from "../../../../components/button";
import {
  ModalLayout,
  GraphPane,
  FormPane,
  SectionTitle,
  PathInput,
  SelectedPathBox,
  StepBlock,
  StepHeader,
  StepIndex,
  StepLabel,
  AddAssertBtn,
  AssertionList,
  AssertionRow,
  AssertionSelect,
  AssertionInput,
  RemoveAssertBtn,
  EmptyPathText,
  ScheduleBox,
  DayGrid,
  DayChip,
  TimeInput,
  ButtonRow,
  FieldLabel,
} from "./styles";

const ASSERTION_TYPES = [
  {
    value: "url_equals",
    label: "URL equals",
    needsSelector: false,
    needsExpected: true,
  },
  {
    value: "url_contains",
    label: "URL contains",
    needsSelector: false,
    needsExpected: true,
  },
  {
    value: "visible",
    label: "Element visible",
    needsSelector: true,
    needsExpected: false,
  },
  {
    value: "not_visible",
    label: "Element not visible",
    needsSelector: true,
    needsExpected: false,
  },
  {
    value: "text_equals",
    label: "Text equals",
    needsSelector: true,
    needsExpected: true,
  },
  {
    value: "text_contains",
    label: "Text contains",
    needsSelector: true,
    needsExpected: true,
  },
  {
    value: "value_equals",
    label: "Input value equals",
    needsSelector: true,
    needsExpected: true,
  },
  {
    value: "count_equals",
    label: "Element count equals",
    needsSelector: true,
    needsExpected: true,
  },
];

function getTypeDef(type) {
  return ASSERTION_TYPES.find((t) => t.value === type) || ASSERTION_TYPES[0];
}

function TestPathModal({ isOpen, onClose, scanId }) {
  const [selectedPath, setSelectedPath] = useState([]);
  const [pathName, setPathName] = useState("");
  const [weekSchedule, setWeekSchedule] = useState(DEFAULT_WEEK_SCHEDULE);
  const [scheduleTime, setScheduleTime] = useState("");
  const [assertions, setAssertions] = useState({});

  const [createPath, { isLoading: saving }] = useCreatePathMutation();

  // Clean up assertions for nodes removed from the path
  useEffect(() => {
    const pathSet = new Set(selectedPath.map(String));
    setAssertions((a) => {
      const cleaned = Object.fromEntries(
        Object.entries(a).filter(([key]) => pathSet.has(key)),
      );
      return Object.keys(cleaned).length === Object.keys(a).length
        ? a
        : cleaned;
    });
  }, [selectedPath]);

  const handleNodeToggle = useCallback((nodeId) => {
    setSelectedPath((prev) => {
      const idx = prev.indexOf(nodeId);
      if (idx !== -1) return prev.slice(0, idx);
      return [...prev, nodeId];
    });
  }, []);

  const addAssertion = useCallback((nodeId) => {
    setAssertions((prev) => ({
      ...prev,
      [nodeId]: [
        ...(prev[nodeId] || []),
        { type: "url_contains", selector: "", expected: "" },
      ],
    }));
  }, []);

  const removeAssertion = useCallback((nodeId, idx) => {
    setAssertions((prev) => ({
      ...prev,
      [nodeId]: prev[nodeId].filter((_, i) => i !== idx),
    }));
  }, []);

  const updateAssertion = useCallback((nodeId, idx, field, value) => {
    setAssertions((prev) => ({
      ...prev,
      [nodeId]: prev[nodeId].map((a, i) =>
        i === idx ? { ...a, [field]: value } : a,
      ),
    }));
  }, []);

  const handleSave = async () => {
    if (!scanId || selectedPath.length === 0) return;

    const selectedDayNums = DAYS.filter(({ key }) => weekSchedule[key]).map(
      ({ num }) => num,
    );
    let hour = "";
    if (scheduleTime) {
      const [h, m] = scheduleTime.split(":").map(Number);
      const local = new Date();
      local.setHours(h, m || 0, 0, 0);
      hour = String(local.getUTCHours());
    }

    const cleanAssertions = {};
    selectedPath.forEach((nodeId) => {
      const list = (assertions[nodeId] || []).filter((a) => a.type);
      if (list.length > 0) {
        cleanAssertions[String(nodeId)] = list.map((a) => {
          const def = getTypeDef(a.type);
          const clean = { type: a.type };
          if (def.needsSelector && a.selector) clean.selector = a.selector;
          if (def.needsExpected && a.expected) clean.expected = a.expected;
          return clean;
        });
      }
    });

    const result = await createPath({
      scanId,
      name: pathName.trim() || `Path ${selectedPath.length} nodes`,
      path: selectedPath.join(","),
      enabled: true,
      days_of_week: selectedDayNums.join(","),
      hours: hour,
      assertions:
        Object.keys(cleanAssertions).length > 0 ? cleanAssertions : null,
    });
    if (!result.error) handleClose();
  };

  const handleClose = () => {
    setSelectedPath([]);
    setPathName("");
    setWeekSchedule(DEFAULT_WEEK_SCHEDULE);
    setScheduleTime("");
    setAssertions({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Build Test Path"
      size="full"
      bodyPadding="0"
    >
      <ModalLayout>
        <GraphPane>
          <GraphViewer
            scanId={scanId}
            testPathMode={true}
            selectedPath={selectedPath}
            onNodeToggle={handleNodeToggle}
          />
        </GraphPane>

        <FormPane>
          <SectionTitle>Path name</SectionTitle>
          <PathInput
            type="text"
            value={pathName}
            onChange={(e) => setPathName(e.target.value)}
            placeholder="Optional name…"
          />

          <SectionTitle>Selected nodes ({selectedPath.length})</SectionTitle>
          <SelectedPathBox>
            {selectedPath.length === 0 ? (
              <EmptyPathText>
                Select a URL node in the graph to start.
              </EmptyPathText>
            ) : (
              selectedPath.map((nodeId, i) => {
                const nodeAssertions = assertions[nodeId] || [];
                return (
                  <StepBlock key={nodeId}>
                    <StepHeader>
                      <StepIndex>{i + 1}</StepIndex>
                      <StepLabel>Node #{nodeId}</StepLabel>
                      <AddAssertBtn onClick={() => addAssertion(nodeId)}>
                        + Check
                      </AddAssertBtn>
                    </StepHeader>

                    {nodeAssertions.length > 0 && (
                      <AssertionList>
                        {nodeAssertions.map((assertion, ai) => {
                          const def = getTypeDef(assertion.type);
                          return (
                            <AssertionRow key={ai}>
                              <AssertionSelect
                                value={assertion.type}
                                onChange={(e) =>
                                  updateAssertion(
                                    nodeId,
                                    ai,
                                    "type",
                                    e.target.value,
                                  )
                                }
                              >
                                {ASSERTION_TYPES.map((t) => (
                                  <option key={t.value} value={t.value}>
                                    {t.label}
                                  </option>
                                ))}
                              </AssertionSelect>

                              {def.needsSelector && (
                                <AssertionInput
                                  placeholder="selector"
                                  value={assertion.selector || ""}
                                  onChange={(e) =>
                                    updateAssertion(
                                      nodeId,
                                      ai,
                                      "selector",
                                      e.target.value,
                                    )
                                  }
                                />
                              )}

                              {def.needsExpected && (
                                <AssertionInput
                                  placeholder="expected"
                                  value={assertion.expected || ""}
                                  onChange={(e) =>
                                    updateAssertion(
                                      nodeId,
                                      ai,
                                      "expected",
                                      e.target.value,
                                    )
                                  }
                                />
                              )}

                              <RemoveAssertBtn
                                onClick={() => removeAssertion(nodeId, ai)}
                              >
                                ×
                              </RemoveAssertBtn>
                            </AssertionRow>
                          );
                        })}
                      </AssertionList>
                    )}
                  </StepBlock>
                );
              })
            )}
          </SelectedPathBox>

          <SectionTitle>Schedule</SectionTitle>
          <ScheduleBox>
            <FieldLabel>Days</FieldLabel>
            <DayGrid>
              {DAYS.map(({ key, label }) => (
                <DayChip key={key} $enabled={weekSchedule[key]}>
                  <input
                    type="checkbox"
                    checked={weekSchedule[key]}
                    onChange={(e) =>
                      setWeekSchedule((prev) => ({
                        ...prev,
                        [key]: e.target.checked,
                      }))
                    }
                  />
                  {label}
                </DayChip>
              ))}
            </DayGrid>
            <FieldLabel style={{ marginTop: 4 }}>Time</FieldLabel>
            <TimeInput
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
            />
          </ScheduleBox>

          <ButtonRow>
            <Button
              variant="secondary"
              text="Cancel"
              onClick={handleClose}
              style={{ flex: 1 }}
            />
            <Button
              variant="primary"
              disabled={selectedPath.length === 0 || saving}
              onClick={handleSave}
              style={{ flex: 1 }}
            >
              {saving ? "Saving…" : "Save path"}
            </Button>
          </ButtonRow>
        </FormPane>
      </ModalLayout>
    </Modal>
  );
}

export default TestPathModal;
