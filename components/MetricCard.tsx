import React from 'react';

interface MetricCardProps {
  value: string | number;
  label: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';
  size?: 'sm' | 'md' | 'lg';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  change,
  changeType = 'neutral',
  icon,
  color = 'blue',
  size = 'md'
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    green: 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800', 
    purple: 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800',
    orange: 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800',
    red: 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    gray: 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800'
  };

  const changeClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600', 
    neutral: 'text-gray-600 dark:text-gray-400'
  };

  const sizeClasses = {
    sm: 'text-xl p-3',
    md: 'text-2xl p-4',
    lg: 'text-3xl p-6'
  };

  return (
    <div className={`bg-white dark:bg-gray-800 ${sizeClasses[size]} rounded-lg shadow-sm border ${colorClasses[color]}`}>
      {icon && <div className="text-lg mb-1">{icon}</div>}
      <div className={`font-bold ${color === 'gray' ? 'text-gray-900 dark:text-gray-100' : ''}`}>
        {value}
      </div>
      <div className={`text-sm ${color === 'gray' ? 'text-gray-700 dark:text-gray-300' : ''}`}>
        {label}
      </div>
      {change && (
        <div className={`text-xs mt-1 ${changeClasses[changeType]}`}>
          {change}
        </div>
      )}
    </div>
  );
};

export default MetricCard;