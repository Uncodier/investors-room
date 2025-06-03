import React from 'react'
import Link from 'next/link'

interface NavigationCardProps {
  href: string
  title: string
  description: string
  icon: string
  featured?: boolean
}

export const NavigationCard: React.FC<NavigationCardProps> = ({ 
  href, 
  title, 
  description, 
  icon,
  featured = false
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    backgroundColor: featured ? '#3b82f6' : 'white',
    border: featured ? 'none' : '2px solid #e5e7eb',
    borderRadius: '12px',
    padding: '24px',
    minHeight: '160px',
    position: 'relative',
    transition: 'all 0.3s ease',
    boxShadow: featured 
      ? '0 4px 12px rgba(59, 130, 246, 0.3)' 
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    background: featured 
      ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
      : 'white'
  }

  const [isHovered, setIsHovered] = React.useState(false)

  const hoveredStyle: React.CSSProperties = {
    ...baseStyle,
    transform: 'translateY(-4px)',
    boxShadow: featured 
      ? '0 12px 30px rgba(59, 130, 246, 0.4)'
      : '0 8px 25px rgba(59, 130, 246, 0.2)',
    borderColor: featured ? 'transparent' : '#3b82f6',
    backgroundColor: featured ? undefined : '#f8fafc'
  }

  const iconStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    marginBottom: '16px',
    display: 'block',
    transition: 'transform 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: '0 0 8px 0',
    lineHeight: '1.4',
    color: featured ? 'white' : (isHovered ? '#3b82f6' : 'inherit'),
    transition: 'color 0.3s ease'
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    margin: '0',
    lineHeight: '1.5',
    opacity: featured ? 0.9 : (isHovered ? 0.9 : 0.7),
    color: featured ? 'white' : 'inherit',
    transition: 'opacity 0.3s ease'
  }

  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '1.25rem',
    fontWeight: '700',
    backgroundColor: featured 
      ? 'rgba(255, 255, 255, 0.2)' 
      : (isHovered ? '#3b82f6' : '#f3f4f6'),
    color: featured 
      ? 'white' 
      : (isHovered ? 'white' : '#6b7280'),
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
  }

  return (
    <Link 
      href={href} 
      style={isHovered ? hoveredStyle : baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={iconStyle}>
        {icon}
      </div>
      <div>
        <h3 style={titleStyle}>{title}</h3>
        <p style={descriptionStyle}>{description}</p>
      </div>
      <div style={arrowStyle}>
        →
      </div>
    </Link>
  )
}

interface InvestmentHighlightProps {
  icon: string
  title: string
  description: string
}

export const InvestmentHighlight: React.FC<InvestmentHighlightProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="investment-highlight">
      <div className="highlight-icon">
        {icon}
      </div>
      <div className="highlight-content">
        <h4 className="highlight-title">{title}</h4>
        <p className="highlight-description">{description}</p>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>
      <div className="feature-content">
        <h4 className="feature-title">{title}</h4>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  )
}

interface MetricCardProps {
  value: string
  label: string
  trend?: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  trend,
  color = 'blue'
}) => {
  return (
    <div className={`metric-card metric-${color}`}>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
      {trend && <div className="metric-trend">{trend}</div>}
    </div>
  )
}

interface FinancialCardProps {
  year: string
  revenue: string
  growth?: string
  customers: string
  arpu: string
  gmv: string
}

export const FinancialCard: React.FC<FinancialCardProps> = ({
  year,
  revenue,
  growth,
  customers,
  arpu,
  gmv
}) => {
  return (
    <div className="financial-card">
      <div className="financial-year">{year}</div>
      <div className="financial-metrics">
        <div className="financial-metric">
          <span className="financial-value">{revenue}</span>
          <span className="financial-label">Revenue</span>
        </div>
        {growth && (
          <div className="financial-metric">
            <span className="financial-value growth">{growth}</span>
            <span className="financial-label">Growth</span>
          </div>
        )}
        <div className="financial-metric">
          <span className="financial-value">{customers}</span>
          <span className="financial-label">Customers</span>
        </div>
        <div className="financial-metric">
          <span className="financial-value">{arpu}</span>
          <span className="financial-label">ARPU/month</span>
        </div>
        <div className="financial-metric">
          <span className="financial-value">{gmv}</span>
          <span className="financial-label">GMV Generated</span>
        </div>
      </div>
    </div>
  )
}

interface TimelineCardProps {
  round: string
  amount: string
  timing: string
  purpose: string
  valuation: string
  completed?: boolean
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  round,
  amount,
  timing,
  purpose,
  valuation,
  completed = false
}) => {
  return (
    <div className={`timeline-card ${completed ? 'completed' : ''}`}>
      <div className="timeline-header">
        <h4 className="timeline-round">{round}</h4>
        <span className="timeline-amount">{amount}</span>
      </div>
      <div className="timeline-details">
        <div className="timeline-timing">{timing}</div>
        <div className="timeline-purpose">{purpose}</div>
        <div className="timeline-valuation">{valuation}</div>
      </div>
    </div>
  )
} 