interface ToastProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    return (
        <div className={`fixed bottom-5 right-5 z-[100] p-4 rounded-2xl shadow-2xl border-2 flex items-center gap-3 animate-in slide-in-from-right-10 duration-300 ${type === "success" ? "bg-cyan-500 border-cyan-700 text-white" : "bg-red-500 border-red-700 text-white"
            }`}>
            <span className="text-xl">{type === "success" ? "🏄‍♂️" : "❌"}</span>
            <p className="font-bold italic uppercase text-sm tracking-tight">{message}</p>
            <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100">✕</button>
        </div>
    );
}