import { createContext, useContext } from "react";

export const ServerOffsetContext = createContext(0);

export const syncTimeWithServer = async () => {
    let serverOffset = 0;
    try {
        const response = await fetch(
            "https://time.now/developer/api/timezone/Europe/Paris",
        );
        if (!response.ok) throw new Error("Server unreachable");

        const data = await response.json();

        const serverTime = data.unixtime * 1000;
        const localTime = new Date().getTime();

        serverOffset = serverTime - localTime;
    } catch {
        serverOffset = -100000000000000000000000000000;
    }
    return serverOffset;
};

export const useSyncedNow = () => {
    const serverOffset = useContext(ServerOffsetContext);
    return new Date().getTime() + serverOffset;
};
