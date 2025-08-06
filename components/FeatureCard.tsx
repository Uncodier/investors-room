import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
  metrics?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  features,
  metrics,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100',
    green: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100',
    purple: 'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-100',
    orange: 'bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-100'
  };

  const textColorClasses = {
    blue: 'text-blue-800 dark:text-blue-200',
    green: 'text-green-800 dark:text-green-200',
    purple: 'text-purple-800 dark:text-purple-200',
    orange: 'text-orange-800 dark:text-orange-200'
  };

  return (
    <div className={`${colorClasses[color]} nx-p-4 nx-rounded-lg nx-border nx-mt-4`}>
      <h4 className="nx-font-semibold nx-mb-2">{title}</h4>
      <p className={`nx-text-sm nx-mb-3 ${textColorClasses[color]}`}>
        {description}
      </p>
      <ul className={`nx-list-disc nx-list-inside nx-text-sm ${textColorClasses[color]} nx-space-y-1`}>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      {metrics && (
        <div className="nx-mt-3 nx-text-sm">
          {metrics}
        </div>
      )}
    </div>
  );
};

export default FeatureCard;