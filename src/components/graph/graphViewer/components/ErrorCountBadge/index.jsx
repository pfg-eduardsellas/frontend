import { ErrorBadgeWrapper } from './styles';

export function ErrorCountBadge({ count }) {
  if (!count || count <= 0) return null;
  return <ErrorBadgeWrapper>{count}</ErrorBadgeWrapper>;
}

export default ErrorCountBadge;
