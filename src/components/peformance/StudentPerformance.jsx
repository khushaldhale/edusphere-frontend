import { useEffect, useState } from "react";
import useFetchCourses from "../../hooks/useFetchCourses";
import { useDispatch, useSelector } from "react-redux";
import { getAllBatches } from "../../redux/slices/batchSlice";
import {
  clearStudents,
  studentsViaBatch,
} from "../../redux/slices/studentsSlice";
import {
  BookOpen,
  Users,
  UserCircle2,
  ClipboardList,
  FileText,
  Edit3,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentPerformance = () => {
  const [courses, isLoading] = useFetchCourses();
  const batches = useSelector((state) => state.batch.batches || []);
  const students = useSelector((state) => state.student.students || []);
  const [formData, setFormData] = useState({ course_id: "", batch_id: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "course_id" && value?.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        batch_id: "",
      }));
      dispatch(getAllBatches({ course_id: value }));
    } else if (
      name === "batch_id" &&
      value?.trim() !== "" &&
      formData.course_id
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      dispatch(studentsViaBatch({ batch_id: value }));
    }
  };

  useEffect(() => {
    dispatch(clearStudents());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-700" />
            Student Performance Overview
          </h2>
          {/* Filtering form */}
          <form className="flex flex-col md:flex-row gap-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            {/* Course Select */}
            <div className="flex-1">
              <label
                htmlFor="course_id"
                className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
              >
                <BookOpen className="w-5 h-5 text-blue-600" />
                Course
              </label>
              <select
                name="course_id"
                id="course_id"
                onChange={changeHandler}
                value={formData.course_id}
                className="w-full pl-4 pr-8 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-300"
              >
                <option value="">Select a Course</option>
                {courses.length > 0 &&
                  courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.course_name}
                    </option>
                  ))}
              </select>
            </div>
            {/* Batch Select */}
            <div className="flex-1">
              <label
                htmlFor="batch_id"
                className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
              >
                <Users className="w-5 h-5 text-purple-600" />
                Batch
              </label>
              <select
                name="batch_id"
                id="batch_id"
                onChange={changeHandler}
                value={formData.batch_id}
                disabled={!formData.course_id}
                className={`w-full pl-4 pr-8 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formData.course_id
                    ? "border-gray-300"
                    : "bg-gray-50 border-gray-200 cursor-not-allowed"
                }`}
              >
                <option value="">Select a Batch</option>
                {batches.length > 0 &&
                  batches.map((batch) => (
                    <option key={batch._id} value={batch._id}>
                      {batch.name}
                    </option>
                  ))}
              </select>
            </div>
          </form>
        </div>

        {/* Students Grid */}
        <div>
          {students.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {students.map((student, index) => (
                <div
                  key={student._id || index}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    <UserCircle2 className="w-12 h-12 text-blue-600 bg-blue-50 rounded-full p-2 shadow" />
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {student.fname} {student.lname}
                      </div>
                      {/* You can add brief info, e.g. email/contact, here if desired */}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        navigate(
                          `/dashboard/students/${student._id}/attendance`
                        );
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 shadow transition"
                    >
                      <ClipboardList className="w-4 h-4" />
                      Attendance
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/dashboard/students/${student._id}/exams`);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 shadow transition"
                    >
                      <FileText className="w-4 h-4" />
                      Exams
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/dashboard/students/${student._id}/mocks`);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-green-50 hover:bg-green-100 text-green-700 shadow transition"
                    >
                      <Edit3 className="w-4 h-4" />
                      Mocks
                    </button>
                    <button
                      onClick={() => {
                        navigate(
                          `/dashboard/students/${student._id}/performance`
                        );
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-800 shadow transition"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Analytics
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow flex items-center justify-center py-16 text-gray-400 text-lg font-semibold mt-14 border border-gray-100">
              Select a course and batch to view students.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance;
