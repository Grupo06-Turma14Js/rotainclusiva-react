import { useState } from "react";
import {
    MapPinIcon,
    NavigationArrowIcon,
    ArrowsLeftRightIcon,
    TimerIcon,
    ClockIcon,
    PathIcon,
    ArrowRightIcon,
} from "@phosphor-icons/react";
import { ClipLoader } from "react-spinners";

interface RouteResult {
    duration: string;
    distance: string;
    mode: string;
}

export default function CalcularTempo() {
    const [origem, setOrigem] = useState("");
    const [destino, setDestino] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<RouteResult | null>(null);
    const [error, setError] = useState("");

    const handleSwap = () => {
        setOrigem(destino);
        setDestino(origem);
        setResult(null);
    };

    const handleCalcular = async () => {
        if (!origem.trim() || !destino.trim()) {
            setError("Preencha os campos de origem e destino.");
            return;
        }
        setError("");
        setResult(null);
        setLoading(true);

        try {
            await new Promise((r) => setTimeout(r, 1500));
            setResult({
                duration: "42 minutos",
                distance: "18,3 km",
                mode: "Rota acessível",
            });
        } catch (err) {
            setError("Não foi possível calcular a rota. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f6fb] flex flex-col items-center justify-start px-4 py-6 pt-12">
            <div className="text-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0f1624] tracking-tight">
                    Calcular Tempo de Viagem
                </h1>
                <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                    Informe origem e destino para calcular o tempo estimado da sua rota.
                </p>
            </div>

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">

                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Origem
                        </label>
                        <div className="relative">
                            <MapPinIcon
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                value={origem}
                                onChange={(e) => {
                                    setOrigem(e.target.value);
                                    setResult(null);
                                }}
                                placeholder="Ex: Avenida Paulista, SP"
                                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSwap}
                        className="self-center sm:mb-0 p-2.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 text-gray-500 hover:text-blue-600 transition-all duration-150 shrink-0"
                        aria-label="Inverter origem e destino"
                    >
                        <ArrowsLeftRightIcon size={18} />
                    </button>

                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Destino
                        </label>
                        <div className="relative">
                            <NavigationArrowIcon
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"
                            />
                            <input
                                type="text"
                                value={destino}
                                onChange={(e) => {
                                    setDestino(e.target.value);
                                    setResult(null);
                                }}
                                placeholder="Ex: Pinheiros, SP"
                                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <p className="mt-3 text-sm text-red-500 font-medium">{error}</p>
                )}

                <button
                    onClick={handleCalcular}
                    disabled={loading}
                    className="mt-5 flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold transition-all duration-150 shadow-sm"
                >
                    {loading ? (
                        <ClipLoader size={16} color="#fff" />
                    ) : (
                        <TimerIcon size={18} weight="bold" />
                    )}
                    {loading ? "Calculando..." : "Calcular Tempo"}
                </button>

                {result && (
                    <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                                <ClockIcon size={20} weight="bold" />
                            </div>
                            <div>
                                <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider">
                                    Tempo estimado
                                </p>
                                <p className="text-2xl font-bold text-[#0f1624]">
                                    {result.duration}
                                </p>
                            </div>
                        </div>

                        <div className="h-px sm:h-10 bg-blue-200 w-full sm:w-auto" />

                        <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                <PathIcon size={20} weight="bold" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                    Distância
                                </p>
                                <p className="text-2xl font-bold text-[#0f1624]">
                                    {result.distance}
                                </p>
                            </div>
                        </div>

                        <div className="h-px sm:h-10 bg-blue-200 w-full sm:w-auto" />

                        <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
                            <ArrowRightIcon size={16} />
                            {result.mode}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}