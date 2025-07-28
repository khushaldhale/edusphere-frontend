import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentsViaBatch } from "../../redux/slices/studentsSlice";
import { useParams } from "react-router-dom";
import StudentsCard from "../students/StudentsCard";
import useFetchCourses from "../../hooks/useFetchCourses";
import Loading from "../Loading";

const BatchStudents = () => {
  const students = useSelector((state) => {
    return state.student.students;
  });
  const dispatch = useDispatch();
  const batch_id = useParams().id;
  const [courses, isLoading] = useFetchCourses();
  const is_loading = useSelector((state) => {
    return state.student.isLoading;
  });

  useEffect(() => {
    dispatch(studentsViaBatch({ batch_id }));
  }, []);

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
            No student is enrolled yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchStudents;
