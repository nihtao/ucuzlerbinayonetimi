import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_name, user_email, user_phone, subject, message } = body;

    // 1. KONTROL: Vercel ayarlarından veriler geliyor mu?
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      return NextResponse.json({ success: false, message: "Vercel ayarları (GMAIL_USER/PASS) eksik!" }, { status: 500 });
    }

    // 2. Postacı Ayarları
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Vercel'deki GMAIL_USER değişkenini okur
        pass: process.env.GMAIL_PASS, // Vercel'deki GMAIL_PASS değişkenini okur
      },
    });

    // 3. Yöneticiye (Sana) Giden Mail
    const mailToAdmin = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: user_email,
      subject: `🔔 Site Mesajı: ${user_name} - ${subject}`,
      html: `
        <h3>Yeni İletişim Formu Mesajı</h3>
        <p><strong>Ad Soyad:</strong> ${user_name}</p>
        <p><strong>Telefon:</strong> ${user_phone}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <div style="background:#f4f4f4; padding:15px; border-radius:5px;">
          <strong>Mesaj:</strong><br>${message}
        </div>
      `,
    };

    // 4. Müşteriye Giden (Otomatik Cevap)
    const mailToCustomer = {
      from: `"Üçüzler Bina Yönetimi" <${process.env.GMAIL_USER}>`,
      to: user_email,
      subject: `Mesajınız Bize Ulaştı`,
      html: `
        <h3>Sayın ${user_name},</h3>
        <p>Mesajınız tarafımıza ulaşmıştır. Ekibimiz en kısa sürede size dönüş yapacaktır.</p>
        <br>
        <p>Saygılarımızla,<br><strong>Üçüzler Bina Yönetimi</strong></p>
      `,
    };

    // Gönderim
    await Promise.all([
      transporter.sendMail(mailToAdmin),
      transporter.sendMail(mailToCustomer)
    ]);

    return NextResponse.json({ success: true, message: 'Başarılı' }, { status: 200 });

  } catch (error: any) {
    console.error('Sunucu Hatası:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}