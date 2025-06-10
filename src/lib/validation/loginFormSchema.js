import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Geçersiz Email.")
    .required("Email Alanı Boş Bırakılamaz.")
    .max(50, " Email en fazla 50 karakter içermelidir."),

  password: Yup.string()
    .required("Şifre Alanı Boş Bırakılamaz.")
    .min(8, "Şifre en az 8 karakter içermelidir.")
    .max(50, " Şifre en fazla 50 karakter içermelidir."),
});
