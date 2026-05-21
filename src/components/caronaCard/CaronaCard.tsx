import { Gauge, PencilSimple, Timer, Trash } from "@phosphor-icons/react";


interface Carona {
  id: number;
  destino: string;
  distancia: number;
  velocidade: number;
}

interface CaronaCardProps {
  carona: Carona;
  onEditar: (carona: Carona) => void;
  onExcluir: (carona: Carona) => void;
  onCalcularTempo: (id: number) => void;
}

export default function CaronaCard({
  carona,
  onEditar,
  onExcluir,
  onCalcularTempo,
}: CaronaCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
      <div className="space-y-4">
        <div>
          <p className="text-[10px] text-[#94A3B8] leading-none mb-0.5">
            Destino
          </p>
          <p className="text-sm text-[#1E293B]">
            {carona.destino}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <Gauge size={15} className="text-[#94A3B8] mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-[#94A3B8] leading-none mb-0.5">
                Distância
              </p>
              <p className="text-sm font-medium text-[#1E293B]">
                {carona.distancia} km
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Timer size={15} className="text-[#94A3B8] mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-[#94A3B8] leading-none mb-0.5">
                Velocidade Média
              </p>
              <p className="text-sm font-medium text-[#1E293B]">
                {carona.velocidade} km/h
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#F1F5F9] my-4" />

      <div className="flex items-center justify-between">
        <div className="text-xs text-[#64748B]">
          ID #{carona.id}
        </div>

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

          <button
            onClick={() => onCalcularTempo(carona.id)}
            className="flex items-center gap-1.5 ml-1 px-3 py-1.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] rounded-lg text-xs font-medium transition-colors"
          >
            <Timer size={13} weight="fill" />
            Tempo
          </button>
        </div>
      </div>
    </div>
  );
}