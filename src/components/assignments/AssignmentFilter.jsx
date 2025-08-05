import { useDispatch, useSelector } from "react-redux";
import useFetchCourses from "../../hooks/useFetchCourses";
import { getAllBatches } from "../../redux/slices/batchSlice";
import { useEffect, useState } from "react";
import Assignments from "./Assignments";
import { BookOpen, Users } from "lucide-react";
import { useLocation } from "react-router-dom";

const AssignmentFilter = () => {
  const [courses] = useFetchCourses();
  const batches = useSelector((state) => state.batch.batches || []);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    course_id: "",
    batch_id: "",
  });
  const required_path = useLocation().pathname.split("/").at(-1);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "course_id") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        batch_id: "",
      }));
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const get_batches = (event) => {
    const course_id = event.target.value;
    dispatch(getAllBatches({ course_id }));
  };

  useEffect(() => {
    setFormData({
      course_id: "",
      batch_id: "",
    });
  }, [required_path]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Filter Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {required_path === "notes" ? "Find Notes" : "Find Assignments"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Select */}
            <div className="space-y-2">
              <label
                htmlFor="course_id"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" /> Course
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="course_id"
                  id="course_id"
                  value={formData.course_id}
                  onChange={(event) => {
                    changeHandler(event);
                    get_batches(event);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
            <div className="space-y-2">
              <label
                htmlFor="batch_id"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <Users className="w-5 h-5 mr-2 text-blue-600" /> Batch{" "}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="batch_id"
                  id="batch_id"
                  value={formData.batch_id}
                  onChange={changeHandler}
                  disabled={!formData.course_id}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    !formData.course_id
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed"
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
            </div>
          </div>
        </div>

        {/* Assignments Section */}
        <div>
          {formData.course_id && formData.batch_id && (
            <Assignments
              batch_id={formData.batch_id}
              required_path={required_path}
              setFormData={setFormData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentFilter;
