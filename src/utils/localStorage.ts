export enum Storage {
  Jwt = 'jwtToken',
  User = 'user',
}

export const loadState = (key: Storage) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
