import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getTopics } from "../../redux/slices/topicSlice";
import { toast } from "react-toastify";

const Topics = () => {
  const location = useLocation();
  const subject_id = location.state;
  const dispatch = useDispatch();
  const topics = useSelector((state) => {
    return state.topic.topics;
  });

  useEffect(() => {
    dispatch(getTopics({ subject_id })).then((action) => {
      if (action.payload.success) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
  }, [dispatch]);
  return (
    <div>
      {topics.length > 0 ? (
        topics.map((topic) => {
          return (
            <>
              <p>{topic.name}</p>
              <p>{topic.desc}</p>
              <a href={topic.notes_pdf}>Notes</a>
            </>
          );
        })
      ) : (
        <p>No Topic is created yet.</p>
      )}
    </div>
  );
};

export default Topics;
