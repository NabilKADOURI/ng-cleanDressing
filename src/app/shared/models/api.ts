export interface ApiResponse {
  '@id': string;
  '@type': string;
}

export interface ApiListResponse<T> {
  '@id': string;
  'hydra:totalItems': number;
  'hydra:member': T[];
}
