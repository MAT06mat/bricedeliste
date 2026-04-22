import { Link } from "react-router";

export default function Register() {
    return (
        <div className="max-w-md mx-auto mt-10 animate-in fade-in zoom-in duration-500">
            <div className="vintage-card p-10 rounded-[40px] border-b-8 border-brice-yellow">
                <h2 className="text-3xl font-black mb-8 text-amber-900 italic text-center uppercase tracking-tighter">
                    Rejoindre le Spot (fonctionnalité désactivée...)
                </h2>

                <form className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-amber-700 ml-2">
                            Email INSA Lyon
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="brice.nice@insa-lyon.fr"
                            className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-2xl focus:border-brice-yellow outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-amber-700 ml-2">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-2xl focus:border-brice-yellow outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-red-500 ml-2">
                            Clé Secrète de la Casse
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="La clé du spot..."
                            className="w-full bg-white/50 border-2 border-red-200 p-3 rounded-2xl focus:border-red-500 outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brice-yellow text-amber-900 font-black py-4 rounded-2xl shadow-[0_4px_0_0_#b49600] brice-button text-lg italic uppercase mt-4"
                    >
                        S'INSCRIRE 🏄‍♂️
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link
                        to="/admin"
                        className="text-xs text-amber-600 underline font-bold italic hover:text-amber-900"
                    >
                        Déjà un compte ? Se connecter
                    </Link>
                </div>
            </div>
        </div>
    );
}
