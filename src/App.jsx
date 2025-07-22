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

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Index></Index>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          {/* courses */}
          <Route
            path="create-course"
            element={<CreateCourse></CreateCourse>}
          ></Route>
          <Route path="courses" element={<Courses></Courses>}></Route>
          <Route
            path="courses/:id/update-course"
            element={<CreateCourse></CreateCourse>}
          ></Route>
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
          {/* get and add topics */}
          <Route
            path="courses/:course_id/subjects/:subject_id/topics"
            element={<Topics></Topics>}
          ></Route>
          {/* update topics */}
          <Route
            path="courses/:course_id/subjects/:subject_id/topics/:id/update"
            element={<CreateTopic></CreateTopic>}
          ></Route>

          {/*  Enquiry */}
          <Route
            path="create-enquiry"
            element={<CreateEnquiry></CreateEnquiry>}
          ></Route>
          <Route path="enquiries" element={<Enquiries></Enquiries>}></Route>
          <Route path="enquiries/:id" element={<Enquiry></Enquiry>}></Route>
        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
