import React from 'react';
import './TicketConfirmation.css';

interface TicketConfirmationProps {
  ticketId: string;
  onReset: () => void;
}

const TicketConfirmation: React.FC<TicketConfirmationProps> = ({ ticketId, onReset }) => {
  return (
    <div className="ticket-confirmation">
      <div className="success-animation">
        <span className="material-symbols-outlined check-icon">check_circle</span>
      </div>
      
      <h2>Report Submitted</h2>
      <p>Thank you for helping Split stay clean and safe. Our team has been notified.</p>
      
      <div className="ticket-card">
        <div className="ticket-row">
          <span className="label">Ticket ID:</span>
          <span className="value">{ticketId}</span>
        </div>
        <div className="ticket-row">
          <span className="label">Status:</span>
          <span className="value status-badge">Submitted</span>
        </div>
        <div className="ticket-row">
          <span className="label">ETA:</span>
          <span className="value">48 Hours</span>
        </div>
      </div>

      <button className="primary-btn wide" onClick={onReset}>
        Report Another Issue
      </button>
    </div>
  );
};

export default TicketConfirmation;
