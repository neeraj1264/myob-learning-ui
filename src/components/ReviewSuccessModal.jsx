function ReviewSuccessModal({ onClose }) {
  return (
    <div className="modal-overlay-pro">
      <div className="modal-card-pro">
        <div className="icon-wrapper">
          <div className="success-circle">
            ✓
          </div>
        </div>

        <h4 className="modal-title">
          Submission Successful
        </h4>

        <p className="modal-text">
          Your topic has been submitted for review.
          <br />
          Our team will review it and publish once approved.
        </p>

        <button
          className="btn btn-primary modal-btn"
          onClick={onClose}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default ReviewSuccessModal;
