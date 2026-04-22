import { useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import Toast from "../components/Toast";
import { useAuth } from "../hooks/useAuth";

type FilterStatus = "all" | "assigned" | "unassigned" | "mine";
type SortKey = "date" | "place" | "type" | "target";

export default function Admin() {
    const { isLoggedIn, auth } = useAuth();
    const [filterStatus, setFilterStatus] = usePersistedState<FilterStatus>(
        "filterStatus",
        "all",
    );
    const [sortBy, setSortBy] = usePersistedState<SortKey>("sortBy", "date");

    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    if (!isLoggedIn) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 md:px-4">
            {/* Titre et Refresh (Mobile Friendly) */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-brice-yellow p-4 md:p-5 rounded-2xl shadow-md border-b-4 border-yellow-600 gap-3">
                <div className="text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-black italic text-amber-900 leading-none">
                        LES SOS À CASSER !
                    </h2>
                    <span className="hidden md:flex text-[9px] md:text-[10px] font-bold text-amber-800 uppercase tracking-tighter">
                        Connecté : {auth.email.split("@")[0]}
                    </span>
                </div>
                <button className="w-full md:w-auto bg-white/40 hover:bg-white/60 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/20">
                    🔄 Actualiser
                </button>
            </div>

            {/* Barre de Filtres (Wrap sur mobile) */}
            <div className="vintage-card p-3 md:p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex w-full sm:w-auto gap-1 md:gap-2">
                    {(
                        [
                            "all",
                            "unassigned",
                            "assigned",
                            "mine",
                        ] as FilterStatus[]
                    ).map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-xl text-[10px] md:text-xs font-black uppercase transition-all ${
                                filterStatus === s
                                    ? "bg-amber-900 text-brice-yellow"
                                    : "bg-amber-100 text-amber-900"
                            }`}
                        >
                            {s === "all"
                                ? "Tous"
                                : s === "assigned"
                                  ? "Assignés"
                                  : s === "mine"
                                    ? "Mes SOS"
                                    : "Libres"}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-[10px] font-black uppercase text-amber-700">
                        Trier par:
                    </span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortKey)}
                        className="bg-white border-2 border-amber-200 rounded-lg p-1 text-[10px] md:text-xs font-bold outline-none focus:border-brice-yellow"
                    >
                        <option value="date">Défaut</option>
                        <option value="place">Bâtiment</option>
                        <option value="type">Type de SOS</option>
                        <option value="target">Nom de cible</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-3 md:gap-4">
                <div className="text-center py-20 opacity-40 italic font-bold">
                    Aucun SOS sur cette vague...
                </div>
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
