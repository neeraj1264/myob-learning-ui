import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getCachedTopics, saveTopicsToCache } from "../utils/db";
import Meta from "../Meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_URL = "https://invoice-foodieshub-backend.vercel.app/api/topics";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCachedTopics().then((cached) => {
      if (Array.isArray(cached) && cached.length) {
        setTopics(cached);
        setLoading(false);
      }
    });

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch topics");
        return res.json();
      })
      .then((freshData) => {
        if (Array.isArray(freshData)) {
          setTopics(freshData);
          saveTopicsToCache(freshData);
        } else {
          setTopics([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setTopics([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTopics = useMemo(() => {
    return topics.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [topics, search]);

  if (loading) {
    return <p className="text-center mt-5">Loading topics…</p>;
  }

  return (
    <>
      <Meta
        title="MYOB Quick Start – Learn MYOB Step by Step"
        description="Beginner-friendly MYOB tutorials with questions, answers, and practical steps."
      />
      <div className="container py-5">
        {/* Search */}
        <div className="search-wrapper mb-4">
          <i className="bi bi-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div className="row g-3">
          {filteredTopics.length ? (
            filteredTopics.map((item) => (
              <div className="col-6 col-md-3" key={item._id}>
                <Link
                  to={`/topic/${item.slug}`}
                  className="text-decoration-none"
                >
                  <div className="learn-card text-center">
                    <i className={`bi ${item.icon} learn-icon`}></i>
                    <span className="fw-bold course-name">{item.title}</span>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted">No topics found</div>
          )}
        </div>
      </div>
      <Link
        to="/add"
        className="floating-add-btn"
        aria-label="Add new topic"
        title="Add Topic"
      >
       <i className="fa-solid fa-plus"></i>

      </Link>
    </>
  );
}

export default Topics;
