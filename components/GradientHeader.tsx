import React from 'react';

interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'indigo' | 'emerald';
}

export const GradientHeader: React.FC<GradientHeaderProps> = ({
  title,
  subtitle,
  children,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'from-blue-50 to-indigo-50 border-blue-200 text-blue-900 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800 dark:text-blue-100',
    green: 'from-green-50 to-emerald-50 border-green-200 text-green-900 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800 dark:text-green-100',
    purple: 'from-purple-50 to-indigo-50 border-purple-200 text-purple-900 dark:from-purple-900/20 dark:to-indigo-900/20 dark:border-purple-800 dark:text-purple-100',
    orange: 'from-orange-50 to-amber-50 border-orange-200 text-orange-900 dark:from-orange-900/20 dark:to-amber-900/20 dark:border-orange-800 dark:text-orange-100',
    indigo: 'from-indigo-50 to-blue-50 border-indigo-200 text-indigo-900 dark:from-indigo-900/20 dark:to-blue-900/20 dark:border-indigo-800 dark:text-indigo-100',
    emerald: 'from-emerald-50 to-green-50 border-emerald-200 text-emerald-900 dark:from-emerald-900/20 dark:to-green-900/20 dark:border-emerald-800 dark:text-emerald-100'
  };

  return (
    <div className={`nx-mt-6 nx-rounded-lg nx-bg-gradient-to-r ${colorClasses[color]} nx-border nx-p-6`}>
      <h2 className="nx-text-2xl nx-font-bold nx-mb-4">{title}</h2>
      {subtitle && (
        <p className="nx-mb-6 nx-opacity-90">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};

export default GradientHeader;