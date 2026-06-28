import React from 'react';

const Select = React.forwardRef(({ label, error, options, className = '', ...props }, ref) => {
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

  const selectStyle = {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid var(--surface-border)',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    color: 'var(--text-primary)',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    cursor: 'pointer',
    appearance: 'none',
  };

  const errorStyle = {
    color: 'var(--danger)',
    fontSize: '0.75rem',
    marginTop: '0.25rem',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <select
          ref={ref}
          style={{
            ...selectStyle,
            width: '100%',
            borderColor: error ? 'var(--danger)' : 'var(--surface-border)',
          }}
          onFocus={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--primary)';
          }}
          onBlur={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--surface-border)';
          }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ backgroundColor: 'var(--bg-color)' }}>
              {opt.label}
            </option>
          ))}
        </select>
        <div style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: 'var(--text-secondary)'
        }}>
          ▼
        </div>
      </div>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
