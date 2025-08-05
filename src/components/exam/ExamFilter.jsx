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
    return <Loading />;
  }

  return (
    <form className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Course Select */}
      <div className="space-y-2 relative">
        <label
          htmlFor="course"
          className="block text-sm font-medium text-gray-700 flex items-center"
        >
          <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
          {required_path === "exams" ? "Exam" : "Course"}{" "}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            name="course"
            id="course"
            value={selectedCourse}
            onChange={get_batches}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-gray-400"
          >
            <option value="">Select a course</option>
            {courses.length > 0 &&
              courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.course_name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Batch Select */}
      <div className="space-y-2 relative">
        <label
          htmlFor="batch"
          className="block text-sm font-medium text-gray-700 flex items-center"
        >
          <Layers className="w-5 h-5 mr-2 text-blue-600" />
          Batch <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-gray-400"
          >
            <option value="">Select a batch</option>
            {batches.length > 0 &&
              batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default ExamFilter;
