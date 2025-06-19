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
  targets: yup
    .array()
    .of(yup.string())
    .min(1, "En az bir hedef seçmelisiniz")
    .required("Duyurunun kimlere gösterileceğini seçmelisiniz"),
  // Eğer sınıf seçimi gerekiyorsa:
  classes: yup.array().of(yup.string()),
});
