import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAttendance } from "../../redux/slices/attendanceSlice";
import { getStudent } from "../../redux/slices/studentsSlice";
import { Calendar, User, CheckCircle2, XCircle } from "lucide-react";

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

const StudentAttendance = () => {
  const attendance = useSelector((state) => state.attendance.attendance || []);
  const student = useSelector((state) => state.student.student);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ year: "", month: "" });

  // Compute years based on admission
  let years = [];
  useEffect(() => {
    dispatch(getStudent());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (student) {
      const admission_date = new Date(student.createdAt);
      const admission_year = admission_date.getFullYear();
      const current_year = new Date().getFullYear();
      const diff = current_year - admission_year;
      if (diff > 0) {
        years = [];
        for (let i = 0; i <= diff; i++) {
          years.push(admission_year + i);
        }
      } else {
        years = [admission_year];
        if (!formData.year) {
          setFormData((prev) => ({ ...prev, year: admission_year }));
        }
      }
    }
    // eslint-disable-next-line
  }, [student]);

  if (student) {
    const admission_date = new Date(student.createdAt);
    const admission_year = admission_date.getFullYear();
    const current_year = new Date().getFullYear();
    const diff = current_year - admission_year;
    years =
      diff > 0
        ? Array.from({ length: diff + 1 }, (_, i) => admission_year + i)
        : [admission_year];
  }

  // Handlers
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSubmitted(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const { year, month } = formData;
    if (!year || !month) return;
    dispatch(getAttendance({ year, month }));
  };

  console.log(formData, submitted, attendance);
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Student Details */}
      {student && (
        <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-white shadow border border-gray-100">
          <User className="w-10 h-10 text-blue-600 bg-blue-50 rounded-full p-1" />
          <div>
            <div className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              {student.full_name}
            </div>
            <div className="text-gray-500 text-sm">
              Admission Year: {new Date(student.createdAt).getFullYear()}
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={submitHandler}
        className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 space-y-4 mb-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex-1">
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="year"
            >
              Year
            </label>
            <select
              name="year"
              id="year"
              value={formData.year}
              onChange={changeHandler}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="">Select year</option>
              {years.map((year, i) => (
                <option key={i} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="month"
            >
              Month
            </label>
            <select
              name="month"
              id="month"
              value={formData.month}
              onChange={changeHandler}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 text-sm"
        >
          <Calendar className="w-5 h-5" />
          Get Attendance
        </button>
      </form>

      {/* Attendance Results */}
      <div>
        {formData.year && formData.month && submitted ? (
          attendance && attendance.length > 0 ? (
            <div className="bg-white border border-gray-100 rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
                Attendance for{" "}
                {
                  months.find((m) => m.number === parseInt(formData.month))
                    ?.month
                }
                , {formData.year}
              </h3>
              <ol className="space-y-3">
                {attendance.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-4 border-b last:border-b-0 py-3"
                  >
                    <div className="flex-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-800 font-medium">
                        {new Date(item.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    {item.status === "present" ? (
                      <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full font-semibold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        Present
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-3 py-1 rounded-full font-semibold text-xs">
                        <XCircle className="w-4 h-4" />
                        Absent
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="text-center bg-white py-8 border border-gray-100 rounded-xl shadow text-gray-500 font-medium">
              No attendance is marked yet for this period.
            </div>
          )
        ) : (
          <div className="text-center text-gray-500 font-medium py-8">
            Select month and year to get the attendance.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAttendance;
