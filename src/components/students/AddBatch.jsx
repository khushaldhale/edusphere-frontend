import { User, LayoutList, GraduationCap, PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToBatch, getAllBatches } from "../../redux/slices/batchSlice";
import { toast } from "react-toastify";

const AddBatch = () => {
  const location = useLocation();
  const data = location.state;
  const dispatch = useDispatch();
  const batches = useSelector((state) => state.batch.batches);

  useEffect(() => {
    dispatch(getAllBatches({ course_id: data.course_interested }));
  }, [dispatch, data.course_interested]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Student Info Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-8 flex flex-col sm:flex-row items-center gap-6">
          {/* Student Image (if any) or fallback */}
          {data.student_img ? (
            <img
              src={data.student_img}
              alt={data.full_name}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-purple-300 shadow"
            />
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200 shadow">
              <User className="w-14 h-14 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <User className="w-6 h-6 text-purple-600" />
              {data.full_name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-700">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
                <LayoutList className="w-4 h-4" />
                {data.learning_mode.charAt(0).toUpperCase() +
                  data.learning_mode.slice(1)}
              </span>
              {data.last_qualification && (
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  {data.last_qualification}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Available Batches */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 px-8 py-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6">
            <LayoutList className="w-6 h-6 text-blue-600 mr-2" />
            Available Batches for this Student
          </h3>
          {batches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {batches.map((batch) => (
                <div
                  key={batch._id}
                  className="flex flex-col gap-3 border-2 border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition-all duration-200 bg-white"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-gray-900">
                      {batch.name}
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1 text-gray-700">
                    {batch.desc && (
                      <span className="text-sm">{batch.desc}</span>
                    )}
                    {batch.timing && (
                      <span className="text-sm text-gray-500">
                        <span className="font-medium">Timing:</span>{" "}
                        {batch.timing}
                      </span>
                    )}
                  </div>
                  {/* Add to Batch Button */}
                  <button
                    type="button"
                    className="mt-3 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition"
                    onClick={() => {
                      dispatch(
                        addToBatch({
                          batch_id: batch._id,
                          student_id: data._id,
                        })
                      ).then((action) => {
                        if (action.payload.success) {
                          toast.success(action.payload.message);
                        } else {
                          toast.error(action.payload.message);
                        }
                      });
                    }}
                  >
                    <PlusCircle className="w-5 h-5" />
                    Add to Batch
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-gray-500 text-lg">
              No batch exists for this course
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBatch;
