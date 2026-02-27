import { Link } from "react-router";

const SOCIAL_LINKS = [
    {
        name: "Instagram",
        handle: "@insa_bricedeliste",
        url: "https://instagram.com/insa_bricedeliste",
        color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600",
        icon: "📸",
        desc: "Pour les plus beaux couchers de soleil (et nos vannes).",
    },
    {
        name: "TikTok",
        handle: "@insa_bricedeliste",
        url: "https://tiktok.com/@insa_bricedeliste",
        color: "bg-black",
        icon: "📱",
        desc: "Les vagues en vidéo. Garanti 100% Cassé.",
    },
    {
        name: "BeReal",
        handle: "insa_bricedeliste",
        url: "https://bere.al/insa_bricedeliste",
        color: "bg-zinc-900",
        icon: "⚠️",
        desc: "Le surf sans filtre. Sois prêt à ramer.",
    },
];

export default function Socials() {
    return (
        <div className="vintage-card max-w-4xl mx-auto vintage-card p-8 md:p-10 rounded-[40px] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-black italic text-amber-900 uppercase tracking-tighter">
                    Le Spot{" "}
                    <span className="text-white text-stroke">Digital</span>
                </h1>
                <p className="text-amber-800 font-bold uppercase text-xs mt-4 tracking-[0.2em]">
                    Reste sur la vague, même en ligne.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SOCIAL_LINKS.map((social) => (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative ${social.color} p-1 rounded-[32px] transition-transform hover:scale-105 hover:-rotate-1`}
                    >
                        <div className="bg-white rounded-[30px] p-6 h-full flex flex-col items-center justify-between text-center space-y-4">
                            <span className="text-5xl group-hover:animate-bounce">
                                {social.icon}
                            </span>
                            <div>
                                <h3 className="text-2xl font-black italic text-amber-900 uppercase leading-none">
                                    {social.name}
                                </h3>
                                <p className="text-amber-600 font-mono text-sm font-bold mt-1">
                                    {social.handle}
                                </p>
                            </div>
                            <p className="text-amber-800/60 text-xs font-medium italic leading-tight">
                                {social.desc}
                            </p>
                            <div
                                className={`w-full py-2 rounded-xl font-black text-[10px] uppercase tracking-widest text-white ${social.color}`}
                            >
                                S'abonner
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center text-center gap-4">
                <Link
                    to="/"
                    className="w-full sm:w-auto bg-brice-yellow text-amber-900 font-black px-6 md:px-10 py-4 rounded-2xl shadow-[0_4px_0_0_#b49600] brice-button text-lg italic uppercase"
                >
                    Retourner au camp de base 🏄‍♂️
                </Link>
            </div>
        </div>
    );
}
