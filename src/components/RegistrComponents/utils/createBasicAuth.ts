function createBasicAuthToken(username: string, password: string): string {
  return 'Basic ' + btoa(username + ':' + password);
}

export default createBasicAuthToken;