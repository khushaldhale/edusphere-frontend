import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../redux/slices/courseSlice";
import { toast } from "react-toastify";


const useFetchCourses = () => {
	const courses = useSelector((state) => state.course.courses);
	const isLoading = useSelector((state) => state.course.isLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourses()).then((action) => {
			if (action.payload.success) {
				toast.success(action.payload.message);
			} else {
				toast.error(action.payload.message);
			}
		});
	}, [dispatch]);

	return [courses, isLoading]
}

export default useFetchCourses; 