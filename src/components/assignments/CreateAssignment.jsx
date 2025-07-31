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
  Info,
  Upload,
  FolderPlus,
  AlertCircle,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { createNotes } from "../../redux/slices/notesSlice";
import Loading from "../Loading";

export const CreateAssignment = () => {
  const batches = useSelector((state) => state.batch.batches);
  const subjects = useSelector((state) => state.subject.subjects);
  const topics = useSelector((state) => state.topic.topics);
  const [courses] = useFetchCourses();
  const [unfilteredTopics, setTopics] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const required_path = location.pathname.split("/").at(-2);
  let payload;
  let thunk;
  let navigate_url;
  let isLoading;
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
    isLoading = useSelector((state) => {
      return state.notes.isLoading;
    });
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
    isLoading = useSelector((state) => {
      return state.assignments.isLoading;
    });
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

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-2">
      <div className="w-full max-w-2xl md:max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <FolderPlus className="w-7 h-7 text-blue-700" />
          Create Assignment
        </h2>
        <form onSubmit={submitHandler} className="space-y-6" noValidate>
          {/* Row 1: Course + Batch */}
          <div className="flex flex-col md:flex-row gap-4">
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
                onChange={(e) => {
                  changeHandler(e);
                  get_batches(e);
                }}
                value={formData.course_id}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                <option value="">Select a course</option>
                {courses.length > 0 &&
                  courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.course_name}
                    </option>
                  ))}
              </select>
              {errors.course_id && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.course_id}
                </p>
              )}
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
                onChange={changeHandler}
                value={formData.batch_id}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
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
              {errors.batch_id && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.batch_id}
                </p>
              )}
            </div>
          </div>
          {/* Row 2: Subject + Topic */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="subject_id"
                className="block mb-1 font-semibold text-gray-700 flex items-center gap-2"
              >
                <Layers className="w-4 h-4" /> Subject
              </label>
              <select
                name="subject_id"
                id="subject_id"
                onChange={(e) => {
                  changeHandler(e);
                  get_topics(e);
                }}
                value={formData.subject_id}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                disabled={!formData.batch_id}
              >
                <option value="">Select a subject</option>
                {subjects.length > 0 &&
                  subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
              </select>
              {errors.subject_id && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.subject_id}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label
                htmlFor="topic_id"
                className="block mb-1 font-semibold text-gray-700 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" /> Topic
              </label>
              <select
                name="topic_id"
                id="topic_id"
                onChange={changeHandler}
                value={formData.topic_id}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                disabled={!formData.subject_id}
              >
                <option value="">Select a topic</option>
                {topics.length > 0 &&
                  topics.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {topic.name}
                    </option>
                  ))}
              </select>
              {errors.topic_id && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.topic_id}
                </p>
              )}
            </div>
          </div>

          {/* Assignment PDF Upload */}
          {required_path === "notes" ? (
            <div>
              <label
                htmlFor="notes_pdf"
                className="block mb-1 font-semibold text-gray-700 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> Upload Notes PDF
              </label>
              <input
                type="file"
                name="notes_pdf"
                id="notes_pdf"
                accept="application/pdf"
                onChange={changeHandler}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-2 rounded-md bg-white"
              />
              {errors.notes_pdf && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.notes_pdf}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label
                htmlFor="assignment_pdf"
                className="block mb-1 font-semibold text-gray-700 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> Upload Assignment PDF
              </label>
              <input
                type="file"
                name="assignment_pdf"
                id="assignment_pdf"
                accept="application/pdf"
                onChange={changeHandler}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-2 rounded-md bg-white"
              />
              {errors.assignment_pdf && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.assignment_pdf}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center gap-2 justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
          >
            <FolderPlus className="w-5 h-5" />
            Create Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
