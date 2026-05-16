import React from 'react';
import { Citation } from '@/types';
import './CitationCard.css';

interface CitationCardProps {
  citation: Citation;
}

const CitationCard: React.FC<CitationCardProps> = ({ citation }) => {
  return (
    <div className="citation-card-container">
      <div className="citation-header">
        <span className="material-symbols-outlined citation-book-icon">menu_book</span>
        <span className="citation-source-title">{citation.sourceDocument}</span>
        {citation.article && <span className="citation-article-pill">Art. {citation.article}</span>}
      </div>
      <div className="citation-body">
        <p className="citation-excerpt">"{citation.excerpt}"</p>
      </div>
      {citation.page && (
        <div className="citation-footer">
          <span className="citation-page-num">Page {citation.page}</span>
        </div>
      )}
    </div>
  );
};

export default CitationCard;
