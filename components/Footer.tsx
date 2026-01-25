"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white pt-20 pb-10 px-4 border-t border-white/5 relative overflow-hidden">
      {/* Arka Plan Süslemesi */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. SÜTUN: Kurumsal & Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <Image 
                src="/binayonetimi.jpeg" 
                alt="Üçüzler Bina Yönetimi Logo" 
                width={55} 
                height={55} 
                className="bg-white rounded-full p-1 shadow-xl"
              />
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tighter uppercase leading-none">
                  ÜÇÜZLER
                </span>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                  Bina Yönetimi
                </span>
              </div>
            </div>
            <p className="text-blue-100/60 text-sm leading-relaxed">
              Kayseri'de bina ve site yönetimi alanında şeffaf, güvenilir ve teknolojik çözümler sunan çözüm ortağınız. Siz huzurla yaşayın, biz profesyonelce yönetelim.
            </p>
          </motion.div>

          {/* 2. SÜTUN: Hızlı Linkler */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-2 inline-block">Hızlı Erişim</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="text-blue-100/80 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">›</span> Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="#hakkimizda" className="text-blue-100/80 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">›</span> Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="#hizmetler" className="text-blue-100/80 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">›</span> Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="#referanslar" className="text-blue-100/80 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">›</span> Referanslar
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* 3. SÜTUN: Kurumsal Linkler */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-2 inline-block">Kurumsal</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/kvkk" className="text-blue-100/80 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">✓</span> KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-blue-100/80 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">✓</span> Ücretsiz Teklif Al
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-blue-100/80 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-500">✓</span> Bize Ulaşın
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* 4. SÜTUN: Sosyal Medya & Vizyon */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-2 inline-block">Sosyal Medya</h3>
            <p className="text-blue-100/60 text-xs italic leading-relaxed">
              Güncel duyurular ve bilgilendirmeler için bizi takip edin.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/905455596212" target="_blank" className="bg-white/5 p-4 rounded-2xl text-green-400 text-xl hover:bg-green-500 hover:text-white transition-all shadow-lg">
                <FaWhatsapp />
              </a>
              <a href="https://www.instagram.com/ucuzlerbina_yonetimi/" className="bg-white/5 p-4 rounded-2xl text-pink-500 text-xl hover:bg-pink-500 hover:text-white transition-all shadow-lg">
                <FaInstagram />
              </a>
              <a href="tel:+905455596212" className="bg-white/5 p-4 rounded-2xl text-blue-400 text-xl hover:bg-blue-400 hover:text-white transition-all shadow-lg">
                <FaPhoneAlt />
              </a>
            </div>
          </motion.div>

        </div>

        {/* ALT BİLGİ BANDI */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-[10px] md:text-xs text-blue-100/40 uppercase tracking-[0.3em] font-bold">
              © {new Date().getFullYear()} ÜÇÜZLER BİNA YÖNETİMİ. TÜM HAKLARI SAKLIDIR.
            </p>
            <p className="text-[9px] text-cyan-500/40 uppercase tracking-widest mt-1 font-medium">
              Profesyonel Yönetim • Güvenli Gelecek
            </p>
          </div>
          
          <div className="flex gap-8 text-[10px] text-blue-100/40 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-2 italic">KAYSERİ / TÜRKİYE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;