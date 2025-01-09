// src/components/ui/skeleton.tsx
import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '2rem',
  rounded = false,
}) => {
  return (
    <div
      className={`animate-pulse items-center bg-red-500 ${
        rounded ? 'rounded-md' : ''
      }`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;