import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  elevated?: boolean;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  headerAction?: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  bordered = false,
  elevated = true,
  title,
  subtitle,
  footer,
  headerAction
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const borderClass = bordered ? 'border border-gray-700' : '';
  const shadowClass = elevated ? 'shadow-lg' : '';
  
  const hasHeader = !!title;
  const hasFooter = !!footer;

  return (
    <div 
      className={`
        bg-gray-800 rounded-lg ${borderClass} ${shadowClass} 
        ${className}
      `}
    >
      {hasHeader && (
        <div className="flex justify-between items-start border-b border-gray-700 px-4 py-3">
          <div>
            <h3 className="text-lg font-medium text-white">{title}</h3>
            {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
          </div>
          {headerAction && (
            <div>{headerAction}</div>
          )}
        </div>
      )}
      
      <div className={paddingClasses[padding]}>
        {children}
      </div>
      
      {hasFooter && (
        <div className="border-t border-gray-700 px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;