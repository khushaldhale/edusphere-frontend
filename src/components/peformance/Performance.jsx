import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Calendar,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";
import { getPerformance } from "../../redux/slices/studentsSlice";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Performance = () => {
  const dispatch = useDispatch();
  const performance = useSelector((state) => state.student.performance);

  useEffect(() => {
    dispatch(getPerformance());
  }, [dispatch]);

  if (!performance || !performance.attendance) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Process attendance data for charts
  const processAttendanceData = () => {
    const sortedAttendance = [...performance.attendance].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const labels = sortedAttendance.map((record) =>
      new Date(record.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    );

    const presentData = sortedAttendance.map((record) =>
      record.status === "present" ? 1 : 0
    );
    const absentData = sortedAttendance.map((record) =>
      record.status === "absent" ? 1 : 0
    );

    return { labels, presentData, absentData };
  };

  // Calculate attendance statistics
  const calculateAttendanceStats = () => {
    const totalDays = performance.attendance.length;
    const presentDays = performance.attendance.filter(
      (record) => record.status === "present"
    ).length;
    const absentDays = totalDays - presentDays;
    const attendancePercentage =
      totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    return { totalDays, presentDays, absentDays, attendancePercentage };
  };

  // Process mock data for charts
  const processMockData = () => {
    if (!performance.mockAttempt || performance.mockAttempt.length === 0) {
      return null;
    }

    const labels = performance.mockAttempt.map((mock) => mock.mock_id.name);
    const marksObtained = performance.mockAttempt.map(
      (mock) => mock.marks_obtained
    );
    const totalMarks = performance.mockAttempt.map(
      (mock) => mock.mock_id.total_marks
    );
    const percentages = performance.mockAttempt.map((mock) =>
      Math.round((mock.marks_obtained / mock.mock_id.total_marks) * 100)
    );

    return { labels, marksObtained, totalMarks, percentages };
  };

  const attendanceData = processAttendanceData();
  const attendanceStats = calculateAttendanceStats();
  const mockData = processMockData();

  // Chart configurations
  const attendanceLineChart = {
    labels: attendanceData.labels,
    datasets: [
      {
        label: "Daily Attendance",
        data: attendanceData.presentData,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const attendanceDoughnut = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [attendanceStats.presentDays, attendanceStats.absentDays],
        backgroundColor: ["#10B981", "#EF4444"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const mockBarChart = mockData
    ? {
        labels: mockData.labels,
        datasets: [
          {
            label: "Marks Obtained",
            data: mockData.marksObtained,
            backgroundColor: "#3B82F6",
            borderRadius: 8,
            barThickness: 40,
          },
          {
            label: "Total Marks",
            data: mockData.totalMarks,
            backgroundColor: "#E5E7EB",
            borderRadius: 8,
            barThickness: 40,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
            weight: "500",
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#374151",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 12,
            weight: "500",
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        cornerRadius: 8,
        padding: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Performance Dashboard
          </h1>
          <p className="text-gray-600">
            Track your academic progress and achievements
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Attendance Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {attendanceStats.attendancePercentage}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Exams Appeared
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {performance.examAttempt.length}/{performance.total_exams}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Mocks Completed
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {performance.mockAttempt.length}/{performance.total_mocks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Days Tracked
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {attendanceStats.totalDays}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Attendance Trend
              </h2>
            </div>
            <div className="h-80">
              <Line data={attendanceLineChart} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Attendance Overview
              </h2>
            </div>
            <div className="h-64 mb-4">
              <Doughnut data={attendanceDoughnut} options={doughnutOptions} />
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 mb-1">
                {attendanceStats.attendancePercentage}%
              </p>
              <p className="text-sm text-gray-500">Overall Attendance</p>
            </div>
          </div>
        </div>

        {/* Exams Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Exam Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {performance.total_exams}
              </p>
              <p className="text-sm text-gray-600">Total Exams</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {performance.examAttempt.length}
              </p>
              <p className="text-sm text-gray-600">Appeared</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-600">
                {performance.total_exams - performance.examAttempt.length}
              </p>
              <p className="text-sm text-gray-600">Remaining</p>
            </div>
          </div>

          {performance.examAttempt.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Exam Attempts
              </h3>
              {performance.examAttempt.map((exam, index) => (
                <div
                  key={exam._id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <Award className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {exam.exam_id.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Status: {exam.exam_attempt_status}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        Total Marks: {exam.exam_id.total_marks}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mock Tests Section */}
        {mockData && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <Target className="h-5 w-5 text-orange-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Mock Test Performance
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <Bar data={mockBarChart} options={chartOptions} />
              </div>

              <div className="space-y-4">
                {performance.mockAttempt.map((mock, index) => (
                  <div
                    key={mock._id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        {mock.mock_id.name}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          mockData.percentages[index] >= 75
                            ? "bg-green-100 text-green-800"
                            : mockData.percentages[index] >= 50
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {mockData.percentages[index]}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>
                        Marks: {mock.marks_obtained}/{mock.mock_id.total_marks}
                      </span>
                    </div>
                    {mock.remarks && (
                      <p className="text-sm text-gray-500 italic">
                        "{mock.remarks}"
                      </p>
                    )}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div
                        className={`h-2 rounded-full ${
                          mockData.percentages[index] >= 75
                            ? "bg-green-500"
                            : mockData.percentages[index] >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${mockData.percentages[index]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(!mockData || performance.mockAttempt.length === 0) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <Target className="h-5 w-5 text-orange-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Mock Test Performance
              </h2>
            </div>
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No mock tests attempted yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Mock test data will appear here once you start taking tests
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Performance;
