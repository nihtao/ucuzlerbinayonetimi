"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser'; // EmailJS'i çağırdık

const Iletisim = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // EmailJS Gönderim Kısmı
    emailjs
      .sendForm(
        'service_pgu2ta2',   // BURAYA KENDİ SERVICE ID'Nİ YAZ (Örn: service_xyz)
        'template_qpgoqfq',  // BURAYA TEMPLATE ID'Nİ YAZ (Örn: template_abc)
        formRef.current!,    // Form referansı
        '6Xmo1ciGX0RhHmljC'    // BURAYA PUBLIC KEY'Nİ YAZ (Örn: user_12345)
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setStatus('success');
          // Formu temizle
          if (formRef.current) formRef.current.reset();
          // 5 saniye sonra başarı mesajını kaldır
          setTimeout(() => setStatus('idle'), 5000);
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
          setStatus('error');
        }
      );
  };

  return (
    <section id="iletisim" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-cyan-500 font-bold tracking-wider uppercase text-sm"
          >
            Bize Ulaşın
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-black text-blue-900 mt-2"
          >
            İLETİŞİME GEÇİN
          </motion.h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Sol Taraf: İletişim Bilgileri (Aynı kaldı) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">İletişim Bilgileri</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-100 p-3 rounded-full text-cyan-600">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">Adres</h4>
                    <p className="text-gray-600">Cumhuriyet Mah. Vatan Cad.<br/>No: 12/A Melikgazi / KAYSERİ</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-100 p-3 rounded-full text-cyan-600">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">Telefon</h4>
                    <a href="tel:+905551234567" className="text-gray-600 hover:text-cyan-600 transition-colors">
                      +90 (555) 123 45 67
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-100 p-3 rounded-full text-cyan-600">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">E-posta</h4>
                    <a href="mailto:info@ucuzlerbinayonetimi.com" className="text-gray-600 hover:text-cyan-600 transition-colors">
                      info@ucuzlerbinayonetimi.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Whatsapp Butonu */}
              <a 
                href="https://wa.me/905551234567" 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center space-x-2 w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1"
              >
                <FaWhatsapp size={24} />
                <span>WhatsApp'tan Yazın</span>
              </a>
            </div>
          </motion.div>

          {/* Sağ Taraf: Form (EmailJS Entegreli) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden"
          >
            {/* Arka Plan Süsü */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-full -z-0"></div>

            <h3 className="text-2xl font-bold text-blue-900 mb-2 relative z-10">Bize Yazın</h3>
            <p className="text-gray-500 mb-8 relative z-10">Size en kısa sürede dönüş yapacağız.</p>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Ad Soyad</label>
                  <input 
                    type="text" 
                    name="user_name" // EmailJS şablonundaki {{user_name}} ile eşleşmeli
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-900"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Telefon</label>
                  <input 
                    type="tel" 
                    name="user_phone" // EmailJS şablonundaki {{user_phone}}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-900"
                    placeholder="05XX XXX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">E-posta Adresi</label>
                <input 
                  type="email" 
                  name="user_email" // EmailJS şablonundaki {{user_email}}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-900"
                  placeholder="ornek@mail.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Konu</label>
                <select 
                  name="subject" // EmailJS şablonundaki {{subject}}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-900"
                >
                  <option>Yönetim Teklifi Almak İstiyorum</option>
                  <option>Şikayet / Öneri</option>
                  <option>İş Başvurusu</option>
                  <option>Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Mesajınız</label>
                <textarea 
                  name="message" // EmailJS şablonundaki {{message}}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-gray-900 resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center space-x-2 transition-all ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-900 to-blue-800 hover:from-cyan-600 hover:to-cyan-500 hover:scale-[1.02]'
                }`}
              >
                {loading ? (
                  <span>Gönderiliyor...</span>
                ) : (
                  <>
                    <span>Mesajı Gönder</span>
                    <FaPaperPlane />
                  </>
                )}
              </button>

              {/* Durum Mesajları */}
              {status === 'success' && (
                <div className="bg-green-100 text-green-700 p-4 rounded-xl text-center font-bold">
                  Mesajınız başarıyla iletildi! En kısa sürede döneceğiz.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center font-bold">
                  Bir hata oluştu. Lütfen WhatsApp üzerinden ulaşın.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Iletisim;