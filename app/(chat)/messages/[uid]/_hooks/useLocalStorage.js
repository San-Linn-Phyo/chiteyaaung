export function useLocalStorage() {
  function get(key) {
    return localStorage.getItem(key);
  }

  function set(key, value) {
    return localStorage.setItem(key, value);
  }

  return { get, set };
}
