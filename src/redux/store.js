import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import courseSlice from "./slices/courseSlice";
import subjectSlice from "./slices/subjectSlice";
import topicSlice from "./slices/topicSlice";
import enquirySlice from "./slices/enquirySlice";
import enrollmentSlice from "./slices/enrollmentSlice";
import batchSlice from "./slices/batchSlice";
import employeeSlice from "./slices/employeeSlice";
import studentSlice from "./slices/studentsSlice";
import examSlice from "./slices/examSlice";
import questionSlice from "./slices/questionSlice";
import mockSlice  from "./slices/mockSlice";


const store = configureStore(
	{
		reducer: {
			auth: authSlice,
			course: courseSlice,
			subject: subjectSlice,
			topic: topicSlice,
			enquiry: enquirySlice,
			enrollment: enrollmentSlice,
			batch: batchSlice,
			employee: employeeSlice,
			student: studentSlice,
			exam: examSlice,
			question: questionSlice,
			mock: mockSlice
		}
	}
)

export default store;