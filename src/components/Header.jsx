import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  return (
    <div className="myob-header">
      {/* Back Icon */}
      {!isHome && (
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </button>
      )}
      {/* Title */}
      <h5 className="m-0 fw-semibold text-white">MYOB Learning App</h5>
    </div>
  );
}

export default Header;
