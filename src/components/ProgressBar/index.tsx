import React from 'react';
import type { ProgressStatus } from '../../types/Minigame';
import './styles.css';

export interface ProgressBarProps {
  total: number;
  statuses: ProgressStatus[];
}

/**
 * Ensures the statuses array has exactly `total` entries.
 * Pads with 'pending' if shorter; truncates if longer.
 */
function ensureStatusesArray(total: number, statuses: ProgressStatus[]): ProgressStatus[] {
  if (statuses.length >= total) return statuses.slice(0, total);
  return [...statuses, ...Array<ProgressStatus>(total - statuses.length).fill('pending')];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, statuses }) => {
  if (total === 0) return null;
  const resolved = ensureStatusesArray(total, statuses);
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
