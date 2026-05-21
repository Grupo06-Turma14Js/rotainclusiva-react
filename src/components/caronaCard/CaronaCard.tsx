import { useState, useEffect } from "react";
import { Gauge, PencilSimple, Timer, Trash, ArrowRight } from "@phosphor-icons/react";
import { ClipLoader } from "react-spinners";
import { calcularTempoCarona } from "../../services/Api";

interface Carona {
  id: number;
  origem: string;
  destino: string;
  distancia: number;
  velocidade: number;
  acessibilidade?: { id: number; tipo: string };
}

interface CaronaCardProps {
  carona: Carona;
  onEditar: (carona: Carona) => void;
  onExcluir: (carona: Carona) => void;
}

// ── Banner por palavra-chave ──
const BANNER_MAP = [
  {
    keywords: ["cão", "cao", "guia"],
    gradient: ["#d4a96a", "#8B5E3C"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <ellipse cx="22" cy="38" rx="14" ry="10" fill="white" fillOpacity="0.2"/>
        <circle cx="22" cy="24" r="8" fill="white" fillOpacity="0.25"/>
        <ellipse cx="16" cy="18" rx="3" ry="5" fill="white" fillOpacity="0.2"/>
        <ellipse cx="28" cy="18" rx="3" ry="5" fill="white" fillOpacity="0.2"/>
        <circle cx="20" cy="25" r="1.5" fill="white" fillOpacity="0.6"/>
        <circle cx="24" cy="25" r="1.5" fill="white" fillOpacity="0.6"/>
        <path d="M20 29 Q22 31 24 29" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
        <rect x="10" y="46" width="4" height="10" rx="2" fill="white" fillOpacity="0.2"/>
        <rect x="16" y="46" width="4" height="10" rx="2" fill="white" fillOpacity="0.2"/>
        <rect x="24" y="46" width="4" height="10" rx="2" fill="white" fillOpacity="0.2"/>
        <rect x="30" y="46" width="4" height="10" rx="2" fill="white" fillOpacity="0.2"/>
      </svg>
    ),
  },
  {
    keywords: ["banheiro", "sanitário", "sanitario"],
    gradient: ["#60a5fa", "#1d4ed8"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <rect x="12" y="28" width="40" height="24" rx="4" fill="white" fillOpacity="0.2"/>
        <rect x="18" y="20" width="12" height="10" rx="3" fill="white" fillOpacity="0.2"/>
        <circle cx="38" cy="16" r="5" fill="white" fillOpacity="0.25"/>
        <path d="M34 24 L38 44" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M38 30 L44 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M38 44 L32 56" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M38 44 L44 56" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <circle cx="20" cy="38" r="6" stroke="white" strokeWidth="2" strokeOpacity="0.4"/>
      </svg>
    ),
  },
  {
    keywords: ["transporte", "adaptado", "ônibus", "onibus"],
    gradient: ["#34d399", "#065f46"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <rect x="8" y="20" width="40" height="24" rx="5" fill="white" fillOpacity="0.2"/>
        <rect x="8" y="20" width="40" height="10" rx="5" fill="white" fillOpacity="0.15"/>
        <rect x="12" y="23" width="8" height="6" rx="1.5" fill="white" fillOpacity="0.35"/>
        <rect x="22" y="23" width="8" height="6" rx="1.5" fill="white" fillOpacity="0.35"/>
        <circle cx="16" cy="46" r="5" fill="white" fillOpacity="0.3"/>
        <circle cx="16" cy="46" r="2.5" fill="white" fillOpacity="0.5"/>
        <circle cx="40" cy="46" r="5" fill="white" fillOpacity="0.3"/>
        <circle cx="40" cy="46" r="2.5" fill="white" fillOpacity="0.5"/>
      </svg>
    ),
  },
  {
    keywords: ["rampa", "acesso", "inclinação", "inclinacao"],
    gradient: ["#f97316", "#7c2d12"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <path d="M8 52 L56 16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.35"/>
        <path d="M8 52 L56 52" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.2"/>
        <path d="M56 16 L56 52" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.2"/>
        <circle cx="44" cy="24" r="5" fill="white" fillOpacity="0.3"/>
        <path d="M40 30 L36 46" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M38 37 L44 34" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M36 46 L30 54" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M36 46 L42 54" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5"/>
      </svg>
    ),
  },
  {
    keywords: ["braile", "braille", "visual", "sinalização", "sinalizacao"],
    gradient: ["#a78bfa", "#4c1d95"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <circle cx="16" cy="20" r="4" fill="white" fillOpacity="0.5"/>
        <circle cx="28" cy="20" r="4" fill="white" fillOpacity="0.5"/>
        <circle cx="40" cy="20" r="4" fill="white" fillOpacity="0.2"/>
        <circle cx="16" cy="32" r="4" fill="white" fillOpacity="0.2"/>
        <circle cx="28" cy="32" r="4" fill="white" fillOpacity="0.5"/>
        <circle cx="40" cy="32" r="4" fill="white" fillOpacity="0.5"/>
        <circle cx="16" cy="44" r="4" fill="white" fillOpacity="0.5"/>
        <circle cx="28" cy="44" r="4" fill="white" fillOpacity="0.2"/>
        <circle cx="40" cy="44" r="4" fill="white" fillOpacity="0.5"/>
      </svg>
    ),
  },
  {
    keywords: ["elevador", "elevadores", "lift"],
    gradient: ["#64748b", "#1e293b"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <rect x="16" y="10" width="32" height="44" rx="4" stroke="white" strokeWidth="2" strokeOpacity="0.35"/>
        <rect x="22" y="16" width="8" height="14" rx="2" fill="white" fillOpacity="0.2"/>
        <rect x="34" y="16" width="8" height="14" rx="2" fill="white" fillOpacity="0.2"/>
        <path d="M32 20 L28 16 L36 16 Z" fill="white" fillOpacity="0.5"/>
        <path d="M32 42 L28 46 L36 46 Z" fill="white" fillOpacity="0.5"/>
        <rect x="22" y="36" width="20" height="12" rx="2" fill="white" fillOpacity="0.15"/>
        <circle cx="32" cy="42" r="3" fill="white" fillOpacity="0.4"/>
      </svg>
    ),
  },
];

