import * as yup from "yup";

const scheduleSchema = yup.object().shape({
  classId: yup.string().required("Sınıf seçimi zorunlu"),
  table: yup
    .object()
    .test(
      "table-filled",
      "Tüm ders ve öğretmen seçimleri yapılmalı",
      (value) => {
        // Her gün ve her ders için lessonId ve teacherId dolu olmalı
        return Object.values(value).every((dayArr) =>
          dayArr.every((cell) => cell.lessonId && cell.teacherId)
        );
      }
    ),
});

export default scheduleSchema;
