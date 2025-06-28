import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users, X, Calendar, UserCheck, Edit } from "lucide-react";
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
    <div className="bg-bg-tertiary rounded-2xl shadow-lg border border-bg-quaternary overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="h-[500px] overflow-y-auto overflow-x-auto">
          <table className="w-full">
            {/* Modern Table Header */}
            <thead className="bg-bg-quaternary backdrop-blur-sm">
              <tr className="border-b border-bg-quaternary">
                <th className="text-left py-6 px-6 text-text-secondary font-semibold text-sm tracking-wider uppercase">
                  Sınıf
                </th>
                <th className="text-left py-6 px-6 text-text-secondary font-semibold text-sm tracking-wider uppercase">
                  Mevcut Öğrenci
                </th>
                <th className="text-left py-6 px-6 text-text-secondary font-semibold text-sm tracking-wider uppercase">
                  Oluşturma Tarihi
                </th>
                <th className="text-left py-6 px-6 text-text-secondary font-semibold text-sm tracking-wider uppercase">
                  Durum
                </th>
                {user?.position === "principal" && (
                  <th className="text-center py-6 px-6 text-text-secondary font-semibold text-sm tracking-wider uppercase">
                    İşlemler
                  </th>
                )}
              </tr>
            </thead>

            {/* Modern Table Body */}
            <tbody className="bg-bg-secondary divide-y divide-bg-quaternary/30">
              {filteredClasses.map((classItem) => (
                <tr
                  key={classItem.id}
                  className="group transition-all duration-300 ease-out hover:bg-bg-quaternary hover:shadow-md"
                >
                  {/* Class Name Column */}
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-color-accent to-color-accent-light flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <Users className="w-7 h-7 text-text-primary" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-xl text-text-primary uppercase tracking-wide  transition-colors duration-200">
                          {classItem.className}
                        </p>
                        <p className="text-sm text-text-tertiary mt-1">
                          {classItem.classNumber}. sınıf - {classItem.classChar}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Current Students Column */}
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-color-success shadow-md animate-pulse"></div>
                      <div className="flex flex-col">
                        <p className="text-text-primary font-bold text-lg">
                          {classItem.currentStudents || 0} /{" "}
                          {classItem.capacity}
                        </p>
                        <p className="text-xs text-text-tertiary font-medium">
                          öğrenci
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Creation Date Column */}
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-color-accent-light" />
                      <div className="flex flex-col">
                        <p className="text-text-primary font-semibold">
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
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="py-6 px-6">
                    <span
                      className={`inline-flex items-center px-4 py-3 rounded-2xl text-sm font-semibold border shadow-sm transition-all duration-200 ${
                        classItem.state === false
                          ? "bg-color-danger/10 text-color-danger border-color-danger/20 hover:bg-color-danger/20"
                          : "bg-color-success/10 text-color-success border-color-success/20 hover:bg-color-success/20"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          classItem.state === false
                            ? "bg-color-danger"
                            : "bg-color-success"
                        } shadow-sm`}
                      ></div>
                      {classItem.state === false ? "Pasif" : "Aktif"}
                    </span>
                  </td>

                  {/* Actions Column */}
                  {user?.position === "principal" && (
                    <td className="py-6 px-6">
                      <div className="flex items-center justify-evenly">
                        <Button
                          onClick={() => handleDelete(classItem.id)}
                          type="danger"
                          size="sm"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button type="success" size="sm">
                          <Edit className="w-4 h-4" />
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

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden max-h-[480px] overflow-y-auto p-4 space-y-4">
        {filteredClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-bg-secondary/50 backdrop-blur-sm rounded-2xl p-5 border border-bg-quaternary/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-bg-quaternary/10"
          >
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-color-accent to-color-accent-light flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl text-text-primary uppercase tracking-wide truncate">
                    {classItem.className}
                  </h3>
                  <p className="text-sm text-text-tertiary mt-1">
                    {classItem.classNumber}. sınıf - {classItem.classChar}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {user?.position === "principal" && (
                  <>
                    <Button
                      onClick={() => handleDelete(classItem.id)}
                      type="danger"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button type="success" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-3">
              {/* Student Count */}
              <div className="flex items-center justify-between p-3 bg-bg-quaternary/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-color-success" />
                  <span className="text-text-secondary font-medium">
                    Öğrenci Sayısı
                  </span>
                </div>
                <span className="text-text-primary font-bold text-lg">
                  {classItem.currentStudents || 0} / {classItem.capacity}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-text-secondary font-medium">Durum</span>
                <span
                  className={`inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold border shadow-sm ${
                    classItem.state === false
                      ? "bg-color-danger/10 text-color-danger border-color-danger/20"
                      : "bg-color-success/10 text-color-success border-color-success/20"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      classItem.state === false
                        ? "bg-color-danger"
                        : "bg-color-success"
                    }`}
                  ></div>
                  {classItem.state === false ? "Pasif" : "Aktif"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ClassList;
