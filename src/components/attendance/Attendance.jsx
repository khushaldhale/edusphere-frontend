import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

import useFetchCourses from "../../hooks/useFetchCourses";
import { getAllBatches } from "../../redux/slices/batchSlice";
import { getSubjects } from "../../redux/slices/subjectSlice";
import { studentsViaBatch } from "../../redux/slices/studentsSlice";
import { markAttendance } from "../../redux/slices/attendanceSlice";
import { toast } from "react-toastify";

// Animation variants for buttons
const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const Attendance = () => {
  const [courses, isLoading] = useFetchCourses();
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.batch.batches || []);
  const subjects = useSelector((state) => state.subject.subjects || []);
  const students = useSelector((state) => state.student.students || []);
  const [dateError, setDateError] = useState("");

  // Attendance state for each student: student_id -> 'present' | 'absent'
  const [attendance, setAttendance] = useState({});

  // Form data includes selections and date
  const [formData, setFormData] = useState({
    course_id: "",
    subject_id: "",
    batch_id: "",
    date: "",
  });

  // Handlers for select changes
  const getData = (event) => {
    const course_id = event.target.value;
    setFormData((prev) => ({
      ...prev,
      course_id,
      batch_id: "",
      subject_id: "",
      date: "",
    }));
    setAttendance({});
    if (course_id) {
      dispatch(getAllBatches({ course_id }));
      dispatch(getSubjects({ course_id }));
    }
  };

  const getStudents = (event) => {
    const batch_id = event.target.value;
    setFormData((prev) => ({
      ...prev,
      batch_id,
      subject_id: "",
      date: "",
    }));
    setAttendance({});
    if (batch_id) dispatch(studentsViaBatch({ batch_id }));
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear attendance if date or subject changes
    if (name === "subject_id" || name === "date") {
      setAttendance({});
    }
    if (name === "date") {
      if (new Date(value) > new Date()) {
        setDateError("Future Date is  not allowed");
      } else {
        setDateError("");
      }
    }
  };

  // Capture attendance for each student
  const captureAttendance = (student_id, status) => {
    setAttendance((prev) => ({
      ...prev,
      [student_id]: status,
    }));
  };

  // Submit attendance action (uncomment dispatch when backend ready)
  const submitAttendance = () => {
    if (
      !formData.course_id ||
      !formData.batch_id ||
      !formData.subject_id ||
      !formData.date
    ) {
      toast.error("Please fill all required fields before submitting.");
      return;
    }
    if (Object.keys(attendance).length === 0) {
      toast.error("Please mark attendance for at least one student.");
      return;
    }
    if (new Date(formData.date) > new Date()) {
      toast.error("Future date is not allowed.");
      return;
    }
    const dataToSubmit = { ...formData, attendance };

    dispatch(markAttendance(dataToSubmit)).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
        setAttendance({});
        setFormData({
          course_id: "",
          subject_id: "",
          batch_id: "",
          date: "",
        });
      } else {
        toast.error(action.payload.message);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        Take Attendance
      </h2>

      <form className="space-y-6">
        {/* Course Select */}
        <div>
          <label
            htmlFor="course_id"
            className="block mb-2 font-semibold text-gray-700"
          >
            Select Course
          </label>
          <select
            id="course_id"
            name="course_id"
            value={formData.course_id}
            onChange={(e) => {
              changeHandler(e);
              getData(e);
            }}
            className="w-full rounded-lg border border-gray-300 text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select any course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* Batch Select */}
        <div>
          <label
            htmlFor="batch_id"
            className="block mb-2 font-semibold text-gray-700"
          >
            Select Batch
          </label>
          <select
            id="batch_id"
            name="batch_id"
            value={formData.batch_id}
            onChange={(e) => {
              changeHandler(e);
              getStudents(e);
            }}
            disabled={!formData.course_id}
            className={`w-full rounded-lg border ${
              !formData.course_id
                ? "border-gray-200 bg-gray-100 cursor-not-allowed"
                : "border-gray-300"
            } text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          >
            <option value="">Select any batch</option>
            {batches.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Select */}
        <div>
          <label
            htmlFor="subject_id"
            className="block mb-2 font-semibold text-gray-700"
          >
            Select Subject
          </label>
          <select
            id="subject_id"
            name="subject_id"
            value={formData.subject_id}
            onChange={changeHandler}
            disabled={!formData.batch_id}
            className={`w-full rounded-lg border ${
              !formData.batch_id
                ? "border-gray-200 bg-gray-100 cursor-not-allowed"
                : "border-gray-300"
            } text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          >
            <option value="">Select any subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Input */}
        <div>
          <label
            htmlFor="date"
            className="block mb-2 font-semibold text-gray-700"
          >
            Select Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={changeHandler}
            disabled={!formData.subject_id}
            className={`w-full rounded-lg border ${
              !formData.subject_id
                ? "border-gray-200 bg-gray-100 cursor-not-allowed"
                : "border-gray-300"
            } text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />

          {dateError && (
            <p className="mt-1 text-sm text-red-600 font-medium">{dateError}</p>
          )}
        </div>
      </form>

      {/* Attendance Section */}
      {formData.subject_id && formData.date && dateError === "" ? (
        <div className="mt-6">
          {students.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {students.map((student) => (
                <div
                  key={student._id}
                  className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
                >
                  <p className="font-medium text-gray-900">
                    {student.full_name}
                  </p>

                  <div className="flex gap-3">
                    {/* Present button */}
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      type="button"
                      onClick={() => captureAttendance(student._id, "present")}
                      className={`flex items-center gap-2 rounded-lg py-2 px-4 text-sm font-semibold shadow-md transition-colors duration-200 ${
                        attendance[student._id] === "present"
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                      aria-pressed={attendance[student._id] === "present"}
                    >
                      <CheckCircle className="w-5 h-5" />
                      Present
                    </motion.button>

                    {/* Absent button */}
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      type="button"
                      onClick={() => captureAttendance(student._id, "absent")}
                      className={`flex items-center gap-2 rounded-lg py-2 px-4 text-sm font-semibold shadow-md transition-colors duration-200 ${
                        attendance[student._id] === "absent"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                      aria-pressed={attendance[student._id] === "absent"}
                    >
                      <XCircle className="w-5 h-5" />
                      Absent
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center mt-6">
              No students exist in the selected batch.
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-6">
          Select course, batch, subject, and date to take attendance.
        </p>
      )}

      {/* Submit Button */}
      {formData.subject_id && formData.date && dateError === "" && (
        <div className="mt-8 text-center">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={submitAttendance}
            type="button"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 text-sm"
          >
            {/* You can add an icon here if you want, e.g. a check or save icon */}
            Mark Attendance
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Attendance;
