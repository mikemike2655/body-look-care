import React from 'react';

export default function Logo({ className = '', width = 160, height = 80, variant = 'dark' }) {
  const bodyColor = variant === 'light' ? '#ffffff' : '#4a4a4a';
  const lookCareColor = variant === 'light' ? '#e0e0e0' : '#5a5a5a';
  const waveColor = '#7cb342';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 200"
      width={width}
      height={height}
      className={className}
      aria-label="Body Look Care"
      role="img"
    >
      <text x="200" y="70" fontFamily="Arial Black, sans-serif" fontSize="60" fontWeight="900" fill={bodyColor} textAnchor="middle">BODY</text>
      <text x="200" y="110" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="300" fill={lookCareColor} textAnchor="middle" letterSpacing="2">LOOK CARE</text>
      <path d="M 80 140 Q 140 120 200 140 Q 260 160 320 140 Q 280 170 200 155 Q 120 140 80 140" fill={waveColor} />
    </svg>
  );
}
