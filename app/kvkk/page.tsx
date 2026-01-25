"use client"; //

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function KvkkPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100"
        >
          <h1 className="text-4xl font-black text-blue-900 mb-8 border-b pb-6 uppercase tracking-tighter">
            KVKK <span className="text-cyan-600">Aydınlatma Metni</span>
          </h1>
          
          <div className="prose prose-blue max-w-none text-gray-600 space-y-6 leading-relaxed">
            <p className="font-bold text-gray-800">Üçüzler Bina Yönetimi olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca kişisel verilerinizin güvenliğine büyük önem veriyoruz.</p>
            
            <h2 className="text-xl font-bold text-blue-900 uppercase">1. Veri Sorumlusu</h2>
            <p>Sahabiye Mahallesi Ahmet Paşa Caddesi Kalender İş Merkezi 41/10 adresinde mukim Üçüzler Bina Yönetimi, veri sorumlusu sıfatıyla hareket etmektedir.</p>
            
            <h2 className="text-xl font-bold text-blue-900 uppercase">2. Verilerin İşlenme Amacı</h2>
            <p>Kişisel verileriniz; aidat tahsilat süreçleri, bina güvenliğinin sağlanması, hukuki yükümlülüklerin yerine getirilmesi ve sakinlerimize daha iyi hizmet sunulması amacıyla işlenmektedir.</p>
            
            <h2 className="text-xl font-bold text-blue-900 uppercase">3. Haklarınız</h2>
            <p>KVKK’nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini isteme ve silinmesini talep etme haklarına sahipsiniz.</p>
          </div>

          <div className="mt-12 pt-8 border-t">
            <Link href="/" className="text-cyan-600 font-bold hover:underline flex items-center gap-2">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}