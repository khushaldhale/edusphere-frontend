import { useLocation } from "react-router-dom";
import { updateSubject } from "../../redux/slices/subjectSlice";
import SubjectForm from "./SubjectForm";
import useFetchCourses from "../../hooks/useFetchCourses";
import useForm from "../../hooks/useForm";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const UpdateSubject = () => {
  const location = useLocation();
  const subject = location.state;

  const validate = (input_name, value, formData) => {
    let error;
    switch (input_name) {
      case "name": {
        if (!value.trim()) {
          error = "Subject name is required.";
        } else if (value.length < 2) {
          error =
            "Subject Name should be greater than or equal to 2 characters.";
        }
        break;
      }

      case "desc": {
        if (!value.trim()) {
          error = "Subject Desc is required.";
        } else if (value.length < 10) {
          error =
            "Subject Desc should be greater than or equal to 10 characters.";
        }
        break;
      }

      case "course": {
        if (!value.trim()) {
          error = "Course is required.";
        }
        break;
      }
    }
    return error || "";
  };

  const [courses, isLoading] = useFetchCourses();
  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      name: subject.name,
      desc: subject.desc,
      course: subject.course,
      subject_id: subject._id,
    },
    updateSubject,
    validate,
    "/dashboard/courses"
  );

  const is_loading = useSelector((state) => {
    return state.subject.isLoading;
  });

  if (is_loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="text-center my-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Update Subject
        </h1>
      </div>
      <SubjectForm
        courses={courses}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        url="update"
      ></SubjectForm>
    </div>
  );
};

export default UpdateSubject;
