import { getSyncedNow } from "../services/timeSync";

export const release_date = new Date("2026-02-28T16:00:00");

export const isFullFeatureEnabled = () => {
    const isEnvEnabled = import.meta.env.VITE_ENABLE_FULL_FEATURES === "true";
    const isDateReached = getSyncedNow() >= release_date.getTime();
    return isEnvEnabled || isDateReached;
};

export const bloc_sos_command = () => !isFullFeatureEnabled();

export const dev_mode = import.meta.env.VITE_DEV_MODE === "true";
