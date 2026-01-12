import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { apiService } from "../services/api";
import Toast from "../components/Toast";
import { useNavigate } from "react-router";

export default function Login() {
    const [tempAuth, setTempAuth] = useState({ email: "", pass: "" });

    const { login, isLoggedIn, auth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    const showToast = (
        message: string,
        type: "success" | "error" = "success"
    ) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            let data = null;
            if (isLoggedIn) data = await apiService.getOrders(auth);
            else data = await apiService.getOrders(tempAuth);
            if (data && !isLoggedIn) login(tempAuth, data.super_admin);
            if (data) navigate("/admin");
        } catch {
            showToast("C'est cassé ! Vérifie tes accès.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="px-4 w-full">
            <div className="max-w-md mx-auto vintage-card p-6 md:p-10 rounded-3xl mt-10 md:mt-20 border-t-8 border-brice-yellow">
                <h2 className="text-2xl md:text-3xl font-black mb-8 text-amber-900 italic text-center">
                    PLAGE PRIVÉE
                </h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-xl outline-none focus:border-brice-yellow"
                        onChange={(e) =>
                            setTempAuth((tauth) => ({
                                ...tauth,
                                email: e.target.value,
                            }))
                        }
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        className="w-full bg-white/50 border-2 border-amber-200 p-3 rounded-xl outline-none focus:border-brice-yellow"
                        onChange={(e) =>
                            setTempAuth((tauth) => ({
                                ...tauth,
                                pass: e.target.value,
                            }))
                        }
                    />
                    <button
                        onClick={fetchOrders}
                        disabled={isLoading}
                        className="w-full bg-brice-yellow text-amber-900 font-black py-4 rounded-xl shadow-[0_4px_0_0_#b49600] brice-button"
                    >
                        {isLoading ? (
                            <span className="wave-anim italic">
                                En plein surf...
                            </span>
                        ) : (
                            "SE CONNECTER"
                        )}
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
