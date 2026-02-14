import React from 'react';
import type { ProgressStatus } from '../../types/Minigame';
import './styles.css';

export interface ProgressBarProps {
  total: number;
  statuses: ProgressStatus[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, statuses }) => {
  if (total === 0) return null;
  const resolved =
    statuses.length >= total
      ? statuses
      : (Array(total).fill('pending').slice(0, total) as ProgressStatus[]);
  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={resolved.filter((s) => s !== 'pending').length}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      {resolved.map((status, i) => (
        <span
          key={i}
          className={`progress-dot progress-dot--${status}`}
          data-state={status}
          data-index={i}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
