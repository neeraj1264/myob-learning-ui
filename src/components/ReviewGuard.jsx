import { Navigate } from "react-router-dom";

function ReviewGuard({ children }) {
  const canReview = localStorage.getItem("review") === "true";

  if (!canReview) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ReviewGuard;
