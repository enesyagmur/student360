import * as yup from "yup";

export const announcementSchema = yup.object().shape({
  title: yup
    .string()
    .required("Başlık zorunludur")
    .min(3, "Başlık en az 3 karakter olmalıdır")
    .max(100, "Başlık en fazla 100 karakter olabilir"),
  content: yup
    .string()
    .required("İçerik zorunludur")
    .min(10, "İçerik en az 10 karakter olmalıdır")
    .max(1000, "İçerik en fazla 1000 karakter olabilir"),
  target: yup
    .string()
    .oneOf(["everyone", "teachers", "students"], "Geçersiz hedef")
    .required("Hedef seçimi zorunlu"),
});
