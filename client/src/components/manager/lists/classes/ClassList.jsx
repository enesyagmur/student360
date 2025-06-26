import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users, X } from "lucide-react";
import { getClassesThunk } from "../../../../features/class/classThunk";
import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWrong";
import NoData from "../../../ui/noData";
import Button from "../../../ui/button";

//parent render olsa bile proplar değişmediği sürece render edilmeyecek
const ClassList = React.memo(({ search, user }) => {
  const classState = useSelector((state) => state.classState);
  const { classList: classes = [], loading = false, error = null } = classState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id && classes.length === 0) {
      dispatch(getClassesThunk(user.id));
    }
  }, [dispatch, user?.id, classes.length]);

  //dependency ler değişmediği sürece filtreleme işlemi yapmayacak
  const filteredClasses = useMemo(() => {
    if (search) {
      return classes.filter((classItem) =>
        classItem.className.toLowerCase().includes(search.toLowerCase())
      );
    }
    return classes;
  }, [search, classes]);

  const handleDelete = (classId) => {
    // Silme işlemi için gerekli fonksiyon
    console.log("Sil:", classId);
  };

  // Loading durumu
  if (loading) {
    return <Loading />;
  }

  // Error durumu
  if (error) {
    return <SomeThingWrong err={error} />;
  }

  if (filteredClasses.length === 0 && !loading && !error) {
    return <NoData />;
  }

  return (
    <div className="bg-bg-tertiary h-[500px] rounded-lg p-6 overflow-y-auto">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          {/* Modern Table Header */}
          <thead className="bg-bg-tertiary">
            <tr className="border-b border-bg-quaternary">
              <th className="text-left py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                Sınıf
              </th>
              <th className="text-left py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                Sınıf Yılı
              </th>
              <th className="text-left py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                Şube
              </th>
              <th className="text-left py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                Mevcut Öğrenci
              </th>
              <th className="text-left py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                Oluşturma Tarihi
              </th>
              <th className="text-left py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                Durum
              </th>
              {user?.position === "principal" && (
                <th className="text-center py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                  İşlemler
                </th>
              )}
            </tr>
          </thead>

          {/* Modern Table Body */}
          <tbody className="bg-bg-secondary divide-y divide-bg-quaternary">
            {filteredClasses.map((classItem, index) => (
              <tr
                key={classItem.id}
                className={`
                  group transition-all duration-200 ease-out
                  hover:bg-bg-tertiary hover:shadow-sm
                  ${index % 2 === 0 ? "bg-bg-secondary" : "bg-bg-primary/30"}
                `}
              >
                {/* Class Name Column */}
                <td className="py-5 px-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-color-accent to-color-accent-light flex items-center justify-center shadow-md">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-lg text-text-primary uppercase tracking-wide">
                        {classItem.className}
                      </p>
                      {classItem.description && (
                        <p className="text-sm text-text-tertiary mt-1 truncate">
                          {classItem.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Class Year Column */}
                <td className="py-5 px-6">
                  <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium bg-color-accent/10 text-color-accent border border-color-accent/20">
                    {classItem.classNumber}. sınıf
                  </span>
                </td>

                {/* Class Section Column */}
                <td className="py-5 px-6">
                  <span className="inline-flex capitalize items-center px-3 py-2 rounded-xl text-sm font-medium bg-color-accent-light/10 text-color-accent-light border border-color-accent-light/20">
                    {classItem.classChar}
                  </span>
                </td>

                {/* Current Students Column */}
                <td className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-color-success shadow-sm"></div>
                    <div className="flex flex-col">
                      <p className="text-text-primary font-medium text-base">
                        {classItem.currentStudents || 0} / {classItem.capacity}
                      </p>
                      <p className="text-xs text-text-tertiary">öğrenci</p>
                    </div>
                  </div>
                </td>

                {/* Creation Date Column */}
                <td className="py-5 px-6">
                  <div className="flex flex-col">
                    <p className="text-text-primary font-medium">
                      {classItem.createdAt
                        ? new Date(classItem.createdAt).toLocaleDateString(
                            "tr-TR"
                          )
                        : "Tarih Belirtilmemiş"}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {classItem.createdAt
                        ? new Date(classItem.createdAt).toLocaleDateString(
                            "tr-TR",
                            {
                              weekday: "long",
                            }
                          )
                        : ""}
                    </p>
                  </div>
                </td>

                {/* Status Column */}
                <td className="py-5 px-6">
                  <span
                    className={`inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium border ${
                      classItem.currentStudents >= classItem.capacity
                        ? "bg-color-danger/10 text-color-danger border-color-danger/20"
                        : "bg-color-success/10 text-color-success border-color-success/20"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        classItem.currentStudents >= classItem.capacity
                          ? "bg-color-danger"
                          : "bg-color-success"
                      }`}
                    ></div>
                    {classItem.currentStudents >= classItem.capacity
                      ? "Dolu"
                      : "Aktif"}
                  </span>
                </td>

                {/* Actions Column */}
                {user?.position === "principal" && (
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-center">
                      <Button
                        onClick={() => handleDelete(classItem.id)}
                        type="danger"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default ClassList;
