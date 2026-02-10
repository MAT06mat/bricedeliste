export const enable_full_features =
    import.meta.env.VITE_ENABLE_FULL_FEATURES === "true";

export const bloc_sos_command = import.meta.env.VITE_DEV_MODE !== "true";

export const dev_mode = import.meta.env.VITE_DEV_MODE === "true";
