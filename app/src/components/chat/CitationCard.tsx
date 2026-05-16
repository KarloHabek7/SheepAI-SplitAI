import React from 'react';
import { Citation } from '@/types';
import './CitationCard.css';

interface CitationCardProps {
  citation: Citation;
}

const CitationCard: React.FC<CitationCardProps> = ({ citation }) => {
  return (
    <div className="citation-card">
      <div className="citation-header">
        <span className="material-symbols-outlined citation-icon">description</span>
        <span className="source-name">{citation.sourceDocument}</span>
        {citation.article && <span className="article-tag">Art. {citation.article}</span>}
      </div>
      <div className="citation-body">
        <p className="excerpt">"{citation.excerpt}"</p>
      </div>
      {citation.page && (
        <div className="citation-footer">
          <span className="page-number">Page {citation.page}</span>
        </div>
      )}
    </div>
  );
};

export default CitationCard;
