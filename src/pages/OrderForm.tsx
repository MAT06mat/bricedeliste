import { useState } from "react";
import sosData from "../data/sos_list.json";
import { Link } from "react-router";
import { apiService } from "../services/api";
import Toast from "../components/Toast";

export default function OrderForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        group: "",
        targetName: "",
        targetRoom: "",
        sosId: "",
        desc: "",
    });

    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);
    const showToast = (
        message: string,
        type: "success" | "error" = "success"
    ) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const validateEmail = (email: string) => {
        const regex = /^[a-z0-9._%+-]+\.[a-z0-9._%+-]+@insa-lyon\.fr$/i;
        return regex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            showToast(
                "Format d'email invalide ! Utilise prenom.nom@insa-lyon.fr",
                "error"
            );
            return;
        }

        try {
            await apiService.createOrder(formData);
            setIsSubmitted(true);
        } catch (err: unknown) {
            let errorMessage = "Le surf a échoué, réessaie !";

            if (err instanceof Error) {
                errorMessage = err.message;
            }

            showToast(errorMessage, "error");
        }
    };

    if (isSubmitted) {
        return (
            <div
                key="1"
                className="max-w-xl mx-auto mt-5 text-center animate-in zoom-in duration-300"
            >
                <div className="vintage-card p-12 rounded-[40px] border-b-8 border-brice-yellow">
                    <h2 className="text-6xl mb-6 font-black italic text-amber-900 leading-tight">
                        CASSÉ !
                    </h2>
                    <p className="text-xl text-amber-800 mb-8 font-medium">
                        Ta commande de SOS a bien été enregistrée. Prépare le
                        popcorn, ça va surfer sur la cible.
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-brice-yellow text-amber-900 font-black px-8 py-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform"
                    >
                        ENVOYER UN AUTRE SOS{" "}
                        <span className="text-[10px]">(max 2/pers.)</span>
                    </button>
                    <div className="mt-6">
                        <Link
                            to="/"
                            className="text-amber-600 underline text-sm italic"
                        >
                            Retourner à la plage
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div
                key="2"
                className="max-w-xl mx-auto vintage-card p-8 rounded-3xl animate-in slide-in-from-bottom-8 duration-500"
            >
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-black text-amber-900 italic uppercase">
                        Lancer un SOS
                    </h2>
                    <div className="h-1 w-24 bg-brice-yellow mx-auto mt-2"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-amber-700 ml-2">
                            Identité du surfeur (Toi)
                        </label>
                        <input
                            type="email"
                            placeholder="Ton email @insa-lyon.fr"
                            required
                            className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-2xl focus:border-brice-yellow outline-none transition-all shadow-inner"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value.trim(),
                                })
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="Nom"
                            required
                            className="bg-white/50 border-2 border-amber-200 p-3 rounded-2xl outline-none focus:border-brice-yellow"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Groupe"
                            required
                            className="bg-white/50 border-2 border-amber-200 p-3 rounded-2xl outline-none focus:border-brice-yellow"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    group: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t-2 border-dashed border-amber-200"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase font-black text-amber-400 bg-sand px-2">
                            La Cible
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <input
                            type="text"
                            placeholder="Nom & Prénom de la cible"
                            required
                            className="bg-white/50 border-2 border-amber-200 p-3 rounded-2xl outline-none focus:border-brice-yellow"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    targetName: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Chambre / Bâtiment"
                            required
                            className="bg-white/50 border-2 border-amber-200 p-3 rounded-2xl outline-none focus:border-brice-yellow"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    targetRoom: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-amber-700 ml-2">
                            Type de SOS
                        </label>
                        <select
                            required
                            className="w-full bg-white border-2 border-amber-200 p-3 rounded-2xl outline-none focus:border-brice-yellow cursor-pointer"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    sosId: e.target.value,
                                })
                            }
                        >
                            <option value="">-- Choisis ton SOS --</option>
                            {sosData.map((sos) => (
                                <option key={sos.id} value={sos.id}>
                                    {sos.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <textarea
                        placeholder="Précisions pour la mise en scène..."
                        className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-2xl outline-none focus:border-brice-yellow min-h-[100px]"
                        onChange={(e) =>
                            setFormData({ ...formData, desc: e.target.value })
                        }
                    />

                    <button className="w-full bg-brice-yellow text-amber-900 font-black py-5 rounded-2xl shadow-[0_4px_0_0_#b49600] brice-button text-xl italic uppercase tracking-wider">
                        Envoyer la vague 🏄‍♂️
                    </button>
                </form>
            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
}
