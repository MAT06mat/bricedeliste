import { useCallback, useEffect, useState } from "react";
import sosData from "../data/sos_list.json";
import { Link } from "react-router";
import { apiService } from "../services/api";
import Toast from "../components/Toast";

export default function OrderForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        targetName: "",
        targetRoom: "",
        sosId: "",
        desc: "",
        day: "",
        time: "",
    });

    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const currentHour = today.getHours();

    const getDayOfWeek = useCallback((dateStr: string) => {
        if (!dateStr) return -1;
        return new Date(dateStr).getDay();
    }, []);

    const getAvailableSlots = useCallback(
        (dateStr: string) => {
            const day = getDayOfWeek(dateStr);
            if (day === 0 || day === 6) return [];
            if (day === 5) return ["7h-8h"];
            return ["7h-8h", "12h-14h", "18h-21h"];
        },
        [getDayOfWeek],
    );

    const isSlotDisabled = useCallback(
        (slot: string, selectedDate: string) => {
            if (selectedDate !== todayStr) return false;
            const slotEndHour = parseInt(slot.split("-")[1].split("h")[0]);
            return currentHour >= slotEndHour;
        },
        [todayStr, currentHour],
    );

    const showToast = (
        message: string,
        type: "success" | "error" = "success",
    ) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    useEffect(() => {
        if (formData.day) {
            const day = getDayOfWeek(formData.day);

            if (day === 0 || day === 6) {
                setTimeout(() => {
                    setFormData((prev) => ({ ...prev, day: "" }));
                    showToast(
                        "Le surf est interdit le week-end, les Brices se reposent !",
                        "error",
                    );
                }, 0);
                return;
            }

            const available = getAvailableSlots(formData.day);
            if (formData.time && !available.includes(formData.time)) {
                setTimeout(
                    () => setFormData((prev) => ({ ...prev, time: "" })),
                    0,
                );
            }

            if (formData.time && isSlotDisabled(formData.time, formData.day)) {
                setTimeout(
                    () => setFormData((prev) => ({ ...prev, time: "" })),
                    0,
                );
            }
        }
    }, [
        formData.day,
        formData.time,
        todayStr,
        currentHour,
        getAvailableSlots,
        isSlotDisabled,
        getDayOfWeek,
    ]);

    const validateEmail = (email: string) => {
        const regex = /^[a-z0-9._%+-]+\.[a-z0-9._%+-]+@insa-lyon\.fr$/i;
        return regex.test(email);
    };

    const validateRoom = (room: string) => {
        const regex = /^[A-K]\d\d\d$/i;
        return regex.test(room);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            showToast(
                "Format d'email invalide ! Utilise prenom.nom@insa-lyon.fr",
                "error",
            );
            return;
        }

        if (!validateRoom(formData.targetRoom)) {
            showToast(
                "Format de chambre invalide ! Utilise un numéro comme A007.",
                "error",
            );
            return;
        }

        if (!formData.day || !formData.time) {
            showToast("Choisis un jour et une heure pour la vague !", "error");
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
                        <span className="text-[10px]">(max 2 par jour)</span>
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
                className="max-w-xl mx-auto vintage-card p-4 pt-8 pb-6 md:p-8 rounded-3xl animate-in slide-in-from-bottom-8 duration-500"
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
                            Identité du surfeur
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

                    <div className="grid grid-cols-1 gap-3">
                        <label className="text-xs font-bold uppercase text-amber-700 ml-2">
                            La cible
                        </label>
                        <input
                            type="text"
                            placeholder="Prénom & Nom de la cible"
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
                            placeholder="Chambre ex: A007"
                            required
                            className="bg-white/50 border-2 border-amber-200 p-3 rounded-2xl outline-none focus:border-brice-yellow"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    targetRoom: e.target.value
                                        .replace(/\s+/g, "")
                                        .toUpperCase(), // Remove spaces and create uppercase
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
                        {sosData.find((sos) => sos.id === formData.sosId)
                            ?.textOnSelect && (
                            <div className="p-3 bg-amber-100 border-l-4 border-amber-400 text-amber-800 italic text-sm rounded-xl mt-2 mb-5">
                                {
                                    sosData.find(
                                        (sos) => sos.id === formData.sosId,
                                    )?.textOnSelect
                                }
                            </div>
                        )}
                    </div>

                    <textarea
                        placeholder="Précisions pour la mise en scène..."
                        className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-2xl outline-none focus:border-brice-yellow min-h-[100px]"
                        onChange={(e) =>
                            setFormData({ ...formData, desc: e.target.value })
                        }
                    />

                    {/* --- CUSTOM DATE & TIME PICKER --- */}
                    <label className="text-xs font-bold uppercase text-amber-700 ml-2">
                        Quand est-ce qu'on casse ?
                        <span className="w-max text-nowrap text-[9px] text-amber-600 italic ml-2">
                            * Hors week-end
                        </span>
                    </label>

                    <div className="grid grid-cols-1 gap-4">
                        {/* Day Selection */}
                        <div className="flex gap-1">
                            <input
                                type="date"
                                required
                                min={todayStr}
                                max="2026-12-31"
                                value={formData.day}
                                className="w-full bg-white border-2 border-amber-200 p-2 rounded-xl outline-none focus:border-brice-yellow text-amber-900 font-bold cursor-pointer"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        day: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Time Selection Slots */}
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap justify-between gap-2">
                                {formData.day &&
                                    getAvailableSlots(formData.day).map(
                                        (slot) => {
                                            const disabled = isSlotDisabled(
                                                slot,
                                                formData.day,
                                            );
                                            return (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    disabled={disabled}
                                                    onClick={() =>
                                                        setFormData({
                                                            ...formData,
                                                            time: slot,
                                                        })
                                                    }
                                                    className={`flex-1 min-w-[80px] py-2 rounded-xl font-black transition-all border-2 text-[10px] uppercase ${
                                                        formData.time === slot
                                                            ? "bg-amber-900 text-brice-yellow border-amber-900"
                                                            : disabled
                                                              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                                                              : "bg-white border-amber-200 text-amber-700 hover:border-brice-yellow"
                                                    }`}
                                                >
                                                    {slot}
                                                </button>
                                            );
                                        },
                                    )}
                            </div>
                            {getDayOfWeek(formData.day) === 5 && (
                                <span className="text-[9px] text-cyan-600 font-bold italic ml-1">
                                    Vendredi : Créneau unique du matin !
                                </span>
                            )}
                        </div>
                    </div>

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
