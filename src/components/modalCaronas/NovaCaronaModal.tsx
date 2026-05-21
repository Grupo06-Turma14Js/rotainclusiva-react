import { useState, useEffect } from 'react'
import { X, MapPin, Ruler, Timer } from '@phosphor-icons/react'
import { getAcessibilidades } from '../../services/Api'

interface Acessibilidade {
  id: number
  tipo: string
}

interface NovaCaronaModalProps {
  isOpen: boolean
  onClose: () => void
  onSalvar: (dados: any) => void
}

interface FormData {
  origem: string
  destino: string
  distancia: number
  velocidade: number
  acessibilidadeId: number
}

const camposIniciais: FormData = {
  origem: '',
  destino: '',
  distancia: 0,
  velocidade: 0,
  acessibilidadeId: 0,
}

export default function NovaCaronaModal({
  isOpen,
  onClose,
  onSalvar,
}: NovaCaronaModalProps) {
  const [form, setForm] = useState<FormData>(camposIniciais)
  const [acessibilidades, setAcessibilidades] = useState<Acessibilidade[]>([])
  const [loadingAcess, setLoadingAcess] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setLoadingAcess(true)
    getAcessibilidades()
      .then((data) => setAcessibilidades(data))
      .catch(() => setAcessibilidades([]))
      .finally(() => setLoadingAcess(false))
  }, [isOpen])

  if (!isOpen) return null

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'distancia' ||
        name === 'velocidade' ||
        name === 'acessibilidadeId'
          ? Number(value)
          : value,
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSalvar({
      origem: form.origem,
      destino: form.destino,
      distancia: Number(form.distancia),
      velocidade: Number(form.velocidade),
      acessibilidade: { id: Number(form.acessibilidadeId) },
      usuario: { id: 1 },
    })
    setForm(camposIniciais)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-[#1E293B]">Nova Carona</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Origem */}
          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1">
              Origem
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />
              <input
                type="text"
                name="origem"
                value={form.origem}
                onChange={handleChange}
                required
                placeholder="Digite a origem"
                className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Destino */}
          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1">
              Destino
            </label>
            <div className="relative">
              <MapPin
                size={16}
                weight="fill"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#10B981]"
              />
              <input
                type="text"
                name="destino"
                value={form.destino}
                onChange={handleChange}
                required
                placeholder="Digite o destino"
                className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Distância + Velocidade */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">
                Distância (km)
              </label>
              <div className="relative">
                <Ruler
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type="number"
                  name="distancia"
                  value={form.distancia}
                  onChange={handleChange}
                  required
                  min={1}
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">
                Velocidade (km/h)
              </label>
              <div className="relative">
                <Timer
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type="number"
                  name="velocidade"
                  value={form.velocidade}
                  onChange={handleChange}
                  required
                  min={1}
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Acessibilidade */}
          <div>
            <label className="block text-xs font-medium text-[#64748B] mb-1">
              Acessibilidade
            </label>
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
                <option key={a.id} value={a.id}>
                  {a.tipo}
                </option>
              ))}
            </select>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#64748B]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg text-sm font-medium"
            >
              Criar Carona
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}