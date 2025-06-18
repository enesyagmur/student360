import * as yup from "yup";

export const lessonSchema = yup.object().shape({
  name: yup
    .string()
    .required("Ders adı zorunludur")
    .min(2, "Ders adı en az 2 karakter olmalıdır")
    .max(50, "Ders adı en fazla 50 karakter olmalıdır"),
  credit: yup
    .number()
    .required("Kredi zorunludur")
    .min(1, "Kredi en az 1 olmalıdır")
    .max(10, "Kredi en fazla 10 olmalıdır"),
  isActive: yup.boolean().required("Durum seçimi zorunludur"),
});
