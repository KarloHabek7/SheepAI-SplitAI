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
        <div className="checkmark-circle">
          <div className="checkmark"></div>
        </div>
      </div>

      <h2 className="success-title">Report Submitted!</h2>
      <p className="success-subtitle">Thank you for helping keep Split beautiful.</p>

      <div className="ticket-card">
        <div className="ticket-label">Ticket ID</div>
        <div className="ticket-id">{ticketId}</div>
        <div className="ticket-status-badge">Status: Analyzing</div>
      </div>

      <div className="next-steps">
        <h3>What happens next?</h3>
        <ul>
          <li>Department assigned automatically</li>
          <li>Status updates in your dashboard</li>
          <li>You'll be notified of resolution</li>
        </ul>
      </div>

      <button className="new-report-btn" onClick={onReset}>
        Report Another Issue
      </button>
    </div>
  );
};

export default TicketConfirmation;
