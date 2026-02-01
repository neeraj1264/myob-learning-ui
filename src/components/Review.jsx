import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Meta from "../Meta";

const API_BASE = "https://invoice-foodieshub-backend.vercel.app";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/reviews`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then(setReviews)
      .catch(() => toast.error("Failed to load reviews"))
      .finally(() => setLoading(false));
  }, []);

  const approve = async (id) => {
    await fetch(`${API_BASE}/api/reviews/${id}/approve`, {
      method: "POST",
    });
    toast.success("Topic approved");
    setReviews((prev) => prev.filter((r) => r._id !== id));
  };

  const reject = async (id) => {
    await fetch(`${API_BASE}/api/reviews/${id}/reject`, {
      method: "POST",
    });
    toast.error("Topic rejected");
    setReviews((prev) => prev.filter((r) => r._id !== id));
  };

  if (loading) {
    return <p className="text-center mt-5">Loading reviews…</p>;
  }

  return (
    <>
      <Meta
        title="Topics Under Review | MYOB Quick Start"
        description="Review and approve submitted MYOB learning topics."
      />
      <div className="container py-4">
        <h4 className="mb-4">📋 Topics Under Review</h4>

        {reviews.length === 0 && (
          <p className="text-muted">No pending reviews</p>
        )}

        {reviews.map((r) => (
          <div key={r._id} className="card mb-4 p-4">
            {/* Title */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className={`bi ${r.icon} fs-4`}></i>
              <h5 className="mb-0">{r.title}</h5>
            </div>

            {/* Questions */}
            {r.content?.questions?.length > 0 && (
              <div className="mb-3">
                <h6 className="fw-bold text-danger">❓ Questions & Answers</h6>

                {r.content.questions.map((qa, i) => (
                  <div key={i} className="mb-2">
                    <p className="fw-semibold mb-1">
                      Q{i + 1}. {qa.question}
                    </p>
                    <p className="text-muted ms-3">{qa.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Steps */}
            {r.content?.steps?.length > 0 && (
              <div className="mb-3">
                <h6 className="fw-bold text-primary">🧾 Steps / Process</h6>

                <ol className="ps-3">
                  {r.content.steps.map((step, i) => (
                    <li key={i} className="mb-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Actions */}
            <div className="d-flex gap-2 mt-3">
              <button
                className="btn btn-success btn-sm"
                onClick={() => approve(r._id)}
              >
                ✅ Approve
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => reject(r._id)}
              >
                ❌ Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Review;
