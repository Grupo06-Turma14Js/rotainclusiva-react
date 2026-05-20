import {Car, Wheelchair, Clock, ArrowRight,Sparkle,} from "@phosphor-icons/react";
import bgImage from "../assets/background.jpg";

export default function Home() {
  // Dados dos cards da seção "O que oferecemos"
  const features = [
    {
      icon: <Car size={28} weight="duotone" />,
      title: "Caronas Inclusivas",
      description:
        "Motoristas e passageiros conectados em uma rede solidária com total suporte e veículos adaptados às suas necessidades específicas.",
    },
    {
      icon: <Wheelchair size={28} weight="duotone" />,
      title: "Mapeamento de Acessibilidade",
      description:
        "Explore recursos, rampas, elevadores e calçadas adequadas em tempo real através do feedback ativo de nossa própria comunidade.",
    },
    {
      icon: <Clock size={28} weight="duotone" />,
      title: "Tempo de Viagem Inteligente",
      description:
        "Algoritmos avançados que calculam trajetos preditivos baseados em modais acessíveis, evitando barreiras físicas urbanas.",
    },
  ];

  return (
    
    <main className="animate-fadeIn bg-[#f4f6fb]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100vh] md:min-h-[85vh] lg:min-h-screen flex items-center bg-[#1E293B] pt-20 overflow-hidden">
        {/* Imagem de Fundo Limpa */}
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-right lg:bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/95 via-[#1E293B]/75 sm:via-[#1E293B]/60 to-[#1E293B]/30 md:to-transparent z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 py-12 md:py-20">
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-white text-xs font-normal tracking-wide mb-6">
              <Wheelchair size={14} className="text-[#10B981]" weight="bold" />
              <span className="opacity-90">Mobilidade para todos</span>
            </div>

            {/* Título Principal */}
            <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Conectando pessoas
              <br />
              através da{" "}
              <span className="text-[#10B981]">mobilidade acessível.</span>
            </h1>

            {/* Descrição */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light max-w-xl leading-relaxed mb-10 opacity-90">
              Encontre caronas inclusivas, descubra recursos de acessibilidade e
              calcule rotas pensadas para todos. Uma plataforma que une
              tecnologia e inclusão.
            </p>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button className="flex items-center justify-center gap-2 bg-[#2563EB] text-white px-6 py-3.5 rounded-xl font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.01] transition-all cursor-pointer">
                <Car size={18} weight="bold" />
                Ver Caronas
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3.5 rounded-xl font-medium hover:bg-white/20 hover:scale-[1.01] transition-all cursor-pointer">
                <Wheelchair size={18} weight="bold" />
                Recursos de Acessibilidade
              </button>
            </div>
          </div>
        </div>

        {/* Indicador de Scroll */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 animate-bounce hidden md:block z-20">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/*2. SEÇÃO "O QUE OFERECEMOS" */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E293B] sm:text-4xl mb-4">
            O que oferecemos
          </h2>
          <p className="text-slate-500 font-light text-sm sm:text-base">
            Soluções desenhadas de ponta a ponta para mitigar os gargalos de
            mobilidade e democratizar o direito de ir e vir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-[#2563EB] mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">
                {feat.title}
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                {feat.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-blue-700 transition-colors"
              >
                Saiba mais
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SEÇÃO DE ESTATÍSTICAS */}
      <section className="bg-gradient-to-r from-[#2563EB] to-blue-700 py-16 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="text-center p-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
                2.500+
              </div>
              <div className="text-blue-100 text-sm sm:text-base font-light tracking-wide">
                Usuários Ativos
              </div>
            </div>

            <div className="text-center p-4 pt-8 md:pt-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
                1.200+
              </div>
              <div className="text-blue-100 text-sm sm:text-base font-light tracking-wide">
                Caronas Realizadas
              </div>
            </div>

            <div className="text-center p-4 pt-8 md:pt-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
                350+
              </div>
              <div className="text-blue-100 text-sm sm:text-base font-light tracking-wide">
                Pontos Mapeados
              </div>
            </div>

            <div className="text-center p-4 pt-8 md:pt-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
                98%
              </div>
              <div className="text-blue-100 text-sm sm:text-base font-light tracking-wide">
                Satisfação Geral
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto shadow-sm relative overflow-hidden">
          {/* Brilho sutil no fundo */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="w-12 h-12 bg-[#10B981]/10 text-[#10B981] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Sparkle size={24} weight="fill" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] tracking-tight mb-4">
              Pronto para transformar sua experiência urbana?
            </h2>

            <p className="text-slate-600 font-light text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Junte-se a milhares de cidadãos que estão construindo uma malha de
              transporte mais justa, colaborativa e acessível a todos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-[#10B981] text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-600 hover:scale-[1.02] transition-all cursor-pointer">
                Criar conta gratuita
              </button>
              <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-slate-50 hover:scale-[1.02] transition-all cursor-pointer">
                Conhecer o projeto
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
