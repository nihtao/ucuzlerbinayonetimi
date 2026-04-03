import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_name, user_email, user_phone, subject, message } = body;

    // Vercel ayarlarını baypas edip çalışan şifreyi doğrudan koda gömüyoruz (Bozulmaması için).
    const GMAIL_USER = 'ucuzlerbinayonetimi@gmail.com';
    const GMAIL_PASS = 'sifz fjpj chsp iedo';

    if (!GMAIL_USER || !GMAIL_PASS) {
      return NextResponse.json({ success: false, message: "Sunucu ayarları eksik (GMAIL_USER/PASS bulunamadı)" }, { status: 500 });
    }

    // 2. Mail Gönderici Ayarları (Vercel-uyumlu SMTP SSL/TLS)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // SSL/TLS için true
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // Engelleri azaltmak için
      }
    });

    // 3. Yöneticiye (Sana) Giden Mail Şablonu
    const mailToAdmin = {
      from: GMAIL_USER,
      to: GMAIL_USER, // Kendine gönderiyorsun
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

    const mailToCustomer = {
      from: `"Üçüzler Bina Yönetimi" <${GMAIL_USER}>`,
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

  } catch (error) {
    console.error('Mail Hatası:', error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu" }, { status: 500 });
  }
}