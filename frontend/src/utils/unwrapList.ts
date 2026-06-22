type ApiListResponse<T> =
  | T[]
  | { results?: T[] }
  | { data?: T[] }
  | Record<string, unknown>;

export function unwrapList<T>(data: ApiListResponse<T>): T[] {
  if (Array.isArray(data)) return data;

  if (
    typeof data === "object" &&
    data !== null &&
    "results" in data &&
    Array.isArray((data as { results?: T[] }).results)
  ) {
    return (data as { results: T[] }).results;
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    Array.isArray((data as { data?: T[] }).data)
  ) {
    return (data as { data: T[] }).data;
  }

  return [];
}