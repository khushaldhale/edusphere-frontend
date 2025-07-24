import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import CreateCourse from "./components/course/CreateCourse";
import Courses from "./components/course/Courses";
import Subjects from "./components/subject/Subjects";
import CreateSubject from "./components/subject/CreateSubject";
import UpdateSubject from "./components/subject/UpdateSubject";
import Topics from "./components/topic/Topics";
import Index from "./components/home/Index";
import CreateEnquiry from "./components/enquiry/CreateEnquiry";
import Enquiries from "./components/enquiry/Enquiries";
import Enquiry from "./components/enquiry/Enquiry";
import CreateTopic from "./components/topic/createTopic";
import Batches from "./components/batch/Batches";
import CreateBatch from "./components/batch/CreateBatch";
import CreateEmployee from "./components/employees/CreateEmployee";
import Employees from "./components/employees/Employees";
import Students from "./components/students/Students";
import AddBatch from "./components/students/AddBatch";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index></Index>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          {/* courses */}
          <Route path="courses" element={<Courses></Courses>}></Route>
          <Route
            path="courses/add"
            element={<CreateCourse></CreateCourse>}
          ></Route>
          <Route
            path="courses/:id/update"
            element={<CreateCourse></CreateCourse>}
          ></Route>
          {/*  batches */}
          <Route path="batches" element={<Batches></Batches>}></Route>
          <Route
            path="batches/add"
            element={<CreateBatch></CreateBatch>}
          ></Route>
          {/* employees */}
          <Route
            path="employees/add"
            element={<CreateEmployee></CreateEmployee>}
          ></Route>
          <Route path="employees" element={<Employees></Employees>}></Route>'
          <Route
            path="employees/:id/update"
            element={<CreateEmployee></CreateEmployee>}
          ></Route>
          {/*  Enquiry */}
          <Route
            path="enquiries/add"
            element={<CreateEnquiry></CreateEnquiry>}
          ></Route>
          <Route path="enquiries" element={<Enquiries></Enquiries>}></Route>
          <Route path="enquiries/:id" element={<Enquiry></Enquiry>}></Route>'
          {/* subjects */}
          <Route
            path="courses/:id/subjects"
            element={<Subjects></Subjects>}
          ></Route>
          <Route
            path="create-subject"
            element={<CreateSubject></CreateSubject>}
          ></Route>
          <Route
            path="subject/edit"
            element={<UpdateSubject></UpdateSubject>}
          ></Route>
          {/* topics */}
          <Route
            path="courses/:course_id/subjects/:subject_id/topics"
            element={<Topics></Topics>}
          ></Route>
          <Route
            path="courses/:course_id/subjects/:subject_id/topics/:id/update"
            element={<CreateTopic></CreateTopic>}
          ></Route>
          {/* student routes */}
          <Route path="students" element={<Students></Students>}></Route>
          <Route
            path="students/:id/add-batch"
            element={<AddBatch></AddBatch>}
          ></Route>
        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
