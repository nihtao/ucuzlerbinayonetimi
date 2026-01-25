"use client";

import { useState, useRef } from 'react';
import { supabase } from '@/utils/supabase';
import { motion, AnimatePresence } from 'framer-motion';
// import ReCAPTCHA from "react-google-recaptcha"; // reCAPTCHA pasif

export default function Iletisim() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // captchaToken kontrolü geçici olarak devre dışı
  const [captchaToken, setCaptchaToken] = useState<string | null>("bypass"); 
  // const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState({
    ad_soyad: '',
    email: '',
    telefon: '',
    konu: '',
    mesaj: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* reCAPTCHA Kontrolü Yorum Satırı
    if (!captchaToken) {
      alert("Lütfen robot olmadığınızı doğrulayın.");
      return;
    }
    */

    setLoading(true);

    const { error: dbError } = await supabase
      .from('mesajlar')
      .insert([formData]);

    if (dbError) {
      alert('Veritabanı Hatası: ' + dbError.message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ ad_soyad: '', email: '', telefon: '', konu: '', mesaj: '' });
        // setCaptchaToken(null);
        // recaptchaRef.current?.reset();
      }
    } catch (error) {
      console.error('Hata:', error);
    }
    
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-10 pb-20 font-sans text-gray-900">
      <section className="bg-blue-900 text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4"
          >
            Bize Ulaşın
          </motion.h1>
          <p className="text-blue-200 text-lg font-medium italic">Hizmetlerimiz hakkında detaylı bilgi için formu doldurun.</p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="lg:w-2/3 w-full">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
              
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 flex flex-col items-center text-center"
                  >
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner">✓</div>
                    <h2 className="text-3xl font-black text-blue-900 mb-4 uppercase tracking-tighter">Mesajınız Alındı!</h2>
                    <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                      Talebiniz sisteme başarıyla kaydedildi. Ofisimiz en kısa sürede sizinle iletişime geçecektir.
                    </p>
                    <button 
                      onClick={() => setSuccess(false)} 
                      className="bg-blue-900 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-blue-800 transition-all hover:scale-105 active:scale-95"
                    >
                      Yeni Mesaj Gönder
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-3xl font-black text-blue-900 mb-2 uppercase tracking-tighter">Mesaj Gönderin</h2>
                    <p className="text-gray-400 mb-10 text-sm md:text-base font-medium">Profesyonel bina yönetimi için ilk adımı atın.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div>
                          <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest pl-1">Ad Soyad</label>
                          <input type="text" name="ad_soyad" required className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-cyan-500 focus:bg-white focus:outline-none transition-all shadow-sm" placeholder="Adınız Soyadınız" value={formData.ad_soyad} onChange={handleChange} />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest pl-1">Telefon</label>
                          <input type="text" name="telefon" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-cyan-500 focus:bg-white focus:outline-none transition-all shadow-sm" placeholder="05XX..." value={formData.telefon} onChange={handleChange} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div>
                          <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest pl-1">E-posta</label>
                          <input type="email" name="email" required className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-cyan-500 focus:bg-white focus:outline-none transition-all shadow-sm" placeholder="ornek@email.com" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest pl-1">Konu</label>
                          <div className="relative">
                            <select name="konu" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-cyan-500 focus:bg-white focus:outline-none transition-all appearance-none shadow-sm" value={formData.konu} onChange={handleChange}>
                              <option value="">Seçiniz...</option>
                              <option value="Teklif">Ücretsiz Teklif Almak İstiyorum</option>
                              <option value="Yönetim">Yönetim Hizmetleri Hakkında</option>
                              <option value="Diger">Diğer</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-left">
                        <label className="block text-gray-700 font-bold mb-2 text-[11px] uppercase tracking-widest pl-1">Mesajınız</label>
                        <textarea name="mesaj" required rows={4} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-cyan-500 focus:bg-white focus:outline-none transition-all resize-none shadow-sm" placeholder="Size nasıl yardımcı olabiliriz?" value={formData.mesaj} onChange={handleChange}></textarea>
                      </div>

                      {/* reCAPTCHA Alanı Pasif 
                      <div className="flex justify-center md:justify-start py-2">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey="6Ldr9VUsAAAAAL9QV_DjcrDALyuLbZM9KkntMQ8G" 
                          onChange={(token: string | null) => setCaptchaToken(token)}
                        />
                      </div>
                      */}

                      <motion.button 
                        whileHover={{ scale: 1.02, backgroundColor: "#1e3a8a" }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        disabled={loading}
                        className="w-full py-5 px-6 rounded-2xl font-black text-lg shadow-xl transition-all duration-300 bg-blue-900 text-white cursor-pointer"
                      >
                        {loading ? 'SİSTEME İŞLENİYOR...' : 'MESAJI GÖNDER'}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>  
    </main>
  );
}