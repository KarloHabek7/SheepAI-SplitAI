import React from 'react';
import './ReportPinOverlay.css';

interface ReportPinOverlayProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ReportPinOverlay: React.FC<ReportPinOverlayProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className="report-pin-overlay">
      <div className="pin-target">
        <div className="pin-marker">📍</div>
        <div className="pin-shadow"></div>
      </div>
      
      <div className="pin-controls">
        <p className="pin-hint">Adjust map to center the issue under the pin</p>
        <div className="pin-actions">
          <button className="pin-cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="pin-confirm-btn" onClick={onConfirm}>Confirm Location</button>
        </div>
      </div>
    </div>
  );
};

export default ReportPinOverlay;