const DEFAULT_BANNER = {
  gradient: ["#94a3b8", "#475569"],
  icon: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
      <circle cx="32" cy="32" r="18" stroke="white" strokeWidth="2" strokeOpacity="0.4"/>
      <circle cx="32" cy="32" r="4" fill="white" fillOpacity="0.5"/>
      <path d="M32 14 L32 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4"/>
      <path d="M32 44 L32 50" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4"/>
      <path d="M14 32 L20 32" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4"/>
      <path d="M44 32 L50 32" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4"/>
    </svg>
  ),
};

function getBanner(tipo?: string) {
  if (!tipo) return DEFAULT_BANNER;
  const lower = tipo.toLowerCase();
  return BANNER_MAP.find((b) => b.keywords.some((k) => lower.includes(k))) ?? DEFAULT_BANNER;
}

export default function CaronaCard({ carona, onEditar, onExcluir }: CaronaCardProps) {
  const [tempo, setTempo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const banner = getBanner(carona.acessibilidade?.tipo);

  useEffect(() => {
    calcularTempoCarona(carona.id)
      .then((data) => setTempo(data.tempoEstimado))
      .catch(() => setErro("Erro ao calcular tempo."))
      .finally(() => setLoading(false));
  }, [carona.id]);

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">

      {/* Banner */}
      <div
        className="relative h-24 flex items-center justify-between px-5 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${banner.gradient[0]}, ${banner.gradient[1]})` }}
      >
        <div className="absolute -top-5 -right-5 w-28 h-28 rounded-full bg-white opacity-5" />
        <div className="absolute -bottom-8 left-[30%] w-36 h-36 rounded-full bg-white opacity-5" />

        <div className="flex flex-col gap-0.5 z-10 min-w-0">
          <p className="text-[12px] uppercase tracking-wider font-medium text-white opacity-70">Carona</p>
          <div className="flex items-center gap-1.5">
            <span className="text-white font-semibold text-sm truncate max-w-20">{carona.origem}</span>
            <ArrowRight size={13} className="text-white opacity-70 shrink-0" />
            <span className="text-white font-semibold text-sm truncate max-w-20">{carona.destino}</span>
          </div>
          {carona.acessibilidade?.tipo && (
            <span className="text-[15px] text-white font-semibold truncate">{carona.acessibilidade.tipo}</span>
          )}
        </div>

        <div className="z-10 shrink-0">{banner.icon}</div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <Gauge size={15} className="text-[#94A3B8] shrink-0" />
            <div>
              <p className="text-[14px] text-[#94A3B8] leading-none mb-0.5">Distância</p>
              <p className="text-sm font-medium text-[#1E293B]">{carona.distancia} km</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Timer size={15} className="text-[#94A3B8] shrink-0" />
            <div>
              <p className="text-[14px] text-[#94A3B8] leading-none mb-0.5">Velocidade Média</p>
              <p className="text-sm font-medium text-[#1E293B]">{carona.velocidade} km/h</p>
            </div>
          </div>
        </div>

        <div className={`mt-3 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${
          erro ? "bg-red-50 text-red-500" : "bg-[#EFF6FF] text-[#2563EB]"
        }`}>
          {loading ? (
            <><ClipLoader size={11} color="#2563EB" /><span>Calculando tempo...</span></>
          ) : erro ? (
            erro
          ) : (
            <><Timer size={13} weight="fill" />Tempo estimado: <span className="font-bold">{tempo}</span></>
          )}
        </div>

        <div className="border-t border-[#F1F5F9] mt-4 pt-3 flex items-center justify-between">
          <span className="text-xs text-[#94A3B8]">#{carona.id}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEditar(carona)}
              className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#94A3B8] hover:text-[#64748B] transition-colors"
            >
              <PencilSimple size={15} />
            </button>
            <button
              onClick={() => onExcluir(carona)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-[#EF4444] transition-colors"
            >
              <Trash size={15} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}