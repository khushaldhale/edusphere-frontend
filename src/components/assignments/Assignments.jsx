import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAssignment,
  getAssignmentsByBAtch,
} from "../../redux/slices/assignmentSlice";
import { deleteNotes, getNotesByBatch } from "../../redux/slices/notesSlice";
import {
  Layers,
  ChevronDown,
  ChevronUp,
  FileText,
  BookOpenCheck,
  Download,
  Trash2,
  FolderOpen,
  AlertCircle,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Assignments = ({ batch_id, setFormData }) => {
  const dispatch = useDispatch();

  const batchAssignments = useSelector(
    (state) => state.assignment.batchAssignments
  );
  const batchNotes = useSelector((state) => state.notes.batchNotes);
  const required_path = useLocation().pathname.split("/").at(-1);
  const { accountType } = useSelector((state) => state.auth.userInfo);

  let isLoading;
  if (required_path === "notes") {
    isLoading = useSelector((state) => state?.notes?.isLoading);
  } else {
    isLoading = useSelector((state) => state?.assignment?.isLoading);
  }

  const [openSubjectIdx, setOpenSubjectIdx] = useState(null);
  const [openTopicIdx, setOpenTopicIdx] = useState(null);

  useEffect(() => {
    if (required_path === "notes") {
      dispatch(getNotesByBatch({ batch_id }));
    } else {
      dispatch(getAssignmentsByBAtch({ batch_id }));
    }
    // eslint-disable-next-line
  }, [dispatch, batch_id, required_path]);

  useEffect(() => {
    setOpenSubjectIdx(null);
    setOpenTopicIdx(null);
  }, [required_path]);

  // Defensive extraction
  const subjects =
    required_path === "notes"
      ? batchNotes?.batch?.course?.subjects || []
      : batchAssignments?.batch?.course?.subjects || [];
  const assignments = batchAssignments?.assignments || [];
  const notes = batchNotes?.notes || [];

  const handleDeleteAssignment = async (assignmentId, pdf) => {
    try {
      const action = await dispatch(
        deleteAssignment({
          assignment_id: assignmentId,
          notes: pdf,
        })
      );
      if (action.payload.success) {
        setFormData({
          course_id: "",
          batch_id: "",
        });
        toast.success(action.payload.message);
      }
    } catch (error) {
      toast.error("Failed to delete assignment");
    }
  };

  const handleDeleteNote = async (noteId, pdf) => {
    try {
      const action = await dispatch(
        deleteNotes({
          notes_id: noteId,
          notes: pdf,
        })
      );
      if (action.payload.success) {
        setFormData({
          course_id: "",
          batch_id: "",
        });
        toast.success(action.payload.message);
      }
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {accountType === "student" && (
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                {required_path === "notes" ? (
                  <BookOpen className="w-8 h-8 text-blue-600" />
                ) : (
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                )}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {required_path === "notes" ? "Study Notes" : "Assignments"}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {required_path === "notes"
                ? "Access and download all shared study notes organized by subjects and topics"
                : "View and manage all assignments organized by subjects and topics"}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading content...</p>
            <p className="text-gray-500 text-sm mt-1">
              Please wait while we fetch your data
            </p>
          </div>
        )}

        {/* No Subjects */}
        {!isLoading && subjects.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium mb-2">
              No Subjects Available
            </p>
            <p className="text-gray-400 text-sm">
              No subjects have been assigned to this batch yet.
            </p>
          </div>
        )}

        {/* Subjects List */}
        {!isLoading && subjects.length > 0 && (
          <div className="space-y-6">
            {subjects.map((subject, sIdx) => (
              <div
                key={subject._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Subject Header */}
                <button
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  onClick={() =>
                    setOpenSubjectIdx(openSubjectIdx === sIdx ? null : sIdx)
                  }
                  aria-expanded={openSubjectIdx === sIdx}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Layers className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {subject.topics?.length || 0} topics available
                      </p>
                    </div>
                  </div>
                  {openSubjectIdx === sIdx ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Subject Content */}
                {openSubjectIdx === sIdx && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    {!subject.topics || subject.topics.length === 0 ? (
                      <div className="px-6 py-8 text-center">
                        <BookOpenCheck className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">
                          No Topics Available
                        </p>
                        <p className="text-gray-400 text-sm">
                          No topics have been created for this subject yet.
                        </p>
                      </div>
                    ) : (
                      <div className="p-6 space-y-4">
                        {subject.topics.map((topic, tIdx) => (
                          <div
                            key={topic._id}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                          >
                            {/* Topic Header */}
                            <button
                              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                              onClick={() =>
                                setOpenTopicIdx(
                                  openTopicIdx === `${sIdx}_${tIdx}`
                                    ? null
                                    : `${sIdx}_${tIdx}`
                                )
                              }
                              aria-expanded={openTopicIdx === `${sIdx}_${tIdx}`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                  <BookOpenCheck className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="font-medium text-gray-900">
                                  {topic.name}
                                </span>
                              </div>
                              {openTopicIdx === `${sIdx}_${tIdx}` ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              )}
                            </button>

                            {/* Topic Content */}
                            {openTopicIdx === `${sIdx}_${tIdx}` && (
                              <div className="border-t border-gray-200 p-4 bg-gray-50">
                                {/* ASSIGNMENTS */}
                                {required_path === "assignments" &&
                                  (() => {
                                    const topicAssignments = assignments.filter(
                                      (assignment) =>
                                        assignment.topic_id === topic._id
                                    );
                                    if (topicAssignments.length === 0) {
                                      return (
                                        <div className="flex items-center justify-center py-6 text-center">
                                          <div>
                                            <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                            <p className="text-gray-500 font-medium text-sm">
                                              No assignments shared yet
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    }
                                    return (
                                      <div className="space-y-3">
                                        {topicAssignments.map(
                                          (assignment, aIdx) => (
                                            <div key={aIdx}>
                                              {assignment.assignment_pdf &&
                                              assignment.assignment_pdf.length >
                                                0 ? (
                                                assignment.assignment_pdf.map(
                                                  (pdf, pdfIdx) => (
                                                    <div
                                                      key={pdfIdx}
                                                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                                                    >
                                                      <a
                                                        href={pdf}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors flex-1"
                                                      >
                                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                          <Download className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                          <p className="font-medium">
                                                            Assignment PDF
                                                            {assignment
                                                              .assignment_pdf
                                                              .length > 1
                                                              ? ` #${
                                                                  pdfIdx + 1
                                                                }`
                                                              : ""}
                                                          </p>
                                                          <p className="text-sm text-gray-500">
                                                            Click to download
                                                          </p>
                                                        </div>
                                                      </a>
                                                      {accountType ===
                                                        "admin" && (
                                                        <button
                                                          type="button"
                                                          onClick={() =>
                                                            handleDeleteAssignment(
                                                              assignment._id,
                                                              pdf
                                                            )
                                                          }
                                                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                        >
                                                          <Trash2 className="w-4 h-4 mr-1" />
                                                          Remove
                                                        </button>
                                                      )}
                                                    </div>
                                                  )
                                                )
                                              ) : (
                                                <div className="flex items-center justify-center py-4 text-center">
                                                  <div>
                                                    <FileText className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                                                    <p className="text-gray-500 text-sm">
                                                      No PDF available for this
                                                      assignment
                                                    </p>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    );
                                  })()}

                                {/* NOTES */}
                                {required_path === "notes" &&
                                  (() => {
                                    const topicNotes = notes.filter(
                                      (note) => note.topic_id === topic._id
                                    );
                                    if (topicNotes.length === 0) {
                                      return (
                                        <div className="flex items-center justify-center py-6 text-center">
                                          <div>
                                            <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                            <p className="text-gray-500 font-medium text-sm">
                                              No notes shared yet
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    }
                                    return (
                                      <div className="space-y-3">
                                        {topicNotes.map((note, nIdx) => (
                                          <div key={nIdx}>
                                            {note.notes_pdf &&
                                            note.notes_pdf.length > 0 ? (
                                              note.notes_pdf.map(
                                                (pdf, pdfIdx) => (
                                                  <div
                                                    key={pdfIdx}
                                                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                                                  >
                                                    <a
                                                      href={pdf}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors flex-1"
                                                    >
                                                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <Download className="w-4 h-4 text-blue-600" />
                                                      </div>
                                                      <div>
                                                        <p className="font-medium">
                                                          Notes PDF
                                                          {note.notes_pdf
                                                            .length > 1
                                                            ? ` #${pdfIdx + 1}`
                                                            : ""}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                          Click to download
                                                        </p>
                                                      </div>
                                                    </a>
                                                    {accountType ===
                                                      "admin" && (
                                                      <button
                                                        type="button"
                                                        onClick={() =>
                                                          handleDeleteNote(
                                                            note._id,
                                                            pdf
                                                          )
                                                        }
                                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                      >
                                                        <Trash2 className="w-4 h-4 mr-1" />
                                                        Remove
                                                      </button>
                                                    )}
                                                  </div>
                                                )
                                              )
                                            ) : (
                                              <div className="flex items-center justify-center py-4 text-center">
                                                <div>
                                                  <FileText className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                                                  <p className="text-gray-500 text-sm">
                                                    No PDF available for this
                                                    note
                                                  </p>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    );
                                  })()}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
