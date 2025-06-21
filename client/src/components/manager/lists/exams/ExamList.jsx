import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExamsThunk } from "../../../../features/exam/examThunk";

import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWron";
import ExamCard from "./ExamCard";
import NoData from "../../../ui/noData";

const ExamList = ({ search, user }) => {
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

  const filteredExams = examList.filter((exam) =>
    exam.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="w-full mt-6">
      {loading ? (
        <Loading />
      ) : error ? (
        <SomeThingWrong err={error} />
      ) : filteredExams.length === 0 ? (
        <NoData />
      ) : (
        <div className="h-[450px] overflow-y-auto flex flex-wrap gap-6">
          {filteredExams.map((exam) => (
            <ExamCard exam={exam} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamList;
