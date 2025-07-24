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

const CreateExam = () => {
  const [courses, isLoading] = useFetchCourses();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  //   format the exam date.
  data.exam_date = data.exam_date.split("T")[0];
  const required_path = location.pathname.split("/").at(-1);
  const batches = useSelector((state) => state.batch.batches);
  const subjects = useSelector((state) => state.subject.subjects);
  const durationRef = useRef();
  let thunk;
  if (required_path === "update") {
    thunk = updateExam;
  } else {
    thunk = createExam;
  }

  const validate = (input_name, value, formData) => {
    let error = "";
    return error;
  };

  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      name: data.name || "",
      desc: data.desc || "",
      course: data.course || "",
      batch: data.batch || "",
      subject: data.subject || "",
      total_marks: data.total_marks || "",
      duration: data.duration || "",
      exam_date: data.exam_date || "",
      exam_id: data._id || "",
    },
    thunk,
    validate,
    "/dashboard/exams",
    "exam"
  );

  // When selecting a course, fetch batches and subjects for that course
  const handleCourseChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, course: value, batch: "", subject: "" }));
    dispatch(getAllBatches({ course_id: value }));
    dispatch(getSubjects({ course_id: value }));
  };

  useEffect(() => {
    if (required_path === "update") {
      durationRef.current.value = data.duration;
      dispatch(getSubjects({ course_id: data.course }));
    }
  }, [dispatch]);

  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        subject: data.subject,
      };
    });
  }, [subjects]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={(event) => {
            durationRef.current.value = "";
            submitHandler(event);
          }}
          className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-8">
            <ScrollText className="w-7 h-7 text-blue-600 mr-2" />
            Create New Exam
          </h2>

          {/* Exam Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <FileText className="w-4 h-4 mr-2 text-purple-600" />
              Exam Name <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Enter exam name (e.g., Midterm)"
              value={formData.name}
              onChange={changeHandler}
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
              placeholder="Brief description, syllabus or guidelines for the exam."
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

          {/* Course selection */}
          <div className="space-y-2">
            <label
              className="flex items-center text-sm font-semibold text-gray-700"
              htmlFor="course"
            >
              <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
              Course <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <select
                id="course"
                name="course"
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
          </div>

          {/* Batch selection (depends on selected course) */}
          <div className="space-y-2">
            <label
              className="flex items-center text-sm font-semibold text-gray-700"
              htmlFor="batch"
            >
              <Layers className="w-4 h-4 mr-2 text-purple-600" />
              Batch <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <select
                id="batch"
                name="batch"
                required
                value={formData.batch}
                onChange={changeHandler}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white appearance-none hover:border-gray-300
                ${
                  errors.batch
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
          </div>

          {/* Subject selection (depends on selected course) */}
          <div className="space-y-2">
            <label
              className="flex items-center text-sm font-semibold text-gray-700"
              htmlFor="subject"
            >
              <ListChecks className="w-4 h-4 mr-2 text-blue-500" />
              Subject <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <select
                id="subject"
                name="subject"
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
              id="total_marks"
              name="total_marks"
              required
              placeholder="e.g., 100"
              value={formData.total_marks}
              onChange={changeHandler}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300
                ${
                  errors.total_marks
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                } focus:ring-4 focus:ring-opacity-20`}
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label
              htmlFor="duration"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <Timer className="w-4 h-4 mr-2 text-blue-500" />
              Duration (minutes) <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              min="0"
              id="duration"
              name="duration"
              required
              ref={durationRef}
              placeholder="e.g., 120"
              onChange={changeHandler}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300
                ${
                  errors.duration
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                } focus:ring-4 focus:ring-opacity-20`}
            />
          </div>

          {/* Exam Date */}
          <div className="space-y-2">
            <label
              htmlFor="exam_date"
              className="flex items-center text-sm font-semibold text-gray-700"
            >
              <Calendar className="w-4 h-4 mr-2 text-green-600" />
              Exam Date <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              id="exam_date"
              name="exam_date"
              required
              value={formData.exam_date}
              onChange={changeHandler}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300
                ${
                  errors.exam_date
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                } focus:ring-4 focus:ring-opacity-20`}
            />
          </div>

          {/* Submit */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <ScrollText className="w-5 h-5" />
              <span>Create Exam</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
