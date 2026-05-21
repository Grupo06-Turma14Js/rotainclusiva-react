// src/pages/CaronasPage.tsx

import { useEffect, useState } from 'react';

import { Plus } from '@phosphor-icons/react';

import { toast } from 'react-toastify';
import { api } from '../../services/Service';
import CaronaCard from '../../components/caronaCard/CaronaCard';
import NovaCaronaModal from '../../components/modalCaronas/NovaCaronaModal';
import EditarCaronaModal from '../../components/modalCaronas/EditarCaronaModal';
import ExcluirCaronaModal from '../../components/modalCaronas/ExcluirCarona';

interface Carona {
  id: number;
  origem: string;
  destino: string;
  distancia: number;
  velocidade: number;

  acessibilidade?: {
    id: number;
  };

  usuario?: {
    id: number;
    nome?: string;
  };
}

export default function CaronasPage() {

  const [caronas, setCaronas] = useState<Carona[]>([]);

  const [modalNova, setModalNova] = useState(false);

  const [modalEditar, setModalEditar] = useState<{
    open: boolean;
    carona: Carona | null;
  }>({
    open: false,
    carona: null,
  });

  const [modalExcluir, setModalExcluir] = useState<{
    open: boolean;
    carona: Carona | null;
  }>({
    open: false,
    carona: null,
  });

  useEffect(() => {
    buscarCaronas();
  }, []);

  async function buscarCaronas() {
    try {
      const response = await api.get('/caronas');

      setCaronas(response.data);

    } catch (error) {
      console.log(error);

      toast.error('Erro ao buscar caronas');
    }
  }

  async function handleCriar(dados: any) {
    try {

      await api.post('/caronas', dados);

      toast.success('Carona criada com sucesso!');

      buscarCaronas();

    } catch (error) {
      console.log(error);

      toast.error('Erro ao criar carona');
    }
  }

  async function handleEditar(dados: any) {
    try {

      await api.put('/caronas', dados);

      toast.success('Carona atualizada com sucesso!');

      buscarCaronas();

    } catch (error) {
      console.log(error);

      toast.error('Erro ao atualizar carona');
    }
  }

  async function handleExcluir(id: number) {
    try {

      await api.delete(`/caronas/${id}`);

      toast.success('Carona excluída com sucesso!');

      buscarCaronas();

    } catch (error) {
      console.log(error);

      toast.error('Erro ao excluir carona');
    }
  }

  async function calcularTempo(id: number) {
    try {

      const response = await api.get(
        `/caronas/${id}/calcular-tempo`
      );

      toast.info(
        `Tempo estimado: ${response.data.tempoEstimado}`
      );

    } catch (error) {
      console.log(error);

      toast.error('Erro ao calcular tempo');
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">

          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">
              Caronas Disponíveis
            </h1>

            <p className="text-sm text-[#64748B] mt-1">
              Encontre viagens compartilhadas com praticidade e segurança.
            </p>
          </div>

          <button
            onClick={() => setModalNova(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-medium rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Plus size={16} weight="bold" />

            Nova Carona
          </button>
        </div>

        {/* Lista */}
        {caronas.length === 0 ? (

          <div className="text-center py-24 text-[#94A3B8]">

            <p className="text-lg font-medium">
              Nenhuma carona disponível
            </p>

            <p className="text-sm mt-1">
              Clique em "Nova Carona" para adicionar uma.
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {caronas.map((carona) => (

              <CaronaCard
                key={carona.id}
                carona={carona}
                // Use any to avoid duplicate-type incompatibility between modules
                onEditar={(c: any) =>
                  setModalEditar({
                    open: true,
                    carona: c,
                  })
                }
                onExcluir={(c: any) =>
                  setModalExcluir({
                    open: true,
                    carona: c,
                  })
                }
                onCalcularTempo={calcularTempo}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal Nova */}
      <NovaCaronaModal
        isOpen={modalNova}
        onClose={() => setModalNova(false)}
        onSalvar={handleCriar}
      />
      <EditarCaronaModal
        isOpen={modalEditar.open}
        carona={modalEditar.carona}
        onClose={() =>
          setModalEditar({
            open: false,
            carona: null,
          })
        }
        onSalvar={handleEditar}
      />

      {/* Modal Excluir */}
      <ExcluirCaronaModal
        isOpen={modalExcluir.open}
        carona={modalExcluir.carona}
        onClose={() =>
          setModalExcluir({
            open: false,
            carona: null,
          })
        }
        onConfirmar={handleExcluir}
      />
    </div>
  );
}