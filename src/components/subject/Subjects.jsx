import { useDispatch, useSelector } from "react-redux";
import { deleteSubject, getSubjects } from "../../redux/slices/subjectSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Eye, Trash2, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateSubject from "./CreateSubject";
import Loading from "../Loading";

const Subjects = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject.subjects);
  const navigate = useNavigate();
  const course_id = useParams().id;
  const [addSubject, setAddSubject] = useState(false);
  const isLoading = useSelector((state) => {
    return state.subject.isLoading;
  });

  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: { scale: 0.98, y: 0 },
  };

  const cardHoverVariants = {
    hover: {
      y: -4,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const delete_subject = (subject_id) => {
    dispatch(deleteSubject({ subject_id })).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  };

  const update_subject = (subject) => {
    navigate("/dashboard/subject/edit", {
      state: subject,
    });
  };

  useEffect(() => {
    dispatch(getSubjects({ course_id })).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  }, [dispatch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 font-sans">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 relative flex flex-col sm:flex-row items-center sm:justify-center"
        >
          {/* Centered Text */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Subjects</h1>
            <p className="text-gray-600">
              Manage your academic subjects and their associated topics
            </p>
          </div>

          {/* Button (goes below on mobile, right on sm+) */}
          <div className="w-full sm:w-auto mt-28 sm:mt-0 sm:ml-auto flex justify-end">
            <button
              onClick={() => setAddSubject(!addSubject)}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            >
              {addSubject ? "Cancel" : "Add Subject"}
            </button>
          </div>
        </motion.div>

        {/* CreateSubject component is rendered conditionally below the button container */}
        {addSubject && <CreateSubject />}

        {/* Subject Cards */}
        <div className="my-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <AnimatePresence>
            {subjects.length > 0 ? (
              subjects.map((sub) => (
                <motion.div
                  key={sub._id}
                  variants={cardHoverVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: "100%",
                  }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden group relative p-6" // Added relative and p-6 for consistent padding
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="text-blue-600 w-5 h-5 flex-shrink-0" />{" "}
                      {/* Added flex-shrink-0 */}
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {sub.name.charAt(0).toUpperCase() + sub.name.slice(1)}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {" "}
                    {/* Added mb-4 */}
                    {sub.desc.charAt(0).toUpperCase() + sub.desc.slice(1)}
                  </p>

                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    {" "}
                    {/* Added pt-4 and border-t */}
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => {
                        navigate(
                          `/dashboard/courses/${course_id}/subjects/${sub._id}/topics`
                        );
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm" // Added text-sm
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Topics</span>
                    </motion.button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg text-sm" // Added text-sm
                      onClick={() => {
                        update_subject(sub);
                      }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg text-sm" // Added text-sm
                      onClick={() => {
                        delete_subject(sub._id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full py-8">
                No Subject is created yet.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
