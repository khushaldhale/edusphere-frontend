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
import mockSlice from "./slices/mockSlice";
import examAttempSlice from "./slices/examAttemptSlice";
import answerSlice from "./slices/answerSlice";
import attendanceSlice from "./slices/attendanceSlice";
import MockResultSlice from "./slices/MockResult";
import assignmentSlice from "./slices/assignmentSlice";
import notesSlice from "./slices/notesSlice";


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
			mock: mockSlice,
			exam_attempt: examAttempSlice,
			answer: answerSlice,
			attendance: attendanceSlice,
			mockResult: MockResultSlice,
			assignment: assignmentSlice,
			notes: notesSlice
		}
	}
)

export default store;