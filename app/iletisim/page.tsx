"use client";

import { useState } from 'react';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Iletisim = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Form verileri
  const [formData, setFormData] = useState({
    user_name: '',
    user_phone: '',
    user_email: '',
    subject: 'Yönetim Teklifi Almak İstiyorum',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend API'ye istek at
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        // Formu temizle
        setFormData({ user_name: '', user_phone: '', user_email: '', subject: 'Yönetim Teklifi Almak İstiyorum', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data.message || 'Hata');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Animasyon Ayarı
  const inputFocus = {
    focus: { scale: 1.02, borderColor: "#06b6d4", transition: { duration: 0.2 } }
  };

  return (
    <section id="iletisim" className="py-20 bg-gray-50 overflow-hidden relative">
      {/* Arka Plan Efektleri */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Başlık */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm bg-cyan-50 px-4 py-1 rounded-full">İletişim</span>
          <h2 className="text-3xl md:text-5xl font-black text-blue-900 mt-3">Bize Ulaşın</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-900 to-cyan-500 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* ORTALANMIŞ FORM */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 relative">
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileFocus="focus" variants={inputFocus}>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Ad Soyad</label>
                  <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required 
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:outline-none transition-all text-gray-800 font-medium placeholder-gray-400 shadow-sm" placeholder="Adınız Soyadınız" />
                </motion.div>

                <motion.div whileFocus="focus" variants={inputFocus}>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Telefon</label>
                  <input type="tel" name="user_phone" value={formData.user_phone} onChange={handleChange} required 
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:outline-none transition-all text-gray-800 font-medium placeholder-gray-400 shadow-sm" placeholder="05XX..." />
                </motion.div>
              </div>

              <motion.div whileFocus="focus" variants={inputFocus}>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">E-posta</label>
                <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} required 
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:outline-none transition-all text-gray-800 font-medium placeholder-gray-400 shadow-sm" placeholder="mail@ornek.com" />
              </motion.div>

              <motion.div whileFocus="focus" variants={inputFocus}>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Konu</label>
                <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:outline-none transition-all text-gray-800 font-medium cursor-pointer shadow-sm">
                  <option>Yönetim Teklifi Almak İstiyorum</option>
                  <option>Şikayet / Öneri</option>
                  <option>Diğer</option>
                </select>
              </motion.div>

              <motion.div whileFocus="focus" variants={inputFocus}>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Mesaj</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} 
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:outline-none transition-all text-gray-800 font-medium placeholder-gray-400 resize-none shadow-sm" placeholder="Mesajınız..."></textarea>
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} 
                className={`w-full py-5 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-3 transition-all text-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-900 to-blue-700 hover:from-cyan-600 hover:to-cyan-500'}`}>
                {loading ? 'Gönderiliyor...' : <><span>Mesajı Gönder</span><FaPaperPlane /></>}
              </motion.button>
            </div>

            {/* Bildirim Mesajları */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 justify-center">
                  <FaCheckCircle className="text-xl" />
                  <div><span className="font-bold block">Başarılı!</span><span className="text-sm">Mesajınız iletildi.</span></div>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 justify-center">
                  <FaExclamationCircle className="text-xl" />
                  <div><span className="font-bold block">Hata!</span><span className="text-sm">Lütfen internet bağlantınızı kontrol edin.</span></div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Iletisim;