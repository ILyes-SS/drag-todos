import { localStorageSchema } from "@/lib/validation";

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
    const parsedItem = item ? JSON.parse(item) : []
    const validatedItem = localStorageSchema.safeParse(parsedItem)
    if(!validatedItem.success){
      throw new Error("local storage schema is invalid")
    }
    return  validatedItem.data;
  } catch (error) {
    console.log(error);
  }
}
