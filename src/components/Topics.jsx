const topic = [
  { title: "Create Invoice", icon: "bi-receipt", slug: "create-invoice" },
  { title: "Receive Payment", icon: "bi-cash-stack", slug: "receive-payment" },
  {
    title: "Purchase Bill",
    icon: "bi-file-earmark-text",
    slug: "purchase-bill",
  },
    {
    title: "Bank Reconciliation",
    icon: "bi-bank",
    slug: "bank-reconciliation",
  },
  {
    title: "Credit Note",
    icon: "bi-arrow-counterclockwise",
    slug: "credit-notes",
  },
    {
    title: "Debit Note",
    icon: "bi-arrow-counterclockwise",
    slug: "debit-notes",
  },
  {
    title: "Bill From Supplier Invoice",
    icon: "bi-file-earmark-text",
    slug: "Bill-From-Suplier-Invoice",
  },
  {
    title: "Create Contacts",
    icon: "bi-person-rolodex",
    slug: "Create-Contacts",
  },
  { title: "Create Employees", icon: "bi-people", slug: "Employee-Details" },
  {
    title: "Generate Reports",
    icon: "bi-bar-chart-line",
    slug: "Generate-Reports",
  },
    {
    title: "Payroll Process",
    icon: "bi-person-check",
    slug: "Payroll-Process",
  },  {
    title: "STP",
    icon:  "bi-cloud-upload",
    slug: "STP",
  },  {
    title: "Super Pay",
    icon: "bi-bank",
    slug: "Super-Pay",
  },
  // {
  //   title: "Chart of Accounts",
  //   icon: "bi-diagram-3",
  //   slug: "chart-of-accounts",
  // },
];
import { useState } from "react";
import { Link } from "react-router-dom";

function Topics() {
  const [search, setSearch] = useState("");

  // 🔍 Filter logic
  const filteredTopics = topic.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container py-5">
      {/* 🔍 Search Bar */}
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
      {/* Topics Grid */}
      <div className="row g-3">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((item, index) => (
            <div className="col-6 col-md-3" key={index}>
              <Link to={`/topic/${item.slug}`} className="text-decoration-none">
                <div className="learn-card d-flex flex-column justify-content-center align-items-center text-center">
                  <i className={`bi ${item.icon} learn-icon mb-2`}></i>
                  <span className="fw-semibold">{item.title}</span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">No topics found</div>
        )}
      </div>
    </div>
  );
}

export default Topics;
