import { PlayCircle } from '@phosphor-icons/react'

export default function TutorialCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">

        {/* Texto */}
        <div className="flex-1 space-y-4">

          <span className="inline-block text-2xl font-medium text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full">
            Tutorial
          </span>

          <h2 className="text-4xl font-bold text-[#1E293B] leading-snug">
            Como cadastrar recursos de acessibilidade
          </h2>

          <p className="text-2xl text-[#64748B] leading-relaxed">
            Assista ao vídeo e aprenda passo a passo como adicionar e gerenciar
            recursos acessíveis no Rota Inclusiva.
          </p>

        </div>

        {/* Vídeo */}
        <div className="w-full md:w-105 rounded-2xl overflow-hidden shadow-md">
          <video
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/amostra.mp4" type="video/mp4" />

            Seu navegador não suporta vídeo.
          </video>
        </div>
      </div>
    </div>
  )
}