export const saveToStorage = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data))

export const getFromStorage = (key, fallback = []) => {
    try {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : fallback
    } catch {
        return fallback
    }
}
export const removeFromStorage = (key) => localStorage.removeItem(key)
