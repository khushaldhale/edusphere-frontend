import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
const Login = lazy(() => import("./pages/Login"));
import Index from "./components/home/Index";
import BatchStudents from "./components/batch/BatchStudents";
import StudentExams from "./components/exam/StudentExams";
import StudentQuestions from "./components/exam/StudentQuestions";
import Attendance from "./components/attendance/Attendance";
import ParticularCourse from "./components/course/ParticularCourse";
import StudentAttendance from "./components/attendance/StudentAttendance";
import PaymentInfo from "./components/payment/PaymentInfo";
import MockMarks from "./components/mocks/MockMarks";
import AddMarks from "./components/mocks/AddMarks";
import CreateAssignment from "./components/assignments/CreateAssignment";
import Assignments from "./components/assignments/Assignments";
import AssignmentFilter from "./components/assignments/AssignmentFilter";
import Performance from "./components/peformance/Performance";
import MockResults from "./components/mocks/MockResults";
import ShowResults from "./components/mocks/ShowResults";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateCourse = lazy(() => import("./components/course/CreateCourse"));
const Courses = lazy(() => import("./components/course/Courses"));
const Subjects = lazy(() => import("./components/subject/Subjects"));
const CreateSubject = lazy(() => import("./components/subject/CreateSubject"));
const UpdateSubject = lazy(() => import("./components/subject/UpdateSubject"));
const Topics = lazy(() => import("./components/topic/Topics"));
const CreateEnquiry = lazy(() => import("./components/enquiry/CreateEnquiry"));
const Enquiries = lazy(() => import("./components/enquiry/Enquiries"));
const Enquiry = lazy(() => import("./components/enquiry/Enquiry"));
const CreateTopic = lazy(() => import("./components/topic/CreateTopic"));
const Batches = lazy(() => import("./components/batch/Batches"));
const CreateBatch = lazy(() => import("./components/batch/CreateBatch"));
const CreateEmployee = lazy(() =>
  import("./components/employees/CreateEmployee")
);
const Employees = lazy(() => import("./components/employees/Employees"));
const Students = lazy(() => import("./components/students/Students"));
const AddBatch = lazy(() => import("./components/students/AddBatch"));
const CreateExam = lazy(() => import("./components/exam/CreateExam"));
const Exams = lazy(() => import("./components/exam/Exams"));
const Questions = lazy(() => import("./components/questions/Questions"));
const CreateQuestion = lazy(() =>
  import("./components/questions/CreateQuestion")
);
const CreateMock = lazy(() => import("./components/mocks/CreateMock"));
const Mocks = lazy(() => import("./components/mocks/Mocks"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));

