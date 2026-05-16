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
        <div className="citation-icon-wrapper">
          <span className="material-symbols-outlined">link</span>
        </div>
        <div className="citation-info">
          <span className="citation-source">{citation.sourceDocument}</span>
          {citation.article && <span className="citation-article">Article {citation.article}</span>}
        </div>
        <span className="citation-toggle material-symbols-outlined">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
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
