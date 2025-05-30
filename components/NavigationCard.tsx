import React from 'react'
import Link from 'next/link'

interface NavigationCardProps {
  href: string
  title: string
  description: string
  icon: string
}

export const NavigationCard: React.FC<NavigationCardProps> = ({ 
  href, 
  title, 
  description, 
  icon 
}) => {
  return (
    <Link href={href} className="nx-block nx-rounded-lg nx-border nx-border-gray-200 nx-p-6 nx-no-underline hover:nx-shadow-lg nx-transition-shadow dark:nx-border-gray-800">
      <div>
        <h3 className="nx-font-semibold nx-text-lg">{icon} {title}</h3>
        <span className="nx-mt-2 nx-text-sm nx-text-gray-600 dark:nx-text-gray-400">
          {description}
        </span>
      </div>
    </Link>
  )
} 