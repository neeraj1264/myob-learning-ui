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
  "create-invoice": "/pdf/CreateInvoice.pdf",
  "credit-notes": "/pdf/CreditNotes.pdf",
  "debit-notes":  "/pdf/DebitNotes.pdf",
  "receive-payment": "/pdf/RecordCustomerPayment.pdf",
  "purchase-bill": "/pdf/CreateBill.pdf",
  "bank-reconciliation": "/pdf/BankReconciliation.pdf",
  "BankFeed": "/pdf/BankFeed.pdf",
  "Bill-From-Suplier-Invoice": "/pdf/CreateBillFromSupplierInvoice.pdf",
  "Create-Contacts": "/pdf/CreateContacts.pdf",
  "Employee-Details": "/pdf/EmployeeDetails.pdf",
  "Generate-Reports": "/pdf/GenerateReports.pdf",
  "Payroll-Process": "/pdf/PayrollProcess.pdf",
  "STP": "/pdf/STP.pdf",
  "Super-Pay": "/pdf/SuperPay.pdf",

};

function TopicViewer() {
  const { slug } = useParams();
  const pdf = topicsMap[slug];

  const [numPages, setNumPages] = useState(null);
  if (!pdf) return <h4 className="text-center mt-5">Topic not found</h4>;

  return (
    <div style={{ padding: "10px", marginTop: "1rem" }}>
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
