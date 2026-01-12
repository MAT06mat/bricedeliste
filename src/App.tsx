import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { useAuth } from "./hooks/useAuth";

export default function App() {
    const { isLoggedIn, super_admin, logout, auth } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="h-[100svh] flex flex-col items-center page-background">
            <nav className="fixed top-0 w-full z-50 bg-brice-yellow border-b-4 border-yellow-600 shadow-xl px-4 py-3">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="text-2xl font-black italic text-amber-900 tracking-tighter hover:scale-105 transition-transform z-50"
                    >
                        BRICE{" "}
                        <span className="text-white text-stroke">CDP</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link
                            to="/"
                            className={`font-black text-sm uppercase tracking-widest transition-all ${
                                isActive("/")
                                    ? "text-white underline decoration-4"
                                    : "text-amber-900 hover:text-white"
                            }`}
                        >
                            Accueil
                        </Link>
                        <Link
                            to="/commander"
                            className={`font-black text-sm uppercase tracking-widest transition-all ${
                                isActive("/commander")
                                    ? "text-white underline decoration-4"
                                    : "text-amber-900 hover:text-white"
                            }`}
                        >
                            Commander
                        </Link>

                        {isLoggedIn ? (
                            <div className="flex items-center gap-6">
                                <Link
                                    to="/admin"
                                    className={`font-black text-sm uppercase tracking-widest transition-all ${
                                        isActive("/admin")
                                            ? "text-white underline decoration-4"
                                            : "text-amber-900 hover:text-white"
                                    }`}
                                >
                                    Espace SOS
                                </Link>
                                {super_admin && (
                                    <Link
                                        to="/super-admin"
                                        className={`font-black text-sm uppercase tracking-widest transition-all ${
                                            isActive("/super-admin")
                                                ? "text-white underline decoration-4"
                                                : "text-amber-900 hover:text-white"
                                        }`}
                                    >
                                        Users
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="bg-amber-900 text-brice-yellow px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/admin"
                                className="bg-amber-900 text-brice-yellow px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black shadow-lg"
                            >
                                Connexion
                            </Link>
                        )}
                    </div>

                    {/* Burger Button (Mobile Only) */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden z-50 p-2 text-amber-900 focus:outline-none"
                    >
                        <div className="space-y-1.5">
                            <span
                                className={`block w-6 h-1 bg-amber-900 transition-transform duration-300 ${
                                    isMenuOpen
                                        ? "rotate-45 translate-y-2.5"
                                        : ""
                                }`}
                            ></span>
                            <span
                                className={`block w-6 h-1 bg-amber-900 transition-opacity duration-300 ${
                                    isMenuOpen ? "opacity-0" : ""
                                }`}
                            ></span>
                            <span
                                className={`block w-6 h-1 bg-amber-900 transition-transform duration-300 ${
                                    isMenuOpen
                                        ? "-rotate-45 -translate-y-2.5"
                                        : ""
                                }`}
                            ></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`fixed inset-0 bg-brice-yellow transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8 ${
                        isMenuOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
                >
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className={`text-2xl font-black uppercase italic ${
                            isActive("/")
                                ? "text-white scale-110"
                                : "text-amber-900"
                        }`}
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/commander"
                        onClick={closeMenu}
                        className={`text-2xl font-black uppercase italic ${
                            isActive("/commander")
                                ? "text-white scale-110"
                                : "text-amber-900"
                        }`}
                    >
                        Commander
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/admin"
                                onClick={closeMenu}
                                className={`text-2xl font-black uppercase italic ${
                                    isActive("/admin")
                                        ? "text-white scale-110"
                                        : "text-amber-900"
                                }`}
                            >
                                Espace SOS
                            </Link>
                            {super_admin && (
                                <Link
                                    to="/super-admin"
                                    onClick={closeMenu}
                                    className={`text-2xl font-black uppercase italic  ${
                                        isActive("/super-admin")
                                            ? "text-white scale-110"
                                            : "text-amber-900"
                                    }`}
                                >
                                    Users
                                </Link>
                            )}
                            <div className="pt-4 flex flex-col items-center gap-2">
                                <span className="text-xs font-bold text-amber-700 italic">
                                    Connecté : {auth.email.split("@")[0]}
                                </span>
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMenu();
                                    }}
                                    className="bg-amber-900 text-brice-yellow px-8 py-3 rounded-2xl font-black uppercase italic shadow-xl"
                                >
                                    Se déconnecter
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link
                            to="/admin"
                            onClick={closeMenu}
                            className="bg-amber-900 text-brice-yellow px-10 py-4 rounded-2xl font-black text-lg uppercase italic shadow-xl"
                        >
                            Connexion
                        </Link>
                    )}
                </div>
            </nav>

            <main className="container mx-auto p-4 md:p-8 pt-24 md:pt-32 z-20">
                <Outlet />
            </main>
        </div>
    );
}
