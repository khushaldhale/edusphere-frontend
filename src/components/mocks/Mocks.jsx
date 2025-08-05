import { useDispatch, useSelector } from "react-redux";
import ExamFilter from "../exam/ExamFilter";
import { useEffect, useState } from "react";
import { FileText, Hash, ListChecks, Edit3, Trash2, Eye } from "lucide-react";
import { clear_mock, deleteMock } from "../../redux/slices/mockSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../Loading";

const Mocks = () => {
  const mocks = useSelector((state) => state?.mock?.mocks || []);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subjects = useSelector((state) => state.subject.subjects);
  const isLoading = useSelector((state) => state.mock.isLoading);

  useEffect(() => {
    dispatch(clear_mock());
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8 flex  justify-center items-center gap-3">
          Mocks
        </h1>

        {/* Filter */}
        <ExamFilter
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          mocks={mocks}
        />

        {/* Mocks List */}
        {mocks.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {mocks.map((mock) => (
              <div
                key={mock._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    {mock.name}
                  </h2>
                </div>

                <p className="text-gray-700 mb-3">{mock.desc}</p>

                <div className="flex flex-col gap-2 text-gray-700 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold">Total Marks:</span>{" "}
                    {mock.total_marks}
                  </div>
                  <div className="flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-purple-500" />
                    <span className="font-semibold">Subject:</span>{" "}
                    {subjects.find((subject) => subject._id === mock.subject)
                      ?.name || "Unknown"}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => {
                        navigate(`/dashboard/mocks/${mock._id}/add-marks`);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
                      aria-label="Add Marks to Mock"
                    >
                      <Edit3 className="w-4 h-4 text-white" />
                      Add Marks
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => {
                        navigate(`/dashboard/mocks/${mock._id}/update`, {
                          state: mock,
                        });
                      }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-sm"
                      aria-label="Update Mock"
                    >
                      <Edit3 className="w-4 h-4" />
                      Update
                    </motion.button>

                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => {
                        dispatch(deleteMock({ mock_id: mock._id })).then(
                          (action) => {
                            if (action.payload?.success) {
                              toast.success(action.payload.message);
                            } else {
                              toast.error(
                                action.payload?.message || "Error deleting"
                              );
                            }
                          }
                        );
                      }}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-sm"
                      aria-label="Delete Mock"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 text-gray-600 italic text-lg">
            {selectedBatch
              ? "No mocks found for this batch."
              : "First select a course and batch to view mocks."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mocks;
