
/** Function to get item from localStorage in a type-safe way **/
export default function getItemFromLocalStorage<T>(key: string): T | null {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
        return null; // Return null if the item doesn't exist
    }

    try {
        // setCardItems(JSON.parse(storedValue) as CardItem[])
        return JSON.parse(storedValue) as T; // Safely parse and cast to the expected type
    } catch (error) {
        console.error(`Error parsing localStorage item: ${key}`, error);
        return null; // Return null if parsing fails
    }
}

export function setItemToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}