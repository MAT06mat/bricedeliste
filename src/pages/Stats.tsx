import { useCallback, useEffect, useState } from "react";
import { apiService } from "../services/api";
import Toast from "../components/Toast";
import type { StatsData } from "../types/stats";
/* import { useAuth } from "../hooks/useAuth"; */
import sosData from "../data/sos_list.json";
import { useFullFeatureEnabled } from "../data/var";
import Unavailable from "./Unavailable";

const defaultStats: StatsData = {
    total: 0,
    completed: 0,
    top_requesters: {},
    top_targets: {},
    top_completers: {},
    top_types: {},
};

export default function Stats() {
    /* const { isLoggedIn, super_admin } = useAuth(); */
    const [stats, setStats] = useState<StatsData>(defaultStats);
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    const fetchStats = useCallback(async () => {
        try {
            const data = await apiService.getStats();
            setStats(data);
        } catch {
            setToast({
                message: "Impossible de charger les vagues de stats.",
                type: "error",
            });
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            if (isMounted) {
                await fetchStats();
            }
        };
        loadData();
        return () => {
            isMounted = false;
        };
    }, [fetchStats]);

    const isFullFeatureAnable = useFullFeatureEnabled();

    if (!isFullFeatureAnable) return <Unavailable />;

    /* const handleResetAll = async () => {
        const firstConfirm = window.confirm(
            "ATTENTION : Tu vas supprimer TOUS les SOS et réinitialiser les statistiques. Tu es sûr de vouloir tout casser ?"
        );

        if (firstConfirm) {
            const secondConfirm = window.confirm(
                "Dernière chance... On efface vraiment tout ?"
            );
            if (secondConfirm) {
                try {
                    await apiService.resetAll();
                    setToast({
                        message:
                            "Le spot est comme neuf, plus une seule vague !",
                        type: "success",
                    });
                    await fetchStats();
                } catch {
                    setToast({
                        message: "Erreur lors du reset.",
                        type: "error",
                    });
                }
            }
        }
    }; */

    return (
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-8 md:px-4">
            {/* Main Title */}
            <div className="bg-brice-yellow p-6 md:mb-16 rounded-3xl shadow-xl border-b-8 border-yellow-600 text-center transform -rotate-1">
                <h1 className="text-4xl md:text-6xl font-black italic text-amber-900 uppercase tracking-tighter">
                    Le Tableau des Vagues
                </h1>
                <p className="text-amber-800 font-bold uppercase text-xs mt-2 tracking-widest">
                    Les stats qui font mal (ou pas)
                </p>
            </div>

            {/* Top Counters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <CounterCard
                    label="SOS Lancés"
                    value={stats.total}
                    emoji="🌊"
                />
                <CounterCard
                    label="SOS Réalisés"
                    value={stats.completed}
                    emoji="✅"
                    color="bg-green-500"
                />
            </div>

            {/* Top 10 Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                <TopList
                    title="Top Demandeurs"
                    data={stats.top_requesters}
                    sub="Ceux qui cassent"
                    emoji="🤘"
                />
                <TopList
                    title="Top Cibles"
                    data={stats.top_targets}
                    sub="Ceux qui mangent"
                    emoji="🎯"
                />
                <TopList
                    title="Top Brice"
                    data={stats.top_completers}
                    sub="Les pros du surf"
                    emoji="👑"
                />
                <TopList
                    title="Top SOS"
                    data={stats.top_types}
                    sub="Les plus grandes vagues"
                    emoji="🌊"
                />
            </div>
            {/* super_admin && isLoggedIn && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full md:w-auto">
                    <button
                        onClick={handleResetAll}
                        className="bg-red-600 text-white px-6 py-2 rounded-xl font-black text-xs uppercase hover:bg-red-700 transition-all shadow-[0_4px_0_0_#991b1b]"
                    >
                        💣 Reset All
                    </button>
                </div>
            ) */}

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

// Sub-component for animated numbers
function CounterCard({
    label,
    value,
    emoji,
    color = "bg-brice-yellow",
}: {
    label: string;
    value: number;
    emoji: string;
    color?: string;
}) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1000;
        const increment = value / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [value]);

    return (
        <div
            className={`${color} p-8 rounded-[40px] shadow-2xl border-b-8 border-black/20 flex items-center justify-between overflow-hidden relative group`}
        >
            <div className="z-10">
                <p className="text-amber-900 font-black uppercase italic text-lg leading-none">
                    {label}
                </p>
                <p className="text-5xl md:text-7xl font-black text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] mt-2">
                    {displayValue}
                </p>
            </div>
            <span className="text-8xl opacity-20 absolute -right-4 -bottom-4 transform group-hover:scale-125 transition-transform duration-500">
                {emoji}
            </span>
        </div>
    );
}

// Sub-component for Top 10 lists
function TopList({
    title,
    data,
    sub,
    emoji,
}: {
    title: string;
    data: Record<string, number>;
    sub: string;
    emoji: string;
}) {
    if (!data) {
        data = {};
    }
    const entries = Object.entries(data);

    return (
        <div className="vintage-card p-6 rounded-[35px] flex flex-col border-t-4 border-brice-yellow">
            <div className="mb-6 text-center">
                <span className="text-3xl mb-2 block">{emoji}</span>
                <h3 className="text-xl font-black italic text-amber-900 uppercase leading-none">
                    {title}
                </h3>
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter mt-1">
                    {sub}
                </p>
            </div>

            <div className="space-y-2 flex-grow">
                {entries.length === 0 ? (
                    <p className="text-center text-xs italic text-amber-800 opacity-40 py-10">
                        Pas encore de data...
                    </p>
                ) : (
                    entries.map(([name, count], index) => (
                        <div
                            key={name}
                            className="flex items-center justify-between bg-white/40 p-3 rounded-2xl border border-amber-100 hover:bg-white transition-colors group"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <span
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                                        index === 0
                                            ? "bg-brice-yellow text-amber-900"
                                            : "bg-amber-100 text-amber-700"
                                    }`}
                                >
                                    {index + 1}
                                </span>
                                <span className="text-xs font-bold text-amber-900 truncate uppercase tracking-tighter">
                                    {name.includes("@")
                                        ? name
                                              .split("@")[0]
                                              .split(".")
                                              .join(" ")
                                        : sosData.find((sos) => sos.id === name)
                                              ?.name || name}
                                </span>
                            </div>
                            <span className="text-xs font-black text-brice-yellow bg-amber-900 px-2 py-1 rounded-lg group-hover:scale-110 transition-transform">
                                {count}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
