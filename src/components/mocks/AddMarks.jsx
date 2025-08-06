import { useLocation, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import {
  createMockResult,
  particularMockResult,
  updateMockResult,
} from "../../redux/slices/MockResult";
import { AlertCircle, PlusCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddMarks = () => {
  const params = useParams();
  const marksRef = useRef();
  const dispatch = useDispatch();
  const required_path = useLocation().pathname.split("/").at(-1);
  let thunk;
  if (required_path === "update") {
    thunk = updateMockResult;
  } else {
    thunk = createMockResult;
  }
  // Validation logic placeholder
  const validate = (input_name, value, formData) => {
    let error = "";
    // Add validation rules here if needed
    return error;
  };

  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      student_id: params.student,
      mock_id: params.id,
      batch_id: params.batch,
      marks_obtained: "",
      remarks: "",
      mock_result_id: "",
    },
    thunk,
    validate,
    `/dashboard/mocks/${params.id}/add-marks`,
    "add-mark"
  );

  useEffect(() => {
    // get the mock  data
    if (required_path === "update") {
      dispatch(
        particularMockResult({ student_id: params.student, mock_id: params.id })
      ).then((action) => {
        if (action.payload.success) {
          setFormData((prevData) => {
            return {
              ...prevData,
              remarks: action.payload.data.remarks,
              mock_result_id: action.payload.data._id,
            };
          });

          marksRef.current.value = action.payload.data.marks_obtained;
        }
      });
    }
  }, [dispatch, required_path]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <PlusCircle className="w-7 h-7 text-blue-600" />
          {required_path === "update" ? "Update Marks" : " Add Marks"}
        </h2>

        <form
          onSubmit={(event) => {
            marksRef.current.value = "";
            submitHandler(event);
          }}
          noValidate
          className="space-y-8"
        >
          {/* Marks Obtained */}
          <div className="space-y-2 relative">
            <label
              htmlFor="marks_obtained"
              className="block text-sm font-medium text-gray-700"
            >
              Marks Obtained
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              id="marks_obtained"
              name="marks_obtained"
              onChange={changeHandler}
              ref={marksRef}
              aria-invalid={errors.marks_obtained ? "true" : "false"}
              aria-describedby={
                errors.marks_obtained ? "marks-error" : undefined
              }
              className={`w-full px-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 transition-colors ${
                errors.marks_obtained
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter marks obtained"
              required
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

          {/* Remarks */}
          <div className="space-y-2 relative">
            <label
              htmlFor="remarks"
              className="block text-sm font-medium text-gray-700"
            >
              Remarks
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="remarks"
              name="remarks"
              rows={4}
              onChange={changeHandler}
              value={formData.remarks}
              className="w-full px-4 py-3 border rounded-lg bg-white text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 hover:border-gray-400"
              placeholder="Enter remarks"
            />
            {errors.remarks && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.remarks}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400"
            aria-label="Add Marks"
          >
            <PlusCircle className="w-5 h-5" />
            {required_path === "update" ? "Update Marks" : " Add Marks"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMarks;
