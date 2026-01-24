import { useParams } from "react-router-dom";

const topicsMap = {
  "create-invoice": "/CreateInvoice2.pdf",
  "receive-payment": "/CreateInvoice2.pdf",
  "purchase-bill": "/CreateInvoice2.pdf",
  "credit-note": "/CreateInvoice2.pdf",
  "bank-reconciliation": "/CreateInvoice2.pdf",
  "gst-basics": "/CreateInvoice2.pdf",
  "instalments": "/CreateInvoice2.pdf",
  "reports": "/CreateInvoice2.pdf",
  "customers": "/CreateInvoice2.pdf",
  "suppliers": "/CreateInvoice2.pdf",
  "banking": "/CreateInvoice2.pdf",
  "chart-of-accounts": "/CreateInvoice2.pdf",
};

function TopicViewer() {
  const { slug } = useParams();
  const pdf = topicsMap[slug];

  if (!pdf) return <h4 className="text-center mt-5">Topic not found</h4>;

  return (
    <div className=" p-0">
      <iframe
        src={pdf}
        title="MYOB Topic"
        style={{ border: "none", height: "80vh", width: "100vw"
         }}
      />
    </div>
  );
}

export default TopicViewer;
