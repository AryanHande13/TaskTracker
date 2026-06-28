import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: '500',
    fontSize: '0.875rem',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--primary)',
      color: '#fff',
      boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
    },
    danger: {
      backgroundColor: 'var(--danger)',
      color: '#fff',
      boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
    },
    gradient: {
      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
      backgroundSize: '200% auto',
      color: '#fff',
      boxShadow: '0 4px 15px 0 rgba(139, 92, 246, 0.4)',
      fontWeight: '600',
      animation: 'gradientMove 3s ease infinite',
    }
  };

  const activeStyle = variants[variant] || variants.primary;

  return (
    <button
      className={className}
      {...props}
      style={{ ...baseStyle, ...activeStyle, ...(props.style || {}) }}
      onMouseEnter={(e) => {
        if(variant !== 'ghost') e.currentTarget.style.transform = 'translateY(-1px)';
        if(variant === 'ghost') e.currentTarget.style.color = 'var(--text-primary)';
        if(props.onMouseEnter) props.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        if(variant !== 'ghost') e.currentTarget.style.transform = 'translateY(0)';
        if(variant === 'ghost') e.currentTarget.style.color = 'var(--text-secondary)';
        if(props.onMouseLeave) props.onMouseLeave(e);
      }}
      onMouseDown={(e) => {
        if(variant !== 'ghost') e.currentTarget.style.transform = 'translateY(1px)';
        if(props.onMouseDown) props.onMouseDown(e);
      }}
      onMouseUp={(e) => {
        if(variant !== 'ghost') e.currentTarget.style.transform = 'translateY(-1px)';
        if(props.onMouseUp) props.onMouseUp(e);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
