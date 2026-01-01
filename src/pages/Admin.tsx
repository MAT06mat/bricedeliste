import { useMemo, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import type { sos } from "../types/sos";
import sosData from "../data/sos_list.json";
import { apiService } from "../services/api";
import Toast from "../components/Toast";

type FilterStatus = "all" | "assigned" | "unassigned";
type SortKey = "date" | "type" | "target";

export default function Admin() {
    const [auth, setAuth] = usePersistedState("auth", { email: "", pass: "" });
    const [orders, setOrders] = usePersistedState<sos[]>("orders", []);
    const [isLoggedIn, setIsLoggedIn] = usePersistedState("isLoggedIn", false);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Filter & Sort States
    const [filterStatus, setFilterStatus] = usePersistedState<FilterStatus>(
        "filterStatus",
        "all"
    );
    const [sortBy, setSortBy] = usePersistedState<SortKey>("sortBy", "date");

    // Toast State
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

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const data = await apiService.getOrders();
            setOrders(data);
            setIsLoggedIn(true);
        } catch {
            showToast("C'est cassé ! Vérifie tes accès.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = async (
        index: number,
        action: "delete" | "assign" | "unassign" | "complete"
    ) => {
        try {
            if (action === "delete") await apiService.deleteOrder(index);
            if (action === "assign") await apiService.assignOrder(index);
            if (action === "unassign") await apiService.unassignOrder(index);
            if (action === "complete") await apiService.toggleComplete(index);

            await fetchOrders();
        } catch {
            showToast("Action impossible.", "error");
        }
    };

    // --- Logic: Filtering and Sorting ---
    const filteredAndSortedOrders = useMemo(() => {
        let result = [...orders].map((o, originalIndex) => ({ ...o, originalIndex }));

        if (filterStatus === "assigned") {
            result = result.filter(o => o.assigned_to && !o.completed);
        } else if (filterStatus === "unassigned") {
            result = result.filter(o => !o.assigned_to && !o.completed);
        }

        // Sorting
        result.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            if (sortBy === "date") {
                return (
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                );
            }
            if (sortBy === "type") {
                return a.sosId.localeCompare(b.sosId);
            }
            if (sortBy === "target") {
                return a.targetName.localeCompare(b.targetName);
            }
            return 0;
        });

        return result;
    }, [orders, filterStatus, sortBy]);

    if (!isLoggedIn) {
        return (
            <div className="max-w-md mx-auto vintage-card p-10 rounded-3xl mt-20 border-t-8 border-brice-yellow">
                <h2 className="text-3xl font-black mb-8 text-amber-900 italic text-center">
                    LOGIN ADMIN
                </h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-xl outline-none focus:border-brice-yellow transition-colors"
                        onChange={(e) =>
                            setAuth({ ...auth, email: e.target.value })
                        }
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-xl outline-none focus:border-brice-yellow transition-colors"
                        onChange={(e) =>
                            setAuth({ ...auth, pass: e.target.value })
                        }
                    />
                    <button
                        onClick={fetchOrders}
                        disabled={isLoading}
                        className="w-full bg-brice-yellow text-amber-900 font-black py-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(180,150,0,1)] brice-button flex justify-center items-center gap-2"
                    >
                        {isLoading ? (
                            <span className="wave-anim">
                                🏄‍♂️ En plein surf...
                            </span>
                        ) : (
                            "SE CONNECTER"
                        )}
                    </button>
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

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-brice-yellow p-4 rounded-2xl shadow-md">
                <h2 className="text-2xl font-black italic text-amber-900">
                    LES SOS À CASSER !
                </h2>
                <button
                    onClick={fetchOrders}
                    className="bg-white/50 hover:bg-white/80 px-4 py-2 rounded-full font-bold text-sm transition-all"
                >
                    {isLoading ? "CHARGEMENT..." : "🔄 Actualiser"}
                </button>
            </div>

            <div className="vintage-card p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                    {(["all", "assigned", "unassigned"] as FilterStatus[]).map(
                        (s) => (
                            <button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${filterStatus === s
                                    ? "bg-amber-900 text-brice-yellow"
                                    : "bg-amber-100 text-amber-900"
                                    }`}
                            >
                                {s === "all"
                                    ? "Tous"
                                    : s === "assigned"
                                        ? "Assignés"
                                        : "Libres"}
                            </button>
                        )
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase text-amber-700">
                        Trier par:
                    </span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortKey)}
                        className="bg-white border-2 border-amber-200 rounded-lg p-1 text-xs font-bold outline-none focus:border-brice-yellow"
                    >
                        <option value="date">Plus récents</option>
                        <option value="type">Type de SOS</option>
                        <option value="target">Nom de cible</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-4 pb-20">
                {filteredAndSortedOrders.length === 0 ? (
                    <div className="text-center py-20 opacity-40 italic font-bold">
                        Aucun SOS sur cette vague...
                    </div>
                ) : (
                    filteredAndSortedOrders.map((o: sos & { assigned_to?: string; completed?: boolean; originalIndex: number }) => {
                        const isCompleted = !!o.completed;

                        return (
                            <div
                                key={o.originalIndex}
                                className={`vintage-card rounded-2xl transition-all duration-300 overflow-hidden ${isCompleted
                                    ? "border-dashed"
                                    : expandedIndex === o.originalIndex
                                        ? "ring-4 ring-brice-yellow shadow-2xl"
                                        : ""
                                    }`}
                            >
                                {/* Header of the card */}
                                <div
                                    className="p-4 cursor-pointer flex justify-between items-center"
                                    onClick={() =>
                                        setExpandedIndex(
                                            expandedIndex === o.originalIndex ? null : o.originalIndex
                                        )
                                    }
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-brice-yellow animate-pulse'}`}></div>
                                        <span className="text-xs font-mono text-amber-700 bg-amber-100 px-2 py-1 rounded">
                                            {new Date(o.created_at).toLocaleDateString()}
                                        </span>
                                        <h3 className={`font-black text-lg text-amber-900 uppercase italic tracking-tighter ${isCompleted ? 'line-through' : ''}`}>
                                            {o.targetName}
                                        </h3>
                                        <span className="hidden md:inline text-xs font-mono text-amber-700 bg-amber-100/50 px-2 py-1 rounded border border-amber-200">
                                            {sosData.find((s) => s.id == o.sosId)?.name || o.sosId}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {isCompleted ? (
                                            <span className="text-[10px] font-black text-green-700 bg-green-100 px-2 py-1 rounded uppercase">Terminé</span>
                                        ) : o.assigned_to && (
                                            <span className="text-[10px] bg-cyan-500 text-white px-2 py-1 rounded-full font-black uppercase tracking-tighter">
                                                🏄‍♂️ {o.assigned_to.split("@")[0]}
                                            </span>
                                        )}
                                        <span className="text-amber-500 font-bold">
                                            {expandedIndex === o.originalIndex ? "▲" : "▼"}
                                        </span>
                                    </div>
                                </div>

                                {/* Expanded details */}
                                {expandedIndex === o.originalIndex && (
                                    <div className="p-6 border-t-2 border-amber-900/5 bg-white/40 space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="space-y-2 text-amber-900">
                                                <p><strong>📍 Localisation:</strong> <span className="bg-white/50 px-2 rounded">{o.targetRoom}</span></p>
                                                <p><strong>🏷️ Mission:</strong> <span className="bg-brice-yellow/30 px-2 rounded font-black italic">{o.sosId}</span></p>
                                                <p className="text-xs opacity-70 italic font-medium">Commandé par {o.name} ({o.group}) • {o.email}</p>
                                            </div>
                                            <div className="bg-sand/50 p-3 rounded-xl border-2 border-dashed border-amber-200">
                                                <p className="font-black text-[10px] uppercase mb-1">📝 Instructions :</p>
                                                <p className="italic text-amber-800 font-medium leading-relaxed">
                                                    "{o.desc || "Pas de description, improvise un vent mémorable."}"
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-4">
                                            {/* Actions Assignation (seulement si pas terminé) */}
                                            {!isCompleted && (
                                                o.assigned_to === auth.email ? (
                                                    <button
                                                        key="1"
                                                        onClick={() => handleAction(o.originalIndex, "unassign")}
                                                        className="flex-1 min-w-[140px] bg-white text-amber-900 font-black py-3 rounded-xl brice-button text-xs border-2 border-amber-900 uppercase"
                                                    >
                                                        ❌ Se dé-assigner
                                                    </button>
                                                ) : (
                                                    <button
                                                        key="2"
                                                        onClick={() => handleAction(o.originalIndex, "assign")}
                                                        disabled={!!o.assigned_to}
                                                        className={`flex-1 min-w-[140px] font-black py-3 rounded-xl brice-button text-xs uppercase ${o.assigned_to
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200"
                                                            : "bg-cyan-600 text-white shadow-[0_4px_0_0_#0891b2]"
                                                            }`}
                                                    >
                                                        {o.assigned_to ? "Déjà pris" : "⚡ S'assigner"}
                                                    </button>
                                                )
                                            )}
                                            {/* Toggle Terminé */}
                                            <button
                                                onClick={() => handleAction(o.originalIndex, "complete")}
                                                className={`flex-1 min-w-[140px] font-black py-3 rounded-xl brice-button text-xs uppercase tracking-widest ${isCompleted
                                                    ? "bg-amber-100 text-amber-700 border-2 border-amber-300"
                                                    : "bg-green-600 text-white shadow-[0_4px_0_0_#166534]"
                                                    }`}
                                            >
                                                {isCompleted ? "↩️ Remettre en cours" : "✅ Marquer Terminé"}
                                            </button>

                                            {/* Suppression Définitive */}
                                            {o.completed && <button
                                                onClick={() => {
                                                    if (window.confirm("Supprimer ce dossier définitivement ?"))
                                                        handleAction(o.originalIndex, "delete");
                                                }}
                                                className="px-6 bg-red-50 text-red-600 font-black py-3 rounded-xl brice-button text-xs border-2 border-red-200 hover:bg-red-600 hover:text-white uppercase transition-colors"
                                            >
                                                Supprimer
                                            </button>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
