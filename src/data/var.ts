export const release_date = new Date("2026-02-28T16:00:00");

export const enable_full_features =
    import.meta.env.VITE_ENABLE_FULL_FEATURES === "true" ||
    new Date() > release_date;

export const bloc_sos_command = !enable_full_features;

export const dev_mode = import.meta.env.VITE_DEV_MODE === "true";
