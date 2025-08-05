import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPerformance } from "../../redux/slices/studentsSlice";

const Performance = () => {
  const dispatch = useDispatch();
  const performance = useSelector((state) => {
    return state.student.performance;
  });

  console.log("performance : ", performance);
  useEffect(() => {
    dispatch(getPerformance());
  }, []);
  return <div></div>;
};

export default Performance;
