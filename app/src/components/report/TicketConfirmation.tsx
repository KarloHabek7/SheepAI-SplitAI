import React from 'react';
import './TicketConfirmation.css';

interface TicketConfirmationProps {
  ticketId: string;
  onReset: () => void;
}

const TicketConfirmation: React.FC<TicketConfirmationProps> = ({ ticketId, onReset }) => {
  return (
    <div className="ticket-confirmation">
      <div className="tc-success-icon">
        <span className="material-symbols-outlined">check_circle</span>
      </div>
      
      <h2>Report Submitted</h2>
      <p>Thank you for helping Split stay clean and safe. Our team has been notified.</p>
      
      <div className="tc-ticket-card">
        <div className="tc-ticket-row">
          <span className="tc-label">Ticket ID</span>
          <span className="tc-value">{ticketId}</span>
        </div>
        <div className="tc-ticket-row">
          <span className="tc-label">Status</span>
          <span className="tc-value tc-status-badge">Submitted</span>
        </div>
        <div className="tc-ticket-row">
          <span className="tc-label">Estimated Response</span>
          <span className="tc-value">48 Hours</span>
        </div>
      </div>

      <button className="tc-reset-btn" onClick={onReset}>
        Report Another Issue
      </button>
    </div>
  );
};

export default TicketConfirmation;
