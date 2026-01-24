import Logo from "./../assets/logo.jpeg";

export default function Footer() {
    return (
        <footer className="w-full mt-auto bg-brice-yellow border-t-8 border-yellow-600 relative px-4">
            <div className="max-w-5xl mx-auto py-4 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black italic text-2xl text-amber-900 leading-none">
                            BRICE
                        </span>
                        <span className="text-white text-stroke-sm font-black text-sm tracking-widest w-max">
                            CDP 2026
                        </span>
                    </div>
                </div>

                <div className="text-center md:text-right space-y-2">
                    <p className="font-bold text-amber-800 text-xs uppercase tracking-tighter">
                        Développé avec ❤️{" "}
                        <span className="hidden md:inline">
                            et beaucoup de Jaune
                        </span>
                        <span className="md:hidden">par</span>
                    </p>
                    <a
                        href="https://github.com/MAT06mat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-amber-900 text-brice-yellow px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all hover:scale-105 shadow-lg group"
                    >
                        <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        MAT06mat
                    </a>
                </div>
            </div>
        </footer>
    );
}
