import { useEffect, useState, useCallback } from "react";

export function usePersistedState<T>(
    key: string,
    defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                return JSON.parse(saved) as T;
            } catch (error) {
                console.warn(`Error parsing localStorage[${key}] :`, error);
            }
        }
        return defaultValue;
    });

    // Custom setter to dispatch a sync event
    const setPersistedState: React.Dispatch<React.SetStateAction<T>> =
        useCallback(
            (value) => {
                setState((prevState) => {
                    const newState =
                        value instanceof Function ? value(prevState) : value;
                    localStorage.setItem(key, JSON.stringify(newState));

                    // Dispatch custom event to notify other instances of this hook
                    window.dispatchEvent(
                        new CustomEvent("local-storage-sync", {
                            detail: { key, newValue: newState },
                        })
                    );

                    return newState;
                });
            },
            [key]
        );

    useEffect(() => {
        // Listener for the custom event to sync state across components
        const handleSync = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail.key === key) {
                setState(customEvent.detail.newValue);
            }
        };

        // Listener for cross-tab sync (native storage event)
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key && event.newValue) {
                setState(JSON.parse(event.newValue));
            }
        };

        window.addEventListener("local-storage-sync", handleSync);
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("local-storage-sync", handleSync);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [key]);

    return [state, setPersistedState];
}
