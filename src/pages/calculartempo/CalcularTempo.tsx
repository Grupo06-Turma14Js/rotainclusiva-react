import { useState, useEffect } from "react";
import {
    MapPinIcon,
    NavigationArrowIcon,
    ArrowsLeftRightIcon,
    TimerIcon,
    ClockIcon,
    ArrowRightIcon,
} from "@phosphor-icons/react";
import { ClipLoader } from "react-spinners";
import { getCaronas, calcularTempoCarona } from "../../services/Api";

interface Carona {
    id: number;
    origem: string;
    destino: string;
    distancia: number;
    velocidade: number;
}

interface RouteResult {
    duration: string;
    origem: string;
    destino: string;
    distancia: number;
}

export default function CalcularTempo() {
    const [caronas, setCaronas] = useState<Carona[]>([]);
    const [caronaId, setCaronaId] = useState<number | null>(null);
    const [loadingCaronas, setLoadingCaronas] = useState(true);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<RouteResult | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getCaronas()
            .then((data) => setCaronas(data))
            .catch(() => setError("Erro ao carregar caronas."))
            .finally(() => setLoadingCaronas(false));
    }, []);

    const caronaSelecionada = caronas.find((c) => c.id === caronaId) ?? null;

    const handleCalcular = async () => {
        if (!caronaId) {
            setError("Selecione uma carona.");
            return;
        }
        setError("");
        setResult(null);
        setLoading(true);

        try {
            const data = await calcularTempoCarona(caronaId);
            setResult({
                duration: data.tempoEstimado,
                origem: caronaSelecionada!.origem,
                destino: caronaSelecionada!.destino,
                distancia: caronaSelecionada!.distancia,
            });
        } catch {
            setError("Não foi possível calcular o tempo. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f6fb] flex flex-col items-center justify-start px-4 py-6 pt-12">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0f1624] tracking-tight">
                    Calcular Tempo de Viagem
                </h1>
                <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                    Selecione uma carona para calcular o tempo estimado da rota.
                </p>
            </div>

            {/* Card */}
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 sm:p-8">

                {/* Selector */}
                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Carona
                    </label>
                    {loadingCaronas ? (
                        <div className="flex items-center gap-2 text-gray-400 text-sm py-3">
                            <ClipLoader size={14} color="#9ca3af" />
                            Carregando caronas...
                        </div>
                    ) : (
                        <select
                            value={caronaId ?? ""}
                            onChange={(e) => {
                                setCaronaId(Number(e.target.value) || null);
                                setResult(null);
                                setError("");
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                            <option value="">Selecione uma carona...</option>
                            {caronas.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.origem} → {c.destino} ({c.distancia} km)
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Preview origem → destino */}
                {caronaSelecionada && (
                    <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-2 flex-1 text-sm text-gray-600">
                            <MapPinIcon size={15} className="text-gray-400 shrink-0" />
                            {caronaSelecionada.origem}
                        </div>
                        <ArrowsLeftRightIcon size={16} className="text-gray-300 shrink-0" />
                        <div className="flex items-center gap-2 flex-1 text-sm text-gray-600">
                            <NavigationArrowIcon size={15} className="text-emerald-500 shrink-0" />
                            {caronaSelecionada.destino}
                        </div>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <p className="mb-3 text-sm text-red-500 font-medium">{error}</p>
                )}

                {/* Button */}
                <button
                    onClick={handleCalcular}
                    disabled={loading || !caronaId}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold transition-all duration-150 shadow-sm"
                >
                    {loading ? (
                        <ClipLoader size={16} color="#fff" />
                    ) : (
                        <TimerIcon size={18} weight="bold" />
                    )}
                    {loading ? "Calculando..." : "Calcular Tempo"}
                </button>

                {/* Result */}
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

                        <div className="h-px sm:h-10 bg-blue-200 w-full sm:w-px" />

                        <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                <ArrowRightIcon size={20} weight="bold" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                    Distância
                                </p>
                                <p className="text-2xl font-bold text-[#0f1624]">
                                    {result.distancia} km
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}