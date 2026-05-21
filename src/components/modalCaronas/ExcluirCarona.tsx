// src/components/ExcluirCaronaModal.tsx

import { Trash } from '@phosphor-icons/react';

interface Carona {
  id: number;
  origem: string;
  destino: string;
  usuario?: {
    nome?: string;
  };
}

interface ExcluirCaronaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmar: (id: number) => void;
  carona: Carona | null;
}

export default function ExcluirCaronaModal({
  isOpen,
  onClose,
  onConfirmar,
  carona,
}: ExcluirCaronaModalProps) {
  
  if (!isOpen || !carona) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 text-center">
        
        {/* Ícone */}
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto mb-4">
          <Trash
            size={26}
            weight="fill"
            className="text-[#EF4444]"
          />
        </div>

        {/* Título */}
        <h2 className="text-lg font-semibold text-[#1E293B] mb-2">
          Excluir Carona
        </h2>

        {/* Texto */}
        <p className="text-sm text-[#64748B] leading-relaxed mb-6">
          Tem certeza que deseja excluir a carona de{' '}
          <span className="font-medium text-[#1E293B]">
            {carona.usuario?.nome || 'Usuário'}
          </span>{' '}
          de{' '}
          <span className="font-medium text-[#1E293B]">
            {carona.origem}
          </span>{' '}
          para{' '}
          <span className="font-medium text-[#1E293B]">
            {carona.destino}
          </span>
          ? Essa ação não pode ser desfeita.
        </p>

        {/* Botões */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-[#E2E8F0] rounded-full text-sm font-medium text-[#64748B] hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              onConfirmar(carona.id);
              onClose();
            }}
            className="flex-1 py-2.5 bg-[#EF4444] hover:bg-red-600 text-white rounded-full text-sm font-medium transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}