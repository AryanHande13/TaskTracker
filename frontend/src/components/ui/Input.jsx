import React from 'react';

const Input = React.forwardRef(({ label, error, className = '', ...props }, ref) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    marginBottom: '1rem',
    width: '100%',
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--text-secondary)',
  };

  const inputStyle = {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid var(--surface-border)',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    color: 'var(--text-primary)',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const errorStyle = {
    color: 'var(--danger)',
    fontSize: '0.75rem',
    marginTop: '0.25rem',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        ref={ref}
        style={{
          ...inputStyle,
          borderColor: error ? 'var(--danger)' : 'var(--surface-border)',
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--primary)';
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--surface-border)';
        }}
        {...props}
      />
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
