import React from 'react';
import './PageContainer.css';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <main className={`page-container ${className}`}>
      {children}
    </main>
  );
};

export default PageContainer;
