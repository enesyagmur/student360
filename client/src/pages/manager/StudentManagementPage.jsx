import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  addNewStudentThunk,
  fetchStudentsThunk,
} from "../../features/student/studentThunk";
import StudentList from "../../components/manager/lists/students/StudentList";
import { studentSchema } from "../../lib/validation/studentFormSchema";
import { getClassesThunk } from "../../features/class/classThunk";
import { studentAddToClassService } from "../../features/class/classService";
import PageHeader from "../../components/ui/pageHeader";

const StudentManagementPage = () => {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const user = useSelector((state) => state.authState.user);
  const dispatch = useDispatch();
  const [classes, setClasses] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentSchema),
  });
  const grade = watch("grade");
  const branch = watch("branch");

  // LocalStorage'dan kullanıcı bilgisini al
  useEffect(() => {
    if (user) {
      dispatch(fetchStudentsThunk(user.id));
    }
  }, [dispatch]);

  //sınıf seçimine göre uygun olan şubeleri alma
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const result = await dispatch(getClassesThunk(user.id)).unwrap();

        if (result) {
          const filteredClasses = result
            .filter((item) => item.classNumber === Number(grade))
            .filter((element) => element.currentStudentNumber < 25)
            .sort((a, b) => a.classChar.localeCompare(b.classChar));
          setClasses(filteredClasses);
        }
      } catch (err) {
        throw new Error(`Sınıfları çekerken sorun: ${err}`);
      }
    };

    if (grade !== 0 && user && user.id) {
      fetchClasses();
    }
  }, [dispatch, user, grade]);

  const onSubmit = async (data) => {
    try {
      if (!user?.id) {
        console.error("Kullanıcı ID'si bulunamadı");
        return;
      }
      const selectedClass = classes.find((item) => item.classChar === branch);

      const newData = {
        ...data,
        role: "student",
        classId: selectedClass.id,
        className: `${grade} - ${branch.toUpperCase()}`,
      };

      const student = await dispatch(
        addNewStudentThunk({ studentData: newData, currentUserId: user.id })
      ).unwrap();

      await studentAddToClassService(student, selectedClass.id, user.id);

      reset();
      setShowAddModal(false);
    } catch (err) {
      console.error("Öğrenci oluşturulurken bir hata oluştu:", err);
    }
  };

  return (
    <div className="flex-1 w-11/12 h-full bg-bg-primary text-text-primary">
      {/* header */}
      <PageHeader
        title={"Öğrenci Yönetimi"}
        search={search}
        setSearch={setSearch}
        setShowAddModal={setShowAddModal}
      />

      {/* Öğrenci Listesi */}
      <StudentList search={search} user={user} />

      {/* Yeni Öğrenci Ekleme Modalı */}
      {showAddModal && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <div className="bg-bg-primary rounded-xl p-6 w-full max-w-2xl shadow-xl">
            {/* Modal Başlık ve Kapatma Butonu */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-text-primary">
                Yeni Öğrenci Ekle
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-text-tertiary hover:text-text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sol Kolon */}
              <div className="space-y-4">
                {/* Ad Soyad */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                    placeholder="Öğrenci adı ve soyadı"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* TC Kimlik No */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    TC Kimlik No
                  </label>
                  <input
                    type="text"
                    {...register("tc")}
                    maxLength={11}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                    placeholder="11 haneli TC kimlik numarası"
                  />
                  {errors.tc && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.tc.message}
                    </p>
                  )}
                </div>

                {/* Doğum Tarihi */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Doğum Tarihi
                  </label>
                  <input
                    type="text"
                    {...register("birthDate")}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                    placeholder="GG/AA/YYYY"
                    maxLength={10}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 0) {
                        if (value.length > 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2);
                        }
                        if (value.length > 5) {
                          value = value.slice(0, 5) + "/" + value.slice(5);
                        }
                      }
                      e.target.value = value;
                    }}
                  />
                  {errors.birthDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                    placeholder="Öğrenci email adresi"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Sağ Kolon */}
              <div className="space-y-4">
                {/* Telefon */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Telefon
                  </label>
                  <input
                    type="text"
                    {...register("phone")}
                    maxLength={10}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                    placeholder="10 haneli telefon numarası"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Durum */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Durum
                  </label>
                  <select
                    {...register("active")}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                  >
                    <option value="true">Aktif</option>
                    <option value="false">Pasif</option>
                  </select>
                  {errors.active && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.active.message}
                    </p>
                  )}
                </div>

                {/* Sınıf Seçimi */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Sınıf
                  </label>
                  <select
                    {...register("grade")}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                  >
                    <option value="">Sınıf Seçiniz</option>
                    {[5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}. Sınıf
                      </option>
                    ))}
                  </select>
                  {errors.grade && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.grade.message}
                    </p>
                  )}
                </div>

                {/* Şube Seçimi */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Şube
                  </label>
                  <select
                    {...register("branch")}
                    className="w-full bg-bg-secondary capitalize rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                  >
                    <option value="">Şube Seçiniz</option>
                    {classes.map((item) => (
                      <option
                        className="capitalize"
                        key={item.id}
                        value={item.classChar}
                      >
                        {item.classChar} Şubesi
                      </option>
                    ))}
                  </select>
                  {errors.branch && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.branch.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Alt Butonları */}
            <div className="flex gap-3 mt-8">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-bg-secondary hover:bg-bg-tertiary text-text-primary py-3 px-4 rounded-lg transition-colors border border-bg-tertiary"
              >
                İptal
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg transition-colors"
              >
                Öğrenci Ekle
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentManagementPage;
