import { useDispatch, useSelector } from "react-redux";
import useFetchCourses from "../../hooks/useFetchCourses";
import {
  BookOpen,
  Layers,
  ScrollText,
  ListChecks,
  Hash,
  Timer,
  Calendar,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { getAllBatches } from "../../redux/slices/batchSlice";
import { deleteExam, getExams } from "../../redux/slices/examSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Exams = () => {
  const [courses, isLoading] = useFetchCourses();
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.batch.batches || []);
  const exams = useSelector((state) => state.exam.exams || []);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const navigate = useNavigate();

  const get_batches = (event) => {
    const courseId = event?.target?.value;
    setSelectedCourse(courseId);
    setSelectedBatch(""); // reset batch when new course selected
    if (courseId) {
      dispatch(getAllBatches({ course_id: courseId }));
    }
  };

  const get_exams = (event) => {
    const batchId = event?.target?.value;
    setSelectedBatch(batchId);
    if (batchId) {
      dispatch(getExams({ batch_id: batchId }));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ScrollText className="w-8 h-8 text-purple-600" />
          Exams
        </h1>

        {/* Select Filters */}
        <form className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100 p-6 mb-8 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="flex-1 space-y-1">
            <label
              htmlFor="course"
              className="flex items-center font-semibold text-gray-700 text-sm mb-1"
            >
              <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
              Course
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
                onChange={get_exams}
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

        {/* Exams List */}
        {exams.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ScrollText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    {exam.name}
                  </h2>
                </div>
                <p className="text-gray-700 mb-3">{exam.desc}</p>
                <div className="flex flex-col gap-2 text-gray-700 text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold">Total Marks:</span>{" "}
                    {exam.total_marks}
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">Duration:</span>{" "}
                    {exam.duration} min
                  </div>
                  <div className="flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-purple-500" />
                    <span className="font-semibold">Subject:</span>{" "}
                    {exam.subject}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">Exam Date:</span>{" "}
                    {exam.exam_date?.split("T")[0]}
                  </div>
                </div>

                {/*   action  buttons */}
                <button
                  onClick={() => {
                    dispatch(deleteExam({ exam_id: exam._id })).then(
                      (action) => {
                        if (action.payload.success) {
                          toast.success(action.payload.message);
                        } else {
                          toast.error(action.payload.message);
                        }
                      }
                    );
                  }}
                >
                  Delete Exam{" "}
                </button>
                <button
                  onClick={() => {
                    navigate("/dashboard/exams/update", {
                      state: exam,
                    });
                  }}
                >
                  Update Exam{" "}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 text-gray-600 italic text-lg">
            {selectedBatch
              ? "No exams found for this batch."
              : "First select a course and batch to view exams."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exams;
