import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ad_soyad, email, telefon, konu, mesaj } = body;

    // 1. SMTP Taşıyıcı Yapılandırması (Gmail için)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Vercel'e eklediğin e-posta
        pass: process.env.EMAIL_PASS, // Google Uygulama Şifresi
      },
    });

    // 2. E-posta İçeriği
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Mesaj kime gitsin? (Kendine gönderiyorsun)
      subject: `Yeni İletişim Formu: ${konu}`,
      html: `
        <h3>Yeni Mesaj Detayları</h3>
        <p><strong>Ad Soyad:</strong> ${ad_soyad}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${telefon}</p>
        <p><strong>Konu:</strong> ${konu}</p>
        <p><strong>Mesaj:</strong> ${mesaj}</p>
      `,
    };

    // 3. Gönderim İşlemi
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('E-posta Gönderim Hatası:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}