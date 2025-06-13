const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.VITE_EMAIL_USER,
    pass: process.env.VITE_EMAIL_PASSWORD,
  },
  debug: true,
});

const sendWelcomeEmail = async (email, fullName, password) => {
  try {
    console.log("Mail gönderme işlemi başladı");
    console.log("Gönderici:", process.env.VITE_EMAIL_USER);
    console.log("Alıcı:", email);

    if (!process.env.VITE_EMAIL_USER || !process.env.VITE_EMAIL_PASSWORD) {
      console.error("E-posta yapılandırması eksik:");
      console.error(
        "EMAIL_USER:",
        process.env.VITE_EMAIL_USER ? "Tanımlı" : "Tanımlı değil"
      );
      console.error(
        "EMAIL_PASSWORD:",
        process.env.VITE_EMAIL_PASSWORD ? "Tanımlı" : "Tanımlı değil"
      );
      throw new Error("E-posta yapılandırması eksik");
    }

    const mailOptions = {
      from: process.env.VITE_EMAIL_USER,
      to: email,
      subject: "Student360 - Hoş Geldiniz",
      html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Student360'a Hoş Geldiniz!</h2>
          <p>Sayın ${fullName},</p>
          <p>Student360 sistemine başarıyla kaydoldunuz. Aşağıda hesabınıza giriş yapabilmeniz için gerekli bilgileri bulabilirsiniz:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Şifre:</strong> ${password}</p>
          </div>
          <p>Güvenliğiniz için lütfen ilk girişinizde şifrenizi değiştirmeyi unutmayın.</p>
          <p>Herhangi bir sorunuz olursa bizimle iletişime geçebilirsiniz.</p>
          <p>Saygılarımızla,<br>Student360 Ekibi</p>
        </div>`,
    };

    console.log("Mail gönderiliyor...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail başarıyla gönderildi:", info.messageId);
    return true;
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    console.error("Hata detayları:", error.message);
    throw error;
  }
};

module.exports = {
  sendWelcomeEmail,
};
