import * as Yup from "yup";

const examSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Başlık en az 3 karakter olmalı")
    .max(100, "Başlık en fazla 100 karakter olabilir")
    .required("Başlık zorunludur"),
  term: Yup.number()
    .oneOf([1, 2], "Dönem 1 veya 2 olmalı")
    .required("Dönem zorunludur"),
  lesson: Yup.object({
    id: Yup.string().required("Ders ID zorunludur"),
    name: Yup.string().required("Ders adı zorunludur"),
  })
    .typeError("Ders bilgisi zorunludur")
    .required("Ders bilgisi zorunludur"),
  grade: Yup.number()
    .min(1, "Sınıf en az 1 olmalı")
    .max(12, "Sınıf en fazla 12 olabilir")
    .required("Sınıf zorunludur"),
  examDate: Yup.date()
    .typeError("Geçerli bir tarih giriniz")
    .required("Sınav tarihi zorunludur"),
  active: Yup.boolean().required("Aktiflik durumu zorunludur"),
  creatorName: Yup.string()
    .min(2, "Oluşturan adı en az 2 karakter olmalı")
    .max(50, "Oluşturan adı en fazla 50 karakter olabilir")
    .required("Oluşturan adı zorunludur"),
  creatorId: Yup.string().required("Oluşturan ID zorunludur"),
  description: Yup.string()
    .max(500, "Açıklama en fazla 500 karakter olabilir")
    .nullable(),
});

export default examSchema;
