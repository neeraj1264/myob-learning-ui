const topics = [
  { title: "Create Invoice", icon: "bi-receipt" },
  { title: "Receive Payment", icon: "bi-cash-stack" },
  { title: "Purchase Bill", icon: "bi-file-earmark-text" },
  { title: "Credit Note", icon: "bi-arrow-counterclockwise" },
  { title: "Bank Reconciliation", icon: "bi-bank" },
  { title: "GST Basics", icon: "bi-percent" },
  { title: "Instalments", icon: "bi-calendar-check" },
  { title: "Reports", icon: "bi-bar-chart-line" },
  { title: "Customers", icon: "bi-people" },
  { title: "Suppliers", icon: "bi-truck" },
  { title: "Banking", icon: "bi-credit-card" },
  { title: "Chart of Accounts", icon: "bi-diagram-3" }
];

function Topics() {
  return (
    <div className="container py-5">
      <div className="row g-3">
        {topics.map((item, index) => (
          <div className="col-6 col-md-3" key={index}>
            <a href="/CreateInvoice.pdf" target="_blank">
            <div
              className="learn-card d-flex flex-column justify-content-center align-items-center text-center"
            
            >
              <i className={`bi ${item.icon} learn-icon mb-2`}></i>
              <span className="fw-semibold">{item.title}</span>
            </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topics;
