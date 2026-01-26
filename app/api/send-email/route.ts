import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_name, user_email, user_phone, subject, message } = body;

    // 1. KONTROL: Vercel'den şifreler gelmiş mi?
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      return NextResponse.json({ success: false, message: "Sunucu ayarları (Env Variables) eksik!" }, { status: 500 });
    }

    // 2. Postacı Ayarları (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // DİKKAT: Buradaki kodlar Vercel'deki ayarları otomatik okur.
        // Sakın buraya elle mail adresi yazma! Kod bozulur.
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS, 
      },
    });

    // 3. Yöneticiye (Sana) Giden Mail
    const mailToAdmin = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Mail kendine gelsin
      replyTo: user_email, // "Yanıtla" deyince müşteriye gitsin
      subject: `🔔 Yeni Mesaj: ${user_name} - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1e3a8a;">Yeni Müşteri Mesajı</h2>
          <p><strong>Ad Soyad:</strong> ${user_name}</p>
          <p><strong>Telefon:</strong> ${user_phone}</p>
          <p><strong>E-posta:</strong> ${user_email}</p>
          <p><strong>Konu:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 16px;"><strong>Mesaj:</strong><br>${message}</p>
        </div>
      `,
    };

    // 4. Müşteriye Giden (Otomatik Cevap)
    const mailToCustomer = {
      from: `"Üçüzler Bina Yönetimi" <${process.env.GMAIL_USER}>`,
      to: user_email,
      subject: `Mesajınız Bize Ulaştı - Üçüzler Yönetim`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #1e3a8a;">Sayın ${user_name},</h2>
          <p>Mesajınız tarafımıza başarıyla ulaşmıştır. Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
          <br>
          <p>Saygılarımızla,<br><strong>Üçüzler Bina Yönetimi</strong></p>
        </div>
      `,
    };

    // İkisini aynı anda gönder
    await Promise.all([
      transporter.sendMail(mailToAdmin),
      transporter.sendMail(mailToCustomer)
    ]);

    return NextResponse.json({ success: true, message: 'Mailler gönderildi' }, { status: 200 });

  } catch (error: any) {
    console.error('Sunucu Hatası:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}