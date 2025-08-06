import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBatchStudentsByMock } from "../../redux/slices/mockSlice";
import { User, PlusCircle, Edit3 } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center flex justify-center items-center gap-4">
          <User className="w-10 h-10 text-blue-700" />
          Mock Students
        </h2>

        {students.length > 0 ? (
          <div className="space-y-6">
            {students.map((student) => (
              <div
                key={student._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-300 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4"
              >
                {/* Student info */}
                <div className="flex items-center gap-5">
                  <User className="w-14 h-14 text-blue-700 bg-blue-100 rounded-full p-3 shadow-md" />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">
                      {student.fname} {student.lname}
                    </p>
                    {/* Optional email or extra info */}
                    {/* <p className="text-sm text-gray-500">{student.email}</p> */}
                  </div>
                </div>

                {/* Buttons: Add Marks & Update Marks */}
                <div className="flex gap-4 flex-wrap md:flex-nowrap">
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/mocks/${mock_id}/students/${student._id}/batches/${batch_id}`
                      )
                    }
                    className="flex items-center gap-2 py-2 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    aria-label={`Add Marks for ${student.fname} ${student.lname}`}
                  >
                    <PlusCircle className="w-5 h-5" />
                    Add Marks
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/mocks/${mock_id}/students/${student._id}/batches/${batch_id}/update`
                      )
                    }
                    className="flex items-center gap-2 py-2 px-5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                    aria-label={`Update Marks for ${student.fname} ${student.lname}`}
                  >
                    <Edit3 className="w-5 h-5" />
                    Update Marks
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-32 bg-white rounded-2xl shadow-lg border border-gray-200 py-16 px-10 text-center text-gray-400 font-semibold select-none text-lg">
            No students exist in this batch for this mock.
          </div>
        )}
      </div>
    </div>
  );
};

export default MockMarks;
