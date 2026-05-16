import React, { useState } from 'react';
import { Citation } from '@/types';
import './CitationCard.css';

interface CitationCardProps {
  citation: Citation;
}

const CitationCard: React.FC<CitationCardProps> = ({ citation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`citation-card ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="citation-header">
        <span className="citation-icon">📄</span>
        <span className="citation-source">{citation.sourceDocument}</span>
        {citation.article && <span className="citation-article">Art. {citation.article}</span>}
        <span className="citation-toggle">{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && (
        <div className="citation-body">
          <p className="citation-excerpt">"{citation.excerpt}"</p>
        </div>
      )}
    </div>
  );
};

export default CitationCard;
