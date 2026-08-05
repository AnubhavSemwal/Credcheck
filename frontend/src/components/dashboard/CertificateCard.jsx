import React from "react";
import {
  Building2,
  CalendarDays,
  Eye,
  Download,
  QrCode,
  CheckCircle,
  Clock3,
  XCircle
} from "lucide-react";

import "../../styles/cards.css";

const CertificateCard = ({ certificate }) => {

  const getStatus = () => {

    switch (certificate.status) {

      case "approved":
        return {
          icon: <CheckCircle size={16} />,
          text: "Verified",
          className: "verified"
        };

      case "rejected":
        return {
          icon: <XCircle size={16} />,
          text: "Rejected",
          className: "rejected"
        };

      default:
        return {
          icon: <Clock3 size={16} />,
          text: "Pending",
          className: "pending"
        };

    }

  };

  const status = getStatus();

  return (

    <div className="certificate-card">

      <div className="certificate-header">

        <h3>{certificate.title}</h3>

        <span className={`status-badge ${status.className}`}>

          {status.icon}

          {status.text}

        </span>

      </div>

      <div className="certificate-info">

        <p>

          <Building2 size={16} />

          {certificate.organization}

        </p>

        <p>

          <CalendarDays size={16} />

          {new Date(certificate.createdAt).toLocaleDateString()}

        </p>

      </div>

      <div className="certificate-actions">

        <a
          href={certificate.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="view-btn"
        >

          <Eye size={18} />

          View

        </a>

        <a
          href={certificate.fileUrl}
          target="_blank"
          rel="noreferrer"
          download
          className="download-btn"
        >

          <Download size={18} />

          Download

        </a>

        <button className="qr-btn">

          <QrCode size={18} />

          QR

        </button>

      </div>

    </div>

  );

};

export default CertificateCard;