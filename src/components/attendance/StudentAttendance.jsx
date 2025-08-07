import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clear_attendance,
  getAttendance,
} from "../../redux/slices/attendanceSlice";
import { getStudent } from "../../redux/slices/studentsSlice";
import {
  Calendar,
  User,
  CheckCircle2,
  XCircle,
  GraduationCap,
  CalendarDays,
  TrendingUp,
  Clock,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";

const months = [
  { month: "January", number: 1 },
  { month: "February", number: 2 },
  { month: "March", number: 3 },
  { month: "April", number: 4 },
  { month: "May", number: 5 },
  { month: "June", number: 6 },
  { month: "July", number: 7 },
  { month: "August", number: 8 },
  { month: "September", number: 9 },
  { month: "October", number: 10 },
  { month: "November", number: 11 },
  { month: "December", number: 12 },
];

//  Attendance for student month wise.

const StudentAttendance = () => {
  const attendance = useSelector((state) => state.attendance.attendance || []);
  const student = useSelector((state) => state.student.student);
  const loading = useSelector((state) => state.attendance.loading);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ year: "", month: "" });
  const [years, setYears] = useState([]);

  // attendance analysis by admin.
  // for this particular thing to work we are providing student_id  in getStudent and getAttendance also.
  // else  they were not required. so using nullify operator (?) to avoid  errors when student access this route.
  const params = useParams();

  // Compute years based on admission date
  useEffect(() => {
    dispatch(clear_attendance());
    dispatch(getStudent({ student_id: params?.id }));
  }, [dispatch]);

  useEffect(() => {
    if (student) {
      const admission_date = new Date(student.createdAt);
      const admission_year = admission_date.getFullYear();
      const current_year = new Date().getFullYear();
      const diff = current_year - admission_year;

      if (diff > 0) {
        const calculatedYears = Array.from(
          { length: diff + 1 },
          (_, i) => admission_year + i
        );
        setYears(calculatedYears);
      } else {
        setYears([admission_year]);
      }
      if (!formData.year) {
        setFormData((prev) => ({ ...prev, year: admission_year }));
      }
    }
  }, [student]);

  // Fetch attendance when year and month are selected
  useEffect(() => {
    if (formData.year && formData.month) {
      dispatch(
        getAttendance({
          year: formData.year,
          month: formData.month,
          student_id: params?.id,
        })
      );
    }
  }, [formData.year, formData.month, dispatch]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "year") {
      setFormData({ year: value, month: "" });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const attendanceStats =
    attendance.length > 0
      ? {
          total: attendance.length,
          present: attendance.filter((item) => item.status === "present")
            .length,
          absent: attendance.filter((item) => item.status === "absent").length,
          percentage: Math.round(
            (attendance.filter((item) => item.status === "present").length /
              attendance.length) *
              100
          ),
        }
      : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <CalendarDays className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Attendance
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your daily attendance records and monitor your academic
            progress
          </p>
        </div>

        <div className="space-y-8">
          {/* Student Profile */}
          {student && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {student.full_name}
                  </h2>
                  <p className="text-gray-600 mb-2">Student ID: {student.id}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      Admission Year:{" "}
                      {new Date(student.createdAt).getFullYear()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filter Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Select Period
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Year Select */}
              <div className="space-y-2">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={changeHandler}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  >
                    <option value="">Select academic year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Month Select */}
              <div className="space-y-2">
                <label
                  htmlFor="month"
                  className="block text-sm font-medium text-gray-700"
                >
                  Month <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    id="month"
                    name="month"
                    value={formData.month}
                    onChange={changeHandler}
                    disabled={!formData.year}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select month</option>
                    {months.map((month) => (
                      <option key={month.number} value={month.number}>
                        {month.month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Statistics */}
          {attendanceStats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Days</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {attendanceStats.total}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Present</p>
                    <p className="text-2xl font-bold text-green-600">
                      {attendanceStats.present}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Absent</p>
                    <p className="text-2xl font-bold text-red-600">
                      {attendanceStats.absent}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Attendance Rate
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        attendanceStats.percentage >= 75
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {attendanceStats.percentage}%
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      attendanceStats.percentage >= 75
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <TrendingUp
                      className={`w-6 h-6 ${
                        attendanceStats.percentage >= 75
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Records */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                {formData.year && formData.month
                  ? `Attendance Records - ${
                      months.find((m) => m.number === parseInt(formData.month))
                        ?.month
                    } ${formData.year}`
                  : "Attendance Records"}
              </h2>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">
                    Loading attendance records...
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Please wait while we fetch your data
                  </p>
                </div>
              ) : !formData.year || !formData.month ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium mb-2">
                    Select Period to View Records
                  </p>
                  <p className="text-gray-400 text-sm">
                    Choose both academic year and month from the filters above
                    to view your attendance
                  </p>
                </div>
              ) : attendance.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {attendance.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                          {new Date(item.date).getDate()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {new Date(item.date).toLocaleDateString(undefined, {
                              weekday: "long",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {item.status === "present" ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Present
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            <XCircle className="w-4 h-4 mr-1" />
                            Absent
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium mb-2">
                    No Records Found
                  </p>
                  <p className="text-gray-400 text-sm">
                    No attendance has been marked for{" "}
                    {
                      months.find((m) => m.number === parseInt(formData.month))
                        ?.month
                    }{" "}
                    {formData.year}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
