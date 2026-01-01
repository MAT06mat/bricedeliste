import { Outlet, Link, useLocation } from "react-router";
import { usePersistedState } from "./hooks/usePersistedState";

export default function App() {
    const location = useLocation();

    // Now these will stay in sync with Admin.tsx
    const [isLoggedIn] = usePersistedState("isLoggedIn", false);

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col items-center">
            <nav className="fixed top-0 w-full z-50 bg-brice-yellow border-b-4 border-yellow-600 shadow-xl px-4 py-3">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <Link
                        to="/"
                        className="text-2xl font-black italic text-amber-900 tracking-tighter hover:scale-105 transition-transform"
                    >
                        BRICE{" "}
                        <span className="text-white text-stroke">CDP</span>
                    </Link>

                    <div className="flex space-x-4 md:space-x-8 items-center">
                        <Link
                            to="/"
                            className={`font-black text-xs md:text-sm uppercase tracking-widest transition-all ${
                                isActive("/")
                                    ? "text-white underline decoration-4"
                                    : "text-amber-900 hover:text-white"
                            }`}
                        >
                            Accueil
                        </Link>
                        <Link
                            to="/commander"
                            className={`font-black text-xs md:text-sm uppercase tracking-widest transition-all ${
                                isActive("/commander")
                                    ? "text-white underline decoration-4"
                                    : "text-amber-900 hover:text-white"
                            }`}
                        >
                            Commander
                        </Link>

                        {isLoggedIn ? (
                            <div className="flex items-center gap-8">
                                <Link
                                    to="/admin"
                                    className={`font-black text-xs md:text-sm uppercase tracking-widest transition-all ${
                                        isActive("/admin")
                                            ? "text-white underline decoration-4"
                                            : "text-amber-900 hover:text-white"
                                    }`}
                                >
                                    Espace SOS
                                </Link>
                            </div>
                        ) : (
                            <Link
                                to="/admin"
                                className="bg-amber-900 text-brice-yellow px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-black shadow-lg"
                            >
                                Connexion
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <main className="container mx-auto p-4 md:p-8 pt-24 md:pt-32">
                <Outlet />
            </main>
        </div>
    );
}
