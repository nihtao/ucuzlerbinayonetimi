import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ad_soyad, email, mesaj, telefon, konu } = body;

    // KONTROL: Vercel'den şifreler geliyor mu?
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        // Eğer Vercel'de bu isimler yoksa hata verir
        console.error("HATA: Vercel Environment Variables eksik!");
        return NextResponse.json({ success: false, message: "Sunucu ayarları eksik" }, { status: 500 });
    }

    // 1. Mail Gönderici Ayarları
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        // İŞTE BURAYI DÜZELTTİK:
        user: process.env.EMAIL_USER, // Artık GMAIL_USER değil EMAIL_USER
        pass: process.env.EMAIL_PASS, // Artık GMAIL_PASS değil EMAIL_PASS
      },
    });

    // --- AŞAMA 1: Müşteriye Otomatik Teşekkür Maili ---
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, 
      subject: `Mesajınız Alındı - Üçüzler Yönetim (${konu})`,
      html: `
        <h3>Sayın ${ad_soyad},</h3>
        <p>Mesajınız bize ulaştı. En kısa sürede dönüş yapacağız.</p>
        <p>Saygılarımızla,<br><strong>Üçüzler Bina Yönetimi</strong></p>
      `,
    });

    // --- AŞAMA 2: SANA (Yöneticiye) Bildirim Maili ---
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Senin mail adresine gelecek
      replyTo: email,
      subject: `🔔 YENİ MESAJ: ${ad_soyad}`, 
      html: `
        <h3>Yeni İletişim Formu Mesajı</h3>
        <p><strong>Gönderen:</strong> ${ad_soyad}</p>
        <p><strong>Telefon:</strong> ${telefon}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Konu:</strong> ${konu}</p>
        <hr>
        <p>${mesaj}</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Mailler gönderildi' }, { status: 200 });

  } catch (error: any) {
    console.error('Mail Hatası:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}