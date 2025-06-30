import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExamsThunk } from "../../../../features/exam/examThunk";
import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWrong";
import NoData from "../../../ui/noData";
import ExamCard from "./ExamCard";

//parent render olsa bile proplar değişmediği sürece list render olmayacak
const ExamList = React.memo(({ search, user }) => {
  const dispatch = useDispatch();
  const examState = useSelector((state) => state.examState);
  const { examList = [], loading = false, error = null } = examState;

  useEffect(() => {
    const fetchExams = async () => {
      try {
        dispatch(getExamsThunk({ userId: user.id, userRole: user.role }));
      } catch (err) {
        throw new Error(err);
      }
    };
    if (user?.id && user?.role && examList.length === 0) {
      fetchExams();
    }
  }, [dispatch, user, examList]);

  //dependencyler değişmediği sürece yeniden filitrelemeyecek
  const filteredExams = useMemo(() => {
    if (search) {
      return examList.filter((exam) =>
        exam.title.toLowerCase().includes(search.trim().toLowerCase())
      );
    }
    return examList;
  }, [search, examList]);

  // Loading durumu
  if (loading) {
    return <Loading />;
  }

  // Error durumu
  if (error) {
    return <SomeThingWrong err={error} />;
  }

  if (filteredExams.length === 0 && !loading && !error) {
    return <NoData />;
  }

  return (
    <div className="w-full h-[440px] md:h-[460px] lg:h-[500px] flex flex-wrap justify-evenly overflow-y-auto">
      {filteredExams.map((exam) => (
        <ExamCard exam={exam} user={user} />
      ))}
    </div>
  );
});

export default ExamList;
