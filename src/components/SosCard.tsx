export interface Sos {
    id: string;
    name: string;
    description: string;
}

export default function SosCard({ sos, index }: { sos: Sos; index: number }) {
    const styleIndex = index % 8;

    if (styleIndex === 0) {
        return (
            <div className="h-full group relative bg-brice-yellow p-8 rounded-[40px] rounded-tl-none border-b-8 border-r-8 border-yellow-600 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center text-center">
                <span className="absolute -top-6 -left-7 text-5xl rotate-[-15deg] group-hover:rotate-0 transition-transform">
                    🏄‍♂️
                </span>
                <h3 className="text-2xl font-black italic text-amber-900 uppercase mb-4 leading-none">
                    {sos.name}
                </h3>
                <p className="text-amber-800 font-medium italic text-sm">
                    {sos.description}
                </p>
                <div className="mt-6 w-12 h-1 bg-amber-900/20 rounded-full"></div>
            </div>
        );
    }

    if (styleIndex === 1) {
        return (
            <div className="h-full relative bg-amber-900 p-8 rounded-[40px] border-4 border-white shadow-2xl flex flex-col items-center justify-center text-center group overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-brice-yellow rotate-45 translate-x-15 -translate-y-15 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform"></div>
                <h3 className="text-2xl font-black text-brice-yellow uppercase tracking-tighter mb-4 z-10">
                    {sos.name}
                </h3>
                <p className="text-white/80 font-bold text-xs uppercase leading-relaxed z-10">
                    {sos.description}
                </p>
                <span className="mt-6 text-xs font-black text-amber-900 bg-white px-3 py-1 rounded-full z-10">
                    QUALITÉ BRICE
                </span>
            </div>
        );
    }

    if (styleIndex === 2) {
        return (
            <div className="h-full bg-cyan-500 p-8 rounded-3xl border-4 border-dashed border-white/40 flex flex-col justify-between hover:-rotate-2 group transition-transform shadow-xl">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-black italic text-white uppercase tracking-widest">
                            {sos.name}
                        </h3>
                        <span className="text-3xl -rotate-24 group-hover:-rotate-40 transition-transform">
                            🦀
                        </span>
                    </div>
                    <p className="text-cyan-900 font-black text-sm italic leading-tight bg-white/30 p-4 rounded-2xl">
                        {sos.description}
                    </p>
                </div>
            </div>
        );
    }

    if (styleIndex === 3) {
        return (
            <div className="h-full bg-slate-50 p-1 rounded-[40px] shadow-xl group hover:rotate-1 transition-transform">
                <div className="h-full bg-white border-8 border-slate-100 rounded-[35px] p-8 flex flex-col items-center justify-center border-double">
                    <h3 className="text-xl font-black text-slate-800 uppercase mb-2">
                        {sos.name}
                    </h3>
                    <p className="text-slate-500 font-bold text-[11px] uppercase tracking-tighter">
                        {sos.description}
                    </p>
                    <div className="mt-4 flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 bg-slate-200 rounded-full"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (styleIndex === 4) {
        return (
            <div className="h-full bg-[#e2d1b3] p-6 border-b-8 border-amber-800 shadow-lg -rotate-1 hover:rotate-1 transition-transform relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">
                    📍
                </div>
                <div className="border-2 border-amber-800/30 p-4 flex flex-col items-center h-full justify-center">
                    <h3 className="text-2xl font-black text-amber-900 uppercase tracking-widest text-center border-b-2 border-amber-800 mb-4 pb-2">
                        {sos.name}
                    </h3>
                    <p className="text-amber-800 font-bold italic text-sm text-center leading-relaxed">
                        "{sos.description}"
                    </p>
                </div>
            </div>
        );
    }

    if (styleIndex === 5) {
        return (
            <div className="relative min-h-48 h-full group">
                <div className="absolute inset-0 bg-amber-900 rounded-br-[180px] rounded-tl-[100px] rounded-tr-3xl rounded-bl-3xl shadow-2xl flex flex-col justify-center p-8 border-l-8 border-brice-yellow transition-all group-hover:translate-x-2">
                    <h3 className="text-2xl font-black text-brice-yellow italic uppercase mb-2 leading-none">
                        {sos.name}
                    </h3>
                    <p className="text-white/70 font-medium text-xs pr-10">
                        {sos.description}
                    </p>
                    <span className="absolute top-6 right-6 text-4xl">🦈</span>
                </div>
            </div>
        );
    }

    if (styleIndex === 6) {
        return (
            <div className="h-full relative bg-brice-yellow p-8 rounded-[40px] shadow-xl overflow-hidden group flex flex-col items-center justify-center min-h-[200px] border-b-8 border-yellow-600">
                {/* Palmier Gauche */}
                <div className="absolute -bottom-2 -left-4 text-7xl opacity-40 group-hover:opacity-70 transition-opacity transition-transform rotate-12 group-hover:rotate-0 duration-700 pointer-events-none">
                    🌴
                </div>

                {/* Palmier Droite */}
                <div className="absolute -bottom-4 -right-6 text-8xl opacity-40 group-hover:opacity-70 transition-opacity transition-transform -rotate-12 group-hover:rotate-6 duration-700 pointer-events-none">
                    🌴
                </div>

                {/* Contenu Central */}
                <div className="z-10 text-center space-y-4">
                    <h3 className="text-3xl font-black italic text-amber-900 uppercase leading-none drop-shadow-sm">
                        {sos.name}
                    </h3>

                    <div className="w-12 h-1 bg-amber-900/30 mx-auto rounded-full"></div>

                    <p className="text-amber-800 font-bold italic text-sm leading-tight">
                        {sos.description}
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="h-full bg-white p-8 shadow-2xl relative flex flex-col before:absolute before:top-0 before:left-0 before:w-full before:h-2 before:bg-amber-900/10 before:content-[''] group">
            <div className="border-2 border-amber-900 p-6 flex flex-col items-center text-center h-full justify-center">
                <h3 className="text-xl font-black text-amber-900 uppercase underline decoration-brice-yellow decoration-4 underline-offset-4 mb-4">
                    {sos.name}
                </h3>
                <p className="text-amber-700 font-mono text-xs uppercase font-bold">
                    {sos.description}
                </p>
            </div>
        </div>
    );
}
