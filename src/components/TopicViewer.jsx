import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import { useState } from "react";
import { pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc =
`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.disableFontFace = true;

const topicsMap = {
  "create-invoice": "/CreateInvoice2.pdf",
  "receive-payment": "/CreateInvoice2.pdf",
  "purchase-bill": "/CreateInvoice2.pdf",
  "credit-note": "/CreateInvoice2.pdf",
  "bank-reconciliation": "/CreateInvoice2.pdf",
  "gst-basics": "/CreateInvoice2.pdf",
  instalments: "/CreateInvoice2.pdf",
  reports: "/CreateInvoice2.pdf",
  customers: "/CreateInvoice2.pdf",
  suppliers: "/CreateInvoice2.pdf",
  banking: "/CreateInvoice2.pdf",
  "chart-of-accounts": "/CreateInvoice2.pdf",
};

function TopicViewer() {
  const { slug } = useParams();
  const pdf = topicsMap[slug];

  const [numPages, setNumPages] = useState(null);
  if (!pdf) return <h4 className="text-center mt-5">Topic not found</h4>;

  return (
    <div style={{ padding: "10px" }}>
      <Document
        file={pdf}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading="Loading PDF..."
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={window.innerWidth - 20}
          />
        ))}
      </Document>
    </div>
  );
}

export default TopicViewer;
