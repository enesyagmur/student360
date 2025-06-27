import * as Yup from "yup";

export const teacherSchema = Yup.object({
  fullName: Yup.string()
    .required("İsim zorunludur.")
    .max(50, "En fazla 50 karakter içermelidir.")
    .min(6, "En az 6 karakter içermelidir."),
  tc: Yup.string()
    .required("Boş bırakılamaz.")
    .matches(/^\d{11}$/, "Kimlik numarası 11 adet rakam içermelidir"),

  email: Yup.string()
    .email("Geçerli bir Email giriniz.")
    .required("Email boş bırakılamaz.")
    .max(50, " Email en fazla 50 karakter içermelidir."),

  phone: Yup.string()
    .required("Boş bırakılamaz.")
    .matches(/^\d{10}$/, "Telefon numarası 10 adet rakam içermelidir."),
  position: Yup.string().required("Branş seçimi zorunludur.").oneOf(
    [
      "mathematics", // Matematik
      "physics", // Fizik
      "chemistry", // Kimya
      "biology", // Biyoloji
      "turkish", // Türkçe
      "english", // İngilizce
      "german", // Almanca (eklemek istersen)
      "literature", // Türk Dili ve Edebiyatı
      "history", // Tarih
      "geography", // Coğrafya
      "social_sciences", // Sosyal Bilgiler
      "science", //fen bilgileri
      "physical_education", // Beden Eğitimi
      "music", // Müzik
      "art", // Resim / Görsel Sanatlar
      "religion", // Din Kültürü ve Ahlak Bilgisi
      "philosophy", // Felsefe
      "computer_science", // Bilgisayar
      "technology_design", // Teknoloji ve Tasarım
    ],
    "Geçerli bir branş seçiniz."
  ),
  level: Yup.string()
    .required("Öğretmen düzey seçimi zorunludur")
    .oneOf(
      ["middle_school", "high_school"],
      "Lütfen geçerli bir düzey seçiniz."
    ),
  active: Yup.boolean().required("Durum seçimi zorunludur"),
});
