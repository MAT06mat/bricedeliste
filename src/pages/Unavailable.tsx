import { Link } from "react-router";

export default function Unavailable() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center md:px-4 animate-in fade-in zoom-in duration-500">
            <div className="max-w-xl w-full vintage-card p-10 px-8 md:p-12 rounded-[50px] border-b-8 border-brice-yellow text-center overflow-hidden">
                <p className="text-xl md:text-2xl text-amber-800 font-bold italic uppercase tracking-tighter mb-4">
                    Arrive prochainement...
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
    );
}
