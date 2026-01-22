const topics = [
  "Create Invoice",
  "Receive Payment",
  "Purchase Bill",
  "Credit Note",
  "Bank Reconciliation",
  "GST Basics",
  "Instalments",
  "Reports",
  "Customers",
  "Suppliers",
  "Banking",
  "Chart of Accounts"
];

function Topics() {
  return (
    <div className="container py-5">
      <h4 className="mb-4">What do you want to learn?</h4>

      <div className="row g-3">
        {topics.map((item, index) => (
          <div className="col-6 col-md-3" key={index}>
            <div className="learn-card" onClick={() => alert(item)}>
              <span>{item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topics;
