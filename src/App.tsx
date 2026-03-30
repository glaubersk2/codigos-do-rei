import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Users, 
  BookOpen, 
  Calendar, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Menu, 
  X,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Target,
  History,
  CheckCircle2,
  Brain
} from 'lucide-react';
import { CONTENT } from './constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Doações', href: '#doacoes' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-12 h-12 relative flex items-center justify-center">
            <img src="/logo.jpeg" alt="Códigos do Rei" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-10 transition-opacity rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter leading-none">CÓDIGOS</span>
            <span className="font-bold text-[10px] tracking-[0.3em] text-zinc-400">DO REI</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-bold uppercase tracking-[0.2em] hover:text-brand-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#doacoes" 
            className="bg-black text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-primary transition-all shadow-lg shadow-black/5"
          >
            Apoie Agora
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium py-2 border-b border-zinc-100"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#doacoes" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-black text-white text-center py-4 font-bold uppercase tracking-widest mt-4"
              >
                Apoie Agora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface ProjectCardProps {
  project: any;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative group cursor-pointer"
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute top-4 right-4 w-12 h-12 ${project.color} opacity-80 mix-blend-multiply`} />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white border border-white px-6 py-2 text-xs uppercase tracking-widest">Ver Detalhes</span>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 ${project.color}`} />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Projeto Ativo</span>
        </div>
        <h3 className="text-xl font-bold tracking-tight mb-2 uppercase">{project.title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-blue-100">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/ngo-hero/1920/1080?grayscale" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#fafafa]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-block"
          >
            {/* Removido São Gonçalo / RJ daqui */}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8 break-words"
          >
            {CONTENT.hero.title.split(' ').map((word, i) => (
              <span key={i} className={word.toLowerCase() === 'fé' || word.toLowerCase() === 'educação' ? 'text-brand-primary' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {CONTENT.hero.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#projetos" className="w-full sm:w-auto bg-black text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-brand-primary transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10">
              {CONTENT.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#doacoes" className="w-full sm:w-auto border border-black px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              {CONTENT.hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        {/* Geometric Accents - Updated to brand colors */}
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-brand-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-32 h-32 bg-brand-primary/20 rounded-full blur-3xl animate-pulse delay-700" />
        
        {/* Subtle QR Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square relative z-10 overflow-hidden">
                <video 
                  src="/video1.mp4" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              {/* Artistic geometric overlays - Updated to brand colors */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-secondary z-0 opacity-20" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 border-2 border-zinc-200 z-0" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-6 w-12 h-12 bg-brand-primary z-20" />
            </motion.div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <History className="text-brand-primary w-5 h-5" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-zinc-400">Nossa História</span>
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-none">
                Transformando vidas desde 2020
              </h2>
              <p className="text-xl text-zinc-600 leading-relaxed mb-12">
                {CONTENT.about.history}
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-6 bg-zinc-50 border-l-4 border-brand-primary">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-brand-primary" />
                    <h4 className="font-bold uppercase text-xs tracking-widest">Missão</h4>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{CONTENT.about.mission}</p>
                </div>
                <div className="p-6 bg-zinc-50 border-l-4 border-brand-secondary">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-brand-secondary" />
                    <h4 className="font-bold uppercase text-xs tracking-widest">Visão</h4>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{CONTENT.about.vision}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mt-32 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {CONTENT.about.values.map((value, idx) => {
              const Icon = {
                Sparkles,
                Users,
                Brain,
                BookOpen
              }[value.icon] || CheckCircle2;
              
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-all duration-500 rotate-3 group-hover:rotate-0 shadow-sm">
                    <Icon className="w-10 h-10 text-brand-primary" />
                  </div>
                  <h4 className="font-bold uppercase tracking-tight mb-3">{value.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed px-4">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projetos" className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-[0.5em] font-bold text-zinc-400 block mb-4">O que fazemos</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Nossos <span className="text-brand-primary">Projetos</span>
            </h2>
            <p className="mt-6 text-zinc-500 max-w-xl mx-auto">
              Iniciativas focadas em cultura, educação e evangelismo para impactar São Gonçalo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {CONTENT.projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Activities & Audience */}
      <section className="py-24 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-900 skew-x-12 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-12">Atividades Diárias</h2>
              <div className="space-y-6">
                {CONTENT.activities.map((activity, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-2 h-2 bg-blue-500 group-hover:w-6 transition-all" />
                    <span className="text-lg font-medium text-zinc-300 group-hover:text-white transition-colors">{activity}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="p-12 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <Users className="w-12 h-12 text-yellow-400 mb-8" />
                <h3 className="text-3xl font-bold uppercase tracking-tight mb-6">Para quem existimos</h3>
                <p className="text-xl text-zinc-400 leading-relaxed italic">
                  "{CONTENT.audience}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donations Section */}
      <section id="doacoes" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-zinc-50 p-6 md:p-20 rounded-sm border border-zinc-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <span className="text-xs uppercase tracking-[0.5em] font-bold text-brand-primary block mb-4">Faça a diferença</span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
                  Sua ajuda <br className="hidden sm:block" /> transforma <br className="hidden sm:block" /> realidades
                </h2>
                <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
                  Sua doação permite que continuemos desenvolvendo projetos culturais e educativos em nossa cidade. Escolha como deseja apoiar:
                </p>

                <div className="space-y-6 mb-12">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-zinc-200 group hover:border-brand-primary transition-colors gap-4">
                    <div className="w-full sm:w-auto">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block">PIX Banco Cora</span>
                      <span className="text-sm sm:text-lg font-mono font-bold break-all">{CONTENT.donations.pixCora}</span>
                    </div>
                    <button 
                      onClick={() => navigator.clipboard.writeText(CONTENT.donations.pixCora)}
                      className="text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary shrink-0"
                    >
                      Copiar
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-zinc-200 group hover:border-brand-primary transition-colors gap-4">
                    <div className="w-full sm:w-auto">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block">PIX PagBank</span>
                      <span className="text-sm sm:text-lg font-mono font-bold break-all">{CONTENT.donations.pixPagBank}</span>
                    </div>
                    <button 
                      onClick={() => navigator.clipboard.writeText(CONTENT.donations.pixPagBank)}
                      className="text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary shrink-0"
                    >
                      Copiar
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {CONTENT.donations.suggestions.map((val) => (
                    <button key={val} className="flex-1 min-w-[100px] px-4 py-3 bg-white border border-zinc-200 font-bold hover:bg-brand-primary hover:text-white transition-all text-sm">
                      R$ {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col justify-center items-center text-center bg-white p-6 md:p-12 border border-zinc-200 shadow-sm mt-8 lg:mt-0">
                <Heart className="w-16 h-16 text-brand-primary mb-6 animate-pulse" />
                <h3 className="text-2xl font-bold uppercase mb-4">Doação Recorrente</h3>
                <p className="text-zinc-500 mb-8">Torne-se um mantenedor mensal e ajude-nos a planejar o futuro com mais segurança.</p>
                <a 
                  href={CONTENT.donations.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-black text-white py-5 font-bold uppercase tracking-widest hover:bg-brand-primary transition-all flex items-center justify-center gap-2"
                >
                  Acessar Link de Doação <ExternalLink className="w-4 h-4" />
                </a>
                <p className="mt-4 text-[10px] text-zinc-400 uppercase tracking-widest">Plataforma Segura</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 border-y border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-zinc-400 text-center block mb-12">Parceiros que acreditam na causa</span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
            {CONTENT.partners.map((partner, idx) => (
              <span key={idx} className="text-xl md:text-2xl font-black uppercase tracking-tighter">{partner}</span>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-white py-12 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-lg tracking-tighter uppercase">
                CÓDIGOS DO REI
              </span>
            </div>
            
            <p className="text-xs text-zinc-400 uppercase tracking-widest">
              © {new Date().getFullYear()} Códigos do Rei. Todos os direitos reservados.
            </p>

            <div className="flex gap-6">
              <a href="#" className="text-zinc-400 hover:text-black transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-zinc-400 hover:text-black transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
