/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Instagram, Link as LinkIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center selection:bg-zinc-800 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-900/20 rounded-full blur-[120px]" />
      </div>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center text-center gap-10 p-6 w-full max-w-lg">
        {/* Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-square max-w-[280px] md:max-w-[320px] shadow-2xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 flex items-center justify-center relative group"
        >
          <img 
            src="/codigos-do-rei/logo.png" 
            alt="Códigos do Rei Logo" 
            className="w-full h-full object-contain opacity-90 transition-opacity duration-500 relative z-10 p-4"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Content */}
        <div className="flex flex-col gap-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
              Em Breve
            </h1>
            <div className="h-1 w-16 bg-white mx-auto mt-6 rounded-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-500 text-base md:text-lg leading-relaxed px-4 mt-2"
          >
            O novo site do <span className="text-white font-semibold">Códigos do Rei</span> está em desenvolvimento. 
            Prepare-se para o novo.
          </motion.p>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full px-4"
        >
          <a 
            href="https://instagram.com/codigosdorei" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
          >
            <Instagram size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
            <span className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">Instagram</span>
          </a>
          
          <a 
            href="https://bio.site/codigosdorei" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
          >
            <LinkIcon size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
            <span className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">Links</span>
          </a>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-12 px-6 text-zinc-700 text-[10px] tracking-[0.3em] uppercase relative z-10 mt-auto border-t border-zinc-900/50">
        © 2026 Códigos do Rei • Todos os direitos reservados
      </footer>
    </div>
  );
}
