import { useDispatch, useSelector } from "react-redux";
import useFetchCourses from "../../hooks/useFetchCourses";
import { getAllBatches } from "../../redux/slices/batchSlice";
import { getSubjects } from "../../redux/slices/subjectSlice";
import useForm from "../../hooks/useForm";
import { createExam, updateExam } from "../../redux/slices/examSlice";
import {
  FileText,
  Layers,
  BookOpen,
  Users,
  ListChecks,
  Timer,
  Calendar,
  Hash,
  AlertCircle,
  ScrollText,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Loading from "../Loading";

const CreateExam = () => {
  const [courses] = useFetchCourses();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  const is_loading = useSelector((state) => state.exam.isLoading);
  const required_path = location.pathname.split("/").at(-1);
  const batches = useSelector((state) => state.batch.batches || []);
  const subjects = useSelector((state) => state.subject.subjects || []);
  const durationRef = useRef();
  const marksRef = useRef();

  let thunk;
  if (required_path === "update") {
    thunk = updateExam;
    data.exam_date = data?.exam_date?.split("T")[0];
  } else {
    thunk = createExam;
  }

  const validate = (input_name, value) => {
    switch (input_name) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (value.length < 2) return "Minimum 2 characters are required.";
        break;
      case "desc":
        if (!value.trim()) return "Description is required.";
        if (value.length < 10) return "Minimum 10 characters are required.";
        break;
      case "subject":
        if (!value.trim()) return "Subject is required.";
        break;
      case "total_marks":
        if (typeof value !== "number") return "Provide Number only.";
        if (value < 10) return "Minimum marks for the exam is 10.";
        break;
      case "duration":
        if (typeof value !== "number") return "Provide Number only.";
        if (value < 15) return "Minimum time for the exam is 15.";
        break;
      case "exam_date":
        if (new Date(value) < new Date(Date.now()))
          return "Date cannot be in past.";
        break;
      case "course":
        if (!value.trim()) return "Course is required.";
        break;
      case "batch":
        if (!value.trim()) return "Batch is required.";
        break;
      default:
        return "";
    }
    return "";
  };

  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      name: data?.name || "",
      course: data?.course || "",
      batch: data?.batch || "",
      subject: data?.subject || "",
      total_marks: data?.total_marks || "",
      duration: data?.duration || "",
      exam_date: data?.exam_date || "",
      exam_id: data?._id || "",
    },
    thunk,
    validate,
    "/dashboard/exams",
    "exam"
  );

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, course: value, batch: "", subject: "" }));
    dispatch(getAllBatches({ course_id: value })).then((action) => {
      if (action.payload?.success) {
        dispatch(getSubjects({ course_id: value }));
      }
    });
  };

  useEffect(() => {
    if (required_path === "update") {
      durationRef.current.value = data.duration;
      marksRef.current.value = data.total_marks;
      dispatch(getSubjects({ course_id: data.course }));
    }
  }, [dispatch, data, required_path]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, subject: data?.subject }));
  }, [subjects, data, setFormData]);

  if (is_loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ScrollText className="w-7 h-7 text-blue-600" />
          {required_path === "update" ? "Update" : "Create New"} Exam
        </h2>
        <form onSubmit={submitHandler} className="space-y-8" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exam Name */}
            <div className="space-y-2 relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Exam Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="name"
                name="name"
                placeholder="Enter exam name (e.g., Midterm)"
                value={formData.name}
                onChange={changeHandler}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Course */}
            <div className="space-y-2 relative">
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Course <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleCourseChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.course
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
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
              {errors.course && (
                <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.course}
                </p>
              )}
            </div>

            {/* Batch */}
            <div className="space-y-2 relative">
              <label
                htmlFor="batch"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Batch <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  id="batch"
                  name="batch"
                  value={formData.batch}
                  onChange={changeHandler}
                  disabled={!formData.course}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    !formData.course
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                      : errors.batch
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
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
              {errors.batch && (
                <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.batch}
                </p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2 relative">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <Layers className="w-5 h-5 mr-2 text-blue-600" />
                Subject <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={changeHandler}
                  disabled={!formData.batch}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    !formData.batch
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                      : errors.subject
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select a subject</option>
                  {subjects.length > 0 &&
                    subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors.subject && (
                <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Total Marks */}
            <div className="space-y-2 relative">
              <label
                htmlFor="total_marks"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <Hash className="w-5 h-5 mr-2 text-blue-600" />
                Total Marks <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                id="total_marks"
                name="total_marks"
                min="0"
                placeholder="e.g., 100"
                value={formData.total_marks}
                onChange={changeHandler}
                ref={marksRef}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.total_marks
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300"
                }`}
              />
              {errors.total_marks && (
                <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.total_marks}
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="space-y-2 relative">
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <Timer className="w-5 h-5 mr-2 text-blue-600" />
                Duration (minutes) <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                min="0"
                placeholder="e.g., 120"
                value={formData.duration}
                onChange={changeHandler}
                ref={durationRef}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.duration
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300"
                }`}
              />
              {errors.duration && (
                <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.duration}
                </p>
              )}
            </div>
          </div>

          {/* Exam date (full width) */}
          <div className="space-y-2 relative">
            <label
              htmlFor="exam_date"
              className="block text-sm font-medium text-gray-700 flex items-center"
            >
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Exam Date <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="datetime-local"
              id="exam_date"
              name="exam_date"
              value={formData.exam_date}
              onChange={changeHandler}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.exam_date
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300"
              }`}
            />
            {errors.exam_date && (
              <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.exam_date}
              </p>
            )}
          </div>

          {/* Submit Button (full width) */}
          <button
            type="submit"
            className="flex items-center gap-2 justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6"
          >
            <ScrollText className="w-5 h-5" />
            {required_path === "update" ? "Update" : "Create"} Exam
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
