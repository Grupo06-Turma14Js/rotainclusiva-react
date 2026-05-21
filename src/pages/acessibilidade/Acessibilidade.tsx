import { useEffect, useState } from "react";

import {
  getAcessibilidades,
  createAcessibilidade,
  updateAcessibilidade,
  deleteAcessibilidade,
} from "../../services/Api";

interface Acessibilidade {
  id: number;
  tipo: string;
  carona: string[];
}

export default function Acessibilidade() {
  const [items, setItems] = useState<Acessibilidade[]>([]);
  const [loading, setLoading] = useState(true);

  const [tipo, setTipo] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  // BUSCA
  const [search, setSearch] = useState("");

  // FILTRO
  const filteredItems = items.filter((item) =>
    item.tipo.toLowerCase().includes(search.toLowerCase()),
  );

  async function carregarDados() {
    try {
      const data = await getAcessibilidades();

      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  // ABRIR MODAL CRIAR
  function openCreate() {
    setEditingId(null);

    setTipo("");

    setModalOpen(true);
  }

  // ABRIR MODAL EDITAR
  function openEdit(item: Acessibilidade) {
    setEditingId(item.id);

    setTipo(item.tipo);

    setModalOpen(true);
  }

  // FECHAR MODAL
  function closeModal() {
    setModalOpen(false);

    setTipo("");

    setEditingId(null);
  }

  // SALVAR
  async function saveModal() {
    if (!tipo) return;

    try {
      // CREATE
      if (editingId === null) {
        await createAcessibilidade({
          tipo,
          carona: [],
        });
      } else {
        // UPDATE
        await updateAcessibilidade({
          id: editingId,
          tipo,
          carona: [],
        });
      }

      closeModal();

      carregarDados();
    } catch (error) {
      console.error(error);
    }
  }

  // DELETE
  async function handleDelete(id: number) {
    const confirmar = confirm("Deseja excluir essa acessibilidade?");

    if (!confirmar) return;

    try {
      await deleteAcessibilidade(id);

      carregarDados();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Carregando...
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7FB] min-h-screen px-14 py-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-5xl font-bold text-[#14213D]">
            Recursos de Acessibilidade
          </h1>

          <p className="text-[#64748B] mt-2 text-lg">
            Descubra e gerencie recursos acessíveis disponíveis na sua cidade.
          </p>
        </div>

        {/* SEARCH + BUTTON */}
        <div className="flex items-center gap-4">
          {/* INPUT BUSCA */}
          <input
            type="text"
            placeholder="Buscar acessibilidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-[320px]
              bg-white
              border
              border-gray-300
              rounded-2xl
              px-5
              py-4
              outline-none
              text-sm
              focus:border-[#00A86B]
              transition
            "
          />

          {/* BOTÃO */}
          <button
            onClick={openCreate}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-4
              rounded-2xl
              font-semibold
              shadow-sm
              transition
            "
          >
            + Nova Acessibilidade
          </button>
        </div>
      </div>

      <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
        <video
          autoPlay
          playsInline
          className="w-full"
        >
          <source src="/amostra.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="
              bg-white
              rounded-[28px]
              p-7
              shadow-sm
              border
              border-[#EEF2F7]
              hover:shadow-md
              transition
            "
          >
            {/* TOP */}
            <div className="flex items-start justify-between mb-6">
              {/* ICON */}
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[#E9FFF5]
                  flex
                  items-center
                  justify-center
                  text-2xl
                "
              >
                ♿
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 text-gray-400">
                {/* EDITAR */}
                <button
                  onClick={() => openEdit(item)}
                  className="
                    hover:text-blue-600
                    transition
                    p-2
                    rounded-xl
                    hover:bg-blue-50
                  "
                  title="Editar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                  </svg>
                </button>

                {/* EXCLUIR */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="
                    hover:text-red-500
                    transition
                    p-2
                    rounded-xl
                    hover:bg-red-50
                  "
                  title="Excluir"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            </div>

            {/* TAG */}
            <span
              className="
                inline-block
                bg-[#EEF2FF]
                text-[#4F46E5]
                text-xs
                px-3
                py-1
                rounded-full
                mb-5
                font-medium
              "
            >
              {item.tipo}
            </span>

            {/* TÍTULO */}
            <h2 className="text-[30px] font-bold text-[#0F172A] mb-4 leading-tight">
              {item.tipo}
            </h2>

            {/* DESCRIÇÃO FIXA */}
            <p className="text-[#64748B] leading-8 text-lg mb-8">
              Recurso de acessibilidade cadastrado no sistema para melhorar a
              mobilidade e inclusão urbana.
            </p>

            {/* CARONAS */}
            <div className="space-y-3 mb-6">
              {item.carona.length > 0 ? (
                item.carona.map((carona, index) => (
                  <div
                    key={index}
                    className="
                      bg-[#F8FAFC]
                      border
                      border-[#E2E8F0]
                      rounded-xl
                      px-4
                      py-3
                      text-[#334155]
                    "
                  >
                    🚗 {carona}
                  </div>
                ))
              ) : (
                <div className="text-[#94A3B8]">Nenhuma carona vinculada</div>
              )}
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-2 text-[#94A3B8] text-base">
              <span>📍</span>

              <span>São Paulo - Capital</span>
            </div>
          </div>
        ))}
      </div>

      {/* NÃO ENCONTRADO */}
      {filteredItems.length === 0 && (
        <div
          className="
            text-center
            text-[#64748B]
            mt-16
            text-xl
          "
        >
          Nenhuma acessibilidade encontrada.
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            z-50
          "
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="
              bg-white
              rounded-2xl
              p-8
              w-105
              max-w-[90vw]
              shadow-xl
              border
              border-[#EEF2F7]
            "
          >
            <h2 className="text-xl font-semibold text-[#14213D] mb-6">
              {editingId !== null
                ? "Editar Acessibilidade"
                : "Nova Acessibilidade"}
            </h2>

            {/* TIPO */}
            <label className="text-sm text-[#64748B] mb-2 block">
              Tipo de acessibilidade
            </label>

            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Ex: Piso Tátil"
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                mb-6
                outline-none
                text-sm
                focus:border-[#00A86B]
                transition
              "
            />

            {/* BOTÕES */}
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="
                  border
                  border-gray-300
                  text-gray-500
                  px-5
                  py-2
                  rounded-xl
                  text-sm
                  hover:bg-gray-50
                  transition
                "
              >
                Cancelar
              </button>

              <button
                onClick={saveModal}
                className="
                  bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-4
              rounded-2xl
              font-semibold
              shadow-sm
              transition
                "
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
