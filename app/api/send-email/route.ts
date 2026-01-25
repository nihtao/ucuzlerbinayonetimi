import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ad_soyad, email, telefon, konu, mesaj } = body;

    // 1. Güvenlik Kontrolü: Değişkenler Vercel'den geliyor mu?
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("HATA: Vercel Environment Variables (EMAIL_USER veya EMAIL_PASS) eksik!");
      return NextResponse.json({ success: false, error: "Sunucu yapılandırması eksik." }, { status: 500 });
    }

    // 2. SMTP Taşıyıcı Yapılandırması (Garantici Yöntem)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL/TLS kullanımı
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. E-posta İçeriği
    const mailOptions = {
      from: `"${ad_soyad}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Mesaj sana gelsin
      replyTo: email, // Cevapla dediğinde kullanıcıya gitsin
      subject: `Üçüzler Bina Yönetimi - Yeni Mesaj: ${konu}`,
      html: `
        <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #004aad;">Yeni İletişim Formu Mesajı</h2>
          <p><strong>Gönderen:</strong> ${ad_soyad}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${telefon}</p>
          <p><strong>Konu:</strong> ${konu}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Mesaj:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${mesaj}</p>
        </div>
      `,
    };

    // 4. Gönderim İşlemi
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Hatanın tam detayını Vercel Logs'ta görebilmek için:
    console.error('MAIL_MOTORU_HATASI:', error.message);
    return NextResponse.json({ 
      success: false, 
      error: "Mesaj gönderilirken bir hata oluştu.",
      debug: error.message 
    }, { status: 500 });
  }
}