import { useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { createMockResult } from "../../redux/slices/MockResult";
import { AlertCircle, PlusCircle } from "lucide-react";

const AddMarks = () => {
  const params = useParams();

  // Validation logic (same as before)
  const validate = (input_name, value, formData) => {
    let error = "";

    return error;
  };

  const [formData, changeHandler, submitHandler, errors] = useForm(
    {
      student_id: params.student,
      mock_id: params.id,
      batch_id: params.batch,
      marks_obtained: "",
      remarks: "",
    },
    createMockResult,
    validate,
    `/dashboard/mocks/${params.id}/add-marks`,
    "add-mark"
  );

  return (
    // Full viewport height and width, centering with flex
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Add Marks</h2>

        <form onSubmit={submitHandler} noValidate className="space-y-5">
          {/* Marks Obtained */}
          <div>
            <label
              htmlFor="marks_obtained"
              className="block mb-1 font-semibold text-gray-700"
            >
              Marks Obtained
            </label>
            <input
              type="number"
              id="marks_obtained"
              name="marks_obtained"
              onChange={changeHandler}
              className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition ${
                errors.marks_obtained
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              aria-invalid={errors.marks_obtained ? "true" : "false"}
              aria-describedby={
                errors.marks_obtained ? "marks-error" : undefined
              }
            />
            {errors.marks_obtained && (
              <p
                id="marks-error"
                className="mt-1 text-sm text-red-600 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.marks_obtained}
              </p>
            )}
          </div>

          {/* Remarks as Textarea */}
          <div>
            <label
              htmlFor="remarks"
              className="block mb-1 font-semibold text-gray-700"
            >
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              rows={4}
              onChange={changeHandler}
              value={formData.remarks}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            />

            {errors.remarks && (
              <p
                id="marks-error"
                className="mt-1 text-sm text-red-600 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.remarks}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="inline-flex items-center gap-2 justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <PlusCircle className="w-5 h-5" />
            Add Mark
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMarks;
