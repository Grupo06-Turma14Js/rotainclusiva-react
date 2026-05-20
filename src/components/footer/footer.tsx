import { Link } from "react-router-dom";
import {
    FacebookLogo,
    InstagramLogo,
    XLogo,
    LinkedinLogo,
    EnvelopeSimple,
    Phone,
    MapPin,
} from "@phosphor-icons/react";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Caronas", to: "/caronas" },
    { label: "Acessibilidades", to: "/acessibilidades" },
    { label: "Calcular Tempo", to: "/calcular-tempo" },
    { label: "Sobre", to: "/sobre" },
];

const resourceLinks = [
    { label: "Encontrar Caronas", to: "/caronas" },
    { label: "Mapa de Acessibilidade", to: "/acessibilidades/mapa" },
    { label: "Calcular Rota", to: "/calcular-tempo" },
];

const socialLinks = [
    { icon: FacebookLogo, href: "https://facebook.com", label: "Facebook" },
    { icon: InstagramLogo, href: "https://instagram.com", label: "Instagram" },
    { icon: XLogo, href: "https://x.com", label: "X" },
    { icon: LinkedinLogo, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="bg-[#0f1624] text-gray-300">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    <div className="flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-2 w-fit">
                            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg select-none">
                                ♿
                            </div>
                            <span className="font-semibold text-white text-base tracking-tight">
                                Rota Inclusiva
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-55">
                            Conectando pessoas através da mobilidade acessível. Um projeto
                            dedicado à inclusão urbana.
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-8 h-8 rounded-md border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>


                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
                            Navegação
                        </h3>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
                            Recursos
                        </h3>
                        <ul className="space-y-3">
                            {resourceLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
                            Contato
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <EnvelopeSimple size={15} className="shrink-0 text-gray-500" />
                                <a
                                    href="mailto:contato@rotainclusiva.com.br"
                                    className="hover:text-white transition-colors"
                                >
                                    contato@rotainclusiva.com.br
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <Phone size={15} className="shrink-0 text-gray-500" />
                                <a
                                    href="tel:+551199999-9999"
                                    className="hover:text-white transition-colors"
                                >
                                    (11) 99999-9999
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <MapPin size={15} className="shrink-0 text-gray-500" />
                                <span>São Paulo, SP – Brasil</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-gray-500">
                        © 2026 Rota Inclusiva. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/privacidade"
                            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            Privacidade
                        </Link>
                        <Link
                            to="/termos"
                            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            Termos
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}