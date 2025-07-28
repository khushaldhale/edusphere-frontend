import { useEffect } from "react";
import useFetchCourses from "../../hooks/useFetchCourses";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, Layers } from "lucide-react";
import { getAllBatches } from "../../redux/slices/batchSlice";
import { clear_exams, getExams } from "../../redux/slices/examSlice";
import { clear_mock, getMocks } from "../../redux/slices/mockSlice";
import { useLocation } from "react-router-dom";
import { getSubjects } from "../../redux/slices/subjectSlice";
import Loading from "../Loading";

const ExamFilter = ({
  selectedBatch,
  setSelectedBatch,
  selectedCourse,
  setSelectedCourse,
  exams,
  mocks,
}) => {
  const [courses, isLoading] = useFetchCourses();
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.batch.batches || []);
  const required_path = useLocation().pathname.split("/").at(-1);
  const is_loading = useSelector((state) => state.batch.isLoading);

  const get_batches = (event) => {
    const courseId = event?.target?.value;
    setSelectedCourse(courseId);
    if (exams?.length > 0) {
      dispatch(clear_exams());
    }
    if (mocks?.length > 0) {
      dispatch(clear_mock());
    }
    //  get subjects also
    if (courseId) {
      dispatch(getAllBatches({ course_id: courseId }));
      dispatch(getSubjects({ course_id: courseId }));
    }
  };

  const get_exams = (event) => {
    const batchId = event?.target?.value;
    setSelectedBatch(batchId);
    if (batchId) {
      dispatch(getExams({ batch_id: batchId }));
    }
  };

  const get_mocks = (event) => {
    const batchId = event?.target?.value;
    setSelectedBatch(batchId);
    dispatch(getMocks({ batch_id: batchId }));
  };

  if (isLoading || is_loading) {
    return <Loading></Loading>;
  }

  return (
    <form className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100 p-6 mb-8 flex flex-col md:flex-row gap-6 md:items-center">
      <div className="flex-1 space-y-1">
        <label
          htmlFor="course"
          className="flex items-center font-semibold text-gray-700 text-sm mb-1"
        >
          <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
          {required_path === "exams" ? "Exam" : "Course"}
        </label>
        <div className="relative">
          <select
            name="course"
            id="course"
            value={selectedCourse}
            onChange={get_batches}
            className="w-full px-4 py-3 border-2 rounded-xl
                  border-gray-200 focus:border-purple-500 focus:ring-purple-200 focus:ring-4 focus:ring-opacity-20 outline-none bg-white transition-all duration-200 appearance-none hover:border-gray-300"
          >
            <option value="">Select any course</option>
            {courses.length > 0 &&
              courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.course_name}
                </option>
              ))}
          </select>
          <BookOpen className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
        </div>
      </div>

      <div className="flex-1 space-y-1">
        <label
          htmlFor="batch"
          className="flex items-center font-semibold text-gray-700 text-sm mb-1"
        >
          <Layers className="w-4 h-4 mr-2 text-purple-600" />
          Batch
        </label>
        <div className="relative">
          <select
            name="batch"
            id="batch"
            value={selectedBatch}
            onChange={(event) => {
              if (required_path === "exams") {
                get_exams(event);
              } else {
                get_mocks(event);
              }
            }}
            className="w-full px-4 py-3 border-2 rounded-xl
                  border-gray-200 focus:border-purple-500 focus:ring-purple-200 focus:ring-4 focus:ring-opacity-20 outline-none bg-white transition-all duration-200 appearance-none hover:border-gray-300"
          >
            <option value="">Select any batch</option>
            {batches.length > 0 &&
              batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.name}
                </option>
              ))}
          </select>
          <Layers className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
        </div>
      </div>
    </form>
  );
};

export default ExamFilter;
