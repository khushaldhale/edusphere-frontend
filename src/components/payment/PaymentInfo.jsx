import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { particularEnrollment } from "../../redux/slices/enrollmentSlice";
import {
  IndianRupee,
  Calendar,
  Banknote,
  BadgeCheck,
  BadgeX,
  BadgeDollarSign,
  ChevronDown,
  CreditCard,
  Clock,
  ListOrdered,
  ScanLine,
} from "lucide-react";

const PaymentInfo = () => {
  const enrollment = useSelector((state) => state.enrollment.enrollment);
  const dispatch = useDispatch();

  console.log(enrollment);

  useEffect(() => {
    dispatch(particularEnrollment());
    // eslint-disable-next-line
  }, [dispatch]);

  if (!enrollment)
    return (
      <div className="max-w-lg mx-auto mt-12 p-10 rounded-2xl border border-gray-100 shadow text-center text-gray-500 font-semibold">
        No payment info found for student.
      </div>
    );

  return (
    <div className="max-w-4xl h-screen mx-auto p-6 flex   justify-center items-center">
      {/* Main Card */}
      <div className="bg-white border-2 border-gray-100 rounded-2xl shadow p-8 mb-8">
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <IndianRupee className="w-5 h-5 text-green-600" />
            Amount Paid:
            <span className="ml-1 text-green-700 font-bold">
              ₹{enrollment.amount_paid}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-5 h-5 text-blue-400" />
            Admission Date:
            <span className="ml-1 font-medium">
              {enrollment.enrollment_date &&
                new Date(enrollment.enrollment_date).toLocaleDateString(
                  "en-GB"
                )}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <BadgeDollarSign className="w-5 h-5 text-purple-500" />
            Is Lump Sum:
            <span
              className={`ml-2 font-semibold inline-flex items-center px-2 py-0.5 rounded-full text-xs
                ${
                  enrollment.is_lumpsum
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }
              `}
            >
              {enrollment.is_lumpsum ? (
                <>
                  <BadgeCheck className="w-4 h-4 mr-1" /> Yes
                </>
              ) : (
                <>
                  <BadgeX className="w-4 h-4 mr-1" /> No
                </>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <BadgeCheck className="w-5 h-5 text-green-600" />
            Is Total Fee Paid:
            <span
              className={`ml-2 font-semibold inline-flex items-center px-2 py-0.5 rounded-full text-xs
                ${
                  enrollment.is_total_fee_paid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {enrollment.is_total_fee_paid ? (
                <>
                  <BadgeCheck className="w-4 h-4 mr-1" /> Yes
                </>
              ) : (
                <>
                  <BadgeX className="w-4 h-4 mr-1" /> No
                </>
              )}
            </span>
          </div>
        </div>

        {/* Installment Info */}
        {!enrollment.is_lumpsum && enrollment.installment_info?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ListOrdered className="w-5 h-5 text-blue-500" />
              <span className="text-md font-semibold text-gray-800">
                Installment Info
              </span>
            </div>
            <div className="divide-y divide-gray-100 border rounded-xl">
              {enrollment.installment_info.map((installment, idx) => (
                <div
                  key={idx}
                  className="px-5 py-4 bg-gray-50 even:bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                >
                  <div className="flex flex-wrap items-center gap-4 mb-2 sm:mb-0">
                    <div className="flex items-center gap-1 min-w-[110px]">
                      <span className="font-semibold text-gray-900">
                        #{installment.installment_number} Installment
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-700">
                      <IndianRupee className="w-4 h-4 text-green-600" />
                      <span>Amount: </span>
                      <span className="font-semibold text-green-700">
                        ₹{installment.amount}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-700">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      <span>
                        Due:{" "}
                        {new Date(installment.due_date).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full
                        ${
                          installment.is_paid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {installment.is_paid ? (
                        <>
                          <BadgeCheck className="w-4 h-4" /> Paid
                        </>
                      ) : (
                        <>
                          <BadgeX className="w-4 h-4" /> Unpaid
                        </>
                      )}
                    </span>
                    {installment.is_paid && (
                      <div className="flex flex-col gap-1 text-xs text-gray-600 ml-2">
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold">
                            {installment.mode}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>
                            Paid on:{" "}
                            {new Date(installment.paid_on).toLocaleDateString(
                              "en-GB"
                            )}
                          </span>
                        </div>
                        {installment.mode !== "Cash" &&
                          installment.transaction && (
                            <div className="flex items-center gap-1">
                              <ScanLine className="w-4 h-4 text-teal-600" />
                              <span className="font-mono">
                                {installment.transaction}
                              </span>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInfo;
