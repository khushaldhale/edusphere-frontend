import { useDispatch, useSelector } from "react-redux";
import useFetchCourses from "../../hooks/useFetchCourses";
import { getAllBatches } from "../../redux/slices/batchSlice";
import { useEffect, useState } from "react";
import Assignments from "./Assignments";
import { BookOpen, Users } from "lucide-react";
import { useLocation } from "react-router-dom";

const AssignmentFilter = () => {
  const [courses] = useFetchCourses();
  const batches = useSelector((state) => state.batch.batches);
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
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 px-2 pt-8">
      {/* Filter Card - stick to top */}
      <div className="w-full max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8 -mb-2 relative z-10">
        <h2 className="text-2xl font-semibold mb-8">
          {required_path === "notes" ? "Find Notes" : "Find Assignments"}
        </h2>
        <form className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="course_id"
              className="block mb-1 font-semibold text-gray-700 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Course
            </label>
            <select
              name="course_id"
              id="course_id"
              value={formData.course_id}
              onChange={(event) => {
                changeHandler(event);
                get_batches(event);
              }}
              className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
          <div className="flex-1">
            <label
              htmlFor="batch_id"
              className="block mb-1 font-semibold text-gray-700 flex items-center gap-2"
            >
              <Users className="w-4 h-4" /> Batch
            </label>
            <select
              name="batch_id"
              id="batch_id"
              value={formData.batch_id}
              onChange={changeHandler}
              className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={!formData.course_id}
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
        </form>
      </div>

      {/* Assignments Section -- OUTSIDE the filter card, with spacing */}
      <div className="max-w-3xl mx-auto mt-8">
        {formData.course_id && formData.batch_id && (
          <Assignments
            batch_id={formData.batch_id}
            required_path={required_path}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
};

export default AssignmentFilter;
