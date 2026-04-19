import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #eef0fd;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: 8px;
  gap: 8px;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  min-width: 280px;
  gap: 8px;
  overflow-y: auto;
`;

/* ── Scan Panel ──────────────────────────────────────────────────────────── */

export const ScanPanel = styled.div`
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PanelTitle = styled.h2`
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b7280;
  margin: 0;
`;

export const UrlInput = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.875rem;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  &:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
`;

export const ScanButton = styled.button`
  background: ${({ $secondary }) => $secondary ? '#6b7280' : '#6366f1'};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 9px 14px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  &:hover:not(:disabled) { background: ${({ $secondary }) => $secondary ? '#4b5563' : '#4f46e5'}; }
  &:disabled { background: #a5b4fc; cursor: not-allowed; }
`;

export const PathDisplay = styled.textarea`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.72rem;
  font-family: 'Courier New', Courier, monospace;
  color: #374151;
  background: #f9fafb;
  resize: none;
  width: 100%;
  box-sizing: border-box;
  min-height: 48px;
  outline: none;
`;

export const ScanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  overflow-y: auto;
`;

export const ScanItem = styled.div`
  background: ${({ $active }) => $active ? '#eef2ff' : 'white'};
  border: 1.5px solid ${({ $active }) => $active ? '#6366f1' : '#e5e7eb'};
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  &:hover { border-color: #6366f1; }
`;

export const ScanUrl = styled.p`
  font-size: 0.78rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ScanMeta = styled.p`
  font-size: 0.72rem;
  color: #9ca3af;
  margin: 0;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${({ $status }) => ({
    pending: '#fef3c7',
    running: '#dbeafe',
    done: '#d1fae5',
    error: '#fee2e2',
  }[$status] ?? '#f3f4f6')};
  color: ${({ $status }) => ({
    pending: '#92400e',
    running: '#1e40af',
    done: '#065f46',
    error: '#991b1b',
  }[$status] ?? '#374151')};
`;

export const AdvancedToggle = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 0.78rem;
  font-weight: 600;
  color: #6366f1;
  cursor: pointer;
  text-align: left;
  &:hover { text-decoration: underline; }
`;

export const AdvancedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #e5e7eb;
  padding-top: 8px;
`;

export const FieldLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const NumberInput = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 0.8rem;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  &:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
`;

export const TextAreaInput = styled.textarea`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 0.75rem;
  font-family: monospace;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 64px;
  &:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
`;

/* ── Scan Detail Panel (bottom of page) ─────────────────────────────────── */

export const ScanDetailPanel = styled.div`
  display: flex;
  flex-direction: row;
  background: #0f172a;
  color: #e2e8f0;
  border-top: 1px solid #1e293b;
  height: 200px;
  flex-shrink: 0;
`;

export const ScanInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 14px;
  border-right: 1px solid #1e293b;
  width: 320px;
  flex-shrink: 0;
  overflow-y: auto;
`;

export const ScanInfoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
`;

export const ScanInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const ScanInfoLabel = styled.span`
  font-size: 0.62rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const ScanInfoValue = styled.span`
  font-size: 0.75rem;
  color: #e2e8f0;
  font-weight: 600;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ScanErrorMessage = styled.span`
  font-size: 0.72rem;
  color: #f87171;
  margin-top: 4px;
`;

/* ── Saved Path List ─────────────────────────────────────────────────────── */

export const PathItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 6px 10px;
`;

export const PathItemText = styled.span`
  flex: 1;
  font-size: 0.72rem;
  font-family: 'Courier New', Courier, monospace;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ef4444;
  font-size: 0.8rem;
  padding: 0 2px;
  flex-shrink: 0;
  line-height: 1;
  &:hover { color: #b91c1c; }
`;

export const HistoryButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0 2px;
  flex-shrink: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  &:hover { color: #6366f1; }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const scheduledControlCss = `
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 0.8rem;
  color: #374151;
  background: white;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;
  &:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
`;

export const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
`;

export const DayRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DayLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ $enabled }) => $enabled ? '#374151' : '#9ca3af'};
  width: 32px;
  flex-shrink: 0;
  transition: color 0.15s;
`;

export const ScheduleTimeInput = styled.input`
  ${scheduledControlCss}
  padding: 7px 10px;
  font-size: 0.8rem;
`;

/* ── Error Panel ─────────────────────────────────────────────────────────── */

export const ErrorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  overflow-y: auto;
`;

export const ErrorItem = styled.div`
  background: #fff5f5;
  border: 1px solid #fecaca;
  border-radius: 7px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ErrorMessage = styled.p`
  font-size: 0.78rem;
  color: #991b1b;
  margin: 0;
  line-height: 1.4;
`;

export const ErrorMeta = styled.span`
  font-size: 0.68rem;
  color: #f87171;
`;

export const RepeatWeekRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  padding-top: 8px;
  margin-top: 2px;
  border-top: 1px solid #e5e7eb;
  user-select: none;
`;

export const ScheduleBadge = styled.span`
  font-size: 0.62rem;
  font-weight: 600;
  color: #6366f1;
  background: #eef2ff;
  border-radius: 4px;
  padding: 1px 5px;
  white-space: nowrap;
  flex-shrink: 0;
`;
