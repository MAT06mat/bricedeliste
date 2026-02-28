import sosData from "../data/sos_list.json";
import SosCard from "../components/SosCard";
import { Link } from "react-router";
import { useFullFeatureEnabled } from "../data/var";
import Unavailable from "./Unavailable";
import Container from "../components/Container";

export default function SosList() {
    const isFullFeatureAnable = useFullFeatureEnabled();

    if (!isFullFeatureAnable) return <Unavailable />;

    return (
        <Container className="max-w-6xl">
            {/* Header de la page */}
            <div className="text-center mb-16 relative">
                <h1 className="text-5xl md:text-7xl font-black italic text-amber-900 uppercase tracking-tighter drop-shadow-sm">
                    Le Catalogue{" "}
                    <span className="text-white text-stroke">du Surf</span>
                </h1>
                <p className="text-amber-800 font-bold uppercase text-sm mt-4 tracking-[0.3em]">
                    Choisis ta vague, on s'occupe du reste !
                </p>
                <div className="h-2 w-48 bg-brice-yellow mx-auto mt-6 rounded-full shadow-inner"></div>
            </div>

            {/* Section Teaser Vidéo */}
            <div className="vintage-card p-1 md:p-8 max-w-4xl mx-auto rounded-[40px] overflow-hidden mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white/50 rounded-[32px] p-6 md:p-10 border-2 border-dashed border-amber-900/20">
                    <h2 className="text-3xl font-black mb-4 text-amber-900 italic uppercase">
                        Le Teaser qui casse tout ! 🏄‍♂️
                    </h2>

                    <p className="mb-8 text-lg text-amber-800 font-medium leading-relaxed">
                        Préparez vos planches et votre meilleur fart ! Avant de
                        lancer vos vagues, jetez un œil à notre teaser officiel.
                        Une petite dose de jaune et de fun ! Ici, on n'attend
                        pas la vague, on devient la vague.
                    </p>

                    {/* Video Container */}
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-brice-yellow rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/ChmVrKI2BMM"
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

            {/* Séparateur visuel avant la grille */}
            <div className="text-center pb-10">
                <h2 className="text-2xl font-black text-amber-900 uppercase italic">
                    — Faites votre choix —
                </h2>
            </div>

            {/* Grille de SOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {sosData.map((sos, index) => (
                    <Link
                        key={index}
                        to={`/commander?id=${sos.id}`}
                        className="h-full"
                    >
                        <SosCard sos={sos} index={index} />
                    </Link>
                ))}
            </div>
        </Container>
    );
}
