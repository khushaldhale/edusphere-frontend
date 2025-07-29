import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBatchStudentsByMock } from "../../redux/slices/mockSlice";
import { User, PlusCircle } from "lucide-react";

const MockMarks = () => {
  const mock_id = useParams().id;
  const dispatch = useDispatch();
  const students = useSelector((state) => state.mock.students || []);
  const batch_id = useSelector((state) => state.mock.batch_id);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBatchStudentsByMock({ mock_id }));
    // eslint-disable-next-line
  }, [dispatch, mock_id]);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6">
      <h2 className="text-2xl font-semibold mb-6">Mock Students</h2>

      {students.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {students.map((student) => (
            <div
              key={student._id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-blue-600 bg-blue-50 rounded-full p-1" />
                <span className="text-lg font-semibold text-gray-900">
                  {student.full_name}
                </span>
              </div>
              <button
                onClick={() =>
                  navigate(
                    `/dashboard/mocks/${mock_id}/students/${student._id}/batches/${batch_id}`
                  )
                }
                className="flex items-center gap-2 py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <PlusCircle className="w-5 h-5" />
                Add Marks
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white shadow py-10 rounded-xl border border-gray-100 text-gray-500 font-semibold">
          No student exists in this batch for this mock.
        </div>
      )}
    </div>
  );
};

export default MockMarks;
