import { ReactNode } from 'react';
import './PageContainer.css';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = '' }: PageContainerProps) => {
  return (
    <main className={`page-container ${className}`}>
      {children}
    </main>
  );
};

export default PageContainer;
