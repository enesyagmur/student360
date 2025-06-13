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
  position: Yup.string()
    .required("Branş seçimi zorunludur.")
    .oneOf(
      [
        "matematik",
        "fizik",
        "kimya",
        "biyoloji",
        "turkce",
        "ingilizce",
        "tarih",
        "cografya",
        "beden",
        "muzik",
        "resim",
        "din",
        "felsefe",
        "bilgisayar",
      ],
      "Geçerli bir branş seçiniz."
    ),
});
