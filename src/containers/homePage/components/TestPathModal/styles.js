import styled from 'styled-components';
import * as colors from 'constants/colors';

export const ModalLayout = styled.div`
  display: flex;
  height: 75vh;
  gap: 0;
`;

export const GraphPane = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  border-right: 1px solid #e5e7eb;
`;

export const FormPane = styled.div`
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  overflow-y: auto;
`;

export const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b7280;
  margin: 0;
`;

export const PathInput = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.875rem;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  &:focus { border-color: ${colors.PRIMARY}; box-shadow: 0 0 0 3px rgba(65,101,213,0.15); }
`;

export const SelectedPathBox = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px;
  min-height: 48px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PathStep = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: #374151;
`;

export const StepIndex = styled.span`
  font-size: 0.6rem;
  font-weight: 700;
  color: white;
  background: ${colors.PRIMARY};
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const EmptyPathText = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
  margin: 0;
  font-style: italic;
`;

export const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
`;

export const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
`;

export const DayChip = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
  font-size: 0.65rem;
  font-weight: 700;
  cursor: pointer;
  border: 1.5px solid ${({ $enabled }) => $enabled ? colors.PRIMARY : '#e5e7eb'};
  background: ${({ $enabled }) => $enabled ? colors.PRIMARY_BG : 'white'};
  color: ${({ $enabled }) => $enabled ? colors.PRIMARY_TEXT : '#9ca3af'};
  transition: all 0.15s;
  user-select: none;

  input { display: none; }
`;

export const TimeInput = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 0.8rem;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  &:focus { border-color: #4165D5; box-shadow: 0 0 0 3px rgba(65,101,213,0.15); }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
`;


export const FieldLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  color: #6b7280;
`;

export const StepBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: #374151;
`;

export const StepLabel = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AddAssertBtn = styled.button`
  font-size: 0.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.primary || '#4165D5'};
  background: none;
  border: 1px dashed currentColor;
  border-radius: 4px;
  padding: 1px 5px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  &:hover { background: rgba(65,101,213,0.07); }
`;

export const AssertionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-left: 22px;
`;

export const AssertionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const AssertionSelect = styled.select`
  font-size: 0.65rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 2px 4px;
  background: white;
  color: #374151;
  outline: none;
  flex-shrink: 0;
  &:focus { border-color: #4165D5; }
`;

export const AssertionInput = styled.input`
  font-size: 0.65rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 2px 5px;
  min-width: 0;
  flex: 1;
  outline: none;
  &:focus { border-color: #4165D5; }
`;

export const RemoveAssertBtn = styled.button`
  font-size: 0.7rem;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  flex-shrink: 0;
  line-height: 1;
  &:hover { color: #ef4444; }
`;
