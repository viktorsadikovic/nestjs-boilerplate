export function buildQueryParams(page?: number, limit?: number): string {
  const queryParams = new URLSearchParams();

  if (page !== undefined) {
    queryParams.append('page', page.toString());
  }
  if (limit !== undefined) {
    queryParams.append('limit', limit.toString());
  }

  return queryParams.toString();
}
