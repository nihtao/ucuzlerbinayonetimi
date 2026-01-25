"use client"; // En üstte kalmalı

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi'; 
import { FaWhatsapp, FaInstagram, FaPhoneAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuLinks = [
    { name: 'ANA SAYFA', href: '/', delay: 0.1 },
    { name: 'HAKKIMIZDA', href: '#hakkimizda', delay: 0.2 },
    { name: 'HİZMETLERİMİZ', href: '#hizmetler', delay: 0.3 },
    { name: 'REFERANSLAR', href: '#referanslar', delay: 0.4 },
    { name: 'İLETİŞİM', href: '/iletisim', delay: 0.5 },
    { name: 'KVKK', href: '/kvkk', delay: 0.5 },
  ];

  // --- EN BAŞA DÖNME VE YUMUŞAK GEÇİŞ FONKSİYONU ---
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name?: string) => {
    if (name === 'ANA SAYFA' || href === '/') {
      if (window.location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsOpen(false);
        return;
      }
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      
      if (elem) {
        setIsOpen(false);
        elem.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <nav className="bg-blue-900 text-white p-4 sticky top-0 z-[1000] shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* LOGO - Tıklayınca En Başa Döner */}
        <Link 
          href="/" 
          onClick={(e) => handleScroll(e, '/')}
          className="flex items-center gap-3 transition-transform active:scale-95"
        >
          <Image 
            src="/binayonetimi.jpeg" 
            alt="Üçüzler Bina Yönetimi" 
            width={45} 
            height={45} 
            className="bg-white rounded-full p-1 shadow-inner object-cover"
            priority 
          />
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter uppercase leading-none">
              ÜÇÜZLER
            </span>
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
              Bina Yönetimi
            </span>
          </div>
        </Link>

        {/* DESKTOP MENÜ */}
        <div className="hidden md:flex gap-8 items-center">
          {menuLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleScroll(e, link.href, link.name)}
              className="text-sm font-bold hover:text-cyan-400 transition-colors uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/iletisim" 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-full text-xs font-bold hover:shadow-cyan-500/50 shadow-lg transition-all transform hover:-translate-y-1 active:scale-95"
          >
            TEKLİF AL
          </Link>
        </div>

        {/* MOBİL HAMBURGER BUTONU */}
        <button 
          className="md:hidden text-4xl text-cyan-400 focus:outline-none active:scale-90 transition-transform"
          onClick={() => setIsOpen(true)}
        >
          <HiMenuAlt3 />
        </button>
      </div>

      {/* MOBİL MENÜ PANELİ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-black z-[2000] flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-end">
              <motion.button 
                whileTap={{ rotate: 90, scale: 0.8 }}
                onClick={() => setIsOpen(false)}
                className="text-5xl text-cyan-400 p-2"
              >
                <HiX />
              </motion.button>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-6">
              {menuLinks.map((link) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: link.delay }}
                >
                  <Link 
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href, link.name)}
                    className="text-4xl font-black text-white hover:text-cyan-400 transition-colors tracking-tighter flex items-center gap-4"
                  >
                    <span className="text-cyan-500 text-xl font-mono">/</span> {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link 
                  href="/iletisim" 
                  onClick={() => setIsOpen(false)}
                  className="bg-cyan-500 text-white px-10 py-4 rounded-full text-lg font-bold inline-block shadow-xl active:scale-95"
                >
                  TEKLİF AL
                </Link>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="border-t border-white/10 pt-8"
            >
              <p className="text-cyan-400 text-sm font-bold tracking-widest mb-4 text-center md:text-left uppercase">Bize Ulaşın</p>
              <div className="flex justify-center md:justify-start gap-6 mb-8">
                <a href ="https://wa.me/905538873616" target="_blank" className="bg-white/5 p-4 rounded-2xl text-green-400 text-2xl hover:bg-green-400 hover:text-white transition-all transform hover:-translate-y-1"><FaWhatsapp /></a>
                <a href="https://www.instagram.com/ucuzlerbina_yonetimi/" target="_blank" className="bg-white/5 p-4 rounded-2xl text-pink-500 text-2xl hover:bg-pink-500 hover:text-white transition-all transform hover:-translate-y-1"><FaInstagram /></a>
                <a href="tel:905538873616" className="bg-white/5 p-4 rounded-2xl text-blue-400 text-2xl hover:bg-blue-400 hover:text-white transition-all transform hover:-translate-y-1"><FaPhoneAlt /></a>
              </div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest text-center md:text-left">© 2026 Üçüzler Bina Yönetimi - Kayseri</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;