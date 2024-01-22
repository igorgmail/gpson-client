type Tmethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IRequestOptions {
  method: Tmethod;
  body?: BodyInit | null;
}