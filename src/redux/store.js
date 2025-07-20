import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import courseSlice from "./slices/courseSlice";
import subjectSlice from "./slices/subjectSlice";
import topicSlice from "./slices/topicSlice";
import enquirySlice from "./slices/enquirySlice";
import enrollmentSlice from "./slices/enrollmentSlice";


const store = configureStore(
	{
		reducer: {
			auth: authSlice,
			course: courseSlice,
			subject: subjectSlice,
			topic: topicSlice,
			enquiry: enquirySlice,
			enrollment: enrollmentSlice
		}
	}
)

export default store;