import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MockResultsAll } from "../../redux/slices/MockResult";
import MockResultCard from "./MockResultCard";
import { Star } from "lucide-react";

const ShowResults = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const mock_results = useSelector((state) => state.mockResult.mock_results);

  useEffect(() => {
    dispatch(MockResultsAll({ mock_id: params.id }));
  });
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl  mt-5 md:mt-0 font-bold text-gray-900 mb-8 flex  justify-center items-center gap-3">
          <Star className="w-7 h-7 text-blue-600" />
          Mock Exam Results
        </h2>

        {mock_results && mock_results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {mock_results.map((result, index) => (
              <MockResultCard
                key={index}
                result={result}
                index={index}
              ></MockResultCard>
            ))}
          </div>
        ) : (
          <div className="mt-24 flex justify-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-8 py-12 text-gray-500 font-semibold text-center">
              No Mock results found.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowResults;