//  for course, subject and topic ,  we should have open route separately.

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index></Index>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="enquiry/add" //online enquiry.
          element={<CreateEnquiry></CreateEnquiry>}
        ></Route>
        {/* protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard></Dashboard>
            </ProtectedRoute>
          }
        >
          {/* courses */}
          <Route
            path="courses"
            element={
              // as of now this is an authenticated route. we will open it also.
              <ProtectedRoute
                allowedRoles={[
                  "admin",
                  "instructor",
                  "counsellor",
                  "operations_executive",
                  "receptionist",
                ]}
              >
                <Courses></Courses>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="courses/add"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateCourse></CreateCourse>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="courses/:id/update"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateCourse></CreateCourse>
              </ProtectedRoute>
            }
          ></Route>
          {/*  batches */}
          <Route
            path="batches"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "admin",
                  "operations_executive",
                  "counsellor",
                  "instructor",
                ]}
              >
                <Batches></Batches>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="batches/add"
            element={
              <ProtectedRoute allowedRoles={["admin", "operations_executive"]}>
                <CreateBatch></CreateBatch>
              </ProtectedRoute>
            }
          ></Route>
          {/* employees */}
          <Route
            path="employees/add"
            element={
              <ProtectedRoute allowedRoles={["admin", "operations_executive"]}>
                <CreateEmployee></CreateEmployee>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="employees"
            element={
              <ProtectedRoute allowedRoles={["admin", "operations_executive"]}>
                <Employees></Employees>
              </ProtectedRoute>
            }
          ></Route>
          '
          <Route
            path="employees/:id/update"
            element={
              <ProtectedRoute allowedRoles={["admin", "operations_executive"]}>
                <CreateEmployee></CreateEmployee>
              </ProtectedRoute>
            }
          ></Route>
          {/*  Enquiry */}
          <Route
            path="enquiries/add"
            element={
              // in person enquiries.
              <ProtectedRoute allowedRoles={["receptionist", "counsellor"]}>
                <CreateEnquiry></CreateEnquiry>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="enquiries"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "counsellor", "operations_executive"]}
              >
                <Enquiries></Enquiries>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="enquiries/:id"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "counsellor", "operations_executive"]}
              >
                <Enquiry></Enquiry>
              </ProtectedRoute>
            }
          ></Route>
          '{/* subjects */}
          <Route
            path="courses/:id/subjects"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "counsellor", "operations_executive"]}
              >
                <Subjects></Subjects>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="subjects/add"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateSubject></CreateSubject>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="subjects/update"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UpdateSubject></UpdateSubject>
              </ProtectedRoute>
            }
          ></Route>
          {/* topics */}
          <Route
            path="courses/:course_id/subjects/:subject_id/topics"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "counsellor", "operations_executive"]}
              >
                <Topics></Topics>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="courses/:course_id/subjects/:subject_id/topics/:id/update"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateTopic></CreateTopic>
              </ProtectedRoute>
            }
          ></Route>
          {/* student batch allocation routes */}
          <Route
            path="students/no-batch"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "counsellor", "operations_executive"]}
              >
                <Students></Students>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="students/:id/add-batch"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "counsellor", "operations_executive"]}
              >
                <AddBatch></AddBatch>
              </ProtectedRoute>
            }
          ></Route>
          {/* batch students  */}
          <Route
            path="batches/:id/students"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "admin",
                  "instructor",
                  "counsellor",
                  "operations_executive",
                ]}
              >
                <BatchStudents></BatchStudents>
              </ProtectedRoute>
            }
          ></Route>
          {/* exam section */}
          <Route
            path="exams/add"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "operations_executive", "instructor"]}
              >
                <CreateExam></CreateExam>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="exams/update"
            element={
              <ProtectedRoute allowedRoles={["admin", "operations_executive"]}>
                <CreateExam></CreateExam>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="exams"
            element={
              // showing all exams, kinda filtration.
              <ProtectedRoute
                allowedRoles={["admin", "operations_executive", "instructor"]}
              >
                <Exams></Exams>
              </ProtectedRoute>
            }
          ></Route>
          {/* Question section  */}
          <Route
            path="exams/:id/questions"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "operations_executive", "instructor"]}
              >
                <Questions></Questions>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="exams/:id/questions/update"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "operations_executive", "instructor"]}
              >
                <CreateQuestion></CreateQuestion>
              </ProtectedRoute>
            }
          ></Route>
          {/* mocks */}
          <Route
            path="mocks/add"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "operations_executive", "instructor"]}
              >
                <CreateMock></CreateMock>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="mocks"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "operations_executive", "instructor"]}
              >
                <Mocks></Mocks>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="mocks/:id/update"
            element={
              <ProtectedRoute allowedRoles={["admin", "operations_executive"]}>
                <CreateMock></CreateMock>
              </ProtectedRoute>
            }
          ></Route>
          {/* student exams */}
          <Route
            path="exams/students"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentExams></StudentExams>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="exams/:id/conduct"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentQuestions></StudentQuestions>
              </ProtectedRoute>
            }
          ></Route>
          {/* attendance */}
          <Route
            path="attendance"
            element={
              // capture attendance
              <ProtectedRoute
                allowedRoles={["operations_executive", "instructor"]}
              >
                <Attendance></Attendance>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="attendance/student"
            element={
              // show attendance for student.
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentAttendance></StudentAttendance>
              </ProtectedRoute>
            }
          ></Route>
          {/*  course enrollment */}
          <Route
            path="courses/enrolled"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ParticularCourse></ParticularCourse>
              </ProtectedRoute>
            }
          ></Route>
          {/*  add mock marks */}
          <Route
            path="mocks/:id/add-marks"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <MockMarks></MockMarks>
              </ProtectedRoute>
            }
          ></Route>
          <Route // add mock marks
            path="mocks/:id/students/:student/batches/:batch"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <AddMarks></AddMarks>
              </ProtectedRoute>
            }
          ></Route>
          <Route // update mock marks
            path="mocks/:id/students/:student/batches/:batch/update"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <AddMarks></AddMarks>
              </ProtectedRoute>
            }
          ></Route>
          {/*  asignment routes  */}
          <Route
            path="assignments/add"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <CreateAssignment></CreateAssignment>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="instructor/assignments"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <AssignmentFilter></AssignmentFilter>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="assignments"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Assignments></Assignments>
              </ProtectedRoute>
            }
          ></Route>
          {/* notes section */}
          <Route
            path="notes/add"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <CreateAssignment></CreateAssignment>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="instructor/notes"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <AssignmentFilter></AssignmentFilter>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="notes"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Assignments></Assignments>
              </ProtectedRoute>
            }
          ></Route>
          {/* performance route */}
          <Route
            path="student/performance"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Performance></Performance>
              </ProtectedRoute>
            }
          ></Route>
          {/* mock result for student */}
          <Route
            path="student/mocks/results"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <MockResults></MockResults>
              </ProtectedRoute>
            }
          ></Route>
          {/*  show  mock result for instructor , executive  */}
          <Route
            path="mocks/:id/results"
            element={
              <ProtectedRoute allowedRoles={["instructor", "executive"]}>
                <ShowResults></ShowResults>
              </ProtectedRoute>
            }
          ></Route>
        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
