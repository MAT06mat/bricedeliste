/*import type { Auth } from "../context/AuthContext";
import { API_URL, REGISTER_URL } from "../data/api";
import type { sos } from "../types/sos";
import type { StatsData } from "../types/stats";
import type { User } from "../types/user";
*/
/**
 * Utility to get auth headers from localStorage
 */
/*
const getAuthHeaders = (auth: Auth | undefined = undefined) => {
    if (auth === undefined) {
        auth = JSON.parse(localStorage.getItem("auth") || "{}");
    }
    if (auth === undefined) {
        auth = { email: "", pass: "" };
    }
    return {
        "X-Auth-Email": auth.email || "",
        "X-Auth-Pass": auth.pass || "",
        "Content-Type": "application/json",
    };
};
*/
/**
 * Core fetch wrapper with cache busting
 */

/*
async function request(
    options: { method: string; action?: string; body?: unknown },
    auth: Auth | undefined = undefined,
) {
    // Append timestamp to URL to bypass any cache
    const url = new URL(API_URL);
    url.searchParams.append("t", Date.now().toString());
    if (options.action) {
        url.searchParams.append("action", options.action);
    }

    const response = await fetch(url, {
        method: options.method,
        headers: getAuthHeaders(auth),
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: "no-store",
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.error || `API Error: ${response.status}`);
        throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    try {
        return await response.json();
    } catch (err) {
        console.error("Failed to parse JSON response:", err);
        console.log("Raw response:", await response.text());
        return null;
    }
}*/

/*export const apiService = {
    // Get all SOS orders
    getOrders: (
        auth: Auth,
    ): Promise<{ super_admin: boolean; content: sos[] }> =>
        request({ method: "GET" }, auth),

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

    // Toggle completion status of an SOS
    toggleComplete: (index: number) =>
        request({ method: "POST", body: { action: "toggle_complete", index } }),

    // Register a new user
    register: async (email: string, pass: string, key: string) => {
        const response = await fetch(`${REGISTER_URL}?t=${Date.now()}`, {
            method: "POST",
            headers: {
                "X-Auth-Email": email,
                "X-Auth-Pass": pass,
                "X-Register-Key": key,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData.error);
            throw new Error(errorData.error || "Failed to register");
        }

        return response.json();
    },

    // Get all users (super admin only)
    getUsers: (): Promise<User[]> =>
        request({ method: "GET", action: "get_users" }),

    // Toggle user verification status
    toggleVerifyUser: (email: string) =>
        request({
            method: "POST",
            body: { action: "toggle_verify", email },
        }),

    // Delete a user
    deleteUser: (email: string) =>
        request({
            method: "POST",
            body: { action: "delete_user", email },
        }),

    // Get stats
    getStats: (): Promise<StatsData> =>
        request({
            method: "GET",
            action: "get_stats",
        }),
    resetAll: (): Promise<void> =>
        request({
            method: "POST",
            body: { action: "reset_all" },
        }),
    resetStat: (data: string, stat: string): Promise<StatsData> =>
        request({
            method: "POST",
            body: { action: "reset_stat", data, stat },
        }),
};
*/
