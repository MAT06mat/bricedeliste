import { useSyncedNow } from "../services/timeSync";

export const release_date = Object.freeze(new Date("2026-02-28T16:00:00"));
export const release_date_2 = Object.freeze(new Date("2026-02-29T20:00:00"));

export const useFullFeatureEnabled = () => {
    const time = useSyncedNow();
    const isEnvEnabled = import.meta.env.VITE_ENABLE_FULL_FEATURES === "true";
    const isDateReached = time >= release_date.getTime();
    return isEnvEnabled || isDateReached;
};

export const useFullFeatureEnabled2 = () => {
    const time = useSyncedNow();
    const isEnvEnabled = import.meta.env.VITE_ENABLE_FULL_FEATURES === "true";
    const isDateReached = time >= release_date_2.getTime();
    return isEnvEnabled || isDateReached;
};

export const dev_mode = import.meta.env.VITE_DEV_MODE === "true";
