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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Mock Students</h2>

        {students.length > 0 ? (
          <div className="grid grid-cols-1 gap-5">
            {students.map((student) => (
              <div
                key={student._id}
                className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4"
              >
                <div className="flex items-center gap-4">
                  <User className="w-10 h-10 text-blue-600 bg-blue-50 rounded-full p-1" />
                  <span className="text-lg font-semibold text-gray-900">
                    {student.fname} {student.lname}
                  </span>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/mocks/${mock_id}/students/${student._id}/batches/${batch_id}`
                    )
                  }
                  className="flex items-center gap-2 py-2 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Add Marks for student"
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Marks
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white shadow rounded-xl border border-gray-100 py-10 text-gray-500 font-semibold">
            No student exists in this batch for this mock.
          </div>
        )}
      </div>
    </div>
  );
};

export default MockMarks;
