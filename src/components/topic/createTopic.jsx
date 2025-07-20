import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSubjects } from "../../redux/slices/subjectSlice";
import { toast } from "react-toastify";
import useForm from "../../hooks/useForm";

//  will work over this tomorrow.
const createTopic = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => {
    return state.subject.subjects;
  });
  const location = useLocation();
  const course_id = location.state;
  const validate = (input_name, value, formData) => {
    let error;

    return error || "";
  };

  const [formData, changeHandler, submitHandler, errors, setFormData] = useForm(
    {
      name: "",
      desc: "",
      subject: "",
      notes_pdf: "",
    },
    createTopic,
    validate,
    "/dashboard/topics"
  );

  useEffect(() => {
    dispatch(getSubjects({ course_id })).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  }, [dispatch]);

  return (
    <div>
      <form>
        <input type="text" name="name" id="name" />
        <br />
        <input type="text" name="desc" id="desc" />
        <br />
        <input type="file" name="notes_pdf" id="notes_pdf" />
        <br />
        <select name="subject" id="subject">
          <option>Select any subject.</option>
          {subjects.length > 0 &&
            subjects.map((sub) => {
              return (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              );
            })}
        </select>
      </form>
    </div>
  );
};

export default createTopic;
