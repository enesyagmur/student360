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
        "mathematics",
        "physics",
        "chemistry",
        "biology",
        "turkish",
        "english",
        "history",
        "geography",
        "physical_education",
        "music",
        "art",
        "religion",
        "philosophy",
        "computer",
      ],
      "Geçerli bir branş seçiniz."
    ),
  level: Yup.string()
    .required("Öğretmen düzey seçimi zorunludur")
    .oneOf(
      ["middle_school"],
      ["high_school"],
      "Lütfen geçerli bir düzey seçiniz."
    ),
  active: Yup.boolean().required("Durum seçimi zorunludur"),
});
