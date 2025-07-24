import { Calendar, StickyNote, RefreshCcw } from "lucide-react";
import useForm from "../../hooks/useForm";
import { changeEnquiryStatus } from "../../redux/slices/enquirySlice";

const FollowUpForm = ({ enquiry_id }) => {
  const validate = (input_name, value, formData) => {
    let error = "";
    if (input_name === "follow_up_date" && !value) {
      error = "Please select a follow-up date.";
    }
    if (input_name === "remarks" && !value.trim()) {
      error = "Remarks are required.";
    }
    return error;
  };

  const [formData, changeHandler, submitHandler, errors] = useForm(
    {
      enquiry_id,
      status: "follow-up",
      follow_up_date: "",
      remarks: "",
    },
    changeEnquiryStatus,
    validate,
    "/dashboard/enquiries",
    "follow-up"
  );

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <form
        onSubmit={submitHandler}
        className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
          <RefreshCcw className="w-6 h-6 text-purple-600" />
          Add Next Follow Up
        </h2>

        {/* Follow Up Date */}
        <div className="space-y-2">
          <label
            htmlFor="follow_up_date"
            className="flex items-center text-sm font-semibold text-gray-700"
          >
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            Next Follow-up Date
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="date"
            name="follow_up_date"
            id="follow_up_date"
            onChange={changeHandler}
            value={formData.follow_up_date}
            required
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 focus:ring-4 focus:ring-opacity-20 ${
              errors.follow_up_date
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
            }`}
          />
          {errors.follow_up_date && (
            <p className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
              {errors.follow_up_date}
            </p>
          )}
        </div>

        {/* Remarks */}
        <div className="space-y-2">
          <label
            htmlFor="remarks"
            className="flex items-center text-sm font-semibold text-gray-700"
          >
            <StickyNote className="w-4 h-4 mr-2 text-gray-500" />
            Remarks
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="remarks"
            id="remarks"
            onChange={changeHandler}
            value={formData.remarks}
            required
            placeholder="Add your remarks for this follow-up"
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none bg-white hover:border-gray-300 focus:ring-4 focus:ring-opacity-20 ${
              errors.remarks
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
            }`}
          />
          {errors.remarks && (
            <p className="flex items-center text-red-600 text-sm mt-1 animate-fade-in">
              {errors.remarks}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-purple-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            <span>Next Follow Up</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FollowUpForm;
