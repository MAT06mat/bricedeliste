export default function Home() {
    return (
        <div className="text-center space-y-12 animate-in fade-in zoom-in duration-700">
            {/* Hero Title */}
            <div className="relative inline-block">
                <h1 className="text-7xl md:text-9xl font-black text-white italic drop-shadow-[0_8px_0px_rgba(0,0,0,0.2)] tracking-tighter">
                    BRICE DE LISTE
                </h1>
                <div className="absolute -right-8 -top-8 rotate-12 hidden md:block">
                    <span className="bg-brice-yellow text-amber-900 text-xs font-black px-3 py-1 rounded-full border-2 border-amber-900 shadow-lg uppercase">
                        C'est cassé !
                    </span>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="vintage-card p-1 md:p-8 rounded-[40px] max-w-3xl mx-auto overflow-hidden">
                <div className="bg-white/50 rounded-[32px] p-6 md:p-10 border-2 border-dashed border-amber-900/20">
                    <h2 className="text-3xl font-black mb-4 text-amber-900 italic uppercase">
                        Salut, ça farte ? 🏄‍♂️
                    </h2>

                    <p className="mb-8 text-lg text-amber-800 font-medium leading-relaxed">
                        Bienvenue sur le spot de la liste CDP la plus cassante de l'INSA Lyon.
                        On n'attend pas la vague, on la crée. Prépare tes meilleurs vents,
                        car ici, on est là pour gagner (et surtout pour casser).
                    </p>

                    {/* Video Container */}
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-brice-yellow rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="Présentation Brice"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-brice-yellow"></div>
                        <div className="h-2 w-2 rounded-full bg-brice-yellow opacity-60"></div>
                        <div className="h-2 w-2 rounded-full bg-brice-yellow opacity-30"></div>
                    </div>
                </div>
            </div>

            {/* Sub-section / Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pb-10">
                {[
                    { title: "Jaune", desc: "Plus qu'une couleur, une religion." },
                    { title: "Casser", desc: "Notre sport national favori." },
                    { title: "Le Spot", desc: "L'INSA, c'est notre Nice à nous." }
                ].map((item, idx) => (
                    <div key={idx} className="vintage-card p-4 rounded-2xl rotate-1 hover:rotate-0 transition-transform">
                        <h3 className="font-black text-amber-900 uppercase italic">{item.title}</h3>
                        <p className="text-xs text-amber-700">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}