import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ICON_OPTIONS } from "../utils/icons";
import { useNavigate } from "react-router-dom";
import ReviewSuccessModal from "./ReviewSuccessModal";
import Meta from "../Meta";

function AddTopic() {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("bi-journal-text");
  const [theory, setTheory] = useState("");
  const navigate = useNavigate();
  const [qaList, setQaList] = useState([{ question: "", answer: "" }]);
  const [steps, setSteps] = useState(["", "", ""]);
  const slug = title.toLowerCase().trim().replace(/\s+/g, "-");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const suggestIconFromTitle = (title) => {
    const t = title.toLowerCase();

    if (t.includes("invoice")) return "bi-receipt";
    if (t.includes("payment")) return "bi-cash-stack";
    if (t.includes("bank")) return "bi-bank";
    if (t.includes("contact")) return "bi-person-rolodex";
    if (t.includes("employee")) return "bi-people";
    if (t.includes("payroll")) return "bi-person-check";
    if (t.includes("report")) return "bi-bar-chart-line";
    if (t.includes("gst") || t.includes("tax")) return "bi-percent";
    if (t.includes("credit") || t.includes("debit"))
      return "bi-arrow-counterclockwise";

    return "bi-journal-text"; // safe default
  };
  useEffect(() => {
    if (title) {
      setIcon(suggestIconFromTitle(title));
    }
  }, [title]);
  // Q&A handlers
  const addQA = () => setQaList([...qaList, { question: "", answer: "" }]);

  const updateQA = (i, field, value) => {
    const updated = [...qaList];
    updated[i][field] = value;
    setQaList(updated);
  };

  // Steps handlers
  const addStep = () => setSteps([...steps, ""]);

  const updateStep = (i, value) => {
    const updated = [...steps];
    updated[i] = value;
    setSteps(updated);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    if (!title.trim()) {
      toast.error("Title is required");
      setIsSubmitting(false);
      return;
    }

    const validQuestions = qaList.filter(
      (q) => q.question.trim() && q.answer.trim(),
    );

    if (validQuestions.length === 0) {
      toast.error("Please add at least one question and answer");
      setIsSubmitting(false);
      return;
    }

    const validSteps = steps.filter((step) => step.trim());

    if (validSteps.length === 0) {
      toast.error("Please add at least one step");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      title,
      slug,
      icon,
      content: {
        theory: theory || " ",
        questions: validQuestions,
        steps: validSteps,
      },
    };

    try {
      const res = await fetch(
        "https://invoice-foodieshub-backend.vercel.app/api/reviews",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) {
        setShowSuccess(true);
      } else {
        toast.error("Failed to submit content");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Meta
        title="Submit Topic for Review | MYOB Quick Start"
        description="Submit MYOB learning content for review and publication."
      />
      <div className="add-topic-page container py-5">
        {/* Topic basics */}
        <div className="card-section">
          <label className="section-title">Topic Title</label>
          <input
            className="form-control"
            placeholder="e.g. Bank Reconciliation"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Q&A */}
        <div className="card-section">
          <h5 className="section-title">Questions & Answers</h5>

          {qaList.map((qa, i) => (
            <div key={i} className="qa-block my-4">
              <input
                className="form-control question-input"
                placeholder="Question"
                value={qa.question}
                onChange={(e) => updateQA(i, "question", e.target.value)}
              />
              <textarea
                className="form-control mt-2 auto-textarea"
                placeholder="Answer"
                rows={2}
                value={qa.answer}
                onChange={(e) => {
                  updateQA(i, "answer", e.target.value);
                  autoResize(e);
                }}
              />
            </div>
          ))}

          <button
            className="btn btn-outline-danger btn-sm mt-2"
            onClick={addQA}
          >
            Add Question
          </button>
        </div>

        {/* Steps */}
        <div className="card-section">
          <h5 className="section-title">Steps / Process</h5>

          {steps.map((step, i) => (
            <input
              key={i}
              className="form-control mb-2"
              placeholder={`Step ${i + 1}`}
              value={step}
              onChange={(e) => updateStep(i, e.target.value)}
            />
          ))}

          <button
            className="btn btn-outline-primary btn-sm mt-3"
            onClick={addStep}
          >
            Add Step
          </button>
        </div>

        {/* Actions */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button className="btn btn-light" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Submitting…
              </>
            ) : (
              "Save Topic"
            )}
          </button>
        </div>
        {showSuccess && <ReviewSuccessModal onClose={() => navigate("/")} />}
      </div>
    </>
  );
}

export default AddTopic;
