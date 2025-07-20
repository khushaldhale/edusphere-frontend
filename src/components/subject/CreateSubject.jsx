import useFetchCourses from "../../hooks/useFetchCourses";
import useForm from "../../hooks/useForm";
import { createSubject } from "../../redux/slices/subjectSlice";
import SubjectForm from "./SubjectForm";

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

  const [courses, isLoading] = useFetchCourses();
  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      name: "",
      desc: "",
      course: "",
    },
    createSubject,
    validate,
    "/dashboard/courses"
  );

  return (
    <SubjectForm
      courses={courses}
      submitHandler={submitHandler}
      changeHandler={changeHandler}
      formData={formData}
      errors={errors}
      isLoading={isLoading}
    ></SubjectForm>
  );
};

export default CreateSubject;
