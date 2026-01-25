import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  // 1. Buraya bir Yapay Zeka API'si bağlayacağız (Gemini veya OpenAI)
  // Şimdilik sistemin mantığını kuruyoruz. 
  
  const konular = [
    "Kayseri'de Şeffaf Aidat Yönetiminin Önemi",
    "Kat Mülkiyeti Kanunu'nda Yeni Düzenlemeler",
    "Apartmanlarda Enerji Tasarrufu İçin 5 İpucu",
    "Dijital Yönetim Sistemlerinin Site Sakinlerine Faydaları"
  ];

  const secilenKonu = konular[Math.floor(Math.random() * konular.length)];

  const yeniHaber = {
    baslik: secilenKonu,
    icerik: `${secilenKonu} konusunda Üçüzler Yönetim olarak dijitalleşmeye ve şeffaflığa önem veriyoruz. Detaylı bilgi için bizimle iletişime geçebilirsiniz.`,
    etiket: "Eğitici İçerik",
    tarih: new Date().toISOString(),
  };

  // 2. Supabase'e otomatik ekle
  const { error } = await supabase.from('duyurular').insert([yeniHaber]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Haber otomatik olarak oluşturuldu!" });
}