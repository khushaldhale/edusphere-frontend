import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import { useEffect } from "react";
import { clearStudent } from "../../redux/slices/studentsSlice";
import InfoCard from "./InfoCard";

const StudentDetails = () => {
  const student_by_id = useSelector((state) => {
    return state.student.student_by_id;
  });

  const hard_enquiries = useSelector((state) => {
    return state.student.hard_enquiries;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearStudent);
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <Search />
        {student_by_id && <InfoCard student_by_id={student_by_id}></InfoCard>}
        {hard_enquiries &&
          hard_enquiries.length > 0 &&
          hard_enquiries.map((student, index) => {
            return <InfoCard student_by_id={student}></InfoCard>;
          })}

        {hard_enquiries && hard_enquiries.length === 0 && (
          <p> No match found</p>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
