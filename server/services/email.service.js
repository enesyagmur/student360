const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
});

const sendWelcomeEmail = async (email, fullName, password) => {
  try {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
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

    await transporter.sendMail(mailOptions);
    console.log(`Hoş geldiniz maili gönderildi: ${email}`);
    return true;
  } catch (err) {
    console.error("Mail gönderme hatası:", error);
    throw new Error("Mail gönderilemedi");
  }
};

module.exports = {
  sendWelcomeEmail,
};
