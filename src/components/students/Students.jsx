import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notBatchStudents } from "../../redux/slices/studentsSlice";
import useFetchCourses from "../../hooks/useFetchCourses";
import { useNavigate } from "react-router-dom";
import StudentsCard from "./StudentsCard";
import Loading from "../Loading";

const Students = () => {
  const students = useSelector(
    (state) => state.student.students_no_batch || []
  );
  const dispatch = useDispatch();
  const [courses, isLoading] = useFetchCourses();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(notBatchStudents());
  }, [dispatch]);

  const is_loading = useSelector((state) => {
    return state.student.isLoading;
  });

  if (isLoading || is_loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 flex justify-center items-center gap-3">
          Students
        </h1>

        {students.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {students.map((student, idx) => {
              // Try to get course name for this student
              const course = courses.find(
                (c) => c._id === student.course_interested
              );
              return (
                <StudentsCard
                  key={idx}
                  student={student}
                  idx={idx}
                  course={course}
                ></StudentsCard>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32 text-gray-600 italic text-lg">
            All students are already enrolled in batches!
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
