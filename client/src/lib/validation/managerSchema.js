import * as Yup from "yup";

export const managerSchema = Yup.object({
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
  position: Yup.string().oneOf([
    "principal",
    "assistant principal",
    "officer",
    "IT",
    "counselor",
  ]),
});
