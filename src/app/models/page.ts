export interface Page<T> {
  totalPages: number;
  totalElements: number;

  // Slice
  number: number;
  size: number;
  numberOfElements: number;
  content: T[];
}
