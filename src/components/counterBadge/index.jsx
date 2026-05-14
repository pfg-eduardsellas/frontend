import styled from "styled-components";

const COLORS = {
  error:  "#dc2626",
  others: "#7c3aed",
};

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 9999px;
  background-color: ${({ $type }) => COLORS[$type] ?? "#6b7280"};
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  flex-shrink: 0;
`;

function CounterBadge({ type, count }) {
  if (!count || count <= 0) return null;
  return <Wrapper $type={type}>{count}</Wrapper>;
}

export default CounterBadge;
