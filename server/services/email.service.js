const nodemailer = require("nodemailer");
require("dotenv").config();

// Email transporter oluştur
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail adresiniz
    pass: process.env.EMAIL_PASS, // Gmail uygulama şifreniz
  },
});

const sendWelcomeEmail = async (to, password, fullName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Öğrenci360 - Hoş Geldiniz!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">Hoş Geldiniz!</h2>
          <p>Sayın ${fullName},</p>
          <p>Öğrenci360 sistemine hoş geldiniz. Hesabınız başarıyla oluşturuldu.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Giriş Bilgileriniz:</strong></p>
            <p style="margin: 5px 0;">E-posta: ${to}</p>
            <p style="margin: 5px 0;">Şifre: <strong>${password}</strong></p>
          </div>
          <p>Güvenliğiniz için lütfen ilk girişinizde şifrenizi değiştirmeyi unutmayın.</p>
          <p>Herhangi bir sorunuz olursa bizimle iletişime geçebilirsiniz.</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">Bu e-posta Öğrenci360 sistemi tarafından otomatik olarak gönderilmiştir.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email gönderildi:", info.messageId);
    return info;
  } catch (err) {
    console.error("Email gönderme hatası:", err);
    throw err;
  }
};

module.exports = {
  sendWelcomeEmail,
};
