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
import { useEffect } from "react";

const CreateMock = () => {
  const [courses, isLoading] = useFetchCourses();
  const location = useLocation();
  const data = location.state;
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.batch.batches);
  const subjects = useSelector((state) => state.subject.subjects);
  let thunk;
  const required_path = location.pathname.split("/").at(-1);

  if (required_path === "update") {
    thunk = updateMock;
  } else {
    thunk = createMock;
  }

  const validate = (input_name, value, formData) => {
    let error = "";
    // You can add validation rules here later
    return error;
  };

  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      name: data.name || "",
      desc: data.desc || "",
      total_marks: data.total_marks || "",
      course: data.course || "",
      subject: data.subject || "",
      batch_id: data.batch_id || "",
      mock_id: data._id || "",
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
    dispatch(getSubjects({ course_id: data.course }));
    if (required_path === "update" && subjects.length > 0) {
      setFormData((prevData) => {
        return {
          ...prevData,
          subject: data.subject,
        };
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full">
        <form
          onSubmit={submitHandler}
          className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-8">
            <ScrollText className="w-7 h-7 text-blue-600 mr-2" />
            Create Mock Test
          </h2>

          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <FileText className="w-4 h-4 mr-2 text-purple-600" />
              Mock Name <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={changeHandler}
              required
              placeholder="Enter mock title"
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300
                ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                } focus:ring-4 focus:ring-opacity-20`}
            />
            {errors.name && (
              <div className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="desc"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <FileText className="w-4 h-4 mr-2 text-gray-500" />
              Description <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="desc"
              id="desc"
              required
              rows={3}
              placeholder="Describe this mock..."
              value={formData.desc}
              onChange={changeHandler}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none resize-none bg-white hover:border-gray-300
                ${
                  errors.desc
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                } focus:ring-4 focus:ring-opacity-20`}
            />
            {errors.desc && (
              <div className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.desc}</span>
              </div>
            )}
          </div>

          {/* Course */}
          <div className="space-y-2">
            <label
              htmlFor="course"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
              Course <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <select
                name="course"
                id="course"
                required
                value={formData.course}
                onChange={handleCourseChange}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white appearance-none hover:border-gray-300
                  ${
                    errors.course
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                  } focus:ring-4 focus:ring-opacity-20`}
              >
                <option value="">Select any course</option>
                {courses.length > 0 &&
                  courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.course_name}
                    </option>
                  ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <BookOpen className="w-4 h-4 text-gray-300" />
              </div>
            </div>
            {errors.course && (
              <div className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.course}</span>
              </div>
            )}
          </div>

          {/* Batch */}
          <div className="space-y-2">
            <label
              htmlFor="batch_id"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <Layers className="w-4 h-4 mr-2 text-purple-600" />
              Batch <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <select
                name="batch_id"
                id="batch_id"
                required
                value={formData.batch_id}
                onChange={changeHandler}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white appearance-none hover:border-gray-300
                  ${
                    errors.batch_id
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                  } focus:ring-4 focus:ring-opacity-20`}
              >
                <option value="">Select any batch</option>
                {batches.length > 0 &&
                  batches.map((batch) => (
                    <option key={batch._id} value={batch._id}>
                      {batch.name}
                    </option>
                  ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Layers className="w-4 h-4 text-gray-300" />
              </div>
            </div>
            {errors.batch_id && (
              <div className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.batch_id}</span>
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <ListChecks className="w-4 h-4 mr-2 text-blue-500" />
              Subject <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <select
                name="subject"
                id="subject"
                required
                value={formData.subject}
                onChange={changeHandler}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white appearance-none hover:border-gray-300
                  ${
                    errors.subject
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                  } focus:ring-4 focus:ring-opacity-20`}
              >
                <option value="">Select any subject</option>
                {subjects.length > 0 &&
                  subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ListChecks className="w-4 h-4 text-gray-300" />
              </div>
            </div>
            {errors.subject && (
              <div className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.subject}</span>
              </div>
            )}
          </div>

          {/* Total Marks */}
          <div className="space-y-2">
            <label
              htmlFor="total_marks"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <Hash className="w-4 h-4 mr-2 text-orange-500" />
              Total Marks <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              min="0"
              name="total_marks"
              id="total_marks"
              value={formData.total_marks}
              onChange={changeHandler}
              required
              placeholder="e.g., 100"
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300
                ${
                  errors.total_marks
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                } focus:ring-4 focus:ring-opacity-20`}
            />
            {errors.total_marks && (
              <div className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{errors.total_marks}</span>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600
                hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400
                disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold
                py-4 px-8 rounded-xl text-lg transition-all duration-200 transform
                hover:scale-105 focus:ring-4 focus:ring-purple-200 shadow-lg
                hover:shadow-xl flex items-center justify-center gap-2"
            >
              <ScrollText className="w-5 h-5" />
              <span>Create Mock</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMock;
