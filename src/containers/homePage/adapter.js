// Transforms the raw RTK Query scan list into the shape the UI needs.
export function adaptScan(scan) {
  return {
    id: scan.id,
    targetUrl: scan.target_url,
    status: scan.status,
    createdAt: scan.created_at,
    finishedAt: scan.finished_at ?? null,
    maxPages: scan.max_pages,
    maxDepth: scan.max_depth,
    maxActions: scan.max_actions,
    inDomain: scan.in_domain,
    logs: scan.logs ?? [],
    errorMessage: scan.error_message ?? null,
  };
}
