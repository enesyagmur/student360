import * as Yup from "yup";

export const studentSchema = Yup.object({
  fullName: Yup.string()
    .required("İsim zorunludur.")
    .max(50, "En fazla 50 karakter içermelidir.")
    .min(6, "En az 6 karakter içermelidir."),
  tc: Yup.string()
    .required("Boş bırakılamaz.")
    .matches(/^\d{11}$/, "Kimlik numarası 11 adet rakam içermelidir"),
  birthDate: Yup.string()
    .required("Doğum tarihi zorunludur.")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Geçerli bir tarih giriniz (GG/AA/YYYY)"
    )
    .test("is-valid-date", "Geçerli bir tarih giriniz", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      return (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year &&
        date <= new Date() &&
        date >= new Date(1950, 0, 1)
      );
    }),
  email: Yup.string()
    .email("Geçerli bir Email giriniz.")
    .required("Email boş bırakılamaz.")
    .max(50, "Email en fazla 50 karakter içermelidir."),
  phone: Yup.string()
    .required("Boş bırakılamaz.")
    .matches(/^\d{10}$/, "Telefon numarası 10 adet rakam içermelidir."),
  active: Yup.boolean().required("Durum seçimi zorunludur."),
  grade: Yup.number()
    .required("Sınıf seçimi zorunludur.")
    .min(5, "Geçerli bir sınıf seçiniz.")
    .max(12, "Geçerli bir sınıf seçiniz."),
  branch: Yup.string().required("Şube seçimi zorunludur."),
});
