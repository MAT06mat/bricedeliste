import { useEffect, useState } from "react";
import { release_date } from "../data/var";
import { getSyncedNow } from "../services/timeSync";

function Timer() {
    const calculateTimeLeft = () => {
        const difference = release_date.getTime() - getSyncedNow();
        return Math.max(0, difference);
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            const nextTime = calculateTimeLeft();
            setTimeLeft(nextTime);

            if (nextTime <= 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    if (timeLeft <= 0) {
        setTimeout(() => {
            window.location.reload();
        }, 3000);
        return (
            <div className="text-amber-700 mb-6 mt-6 font-black italic text-3xl animate-bounce uppercase">
                La vague est là ! 🌊
            </div>
        );
    }

    return (
        <div className="flex justify-center gap-2 md:gap-4 my-8">
            <TimeUnit value={days} label="Jours" />
            <TimeUnit value={hours} label="Heures" />
            <TimeUnit value={minutes} label="Min" />
            <TimeUnit value={seconds} label="Sec" />
        </div>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center group">
            <div className="bg-brice-yellow text-amber-900 w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-[0_6px_0_0_#b49600] group-hover:translate-y-1 group-hover:shadow-[0_2px_0_0_#b49600] transition-all duration-200">
                <span className="text-2xl md:text-4xl font-black italic">
                    {value.toString().padStart(2, "0")}
                </span>
            </div>
            <span className="text-[10px] md:text-xs font-black uppercase text-amber-700 mt-3 tracking-widest opacity-70">
                {label}
            </span>
        </div>
    );
}

export default Timer;
