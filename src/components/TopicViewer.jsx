import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Meta from "../Meta";

function TopicViewer() {
  const { slug } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://invoice-foodieshub-backend.vercel.app/api/topics/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Topic not found");
        return res.json();
      })
      .then((data) => setTopic(data))
      .catch(() => setTopic(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p className="text-center mt-5">Loading content...</p>;
  }

  if (!topic) {
    return <h4 className="text-center mt-5">Topic not found</h4>;
  }

  const { title, content } = topic;

  if (!content) {
    return <p className="text-center mt-5">No content available</p>;
  }
  return (
    <>
      <Meta
        title={`${title} | MYOB Quick Start`}
        description={`Learn ${title} in MYOB with step-by-step instructions.`}
      />
      <div className="topic-viewer">
        {/* Questions & Answers */}
        {content?.questions?.length > 0 && (
          <div className="content-card mb-4">
            {content.questions.map((qa, index) => (
              <div key={index} className="qa-block">
                <p className="qa-question">{qa.question}</p>
                <p className="qa-answer">{qa.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Steps */}
        {content?.steps?.length > 0 && (
          <div className="content-card">
            <h6 className="section-heading">🧾 Steps to {title} in MYOB</h6>

            <div className="steps-timeline">
              {content.steps.map((step, index) => (
                <div className="step-item" key={index}>
                  <div className="step-number">
                    <span className="step-number-text">{index + 1}</span>
                  </div>
                  <div className="step-text">{step}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TopicViewer;
