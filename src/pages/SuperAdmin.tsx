import { useCallback, useEffect, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import { apiService } from "../services/api";
import Toast from "../components/Toast";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import type { User } from "../types/user";

export default function SuperAdmin() {
    const { isLoggedIn, super_admin } = useAuth();
    const [users, setUsers] = usePersistedState<User[]>("users", []);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    const showToast = (
        message: string,
        type: "success" | "error" = "success"
    ) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            if (isLoggedIn && super_admin) {
                const data = await apiService.getUsers();
                if (Array.isArray(data)) setUsers(data);
            }
        } catch {
            showToast("C'est cassé ! Vérifie tes accès.", "error");
        } finally {
            setIsLoading(false);
        }
    }, [isLoggedIn, setUsers, super_admin]);

    useEffect(() => {
        if (isLoggedIn && super_admin) fetchUsers();
        else if (!isLoggedIn) setTimeout(() => navigate("/admin"), 0);
    }, [isLoggedIn, super_admin, fetchUsers, navigate]);

    users.sort((a, b) => {
        if (a.super_admin && !b.super_admin) return -1;
        if (!a.super_admin && b.super_admin) return 1;
        return a.email.localeCompare(b.email);
    });

    const handleUserAction = async (
        email: string,
        action: "delete" | "toggle-verify"
    ) => {
        try {
            if (action === "delete") {
                if (
                    window.confirm(
                        `Supprimer l'utilisateur ${email} ? Cette action est définitive.`
                    )
                ) {
                    await apiService.deleteUser(email);
                    showToast("Surfeur éjecté du spot !");
                } else return;
            }
            if (action === "toggle-verify") {
                await apiService.toggleVerifyUser(email);
                showToast("Statut mis à jour !");
            }
            await fetchUsers();
        } catch {
            showToast("Action impossible.", "error");
        }
    };

    if (!isLoggedIn || !super_admin) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 px-2 md:px-4 pb-10">
            {/* Header SuperAdmin */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-amber-900 p-5 rounded-2xl shadow-xl border-b-4 border-black gap-4">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-black italic text-brice-yellow leading-none uppercase">
                        Gestion des Surfeurs
                    </h2>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">
                        {users.length} membres dans la team
                    </p>
                </div>
                <button
                    onClick={fetchUsers}
                    disabled={isLoading}
                    className="w-full md:w-auto bg-brice-yellow text-amber-900 px-6 py-2 rounded-xl font-black text-xs uppercase hover:scale-105 transition-all shadow-[0_4px_0_0_#b49600]"
                >
                    {isLoading ? "..." : "🔄 Actualiser"}
                </button>
            </div>

            {/* User List */}
            <div className="grid gap-4">
                {users.length === 0 ? (
                    <div className="text-center py-20 opacity-40 italic font-bold text-amber-900">
                        Aucun membre sur le spot...
                    </div>
                ) : (
                    users.map((user) => (
                        <div
                            key={user.email}
                            className="vintage-card p-4 md:p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4 border-2 border-transparent hover:border-brice-yellow transition-all"
                        >
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner ${
                                        user.verified
                                            ? "bg-green-100"
                                            : "bg-red-100"
                                    }`}
                                >
                                    {user.super_admin ? "👑" : "🏄‍♂️"}
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-amber-900 font-black text-lg truncate block">
                                        {user.email.split("@")[0]}
                                    </span>
                                    <span className="text-[10px] text-amber-700 font-mono opacity-60">
                                        {user.email}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto">
                                {/* Verified Toggle Button */}
                                <button
                                    onClick={() =>
                                        handleUserAction(
                                            user.email,
                                            "toggle-verify"
                                        )
                                    }
                                    disabled={user.super_admin} // On ne dé-vérifie pas un super_admin ici
                                    className={`flex-1 md:flex-none px-4 py-2 rounded-xl font-black text-[10px] uppercase transition-all shadow-[0_3px_0_0_rgba(0,0,0,0.1)] ${
                                        user.verified
                                            ? "bg-green-500 text-white"
                                            : "bg-amber-200 text-amber-800"
                                    } ${
                                        user.super_admin
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:scale-105 active:translate-y-1 active:shadow-none"
                                    }`}
                                >
                                    {user.verified
                                        ? "✅ Vérifié"
                                        : "⏳ En attente"}
                                </button>

                                {/* Delete Button */}
                                {!user.super_admin && (
                                    <button
                                        onClick={() =>
                                            handleUserAction(
                                                user.email,
                                                "delete"
                                            )
                                        }
                                        className="p-2 bg-red-50 text-red-600 rounded-xl border-2 border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-[0_3px_0_0_rgba(220,38,38,0.2)]"
                                        title="Supprimer l'utilisateur"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
