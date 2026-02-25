import sosData from "../data/sos_list.json";
import SosCard from "../components/SosCard";
import { Link } from "react-router";

export default function SosList() {
    return (
        <div className="max-w-6xl mx-auto px-4 animate-in fade-in duration-700">
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

            {/* Grille de SOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {sosData.map((sos, index) => (
                    <Link
                        key={index}
                        to={`/commander?id=${sos.id}`}
                        className="h-full"
                    >
                        <SosCard key={index} sos={sos} index={index} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
