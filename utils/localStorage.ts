export function setItem(key: string, value: ToDo[]) {
  // Guard clause: If we are on the server, return undefined immediately
  if (typeof window === "undefined") {
    return [];
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function getItem(key: string) {
  // Guard clause: If we are on the server, return undefined immediately
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.log(error);
  }
}
