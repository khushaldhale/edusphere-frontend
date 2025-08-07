import { useDispatch, useSelector } from "react-redux";
import {
  clearHardEnquiries,
  clearStudent,
  clearSuggestions,
  getStudentById,
  hardSearchEnquiries,
  searchEnquiriesByName,
} from "../../redux/slices/studentsSlice";
import { User, Search as SearchIcon } from "lucide-react";
import { useRef, useState } from "react";

const Search = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // handling search input box
  const student_suggestions = useSelector(
    (state) => state.student.student_suggestions || []
  );
  const inputRef = useRef();

  // Debounce logic
  const debounce = (handler, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        handler.apply(context, args);
      }, delay);
    };
  };

  // Search handler
  const changeHandler = (event) => {
    const name = event.target.value;
    setName(name);
    if (name.trim() !== "") {
      dispatch(clearStudent());
      dispatch(searchEnquiriesByName({ name }));
    }
  };

  // Select handler
  const studentHandler = (student_id) => {
    dispatch(getStudentById({ student_id }));
    dispatch(clearSuggestions());
    dispatch(clearHardEnquiries());
    inputRef.current.value = "";
  };

  const debounceHandler = debounce(changeHandler, 300);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(clearSuggestions());
    dispatch(clearStudent());
    dispatch(hardSearchEnquiries({ name }));
    inputRef.current.value = "";
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <form onSubmit={submitHandler} autoComplete="off">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Search student by name..."
            onChange={debounceHandler}
            ref={inputRef}
            className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl bg-white shadow-sm transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400"
          />
          {/* Optional explicit Search button; probably unnecessary */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
        {/* Suggestion dropdown (list below input) */}
        {student_suggestions.length > 0 && (
          <div className="absolute z-20 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2 max-h-72 overflow-auto">
            {student_suggestions.map((student, idx) => (
              <button
                type="button"
                key={student._id || idx}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-blue-50 transition cursor-pointer text-left"
                onClick={() => {
                  studentHandler(student._id);
                }}
              >
                <User className="w-6 h-6 text-blue-500 shrink-0" />
                <span className="font-medium text-gray-900">
                  {student.fname} {student.lname}
                </span>
                {/* Optionally: <span className="text-gray-500 text-sm">{student.email}</span> */}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;
