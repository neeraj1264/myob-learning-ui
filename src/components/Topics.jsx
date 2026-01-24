const topic = [
  { title: "Create Invoice", icon: "bi-receipt", slug: "create-invoice" },
  { title: "Receive Payment", icon: "bi-cash-stack", slug: "receive-payment" },
  {
    title: "Purchase Bill",
    icon: "bi-file-earmark-text",
    slug: "purchase-bill",
  },
  {
    title: "Credit Note",
    icon: "bi-arrow-counterclockwise",
    slug: "credit-note",
  },
  {
    title: "Bank Reconciliation",
    icon: "bi-bank",
    slug: "bank-reconciliation",
  },
  { title: "GST Basics", icon: "bi-percent", slug: "gst-basics" },
  { title: "Instalments", icon: "bi-calendar-check", slug: "instalments" },
  { title: "Reports", icon: "bi-bar-chart-line", slug: "reports" },
  { title: "Customers", icon: "bi-people", slug: "customers" },
  { title: "Suppliers", icon: "bi-truck", slug: "suppliers" },
  { title: "Banking", icon: "bi-credit-card", slug: "banking" },
  {
    title: "Chart of Accounts",
    icon: "bi-diagram-3",
    slug: "chart-of-accounts",
  },
];
import { Link } from "react-router-dom";

function Topics() {
  return (
    <div className="container py-5">
      <div className="row g-3">
        {topic.map((item, index) => (
          <div className="col-6 col-md-3" key={index}>
            <Link to={`/topic/${item.slug}`} className="text-decoration-none">
              <div className="learn-card d-flex flex-column justify-content-center align-items-center text-center">
                <i className={`bi ${item.icon} learn-icon mb-2`}></i>
                <span className="fw-semibold">{item.title}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topics;
