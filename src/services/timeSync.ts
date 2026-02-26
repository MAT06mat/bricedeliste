import { API_URL } from "../data/api";

let serverOffset = 0;

export const syncTimeWithServer = async () => {
    try {
        const response = await fetch(API_URL, {
            method: "HEAD",
        });
        const serverDateStr = response.headers.get("Date");

        if (serverDateStr) {
            const serverTime = new Date(serverDateStr).getTime();
            const localTime = new Date().getTime();
            serverOffset = serverTime - localTime;
        }
    } catch {
        /* Pass */
    }
};

export const getSyncedNow = () => {
    return new Date().getTime() + serverOffset;
};
