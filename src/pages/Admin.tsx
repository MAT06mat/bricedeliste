import { useMemo, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import type { sos } from "../types/sos";
import sosData from "../data/sos_list.json";
import { apiService } from "../services/api";
import Toast from "../components/Toast";
import { useAuth } from "../hooks/useAuth";

type FilterStatus = "all" | "assigned" | "unassigned";
type SortKey = "date" | "type" | "target";

export default function Admin() {
    const { login, isLoggedIn, auth } = useAuth();
    const [tempAuth, setTempAuth] = useState({ email: "", pass: "" });
    const [orders, setOrders] = usePersistedState<sos[]>("orders", []);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const [filterStatus, setFilterStatus] = usePersistedState<FilterStatus>(
        "filterStatus",
        "all"
    );
    const [sortBy, setSortBy] = usePersistedState<SortKey>("sortBy", "date");

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
            let data = null;
            if (isLoggedIn) data = await apiService.getOrders(auth);
            else data = await apiService.getOrders(tempAuth);
            if (data) setOrders(data);
            if (data && !isLoggedIn) login(tempAuth);
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

    const filteredAndSortedOrders = useMemo(() => {
        let result = [...orders].map((o, originalIndex) => ({
            ...o,
            originalIndex,
        }));
        if (filterStatus === "assigned")
            result = result.filter((o) => o.assigned_to && !o.completed);
        else if (filterStatus === "unassigned")
            result = result.filter((o) => !o.assigned_to && !o.completed);

        result.sort((a, b) => {
            if (a.completed !== b.completed) return a.completed ? 1 : -1;
            if (sortBy === "date")
                return (
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                );
            if (sortBy === "type") return a.sosId.localeCompare(b.sosId);
            if (sortBy === "target")
                return a.targetName.localeCompare(b.targetName);
            return 0;
        });
        return result;
    }, [orders, filterStatus, sortBy]);

    if (!isLoggedIn) {
        return (
            <div className="px-4 w-full">
                <div className="max-w-md mx-auto vintage-card p-6 md:p-10 rounded-3xl mt-10 md:mt-20 border-t-8 border-brice-yellow">
                    <h2 className="text-2xl md:text-3xl font-black mb-8 text-amber-900 italic text-center">
                        LOGIN ADMIN
                    </h2>
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-xl outline-none focus:border-brice-yellow"
                            onChange={(e) =>
                                setTempAuth((tauth) => ({
                                    ...tauth,
                                    email: e.target.value,
                                }))
                            }
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-xl outline-none focus:border-brice-yellow"
                            onChange={(e) =>
                                setTempAuth((tauth) => ({
                                    ...tauth,
                                    pass: e.target.value,
                                }))
                            }
                        />
                        <button
                            onClick={fetchOrders}
                            disabled={isLoading}
                            className="w-full bg-brice-yellow text-amber-900 font-black py-4 rounded-xl shadow-[0_4px_0_0_#b49600] brice-button"
                        >
                            {isLoading ? (
                                <span className="wave-anim italic">
                                    En plein surf...
                                </span>
                            ) : (
                                "SE CONNECTER"
                            )}
                        </button>
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

    return (
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 md:px-4 pb-8">
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
                <button
                    onClick={fetchOrders}
                    className="w-full md:w-auto bg-white/40 hover:bg-white/60 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/20"
                >
                    {isLoading ? "..." : "🔄 Actualiser"}
                </button>
            </div>

            {/* Barre de Filtres (Wrap sur mobile) */}
            <div className="vintage-card p-3 md:p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex w-full sm:w-auto gap-1 md:gap-2">
                    {(["all", "assigned", "unassigned"] as FilterStatus[]).map(
                        (s) => (
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
                                    : "Libres"}
                            </button>
                        )
                    )}
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
                        <option value="date">Plus récents</option>
                        <option value="type">Type de SOS</option>
                        <option value="target">Nom de cible</option>
                    </select>
                </div>
            </div>

            {/* Liste des SOS */}
            <div className="grid gap-3 md:gap-4">
                {filteredAndSortedOrders.length === 0 ? (
                    <div className="text-center py-20 opacity-40 italic font-bold">
                        Aucun SOS sur cette vague...
                    </div>
                ) : (
                    filteredAndSortedOrders.map((o) => {
                        const isCompleted = !!o.completed;
                        return (
                            <div
                                key={o.originalIndex}
                                className={`vintage-card rounded-2xl transition-all duration-300 overflow-hidden ${
                                    isCompleted
                                        ? "border-dashed opacity-70"
                                        : expandedIndex === o.originalIndex
                                        ? "ring-4 ring-brice-yellow shadow-xl"
                                        : ""
                                }`}
                            >
                                {/* Header de la carte Adaptatif */}
                                <div
                                    className="p-3 md:p-4 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                                    onClick={() =>
                                        setExpandedIndex(
                                            expandedIndex === o.originalIndex
                                                ? null
                                                : o.originalIndex
                                        )
                                    }
                                >
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <div
                                            className={`shrink-0 w-3 h-3 rounded-full ${
                                                isCompleted
                                                    ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                                                    : "bg-brice-yellow animate-pulse"
                                            }`}
                                        ></div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                                                    {new Date(
                                                        o.created_at
                                                    ).toLocaleDateString()}
                                                </span>
                                                <h3
                                                    className={`font-black text-base md:text-lg text-amber-900 uppercase italic tracking-tighter ${
                                                        isCompleted
                                                            ? "line-through opacity-50"
                                                            : ""
                                                    }`}
                                                >
                                                    {o.targetName}
                                                </h3>
                                            </div>
                                            <span className="text-[9px] font-bold text-cyan-700 mt-0.5 uppercase">
                                                {sosData.find(
                                                    (s) => s.id == o.sosId
                                                )?.name || o.sosId}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                                        <div className="flex gap-2">
                                            {isCompleted ? (
                                                <span className="text-[8px] md:text-[10px] font-black text-green-700 bg-green-100 px-2 py-1 rounded uppercase">
                                                    Terminé
                                                </span>
                                            ) : (
                                                o.assigned_to && (
                                                    <span className="text-[8px] md:text-[10px] bg-cyan-500 text-white px-2 py-1 rounded-full font-black uppercase tracking-tighter italic">
                                                        🏄‍♂️{" "}
                                                        {
                                                            o.assigned_to.split(
                                                                "@"
                                                            )[0]
                                                        }
                                                    </span>
                                                )
                                            )}
                                        </div>
                                        <span className="text-amber-500 font-bold text-xs">
                                            {expandedIndex === o.originalIndex
                                                ? "▲"
                                                : "▼"}
                                        </span>
                                    </div>
                                </div>

                                {/* Détails de la carte Adaptatif */}
                                {expandedIndex === o.originalIndex && (
                                    <div className="p-4 md:p-6 border-t-2 border-amber-900/5 bg-white/40 space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                                            <div className="space-y-2 text-amber-900">
                                                <p>
                                                    <strong>
                                                        📍 Localisation:
                                                    </strong>{" "}
                                                    <span className="bg-white/50 px-2 rounded">
                                                        {o.targetRoom}
                                                    </span>
                                                </p>
                                                <p className="text-[10px] opacity-70 italic font-medium">
                                                    Par {o.name} ({o.group}) •{" "}
                                                    {o.email}
                                                </p>
                                            </div>
                                            <div className="bg-sand/50 p-3 rounded-xl border-2 border-dashed border-amber-200">
                                                <p className="font-black text-[9px] uppercase mb-1">
                                                    📝 Instructions :
                                                </p>
                                                <p className="italic text-amber-800 font-medium leading-tight">
                                                    "
                                                    {o.desc ||
                                                        "Improvise un vent mémorable."}
                                                    "
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                            {!isCompleted && (
                                                <button
                                                    onClick={() =>
                                                        handleAction(
                                                            o.originalIndex,
                                                            o.assigned_to ===
                                                                auth.email
                                                                ? "unassign"
                                                                : "assign"
                                                        )
                                                    }
                                                    disabled={
                                                        !!o.assigned_to &&
                                                        o.assigned_to !==
                                                            auth.email
                                                    }
                                                    className={`w-full sm:flex-1 font-black py-3 rounded-xl brice-button text-[10px] uppercase ${
                                                        o.assigned_to ===
                                                        auth.email
                                                            ? "bg-white text-amber-900 border-2 border-amber-900"
                                                            : o.assigned_to
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200 shadow-none"
                                                            : "bg-cyan-600 text-white shadow-[0_3px_0_0_#0891b2]"
                                                    }`}
                                                >
                                                    {o.assigned_to ===
                                                    auth.email
                                                        ? "❌ Se dé-assigner"
                                                        : o.assigned_to
                                                        ? "Déjà pris"
                                                        : "⚡ S'assigner"}
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    handleAction(
                                                        o.originalIndex,
                                                        "complete"
                                                    )
                                                }
                                                className={`w-full sm:flex-1 font-black py-3 rounded-xl brice-button text-[10px] uppercase ${
                                                    isCompleted
                                                        ? "bg-amber-100 text-amber-700 border-2 border-amber-300"
                                                        : "bg-green-600 text-white shadow-[0_3px_0_0_#166534]"
                                                }`}
                                            >
                                                {isCompleted
                                                    ? "↩️ Remettre en cours"
                                                    : "✅ Marquer Terminé"}
                                            </button>
                                            {o.completed && (
                                                <button
                                                    onClick={() =>
                                                        window.confirm(
                                                            "Supprimer définitivement ?"
                                                        ) &&
                                                        handleAction(
                                                            o.originalIndex,
                                                            "delete"
                                                        )
                                                    }
                                                    className="w-full sm:w-auto px-6 bg-red-50 text-red-600 font-black py-3 rounded-xl brice-button text-[10px] border-2 border-red-200 uppercase"
                                                >
                                                    Supprimer
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
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
