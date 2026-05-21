import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { X, MapPin, Timer } from '@phosphor-icons/react';
import { getAcessibilidades } from '../../services/Api';

interface Acessibilidade {
  id: number;
  tipo: string;
}

interface Carona {
  id: number;
  origem: string;
  destino: string;
  distancia: number;
  velocidade: number;
  acessibilidade?: { id: number };
}

interface EditarCaronaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSalvar: (dados: any) => void;
  carona: Carona | null;
}

interface FormData {
  origem: string;
  destino: string;
  distancia: number;
  velocidade: number;
  acessibilidadeId: number;
}

export default function EditarCaronaModal({ isOpen, onClose, onSalvar, carona }: EditarCaronaModalProps) {
  const [form, setForm] = useState<FormData>({
    origem: '',
    destino: '',
    distancia: 0,
    velocidade: 0,
    acessibilidadeId: 0,
  });

  const [acessibilidades, setAcessibilidades] = useState<Acessibilidade[]>([]);
  const [loadingAcess, setLoadingAcess] = useState(false);

  useEffect(() => {
    if (carona) {
      setForm({
        origem: carona.origem || '',
        destino: carona.destino || '',
        distancia: carona.distancia || 0,
        velocidade: carona.velocidade || 0,
        acessibilidadeId: carona.acessibilidade?.id || 0,
      });
    }
  }, [carona]);

  useEffect(() => {
    if (!isOpen) return;
    setLoadingAcess(true);
    getAcessibilidades()
      .then((data) => setAcessibilidades(data))
      .catch(() => setAcessibilidades([]))
      .finally(() => setLoadingAcess(false));
  }, [isOpen]);

  if (!isOpen || !carona) return null;

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'origem' || name === 'destino' ? value : Number(value),
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSalvar({
      id: carona!.id,
      origem: form.origem,
      destino: form.destino,
      distancia: form.distancia,
      velocidade: form.velocidade,
      acessibilidade: { id: form.acessibilidadeId },
      usuario: { id: 1 },
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-[#1E293B]">Editar Carona</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Origem + Destino */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Origem</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text" name="origem" value={form.origem}
                  onChange={handleChange} required
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Destino</label>
              <div className="relative">
                <MapPin size={16} weight="fill" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#10B981]" />
                <input
                  type="text" name="destino" value={form.destino}
                  onChange={handleChange} required
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Distância + Velocidade */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Distância (km)</label>
              <div className="relative">
                <Timer size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="number" name="distancia" value={form.distancia}
                  onChange={handleChange} required min={1}
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Velocidade (km/h)</label>
              <div className="relative">
                <Timer size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="number" name="velocidade" value={form.velocidade}
                  onChange={handleChange} required min={1}
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Acessibilidade */}
          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1">Acessibilidade</label>
            <select
              name="acessibilidadeId"
              value={form.acessibilidadeId}
              onChange={handleChange}
              required
              disabled={loadingAcess}
              className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] bg-white disabled:opacity-50"
            >
              <option value={0} disabled>
                {loadingAcess ? 'Carregando...' : 'Selecione o tipo de acessibilidade'}
              </option>
              {acessibilidades.map((a) => (
                <option key={a.id} value={a.id}>{a.tipo}</option>
              ))}
            </select>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <button
              type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#64748B] hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg text-sm font-medium transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}