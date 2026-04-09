import React, { useState } from 'react';

export interface MorphToggleProps {
  defaultChecked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  onChange?: (checked: boolean) => void;
}

export const MorphToggle: React.FC<MorphToggleProps> = ({
  defaultChecked = false,
  size = 'md',
  label,
  onChange,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  const sizeClass = size === 'md' ? '' : size;

  return (
    <div className="flex items-center gap-3">
      <button
        role="switch"
        aria-checked={checked}
        onClick={toggle}
        className={`morph-toggle-track ${checked ? 'on' : 'off'} ${sizeClass}`}
      >
        <span className="morph-toggle-thumb" />
      </button>
      {label && (
        <span className="text-sm font-medium text-white/70">{label}</span>
      )}
    </div>
  );
};
