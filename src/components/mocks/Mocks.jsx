import { useDispatch, useSelector } from "react-redux";
import ExamFilter from "../exam/ExamFilter";
import { useState } from "react";
import {
  FileText,
  Hash,
  BookOpen,
  ListChecks,
  Trash2,
  Pencil,
} from "lucide-react";
import { deleteMock } from "../../redux/slices/mockSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Mocks = () => {
  const mocks = useSelector((state) => state?.mock?.mocks || []);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center px-4 py-12">
      {/* Filter */}
      <div className="w-full max-w-3xl mb-10">
        <ExamFilter
          selectedBatch={selectedBatch}
          selectedCourse={selectedCourse}
          setSelectedBatch={setSelectedBatch}
          setSelectedCourse={setSelectedCourse}
        />
      </div>

      {/* Mocks Grid */}
      {selectedBatch && selectedCourse && mocks.length > 0 && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {mocks.map((mock, index) => (
            <div
              key={index}
              className="bg-white/80 rounded-2xl border border-gray-100 shadow-lg p-8 flex flex-col gap-4 transition-transform duration-150 hover:scale-[1.025]"
            >
              <h3 className="flex items-center text-xl font-bold text-gray-900 mb-2">
                <FileText className="w-6 h-6 text-blue-600 mr-2" />
                {mock.name}
              </h3>
              <p className="text-gray-700 mb-1">{mock.desc}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm font-semibold">
                <div className="flex items-center gap-1 text-violet-600">
                  <Hash className="w-4 h-4" />
                  {mock.total_marks} Marks
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <BookOpen className="w-4 h-4" />
                  {mock.course}
                </div>
                <div className="flex items-center gap-1 text-purple-600">
                  <ListChecks className="w-4 h-4" />
                  {mock.subject}
                </div>
              </div>
              <div className="flex gap-3 mt-4 pt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    dispatch(deleteMock({ mock_id: mock._id })).then(
                      (action) => {
                        if (action.payload.success) {
                          toast.success(action.payload.message);
                        }
                      }
                    );
                  }}
                  className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-4 py-2 rounded-xl shadow transition-all duration-150 hover:shadow-xl focus:ring-2 focus:ring-red-200 focus:outline-none"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigate(`/dashboard/mocks/${mock._id}/update`, {
                      state: mock,
                    });
                  }}
                  className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-4 py-2 rounded-xl shadow transition-all duration-150 hover:shadow-xl focus:ring-2 focus:ring-purple-200 focus:outline-none"
                >
                  <Pencil className="w-4 h-4" />
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No mocks found */}
      {selectedCourse && selectedBatch && mocks.length === 0 && (
        <div className="flex flex-col items-center mt-24">
          <span className="text-2xl font-semibold text-gray-600 mb-2">
            No Mock Exists
          </span>
          <span className="text-sm text-gray-400">
            Looks like there are no mocks for this batch/course yet.
          </span>
        </div>
      )}

      {/* Select prompt */}
      {!(selectedBatch && selectedCourse) && (
        <div className="flex flex-col items-center mt-24">
          <span className="text-2xl font-semibold text-gray-600 mb-2">
            Select course and batch to view mocks
          </span>
        </div>
      )}
    </div>
  );
};

export default Mocks;
