import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteTopic, getTopics } from "../../redux/slices/topicSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Edit3, Trash2, NotebookPen } from "lucide-react";
import CreateTopic from "./CreateTopic";
import Loading from "../Loading";

const cardHoverVariants = {
  hover: {
    scale: 1.025,
    y: -3,
    boxShadow: "0 8px 24px 2px rgba(48, 99, 217, 0.08)",
  },
};
const buttonVariants = {
  hover: { scale: 1.04 },
  tap: { scale: 0.97 },
};

const Topics = () => {
  const subject_id = useParams().subject_id;
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.topic.topics);
  const [addTopic, setAddTopic] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = useSelector((state) => {
    return state.topic.isLoading;
  });

  useEffect(() => {
    dispatch(getTopics({ subject_id })).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  }, [dispatch, subject_id]);

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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Topics</h1>
            <p className="text-gray-600">Manage your academic Topics</p>
          </div>

          {/* Button (goes below on mobile, right on sm+) */}
          <div className="w-full sm:w-auto mt-28 sm:mt-0 sm:ml-auto flex justify-end">
            <button
              onClick={() => setAddTopic(!addTopic)}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            >
              {addTopic ? "Cancel" : "Add Topic"}
            </button>
          </div>
        </motion.div>

        {/* CreateSubject component is rendered conditionally below the button container */}
        {addTopic && <CreateTopic setAddTopic={setAddTopic} />}

        {/* Topic Cards */}
        <div className="my-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <AnimatePresence>
            {topics && topics.length > 0 ? (
              topics.map((topic) => (
                <motion.div
                  key={topic._id}
                  variants={cardHoverVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden group relative p-6 w-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <NotebookPen className="text-indigo-600 w-5 h-5 flex-shrink-0" />
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {topic.name.charAt(0).toUpperCase() +
                          topic.name.slice(1)}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {topic.desc.charAt(0).toUpperCase() + topic.desc.slice(1)}
                  </p>
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <motion.a
                      href={topic.notes_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm"
                      download
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Notes</span>
                    </motion.a>

                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg text-sm" // Added text-sm
                      onClick={() => {
                        navigate(`${location.pathname}/${topic._id}/update`, {
                          state: topic,
                        });
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
                        dispatch(deleteTopic({ topic_id: topic._id }));
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full py-8">
                No Topic is created yet.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Topics;
