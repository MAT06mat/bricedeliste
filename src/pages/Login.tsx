import { useState } from "react";
import Toast from "../components/Toast";

export default function Login() {
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    return (
        <div className="px-4 w-full">
            <div className="max-w-md mx-auto vintage-card p-6 md:p-10 rounded-3xl mt-10 md:mt-20 border-t-8 border-brice-yellow">
                <h2 className="text-2xl md:text-3xl font-black mb-8 text-amber-900 italic text-center">
                    PLAGE PRIVÉE
                    <br />
                    (plus disponible...)
                </h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-xl outline-none focus:border-brice-yellow"
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-xl outline-none focus:border-brice-yellow"
                    />
                    <button className="w-full bg-brice-yellow text-amber-900 font-black py-4 rounded-xl shadow-[0_4px_0_0_#b49600] brice-button">
                        SE CONNECTER
                    </button>
                </div>
            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
