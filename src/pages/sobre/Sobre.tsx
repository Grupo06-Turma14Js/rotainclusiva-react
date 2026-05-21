import {
  TargetIcon,
  EyeIcon,
  HeartIcon,
  ShieldCheckIcon,
  UsersIcon,
  LightbulbIcon,
  InfoIcon,
  WheelchairIcon,
} from "@phosphor-icons/react";



// Mock dos dados da equipe 
const team = [
  {
    name: "Kaio Morais",
    role: "Desenvolvedor",
    bio: "Apaixonado por tecnologia e inclusão social. Trabalha para tornar a mobilidade urbana acessível a todos.",
    avatar: "src/assets/Kaio_4.jpg",
  },
  {
    name: "Isabela Siqueira",
    role: "Desenvolvadora",
    bio: "Desenvolvedora frontend apaixonada por interfaces modernas e experiências acessíveis. Une design, tecnologia e propósito em cada projeto.",
    avatar: "src/assets/Isabela_5.jpg",
  },
  {
    name: "Marlon Panerari",
    role: "Desenvolvedor",
    bio: "Desenvolvedor de software com interesse em aplicações inteligentes e colaborativas. Atuo na construção de soluções escaláveis e inclusivas",
    avatar: "src/assets/Marlon_Panerari_4.jpg",
  },
  {
    name: "Alice Tolosa",
    role: "Desenvolvadora",
    bio: "Gestora de comunidades inclusivas. Coordena parcerias e operações com foco no impacto social.",
    avatar: "src/assets/Alice.jpg",
  },
];

export function Sobre() {
  return (
    <div className="min-h-screen bg-[#f4f6fb] pb-24 selection:bg-blue-500 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center px-4 pt-16 pb-20 sticky-0">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-brand-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100 mb-6 transition-transform duration-300 hover:scale-105 cursor-default">
          <InfoIcon size={14} weight="fill" />
          Sobre nós
        </div>
        <div className="ml-2 inline-flex items-center gap-2 bg-white/50 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-full text-slate-700 text-xs font-normal tracking-wide mb-6 transition-transform duration-300 hover:scale-105 cursor-default">
          <WheelchairIcon size={14} className="text-[#10B981]" weight="bold" />
          <span className="opacity-90">Mobilidade para todos</span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-dark mb-6 leading-tight">
          Transformando a mobilidade
          <br />
          {" "}
          <span className="bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block mt-1">
            em uma experiência inclusiva.
          </span>
        </h1>
        
        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          A Rota Inclusiva nasceu da vontade de conectar pessoas e eliminar
          barreiras na mobilidade urbana. Nossa missão é garantir que todos
          tenham acesso a transporte seguro, acessível e acolhedor.
        </p>
      </section>

      {/* 2. MISSÃO & VISÃO */}
      <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 mb-24">
        {/* Card Missão */}
        <div className="group bg-white p-8 md:p-10 rounded-3xl shadow-xs border border-slate-100/80 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-xl hover:border-blue-200/60">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-blue-100">
            <TargetIcon size={24} weight="bold" />
          </div>
          <h2 className="text-xl font-bold text-brand-dark mb-4 transition-colors duration-300 group-hover:text-blue-600">
            Nossa Missão
          </h2>
          <p className="text-slate-500 leading-relaxed text-sm md:text-base">
            Democratizar o acesso à mobilidade urbana para pessoas com
            deficiência, idosos e todos que precisam de transporte acessível.
            Conectamos passageiros a motoristas voluntários e recursos de
            acessibilidade em suas cidades.
          </p>
        </div>

        {/* Card Visão */}
        <div className="group bg-white p-8 md:p-10 rounded-3xl shadow-xs border border-slate-100/80 transition-all duration-500 ease-out hover:-translate-y-1.5over:scale-[1.01] hover:shadow-xl hover:border-emerald-200/60">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-secondary flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 group-hover:bg-emerald-100">
            <EyeIcon size={24} weight="bold" />
          </div>
          <h2 className="text-xl font-bold text-brand-dark mb-4 transition-colors duration-300 group-hover:text-emerald-600">
            Nossa Visão
          </h2>
          <p className="text-slate-500 leading-relaxed text-sm md:text-base">
            Ser a principal plataforma de mobilidade inclusiva da América
            Latina, tornando as cidades mais acessíveis e conectadas. Queremos
            um futuro onde ninguém é deixado para trás por barreiras de
            transporte.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent mb-20" />

      {/* 3. NOSSOS VALORES */}
      <section className="max-w-7xl mx-auto px-4 mb-28">
        <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">
          Nossos Valores
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Inclusão */}
          <div className="group bg-white p-6 rounded-2xl border border-slate-100 text-center transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-rose-200/50">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:bg-rose-100 group-hover:rotate-12">
              <HeartIcon size={20} weight="fill" />
            </div>
            <h3 className="font-bold text-brand-dark mb-2 transition-colors duration-300 group-hover:text-rose-600">Inclusão</h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              Acreditamos que todos merecem mobilidade com dignidade e
              acessibilidade.
            </p>
          </div>

          {/* Segurança */}
          <div className="group bg-white p-6 rounded-2xl border border-slate-100 text-center transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-blue-200/50">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-100 group-hover:-rotate-12">
              <ShieldCheckIcon size={20} weight="fill" />
            </div>
            <h3 className="font-bold text-brand-dark mb-2 transition-colors duration-300 group-hover:text-blue-600">Segurança</h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              Priorizamos a segurança de todos os usuários em cada viagem
              compartilhada.
            </p>
          </div>

          {/* Comunidade */}
          <div className="group bg-white p-6 rounded-2xl border border-slate-100 text-center transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-amber-200/50">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-100 group-hover:rotate-12">
              <UsersIcon size={20} weight="fill" />
            </div>
            <h3 className="font-bold text-brand-dark mb-2 transition-colors duration-300 group-hover:text-amber-600">Comunidade</h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              Construímos uma rede solidária de motoristas e passageiros
              inclusivos.
            </p>
          </div>

          {/* Inovação */}
          <div className="group bg-white p-6 rounded-2xl border border-slate-100 text-center transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-purple-200/50">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:bg-purple-100 group-hover:-rotate-12">
              <LightbulbIcon size={20} weight="fill" />
            </div>
            <h3 className="font-bold text-brand-dark mb-2 transition-colors duration-300 group-hover:text-purple-600">Inovação</h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              Usamos tecnologia para criar soluções inteligentes de mobilidade
              urbana.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent mb-20" />

      {/* 4. NOSSA EQUIPE */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-brand-dark mb-14">
          Nossa Equipe
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-xs transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-blue-100"
            >
              <div className="w-24 h-24 rounded-full bg-slate-50 mb-4 overflow-hidden border-2 border-slate-100 p-1 transition-colors duration-500 group-hover:border-blue-400">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <h3 className="font-bold text-brand-dark text-lg mb-1 transition-colors duration-300 group-hover:text-blue-600">
                {member.name}
              </h3>
              <p className="text-xs font-semibold text-brand-primary mb-4 uppercase tracking-wider">
                {member.role}
              </p>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-auto">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}