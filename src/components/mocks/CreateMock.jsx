import { useDispatch, useSelector } from "react-redux";
import useFetchCourses from "../../hooks/useFetchCourses";
import { getAllBatches } from "../../redux/slices/batchSlice";
import { getSubjects } from "../../redux/slices/subjectSlice";
import useForm from "../../hooks/useForm";
import { createMock, updateMock } from "../../redux/slices/mockSlice";
import {
  FileText,
  BookOpen,
  ListChecks,
  Layers,
  Hash,
  AlertCircle,
  ScrollText,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Loading from "../Loading";

const CreateMock = () => {
  const [courses, isLoading] = useFetchCourses();
  const location = useLocation();
  const data = location.state;
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.batch.batches || []);
  const subjects = useSelector((state) => state.subject.subjects || []);
  const marksRef = useRef();
  const required_path = location.pathname.split("/").at(-1);
  const is_loading = useSelector((state) => state.mock.isLoading);

  const thunk = required_path === "update" ? updateMock : createMock;

  const validate = (input_name, value) => {
    switch (input_name) {
      case "name":
        if (!value.trim()) return "Mock Name is required.";
        if (value.length < 2) return "Minimum 2 characters are required.";
        break;
      case "desc":
        if (!value.trim()) return "Mock description is required.";
        if (value.length < 10) return "Minimum 10 characters are required.";
        break;
      case "total_marks":
        if (typeof value !== "number") return "Valid Input is required.";
        if (value < 10) return "Minimum Marks are 10.";
        break;
      case "course":
        if (!value.trim()) return "Course is required.";
        break;
      case "subject":
        if (!value.trim()) return "Subject is required.";
        break;
      case "batch_id":
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
      total_marks: data?.total_marks || "",
      course: data?.course || "",
      subject: data?.subject || "",
      batch_id: data?.batch_id || "",
      mock_id: data?._id || "",
    },
    thunk,
    validate,
    "/dashboard/mocks",
    "mock"
  );

  const handleCourseChange = (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      course: value,
      batch_id: "",
      subject: "",
    }));
    dispatch(getAllBatches({ course_id: value }));
    dispatch(getSubjects({ course_id: value }));
    changeHandler(event);
  };

  useEffect(() => {
    if (required_path === "update") {
      marksRef.current.value = data.total_marks;
    }
    if (required_path === "add") {
      marksRef.current.value = "";
      setFormData({
        name: "",
        desc: "",
        total_marks: "",
        course: "",
        subject: "",
        batch_id: "",
        mock_id: "",
      });
    }
  }, [required_path, data, setFormData]);

  if (isLoading || is_loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ScrollText className="w-7 h-7 text-blue-600" />
          {required_path === "update" ? "Update Mock" : "Create Mock"}
        </h2>
        <form onSubmit={submitHandler} className="space-y-8" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2 relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Mock Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter mock title"
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
                min="0"
                id="total_marks"
                name="total_marks"
                required
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
                  name="course"
                  id="course"
                  required
                  value={formData.course}
                  onChange={handleCourseChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.course
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select any course</option>
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
                htmlFor="batch_id"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <Layers className="w-5 h-5 mr-2 text-blue-600" />
                Batch <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="batch_id"
                  id="batch_id"
                  required
                  value={formData.batch_id}
                  onChange={changeHandler}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.batch_id
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select any batch</option>
                  {batches.length > 0 &&
                    batches.map((batch) => (
                      <option key={batch._id} value={batch._id}>
                        {batch.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors.batch_id && (
                <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.batch_id}
                </p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2 relative">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <ListChecks className="w-5 h-5 mr-2 text-blue-500" />
                Subject <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <ListChecks className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="subject"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={changeHandler}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.subject
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select any subject</option>
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
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center gap-2 justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6"
          >
            <ScrollText className="w-5 h-5" />
            {required_path === "update" ? "Update Mock" : "Create Mock"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMock;
