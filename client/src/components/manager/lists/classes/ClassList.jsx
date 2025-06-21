import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, Trash2, Users, Loader2, AlertCircle } from "lucide-react";
import { getClassesThunk } from "../../../../features/class/classThunk";
import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWrong";
import NoData from "../../../ui/noData";

const ClassList = ({ search, user }) => {
  const [filteredClasses, setFilteredClasses] = useState([]);
  const classState = useSelector((state) => state.classState);
  const { classList: classes = [], loading = false, error = null } = classState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id && classes.length === 0) {
      dispatch(getClassesThunk(user.id));
    }
  }, [dispatch, user?.id, classes.length]);

  useEffect(() => {
    if (search) {
      const filtered = classes.filter((classItem) =>
        classItem.className.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses(classes);
    }
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
        <table className="w-full">
          <thead>
            <tr className="border-b border-bg-quaternary">
              <th className="text-left py-4 px-4 text-text-secondary font-medium">
                Sınıf
              </th>
              <th className="text-left py-4 px-4 text-text-secondary font-medium">
                Sınıf Yılı
              </th>
              <th className="text-left py-4 px-4 text-text-secondary font-medium">
                Şube
              </th>
              <th className="text-left py-4 px-4 text-text-secondary font-medium">
                Kapasite
              </th>
              <th className="text-left py-4 px-4 text-text-secondary font-medium">
                Mevcut Öğrenci
              </th>
              <th className="text-left py-4 px-4 text-text-secondary font-medium">
                Oluşturma Tarihi
              </th>
              <th className="text-left py-4 px-4 text-text-secondary font-medium">
                Durum
              </th>
              {user?.position === "principal" && (
                <th className="text-right py-4 px-4 text-text-secondary font-medium">
                  İşlemler
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((classItem) => (
              <tr
                key={classItem.id}
                className="border-b border-bg-quaternary hover:bg-bg-secondary/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary uppercase">
                        {classItem.className}
                      </p>
                      {classItem.description && (
                        <p className="text-sm text-text-tertiary">
                          {classItem.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {classItem.classNumber}. sınıf
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex capitalize items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {classItem.classChar}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <p className="text-text-primary">{classItem.capacity}</p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-text-primary">
                      {classItem.currentStudents || 0}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-text-primary">
                    {classItem.createdAt
                      ? new Date(classItem.createdAt).toLocaleDateString(
                          "tr-TR"
                        )
                      : "Tarih Belirtilmemiş"}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      classItem.currentStudents >= classItem.capacity
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {classItem.currentStudents >= classItem.capacity
                      ? "Dolu"
                      : "Aktif"}
                  </span>
                </td>
                {user?.position === "principal" && (
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDelete(classItem.id)}
                        className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
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
};

export default ClassList;
