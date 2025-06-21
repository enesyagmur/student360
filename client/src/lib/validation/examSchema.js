import * as Yup from "yup";

const examSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Başlık en az 3 karakter olmalı")
    .max(100, "Başlık en fazla 100 karakter olabilir")
    .required("Başlık zorunludur"),
  term: Yup.number()
    .oneOf([1, 2], "Dönem 1 veya 2 olmalı")
    .required("Dönem zorunludur"),
  lessonId: Yup.string().required("Ders seçimi zorunludur"),
  grade: Yup.number()
    .min(1, "Sınıf en az 1 olmalı")
    .max(12, "Sınıf en fazla 12 olabilir")
    .required("Sınıf zorunludur"),
  examDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Tarih formatı YYYY-AA-GG şeklinde olmalı")
    .required("Sınav tarihi zorunludur"),
  examTime: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Saat formatı HH:MM olmalı")
    .required("Sınav saati zorunludur"),
  active: Yup.boolean().required("Aktiflik durumu zorunludur"),
  description: Yup.string()
    .max(500, "Açıklama en fazla 500 karakter olabilir")
    .nullable(),
});

export default examSchema;
