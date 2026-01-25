import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET(request: Request) {
  // 1. Güvenlik Kontrolü (Sadece Vercel'in kendi sistemi bu kodu tetikleyebilsin diye)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV !== 'development') {
    return new Response('Yetkisiz Erişim', { status: 401 });
  }

  try {
    // 2. Haber Konuları Havuzu
    const konular = [
      { baslik: "Kayseri'de Bina Yönetiminde Yeni Dönem", etiket: "Duyuru" },
      { baslik: "Aidat Ödemelerinde Şeffaflık Neden Önemli?", etiket: "Bilgilendirme" },
      { baslik: "Apartmanlarda Bahar Bakımı Hazırlıkları", etiket: "Hizmet" },
      { baslik: "Kat Mülkiyeti Kanunu Hakkında Merak Edilenler", etiket: "Hukuk" },
      { baslik: "Dijital Yönetim Paneli ile 7/24 Şeffaflık", etiket: "Teknoloji" }
    ];

    const secilenHaber = konular[Math.floor(Math.random() * konular.length)];

    // 3. Haberi Supabase'e Yaz
    const { error } = await supabase.from('duyurular').insert([
      {
        baslik: secilenHaber.baslik,
        icerik: `${secilenHaber.baslik} konusunda Üçüzler Bina Yönetimi olarak Kayseri'de en şeffaf hizmeti sunmaya devam ediyoruz. Sakinlerimizin huzuru için teknolojiyi yönetimle birleştiriyoruz.`,
        etiket: secilenHaber.etiket,
        tarih: new Date().toISOString()
      }
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true, message: "AI Haber Üretildi ve Yayına Alındı." });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}