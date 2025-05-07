import React, { ReactNode } from 'react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  footer?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  footer,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-gray-700 text-gray-200',
    primary: 'bg-blue-900/50 text-blue-200',
    success: 'bg-green-900/50 text-green-200',
    warning: 'bg-amber-900/50 text-amber-200',
    danger: 'bg-red-900/50 text-red-200'
  };
  
  const iconWrapperClasses = {
    default: 'bg-gray-600 text-gray-200',
    primary: 'bg-blue-800 text-blue-200',
    success: 'bg-green-800 text-green-200',
    warning: 'bg-amber-800 text-amber-200',
    danger: 'bg-red-800 text-red-200'
  };
  
  return (
    <Card className={variantClasses[variant]} padding="md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <h4 className="mt-2 text-3xl font-bold">{value}</h4>
          
          {change && (
            <div className="flex items-center mt-2.5">
              <span className={`text-sm font-medium ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {change.isPositive ? '↑' : '↓'} {change.value}%
              </span>
              <span className="text-xs text-gray-400 ml-2">from last month</span>
            </div>
          )}
        </div>
        
        <div className={`p-2 rounded-lg ${iconWrapperClasses[variant]}`}>
          {icon}
        </div>
      </div>
      
      {footer && (
        <div className="mt-4 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400">{footer}</p>
        </div>
      )}
    </Card>
  );
};

export default StatCard;