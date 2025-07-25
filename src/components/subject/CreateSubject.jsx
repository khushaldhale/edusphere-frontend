import { useParams } from "react-router-dom";
import useFetchCourses from "../../hooks/useFetchCourses";
import useForm from "../../hooks/useForm";
import { createSubject } from "../../redux/slices/subjectSlice";
import SubjectForm from "./SubjectForm";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const CreateSubject = () => {
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
  const course_id = useParams().id;
  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      name: "",
      desc: "",
      course: course_id,
    },
    createSubject,
    validate,
    "/dashboard/courses"
  );

  const isLoading = useSelector((state) => {
    return state.subject.isLoading;
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <SubjectForm
      submitHandler={submitHandler}
      changeHandler={changeHandler}
      formData={formData}
      errors={errors}
      url="create"
    ></SubjectForm>
  );
};

export default CreateSubject;
