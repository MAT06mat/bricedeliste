import { Link } from "react-router";
import { enable_full_features } from "../data/var";

export default function NotFound() {
    if (!enable_full_features) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center md:px-4 animate-in fade-in zoom-in duration-500">
                <div className="max-w-2xl w-full vintage-card p-10 px-8 md:p-12 rounded-[50px] border-b-8 border-brice-yellow text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-7xl font-black text-amber-900 italic uppercase tracking-tighter mb-6">
                            404 - Page Non Trouvée
                        </h1>

                        <p className="text-amber-700 italic mb-10 leading-relaxed">
                            Désolé, la page que vous recherchez est introuvable.
                        </p>

                        <Link
                            to="/"
                            className="w-full sm:w-auto bg-brice-yellow text-amber-900 font-black px-6 md:px-10 py-4 rounded-2xl shadow-[0_4px_0_0_#b49600] brice-button text-lg italic uppercase"
                        >
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-[70vh] flex items-center justify-center md:px-4 animate-in fade-in zoom-in duration-500">
            <div className="max-w-2xl w-full vintage-card p-10 px-8 md:p-12 rounded-[50px] border-b-8 border-brice-yellow text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-amber-900 opacity-[0.08] select-none pointer-events-none">
                    404
                </div>

                <div className="relative z-10">
                    <h1 className="text-7xl md:text-9xl font-black text-amber-900 italic uppercase tracking-tighter mb-2">
                        CASSÉ !
                    </h1>

                    <p className="text-amber-700 font-bold italic mb-2 leading-relaxed">
                        Erreur "casse en quatre"
                    </p>

                    <div className="h-1 w-32 bg-brice-yellow mx-auto mb-8"></div>

                    <p className="text-xl md:text-2xl text-amber-800 font-bold mb-2">
                        T'as pas de trajectoire, t'as pas de vitesse...
                    </p>
                    <p className="text-amber-700 italic mb-10 leading-relaxed">
                        Cette page n'existe pas. Tu t'es mangé le récif en plein
                        vol. T'es comme le "H" de INS'Hawaii : tu sers à rien !
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="w-full sm:w-auto bg-brice-yellow text-amber-900 font-black px-6 md:px-10 py-4 rounded-2xl shadow-[0_4px_0_0_#b49600] brice-button text-lg italic uppercase"
                        >
                            Retour à la plage 🏄‍♂️
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
