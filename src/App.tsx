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
  Brain,
  Download
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
    { name: 'Revistas', href: '#revistas' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Doações', href: '#doacoes' },
  ];

  const scrollToTarget = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Check if it's pointing to the top
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', href);
      return;
    }

    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Wait for the menu's closing animation to begin so layout changes don't cancel the scroll
    setTimeout(() => {
      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
      window.history.pushState(null, '', href);
    }, 150);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[999] w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-2 translate-y-0' 
          : 'bg-white/90 backdrop-blur-md py-4 translate-y-0'
      }`}
      style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => scrollToTarget(e, '#home')} className="flex items-center gap-2 group">
          <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
            <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base md:text-xl tracking-tighter leading-none">CÓDIGOS</span>
            <span className="font-bold text-[8px] md:text-[10px] tracking-[0.3em] text-zinc-400">DO REI</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => scrollToTarget(e, link.href)}
              className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] hover:text-brand-primary transition-colors text-zinc-800 py-2"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#doacoes" 
            onClick={(e) => scrollToTarget(e, '#doacoes')}
            className="bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-primary transition-all rounded-sm"
          >
            Apoie Agora
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-3">
          <a 
            href="#doacoes" 
            onClick={(e) => scrollToTarget(e, '#doacoes')}
            className="bg-brand-primary text-white px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm whitespace-nowrap shadow-md shadow-brand-primary/20"
          >
            Doar
          </a>
          <button 
            className="p-1 text-zinc-900" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 z-[1000] md:hidden bg-white border-t border-zinc-100 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 divide-y divide-zinc-50">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleMobileNavClick(e, link.href)}
                  className="text-xs font-black uppercase tracking-[0.2em] py-6 text-zinc-900 active:bg-zinc-50 transition-colors flex items-center px-4"
                >
                  {link.name}
                </a>
              ))}
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative group cursor-pointer"
    >
      <div className="aspect-[3/2] overflow-hidden relative rounded-sm shadow-sm border border-zinc-100">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute top-3 right-3 w-8 h-8 ${project.color} opacity-70 mix-blend-multiply`} />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white border border-white/50 px-4 py-1.5 text-[9px] uppercase tracking-widest font-bold">Ver Detalhes</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className={`w-2 h-2 ${project.color}`} />
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-400">Ativo</span>
        </div>
        <h3 className="text-sm font-black tracking-tight mb-1 uppercase leading-tight group-hover:text-brand-primary transition-colors">{project.title}</h3>
        <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2">{project.description}</p>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden pt-20 scroll-mt-20">
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
      <section id="sobre" className="py-24 bg-white overflow-hidden scroll-mt-20">
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
              <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-32 h-32 md:w-40 md:h-40 bg-brand-secondary z-0 opacity-20" />
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-48 h-48 md:w-60 md:h-60 border-2 border-zinc-200 z-0" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-8 md:w-12 md:h-12 bg-brand-primary z-20" />
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

      {/* Magazines Section */}
      <section id="revistas" className="py-24 bg-[#fafafa] overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.5em] font-bold text-brand-primary block mb-4">Nossa Literatura</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Revistas <span className="text-zinc-400">Digitais</span>
              </h2>
            </div>
            <p className="text-zinc-500 max-w-sm text-center md:text-right leading-relaxed">
              Acesse nossas edições completas em PDF e leve a cultura cristã com você onde quer que esteja.
            </p>
          </div>

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-12">
            {CONTENT.magazines.map((mag, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col md:flex-row bg-[#fdfdfd] border border-zinc-100 overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
              >
                <div className="w-full md:w-5/12 aspect-[3/4] overflow-hidden">
                  <img 
                    src={mag.image} 
                    alt={mag.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="w-full md:w-7/12 p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary border border-brand-primary/20 px-3 py-1 bg-brand-primary/5">Edição {mag.edition}</span>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{mag.date}</span>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-tight">{mag.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                      {mag.description}
                    </p>
                  </div>
                  
                  <a 
                    href={mag.pdfUrl} 
                    download 
                    className="flex items-center justify-center gap-3 w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-primary transition-all group/btn shadow-xl shadow-black/10"
                  >
                    <Download className="w-4 h-4 group-hover/btn:translate-y-1 transition-transform" />
                    Baixar PDF
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projetos" className="py-24 bg-white overflow-hidden scroll-mt-20">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
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
      <section id="doacoes" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-zinc-50 p-6 md:p-20 rounded-sm border border-zinc-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <span className="text-xs uppercase tracking-[0.5em] font-bold text-brand-primary block mb-4">Faça a diferença</span>
              <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                Sua ajuda transforma realidades
              </h2>
              <p className="text-lg md:text-xl text-zinc-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Sua doação permite que continuemos desenvolvendo projetos culturais e educativos em nossa cidade. Escolha um valor para contribuir agora:
              </p>

              <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {CONTENT.donations.suggestions.map((item) => (
                  <a 
                    key={item.value} 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-8 bg-white border-2 border-zinc-100 font-bold hover:border-brand-primary hover:text-brand-primary transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1"
                  >
                    <span className="text-zinc-400 text-[10px] uppercase tracking-widest mb-2 group-hover:text-brand-primary/50">Doar</span>
                    <span className="text-3xl font-black tracking-tight">R$ {item.value}</span>
                  </a>
                ))}
              </div>

              <div className="mt-12 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-brand-primary animate-pulse" />
                <span className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-bold">Transação Segura via PagSeguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 border-y border-zinc-100 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-zinc-400 text-center block mb-16">Parceiros que acreditam na causa</span>
          
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-x-8 gap-y-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            {CONTENT.partners.map((partner, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center text-center px-4"
              >
                <span className="text-sm md:text-xl lg:text-2xl font-black uppercase tracking-tighter leading-none break-words max-w-[150px] md:max-w-none">
                  {partner}
                </span>
              </div>
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
