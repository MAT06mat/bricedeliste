import { useAuth } from "../hooks/useAuth";

export default function SuperAdmin() {
    const { isLoggedIn, super_admin } = useAuth();

    if (!isLoggedIn || !super_admin) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 px-2 md:px-4">
            {/* Header SuperAdmin */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-amber-900 p-5 rounded-2xl shadow-xl border-b-4 border-black gap-4">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-black italic text-brice-yellow leading-none uppercase">
                        Gestion des Surfeurs
                    </h2>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">
                        0 membres dans la team
                    </p>
                </div>
                <button className="w-full md:w-auto bg-brice-yellow text-amber-900 px-6 py-2 rounded-xl font-black text-xs uppercase hover:scale-105 transition-all shadow-[0_4px_0_0_#b49600]">
                    🔄 Actualiser
                </button>
            </div>

            {/* User List */}
            <div className="grid gap-4">
                <div className="text-center py-20 opacity-40 italic font-bold text-amber-900">
                    Aucun membre sur le spot...
                </div>
            </div>
        </div>
    );
}
