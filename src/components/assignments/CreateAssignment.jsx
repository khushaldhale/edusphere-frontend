import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { createAssignment } from "../../redux/slices/assignmentSlice";
import useFetchCourses from "../../hooks/useFetchCourses";
import { getAllBatches } from "../../redux/slices/batchSlice";
import { addSubjects } from "../../redux/slices/subjectSlice";
import { addTopics } from "../../redux/slices/topicSlice";
import { useState } from "react";
import {
  BookOpen,
  Users,
  Layers,
  FileText,
  Upload,
  FolderPlus,
  AlertCircle,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { createNotes } from "../../redux/slices/notesSlice";
import Loading from "../Loading";

export const CreateAssignment = () => {
  const batches = useSelector((state) => state.batch.batches || []);
  const subjects = useSelector((state) => state.subject.subjects || []);
  const topics = useSelector((state) => state.topic.topics || []);
  const [courses] = useFetchCourses();
  const [unfilteredTopics, setTopics] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const required_path = location.pathname.split("/").at(-2);
  const notes_load = useSelector((state) => state?.notes?.isLoading);
  const assignment_load = useSelector((state) => state?.assignment?.isLoading);

  let payload;
  let thunk;
  let navigate_url;
  if (required_path === "notes") {
    payload = {
      batch_id: "",
      subject_id: "",
      topic_id: "",
      notes_pdf: "",
      course_id: "",
    };
    thunk = createNotes;
    navigate_url = "/dashboard/instructor/notes";
  } else {
    payload = {
      batch_id: "",
      subject_id: "",
      topic_id: "",
      assignment_pdf: "",
      course_id: "",
    };
    thunk = createAssignment;
    navigate_url = "/dashboard/instructor/assignments";
  }

  const validate = (input_name, value, formData) => {
    return ""; /* add logic as needed */
  };

  const [formData, changeHandler, submitHandler, errors] = useForm(
    payload,
    thunk,
    validate,
    navigate_url,
    "assignments"
  );

  const get_batches = (event) => {
    const course_id = event.target.value;
    dispatch(getAllBatches({ course_id })).then((action) => {
      if (action.payload.success) {
        dispatch(addSubjects(action.payload.data[0].course.subjects));
        let required_arr = [];
        for (let element of action.payload.data[0].course.subjects) {
          required_arr = [...required_arr, ...element.topics];
        }
        setTopics(required_arr);
      }
    });
  };

  const get_topics = (event) => {
    const subject_id = event.target.value;
    const required_topics = unfilteredTopics.filter(
      (topic) => topic.subject === subject_id
    );
    dispatch(addTopics(required_topics));
  };

  if (assignment_load || notes_load) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <FolderPlus className="w-7 h-7 text-blue-600" />
          Create {required_path === "notes" ? "Notes" : "Assignment"}
        </h2>

        <form onSubmit={submitHandler} className="space-y-8" noValidate>
          {/* Row 1: Course & Batch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 relative">
              <label
                htmlFor="course_id"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Course <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="course_id"
                  id="course_id"
                  onChange={(e) => {
                    changeHandler(e);
                    get_batches(e);
                  }}
                  value={formData.course_id}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
              {errors.course_id && (
                <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.course_id}
                </p>
              )}
            </div>

            <div className="space-y-2 relative">
              <label
                htmlFor="batch_id"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Batch <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="batch_id"
                  id="batch_id"
                  onChange={changeHandler}
                  value={formData.batch_id}
                  disabled={!formData.course_id}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
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
              {errors.batch_id && (
                <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.batch_id}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Subject & Topic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 relative">
              <label
                htmlFor="subject_id"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <Layers className="w-5 h-5 mr-2 text-blue-600" />
                Subject <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="subject_id"
                  id="subject_id"
                  onChange={(e) => {
                    changeHandler(e);
                    get_topics(e);
                  }}
                  value={formData.subject_id}
                  disabled={!formData.batch_id}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    !formData.batch_id
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select a subject</option>
                  {subjects.length > 0 &&
                    subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors.subject_id && (
                <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.subject_id}
                </p>
              )}
            </div>

            <div className="space-y-2 relative">
              <label
                htmlFor="topic_id"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Topic <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="topic_id"
                  id="topic_id"
                  onChange={changeHandler}
                  value={formData.topic_id}
                  disabled={!formData.subject_id}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    !formData.subject_id
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select a topic</option>
                  {topics.length > 0 &&
                    topics.map((topic) => (
                      <option key={topic._id} value={topic._id}>
                        {topic.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors.topic_id && (
                <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.topic_id}
                </p>
              )}
            </div>
          </div>

          {/* PDF Upload */}
          <div className="space-y-2">
            <label
              htmlFor={
                required_path === "notes" ? "notes_pdf" : "assignment_pdf"
              }
              className="block text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <Upload className="w-5 h-5 text-blue-600" />
              Upload {required_path === "notes"
                ? "Notes"
                : "Assignment"} PDF <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="file"
              name={required_path === "notes" ? "notes_pdf" : "assignment_pdf"}
              id={required_path === "notes" ? "notes_pdf" : "assignment_pdf"}
              accept="application/pdf"
              onChange={changeHandler}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full border border-gray-300 rounded-lg py-3 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            {(required_path === "notes" && errors.notes_pdf) ||
            (required_path !== "notes" && errors.assignment_pdf) ? (
              <p className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {required_path === "notes"
                  ? errors.notes_pdf
                  : errors.assignment_pdf}
              </p>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center gap-2 justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6"
          >
            <FolderPlus className="w-5 h-5" />
            Create {required_path === "notes" ? "Notes" : "Assignment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
