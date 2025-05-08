
import React from 'react';

const ChartBarIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="12" width="6" height="8" rx="1" />
      <rect x="9" y="8" width="6" height="12" rx="1" />
      <rect x="15" y="4" width="6" height="16" rx="1" />
      <line x1="3" x2="21" y1="22" y2="22" />
    </svg>
  );
};

export default ChartBarIcon;
