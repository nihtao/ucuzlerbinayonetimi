import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_name, user_email, user_phone, subject, message } = body;

    // 1. KONTROL: Değişkenler .env dosyasından (veya Vercel'den) geliyor mu?
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      return NextResponse.json({ success: false, message: "Sunucu ayarları eksik (GMAIL_USER/PASS bulunamadı)" }, { status: 500 });
    }

    // 2. Mail Gönderici Ayarları (Senin Verdiğin Bilgilerle)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // .env'deki: ucuzlerbinayonetimi@gmail.com
        pass: process.env.GMAIL_PASS, // .env'deki: yicc dyui sing mowx
      },
    });

    // 3. Yöneticiye (Sana) Giden Mail Şablonu
    const mailToAdmin = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Kendine gönderiyorsun
      replyTo: user_email,        // Yanıtla diyince müşteriye gitsin
      subject: `🔔 Yeni Mesaj: ${user_name} - ${subject}`,
      html: `
        <h3>Web Sitesinden Yeni Mesaj</h3>
        <p><strong>Gönderen:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Telefon:</strong> ${user_phone}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <hr>
        <p><strong>Mesaj:</strong><br>${message}</p>
      `,
    };

    // 4. Müşteriye Giden Otomatik Cevap Şablonu
    const mailToCustomer = {
      from: `"Üçüzler Bina Yönetimi" <${process.env.GMAIL_USER}>`,
      to: user_email, // Müşterinin formda yazdığı mail
      subject: `Mesajınız Alındı - Üçüzler Yönetim`,
      html: `
        <h3>Sayın ${user_name},</h3>
        <p>Mesajınız tarafımıza başarıyla ulaşmıştır. Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
        <br>
        <p>Saygılarımızla,<br><strong>Üçüzler Bina Yönetimi</strong></p>
        <hr>
        <small>Bu mesaj otomatik olarak gönderilmiştir.</small>
      `,
    };

    // 5. İki Maili de Gönder
    await Promise.all([
      transporter.sendMail(mailToAdmin),
      transporter.sendMail(mailToCustomer)
    ]);

    return NextResponse.json({ success: true, message: 'Mailler gönderildi' }, { status: 200 });

  } catch (error: any) {
    console.error('Mail Hatası:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}