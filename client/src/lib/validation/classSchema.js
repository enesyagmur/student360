import * as Yup from "yup";

export const classSchema = Yup.object({
  classNumber: Yup.number()
    .required("Sınıf numarası zorunludur.")
    .min(5, "Sınıf numarası 5'den küçük olamaz.")
    .max(12, "12'den büyük bir sınıf oluşturulamaz."),
  classChar: Yup.string()
    .required("Sınıf şubesi zorunludur.")
    .matches(/^[A-Za-z]$/, "Şube tek harf olmalıdır."),
  capacity: Yup.number()
    .required("Kapasite zorunludur.")
    .min(1, "Kapasite 1'den küçük olamaz.")
    .max(50, "Kapasite 50'den büyük olamaz."),
  state: Yup.boolean().required("Aktiflik durumu zorunludur.").default(true),
});
