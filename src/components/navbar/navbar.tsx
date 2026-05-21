import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Caronas", to: "/caronas" },
    { label: "Acessibilidades", to: "/acessibilidade" },
    { label: "Calcular Tempo", to: "/calcular-tempo" },
    { label: "Sobre", to: "/sobre" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === "/";

    useEffect(() => {
        if (!isHome) return;
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome]);

    const isTransparent = isHome && !scrolled;

    return (
        <nav
            className={`w-full sticky top-0 z-50 transition-all duration-300 ${isTransparent
                    ? "bg-transparent border-transparent"
                    : "bg-white border-b border-gray-100 shadow-sm"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg select-none">
                            ♿
                        </div>
                        <span
                            className={`font-semibold text-base tracking-tight transition-colors duration-300 ${isTransparent ? "text-white" : "text-gray-900"
                                }`}
                        >
                            Rota Inclusiva
                        </span>
                    </Link>


                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.to;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${isActive
                                            ? isTransparent
                                                ? "bg-white/20 text-white"
                                                : "bg-blue-50 text-blue-600"
                                            : isTransparent
                                                ? "text-white/80 hover:text-white hover:bg-white/10"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>


                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            to="/entrar"
                            className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-300 ${isTransparent
                                    ? "text-white/90 hover:text-white"
                                    : "text-gray-700 hover:text-gray-900"
                                }`}
                        >
                            Entrar
                        </Link>
                        <Link
                            to="/cadastrar"
                            className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition-colors shadow-sm"
                        >
                            Cadastrar
                        </Link>
                    </div>


                    <button
                        className={`md:hidden p-2 rounded-md transition-colors ${isTransparent
                                ? "text-white hover:bg-white/10"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Abrir menu"
                    >
                        {menuOpen ? <X size={22} /> : <List size={22} />}
                    </button>
                </div>
            </div>


            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2 space-y-1">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMenuOpen(false)}
                                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <div className="pt-2 flex flex-col gap-2">
                        <Link
                            to="/entrar"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm font-medium text-center text-gray-700 border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition-colors"
                        >
                            Entrar
                        </Link>
                        <Link
                            to="/cadastrar"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm font-semibold text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 transition-colors"
                        >
                            Cadastrar
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}