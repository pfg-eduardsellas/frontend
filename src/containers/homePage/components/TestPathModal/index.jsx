import { useCallback, useState } from 'react';
import Modal from '../../../../components/modal';
import GraphViewer from '../../../../components/graph/graphViewer';
import { useCreatePathMutation } from '../../../../api';
import { DAYS, DEFAULT_WEEK_SCHEDULE } from '../../helpers';
import {
  ModalLayout, GraphPane, FormPane,
  SectionTitle, PathInput, SelectedPathBox, PathStep, StepIndex, EmptyPathText,
  ScheduleBox, DayGrid, DayChip, TimeInput, ButtonRow, ActionButton, FieldLabel,
} from './styles';

function TestPathModal({ isOpen, onClose, scanId }) {
  const [selectedPath, setSelectedPath] = useState([]);
  const [pathName, setPathName] = useState('');
  const [weekSchedule, setWeekSchedule] = useState(DEFAULT_WEEK_SCHEDULE);
  const [scheduleTime, setScheduleTime] = useState('');

  const [createPath, { isLoading: saving }] = useCreatePathMutation();

  const handleNodeToggle = useCallback((nodeId) => {
    setSelectedPath(prev => {
      const idx = prev.indexOf(nodeId);
      if (idx !== -1) return prev.slice(0, idx);
      return [...prev, nodeId];
    });
  }, []);

  const handleSave = async () => {
    if (!scanId || selectedPath.length === 0) return;
    const selectedDayNums = DAYS.filter(({ key }) => weekSchedule[key]).map(({ num }) => num);
    const hour = scheduleTime ? String(parseInt(scheduleTime.split(':')[0], 10)) : '';
    const result = await createPath({
      scanId,
      name: pathName.trim() || `Path ${selectedPath.length} nodes`,
      path: selectedPath.join(','),
      enabled: true,
      days_of_week: selectedDayNums.join(','),
      hours: hour,
    });
    if (!result.error) handleClose();
  };

  const handleClose = () => {
    setSelectedPath([]);
    setPathName('');
    setWeekSchedule(DEFAULT_WEEK_SCHEDULE);
    setScheduleTime('');
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
            onChange={e => setPathName(e.target.value)}
            placeholder="Optional name…"
          />

          <SectionTitle>Selected nodes ({selectedPath.length})</SectionTitle>
          <SelectedPathBox>
            {selectedPath.length === 0 ? (
              <EmptyPathText>Select a URL node in the graph to start.</EmptyPathText>
            ) : (
              selectedPath.map((nodeId, i) => (
                <PathStep key={nodeId}>
                  <StepIndex>{i + 1}</StepIndex>
                  Node #{nodeId}
                </PathStep>
              ))
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
                    onChange={e => setWeekSchedule(prev => ({ ...prev, [key]: e.target.checked }))}
                  />
                  {label}
                </DayChip>
              ))}
            </DayGrid>
            <FieldLabel style={{ marginTop: 4 }}>Time</FieldLabel>
            <TimeInput
              type="time"
              value={scheduleTime}
              onChange={e => setScheduleTime(e.target.value)}
            />
          </ScheduleBox>

          <ButtonRow>
            <ActionButton $secondary onClick={handleClose}>Cancel</ActionButton>
            <ActionButton
              disabled={selectedPath.length === 0 || saving}
              onClick={handleSave}
            >
              {saving ? 'Saving…' : 'Save path'}
            </ActionButton>
          </ButtonRow>
        </FormPane>
      </ModalLayout>
    </Modal>
  );
}

export default TestPathModal;
