import { API_URL } from "../data/api";
import type { sos } from "../types/sos";

/**
 * Utility to get auth headers from localStorage
 */
const getAuthHeaders = () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    return {
        "X-Auth-Email": auth.email || "",
        "X-Auth-Pass": auth.pass || "",
        "Content-Type": "application/json",
    };
};

/**
 * Core fetch wrapper with cache busting
 */
async function request(options: { method: string; body?: any }) {
    // Append timestamp to URL to bypass any cache
    const urlWithCacheBuster = `${API_URL}?t=${Date.now()}`;

    const response = await fetch(urlWithCacheBuster, {
        method: options.method,
        headers: getAuthHeaders(),
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}

export const apiService = {
    // Get all SOS orders
    getOrders: (): Promise<sos[]> => request({ method: "GET" }),

    // Create a new SOS
    createOrder: (data: Partial<sos>) =>
        request({ method: "POST", body: data }),

    // Delete an SOS
    deleteOrder: (index: number) =>
        request({ method: "POST", body: { action: "delete", index } }),

    // Assign an admin to an SOS
    assignOrder: (index: number) =>
        request({ method: "POST", body: { action: "assign", index } }),

    // Unassign an admin
    unassignOrder: (index: number) =>
        request({ method: "POST", body: { action: "unassign", index } }),

    toggleComplete: (index: number) =>
        request({ method: "POST", body: { action: "toggle_complete", index } }),
};
