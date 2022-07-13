export enum StorageKey {
  JWT = 'jwtToken',
  USER = 'user',
}

export const loadState = (key: StorageKey) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
