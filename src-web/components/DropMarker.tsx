import classnames from 'classnames';
import React, { memo } from 'react';

interface Props {
  className?: string;
}

export const DropMarker = memo(
  function DropMarker({ className }: Props) {
    return (
      <div
        className={classnames(
          className,
          'relative w-full h-0 overflow-visible pointer-events-none',
        )}
      >
        <div className="absolute z-50 left-2 right-2 -bottom-[0.1rem] h-[0.2rem] bg-blue-500/50 rounded-full" />
      </div>
    );
  },
  () => true,
);