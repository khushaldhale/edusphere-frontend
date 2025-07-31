import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAssignment,
  getAssignmentsByBAtch,
} from "../../redux/slices/assignmentSlice";
import {
  Layers,
  ChevronDown,
  ChevronUp,
  FileText,
  BookOpenCheck,
  Download,
  Trash2,
  FolderOpen,
} from "lucide-react";
import { toast } from "react-toastify";
import { deleteNotes, getNotesByBatch } from "../../redux/slices/notesSlice";
import Loading from "../Loading";

const Assignments = ({ batch_id, setFormData, required_path }) => {
  const batchAssignments = useSelector(
    (state) => state.assignment.batchAssignments
  );
  const batchNotes = useSelector((state) => {
    return state.notes.batchNotes;
  });

  const dispatch = useDispatch();
  const { accountType } = useSelector((state) => {
    return state.auth.userInfo;
  });
  let isLoading;
  if (required_path === "notes") {
    isLoading = useSelector((state) => {
      return state.notes.isLoading;
    });
  } else {
    isLoading = useSelector((state) => {
      return state.assignments.isLoading;
    });
  }

  // Track which subject and topic are open
  const [openSubjectIdx, setOpenSubjectIdx] = useState(null);
  const [openTopicIdx, setOpenTopicIdx] = useState(null);

  useEffect(() => {
    if (required_path === "notes") {
      dispatch(getNotesByBatch({ batch_id }));
    } else {
      dispatch(getAssignmentsByBAtch({ batch_id }));
    }
    // eslint-disable-next-line
  }, [dispatch, batch_id]);

  // Defensive extraction
  const subjects =
    required_path === "notes"
      ? batchNotes?.batch?.course?.subjects || []
      : batchAssignments?.batch?.course?.subjects || [];
  const assignments = batchAssignments?.assignments || [];
  const notes = batchNotes?.notes || [];

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-3xl mx-auto my-8 px-2 py-8">
      <h1 className="text-2xl flex  justify-center items-center font-semibold mb-6 flex items-center gap-2">
        <FolderOpen className="w-7 h-7" />{" "}
        {required_path === "notes" ? "Notes" : "Assignments"}
      </h1>
      {subjects.length === 0 ? (
        <div className="bg-white border border-gray-100 shadow rounded-xl py-16 text-gray-500 text-center font-semibold">
          No subjects or assignments yet.
        </div>
      ) : (
        <div className="space-y-4">
          {subjects.map((subject, sIdx) => (
            <div
              key={subject._id}
              className="bg-white border p-3 border-gray-200 rounded-xl shadow"
            >
              {/* Subject Header */}
              <button
                className="w-full px-6 py-4 flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-blue-400 rounded-xl bg-white transition"
                onClick={() =>
                  setOpenSubjectIdx(openSubjectIdx === sIdx ? null : sIdx)
                }
                aria-expanded={openSubjectIdx === sIdx}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-500" />
                  <span className="text-base font-semibold text-gray-900">
                    {subject.name}
                  </span>
                </div>
                {openSubjectIdx === sIdx ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {/* Topics */}
              {openSubjectIdx === sIdx &&
                subject.topics &&
                subject.topics.length > 0 && (
                  <div className="bg-gray-50 border-t px-7 py-4 space-y-2">
                    {subject.topics.map((topic, tIdx) => (
                      <div key={topic._id}>
                        {/* Topic header */}
                        <button
                          className="w-full flex items-center justify-between py-3 px-2 hover:bg-white rounded transition"
                          onClick={() =>
                            setOpenTopicIdx(
                              openTopicIdx === `${sIdx}_${tIdx}`
                                ? null
                                : `${sIdx}_${tIdx}`
                            )
                          }
                          aria-expanded={openTopicIdx === `${sIdx}_${tIdx}`}
                        >
                          <div className="flex items-center gap-2">
                            <BookOpenCheck className="w-4 h-4 text-teal-700" />
                            <span className="text-[15px] text-gray-800 font-medium">
                              {topic.name}
                            </span>
                          </div>
                          {openTopicIdx === `${sIdx}_${tIdx}` ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </button>

                        {required_path === "assignments" && (
                          <div>
                            {openTopicIdx === `${sIdx}_${tIdx}` && (
                              <div className="py-1 space-y-2">
                                {assignments
                                  .filter(
                                    (assignment) =>
                                      assignment.topic_id === topic._id
                                  )
                                  .map((assignment, aIdx) => (
                                    <div key={aIdx} className="space-y-1">
                                      {assignment.assignment_pdf &&
                                      assignment.assignment_pdf.length > 0 ? (
                                        assignment.assignment_pdf.map(
                                          (pdf, pdfIdx) => (
                                            <div
                                              key={pdfIdx}
                                              className="flex items-center px-1 justify-between gap-3 py-1"
                                            >
                                              <a
                                                href={pdf}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-600 hover:underline hover:text-blue-700 text-sm font-semibold transition"
                                              >
                                                <Download className="w-4 h-4" />
                                                Assignment PDF
                                                {assignment.assignment_pdf
                                                  .length > 1
                                                  ? ` #${pdfIdx + 1}`
                                                  : ""}
                                              </a>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  // Your delete logic here
                                                  dispatch(
                                                    deleteAssignment({
                                                      assignment_id:
                                                        assignment._id,
                                                      notes: pdf,
                                                    })
                                                  ).then((action) => {
                                                    if (
                                                      action.payload.success
                                                    ) {
                                                      setFormData({
                                                        course_id: "",
                                                        batch_id: "",
                                                      });
                                                      toast.success(
                                                        action.payload.message
                                                      );
                                                    }
                                                  });
                                                }}
                                                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 hover:text-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-1"
                                              >
                                                <Trash2 className="w-4 h-4" />
                                                Remove
                                              </button>
                                            </div>
                                          )
                                        )
                                      ) : (
                                        <span className="inline-flex items-center gap-1 text-gray-400 text-xs italic py-2">
                                          <FileText className="w-4 h-4" />
                                          No PDF for this assignment.
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                {assignments.filter(
                                  (a) => a.topic_id === topic._id
                                ).length === 0 && (
                                  <div className="text-gray-400 text-xs italic py-2 flex items-center gap-1">
                                    <FileText className="w-4 h-4" />
                                    No assignments for this topic.
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* ... similarly for notes PDFs ... */}
                        {required_path === "notes" &&
                          openTopicIdx === `${sIdx}_${tIdx}` && (
                            <div className="py-1 space-y-2">
                              {notes
                                .filter((note) => note.topic_id === topic._id)
                                .map((note, aIdx) => (
                                  <div key={aIdx} className="space-y-1">
                                    {note.notes_pdf &&
                                    note.notes_pdf.length > 0 ? (
                                      note.notes_pdf.map((pdf, pdfIdx) => (
                                        <div
                                          key={pdfIdx}
                                          className="flex items-center px-1 justify-between  py-1"
                                        >
                                          <a
                                            href={pdf}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:underline hover:text-blue-700 text-sm font-semibold"
                                          >
                                            <Download className="w-4 h-4" />
                                            Notes PDF
                                            {note.notes_pdf.length > 1
                                              ? ` #${pdfIdx + 1}`
                                              : ""}
                                          </a>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              // Your delete logic here
                                              dispatch(
                                                deleteNotes({
                                                  notes_id: note._id,
                                                  notes: pdf,
                                                })
                                              ).then((action) => {
                                                if (action.payload.success) {
                                                  setFormData({
                                                    course_id: "",
                                                    batch_id: "",
                                                  });
                                                  toast.success(
                                                    action.payload.message
                                                  );
                                                }
                                              });
                                            }}
                                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 hover:text-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-1"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                            Remove
                                          </button>
                                        </div>
                                      ))
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-gray-400 text-xs italic py-2">
                                        <FileText className="w-4 h-4" />
                                        No Notes for this Topic.
                                      </span>
                                    )}
                                  </div>
                                ))}
                              {notes.filter((a) => a.topic_id === topic._id)
                                .length === 0 && (
                                <div className="text-gray-400 text-xs italic py-2 flex items-center gap-1">
                                  <FileText className="w-4 h-4" />
                                  No Notes for this topic.
                                </div>
                              )}
                            </div>
                          )}
                      </div>
                    ))}
                    {/* If no topics */}
                    {subject.topics.length === 0 && (
                      <div className="pl-2 py-3 text-gray-400 text-sm italic">
                        No topics in this subject.
                      </div>
                    )}
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;
