import { useState } from "react";
import {
  DollarSign,
  Calendar,
  Receipt,
  AlertCircle,
  ListChecks,
} from "lucide-react";
import { toast } from "react-toastify";

const Installment = ({ index, element, formData, setFormData }) => {
  const [installmentCheck, setInstallmentCheck] = useState(false);

  const [breakdown, setBreakDown] = useState({
    is_paid: true,
    paid_on: "",
    mode: "Cash",
    transaction: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "mode": {
        if (!value.trim()) {
          error = "Payment Mode is required.";
        }
      }
      case "transaction": {
        if (!value.trim()) {
          error = "Transaction ID is required for non-cash payments.";
        }
      }
    }

    return error;
  };

  const breakdownHandler = (event) => {
    const { name, value } = event.target;

    let custom_error = {};
    if (name === "mode" && value === "Cash") {
      custom_error = {
        transaction: "",
      };
    }

    let error = validate(name, value);
    setErrors((prevData) => {
      return {
        ...prevData,
        [name]: error,
        ...custom_error,
      };
    });
    setBreakDown((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const payInstallment = () => {
    console.log("errors : ", errors);
    const action = Object.values(errors).every((error) => {
      if (error === "") {
        return true;
      }
    });

    if (action) {
      const required_arr = formData.installment_info.map((element) => {
        if (element.installment_number === index + 1) {
          return {
            ...element,
            ...breakdown,
            paid_on: new Date(Date.now()),
          };
        } else {
          return element;
        }
      });
      setInstallmentCheck(!installmentCheck);
      setFormData((prevData) => {
        return {
          ...prevData,
          installment_info: required_arr,
        };
      });
    } else {
      toast.error("Fix the errors first then proceed.");
    }
  };

  return (
    <div
      key={index}
      className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-gray-100 space-y-4 transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-base text-gray-700 font-semibold">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            <span>₹{element.amount}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            <span>Due in {element?.due_date?.toISOString().split("T")[0]}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setInstallmentCheck(!installmentCheck);
          }}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-md
            ${
              installmentCheck
                ? "bg-red-500 hover:bg-red-600 text-white focus:ring-red-200"
                : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-200"
            } focus:ring-4 focus:ring-opacity-20`}
        >
          {installmentCheck ? "Cancel" : "Pay"} Installment
        </button>
      </div>

      {/* Separate section for capturing the data */}
      {installmentCheck && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <ListChecks className="w-5 h-5 mr-2 text-purple-600" />
            Capture Installment Payment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Mode */}
            <div className="space-y-2">
              <label
                htmlFor={`mode-${index}`} // Unique ID for each installment
                className="flex items-center text-sm font-semibold text-gray-700"
              >
                <ListChecks className="w-4 h-4 mr-2 text-gray-500" />
                Payment Mode
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="mode"
                  id={`mode-${index}`}
                  onChange={breakdownHandler}
                  value={breakdown.mode}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 appearance-none
                    ${
                      errors?.mode
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }
                    focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                >
                  {["Cash", "UPI", "Bank-Transfer", "Card"].map((mode, idx) => (
                    <option key={idx} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
              {errors?.mode && (
                <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{errors.mode}</span>
                </div>
              )}
            </div>

            {/* Transaction ID (Conditional) */}
            {breakdown.mode !== "Cash" && (
              <div className="space-y-2">
                <label
                  htmlFor={`transaction-${index}`} // Unique ID for each installment
                  className="flex items-center text-sm font-semibold text-gray-700"
                >
                  <Receipt className="w-4 h-4 mr-2 text-gray-500" />
                  Transaction ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="transaction"
                    id={`transaction-${index}`}
                    placeholder="Optional: Enter transaction ID"
                    onChange={breakdownHandler}
                    value={breakdown.transaction}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
                      ${
                        errors?.transaction
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                      }
                      focus:ring-4 focus:ring-opacity-20 outline-none bg-white hover:border-gray-300`}
                  />
                </div>
                {errors?.transaction && (
                  <div className="flex items-center mt-2 text-red-600 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{errors.transaction}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pay Installment Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={payInstallment}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl text-md transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-green-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <DollarSign className="w-5 h-5" />
              <span>Confirm Payment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Installment;
