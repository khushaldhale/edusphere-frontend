import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircle,
  XCircle,
  Calendar,
  BookOpen,
  Users,
  GraduationCap,
  Save,
  AlertCircle,
  Clock,
} from "lucide-react";

import useFetchCourses from "../../hooks/useFetchCourses";
import { getAllBatches } from "../../redux/slices/batchSlice";
import { getSubjects } from "../../redux/slices/subjectSlice";
import { studentsViaBatch } from "../../redux/slices/studentsSlice";
import {
  getAttendanceViaDate,
  markAttendance,
} from "../../redux/slices/attendanceSlice";
import { toast } from "react-toastify";

const Attendance = () => {
  const [courses, isLoading] = useFetchCourses();
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.batch.batches || []);
  const subjects = useSelector((state) => state.subject.subjects || []);
  const students = useSelector((state) => state.student.students || []);
  const [dateError, setDateError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //  already marked attendance.
  const markedAttendance = useSelector((state) => {
    return state.attendance.markedAttendance;
  });

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
      //  two request are going here , so basically  we have to  modify it later on.
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

  //  we will get  already marked attendance here.
  const marked_attendance = (event) => {
    const date = event.target.value;
    dispatch(getAttendanceViaDate({ batch_id: formData.batch_id, date }));
  };
  useEffect(() => {
    if (markedAttendance?.length > 0) {
      const required_attendance = {};
      for (let element of markedAttendance) {
        required_attendance[element.student_id] = element.status;
      }
      setAttendance(required_attendance);
    }
  }, [markedAttendance]);

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
        setDateError("Future date is not allowed");
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

  // Submit attendance action
  const submitAttendance = async () => {
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

    setIsSubmitting(true);
    const dataToSubmit = { ...formData, attendance };

    try {
      const action = await dispatch(markAttendance(dataToSubmit));
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
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate attendance statistics
  const totalStudents = students.length;
  const markedCount = Object.keys(attendance).length;
  const presentCount = Object.values(attendance).filter(
    (status) => status === "present"
  ).length;
  const absentCount = Object.values(attendance).filter(
    (status) => status === "absent"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Take Attendance
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select course, batch, subject, and date to mark student attendance
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Selection Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
              Class Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Select */}
              <div className="space-y-2">
                <label
                  htmlFor="course_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    id="course_id"
                    name="course_id"
                    value={formData.course_id}
                    onChange={(e) => {
                      changeHandler(e);
                      getData(e);
                    }}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {isLoading ? "Loading courses..." : "Select a course"}
                    </option>
                    {courses.map((course) => (
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Batch <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    id="batch_id"
                    name="batch_id"
                    value={formData.batch_id}
                    onChange={(e) => {
                      changeHandler(e);
                      getStudents(e);
                    }}
                    disabled={!formData.course_id}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a batch</option>
                    {batches.map((batch) => (
                      <option key={batch._id} value={batch._id}>
                        {batch.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject Select */}
              <div className="space-y-2">
                <label
                  htmlFor="subject_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    id="subject_id"
                    name="subject_id"
                    value={formData.subject_id}
                    onChange={changeHandler}
                    disabled={!formData.batch_id}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={(event) => {
                      changeHandler(event);
                      marked_attendance(event);
                    }}
                    disabled={!formData.subject_id}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                {dateError && (
                  <div className="flex items-center text-sm text-red-600 mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {dateError}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Attendance Statistics */}
          {formData.subject_id &&
            formData.date &&
            dateError === "" &&
            totalStudents > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Attendance Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {totalStudents}
                    </div>
                    <div className="text-sm text-gray-600">Total Students</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {markedCount}
                    </div>
                    <div className="text-sm text-gray-600">Marked</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {presentCount}
                    </div>
                    <div className="text-sm text-gray-600">Present</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {absentCount}
                    </div>
                    <div className="text-sm text-gray-600">Absent</div>
                  </div>
                </div>
              </div>
            )}

          {/* Student Attendance List */}
          {formData.subject_id && formData.date && dateError === "" ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {students.length > 0 ? (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Student Attendance ({students.length} students)
                  </h3>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {students.map((student, index) => (
                      <div
                        key={student._id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {student.fname + " " + student.lname}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* Present button */}
                          <button
                            type="button"
                            onClick={() =>
                              captureAttendance(student._id, "present")
                            }
                            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                              attendance[student._id] === "present"
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                            }`}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Present
                          </button>

                          {/* Absent button */}
                          <button
                            type="button"
                            onClick={() =>
                              captureAttendance(student._id, "absent")
                            }
                            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                              attendance[student._id] === "absent"
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                            }`}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Absent
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No students found</p>
                  <p className="text-gray-400 text-sm">
                    No students exist in the selected batch.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium mb-2">
                Ready to take attendance
              </p>
              <p className="text-gray-400 text-sm">
                Complete the form above to start marking student attendance
              </p>
            </div>
          )}

          {/* Submit Button */}
          {formData.subject_id &&
            formData.date &&
            dateError === "" &&
            students.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-center">
                  <button
                    onClick={submitAttendance}
                    disabled={
                      isSubmitting || Object.keys(attendance).length === 0
                    }
                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin -ml-1 mr-3 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Submit Attendance ({Object.keys(attendance).length}/
                        {students.length})
                      </>
                    )}
                  </button>
                </div>
                {Object.keys(attendance).length === 0 && (
                  <p className="text-center text-sm text-gray-500 mt-2">
                    Mark attendance for at least one student to submit
                  </p>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
